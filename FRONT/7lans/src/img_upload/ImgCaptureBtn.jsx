import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import Modal from 'react-modal';
import { getDownloadURL, getStorage, uploadBytesResumable, ref as strRef } from 'firebase/storage';
import { update, ref as dbRef } from 'firebase/database';
import { useDispatch, useSelector } from "react-redux";
import { db } from '../firebase';
import { nextImgNum } from "../store/imgNumSlice";


const customStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '50%', // Modal의 너비를 50%로 설정
    height: '50%', // Modal의 높이를 50%로 설정
  }
};

Modal.setAppElement('#root');

export const ImgCaptureBtn = ({
                                capturedImages,
                                setCapturedImages
                              }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imgData, setImgData] = useState(null);
  const imgNum = useSelector((state) => state.imgNum.value)
  const dispatch = useDispatch();

  const captureScreen = () => {
    html2canvas(document.body).then((canvas) => {
      const data = canvas.toDataURL();
      setImgData(data);
      setIsOpen(true);
    });
  };

  const handleUploadImage = async () => {
    setIsOpen(false);
    dispatch(nextImgNum());

    // Create the file metadata
    const metadata = {
      contentType: 'image/png'
    };

    const storage = getStorage();
    const storageRef = strRef(storage, 'meeting_image/' + imgNum);
    const imageFile = dataURLtoFile(imgData, 'capture.png');
    const uploadTask = uploadBytesResumable(storageRef, imageFile, metadata);

    // Listen for state changes, errors, and completion of the upload
    uploadTask.on('state_changed',
      (snapshot) => {
        // Track upload progress
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // Handle errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;
          case 'storage/unknown':
            // Unknown error occurred
            break;
        }
      },
      () => {
        // Upload completed successfully, get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          // downloadURL에 이미지 경로 들어옴

          setCapturedImages(prevImages => [...prevImages, downloadURL]);
          // Update database with the download URL
          update(dbRef(db, `users/${imgNum}`), { image: downloadURL });
        });
      }
    );
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const dataURLtoFile = (dataurl, filename) => {
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
  }

  return (
    <div>
      <button onClick={captureScreen}>Capture Screen</button>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img src={imgData} alt="screen capture" style={{ width: '100%', height: 'auto' }} />
          <div>
            <button onClick={handleUploadImage}>Upload</button>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ImgCaptureBtn;