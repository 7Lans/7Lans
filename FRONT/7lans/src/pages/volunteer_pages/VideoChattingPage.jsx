import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useSelector} from "react-redux"
import {useNavigate} from 'react-router-dom';
import GameNav from '../../components/navs/GameNav';
import UseOpenViduSession from "../../helpers/useOpenViduSession.jsx";
import VideoChattingLobby from "./VideoChattingLobby.jsx";
import VolunteerGamePage from "./VolunteerGamePage.jsx";
import ImgCaptureBtn from "../../img_upload/ImgCaptureBtn.jsx";
import {getMeetingDetail} from "../../api/axioses"


const AppContainer = styled.div`
  height: 100%;
  //width: 100wh;
  display: flex;
  flex-direction: column;
`;


const VideoChattingPage = () => {
  const {
    session, mainStreamManager, subscribers,
    joinSession, renderUserVideoComponent,
    toggleCamera, toggleMic
  } = UseOpenViduSession();

  const [isGameStarted, setGameStarted] = useState(false);
  const [meetingValid, setMeetingValid] = useState(true)
  const userInfo = useSelector((state) => state.user.value);
  const navigate = useNavigate();

  const [isMyCameraOn, setIsMyCameraOn] = useState(true)
  const [isMyMicOn, setIsMyMicOn] = useState(true)
  const [isChildCameraOn, setIsChildCameraOn] = useState(true)
  const [isChildMicOn, setIsChildMicOn] = useState(true)

  const MEETING_ID = 1;


  // 페이지 로드시 세션 생성
  useEffect(() => {
    if (meetingValid) {
      joinSession();
    }
  }, [meetingValid]);

  // 페이지 이탈시 세션 디스커넥트하게 설정
  useEffect(() => {
    return () => {
      if (session) {
        session.disconnect();
      }
    }
  }, [session]);


  /**
   * 로그인된 사용자가 해당 미팅에 참여할 수 있는지 확인합니다.
   * - 로그인된 사용자 정보가 있으면 미팅의 세부 정보를 가져옵니다.
   * - 미팅의 참여자 ID가 사용자 ID와 일치하지 않으면, 메인 페이지로 이동합니다.
   * - 일치하면, 미팅 참여 상태를 true로 설정합니다.
   */
  useEffect(() => {
    // const fetchData = async () => {
    //   if (userInfo !== null) {
    //     const meetingData = await getMeetingDetail(MEETING_ID);
    //     console.log(meetingData)
    //     if (meetingData.childId !== userInfo.memberId &&
    //       meetingData.volunteerId !== userInfo.memberId) {
    //       navigate('/'); // 메인페이지로 이동
    //     } else {
    //       setMeetingValid(true);
    //     }
    //   }
    // }
    // fetchData();
  }, [userInfo, navigate]);


  const toggleMyCamera = () => {
    const prevState = isMyCameraOn;
    setIsMyCameraOn(!prevState);
    toggleCamera(!prevState);
    session.signal({
      type: 'toggleCamera',
      data: JSON.stringify({
        userId : userInfo.memberId,
        status : !prevState,
      })
    })
      .then(() => console.log(`카메라 토글 신호 보냄`))
      .catch(err => console.log(err))
  }


  const toggleMyMic = () => {
    const prevState = isMyMicOn;
    setIsMyMicOn(!prevState);
    toggleMic(!prevState);
    session.signal({
      type: 'toggleMic',
      data: JSON.stringify({
        userId : userInfo.memberId,
        status : !prevState,
      })
    })
      .then(() => console.log(`마이크 토글 신호 보냄`))
      .catch(err => console.log(err))
  }



  // FIXME 테스트용 토글 method 이후 지울 것
  const toggleGameStarted = () => {
    setGameStarted(prevState => !prevState);
  };


  const signalToggleGameStarted = () => {
    session.signal({
      type: 'toggleGame'
    })
      .then(() => console.log(`게임 상태 토글됨`))
      .catch(err => console.log(err))
  }


  const receiveToggleGameStarted = () => {
    toggleGameStarted();
  }


  const receiveToggleCamera = (event) => {
    const signalData = JSON.parse(event.data);
    const cameraStatus = signalData.status;
    const signalUser = signalData.userId;
    if (signalUser !== userInfo.memberId && isMyMicOn) {
      setIsChildCameraOn(cameraStatus);
    }


  }

  const receiveToggleMic = (event) => {
    const signalData = JSON.parse(event.data);
    const micStatus = signalData.status;
    const signalUser = signalData.userId;

    if (signalUser !== userInfo.memberId && isMyMicOn) {
      setIsChildMicOn(micStatus);
    }
  }


  useEffect(() => {
    if (session) {
      session.on('signal:toggleGame', receiveToggleGameStarted);
      session.on('signal:toggleCamera', receiveToggleCamera);
      session.on('signal:toggleMic', receiveToggleMic);
    }

    return () => {
      if (session) {
        session.off('signal:toggleGame', receiveToggleGameStarted);
        session.off('signal:toggleCamera', receiveToggleCamera);
        session.off('signal:toggleMic', receiveToggleMic);
      }
    }
  }, [session]);

  return (
    <>
          <GameNav/>
      <div  style={{ marginTop: "5.7%", display: 'flex', flexDirection: 'row', gap: '40px' }}>
      
      {isGameStarted ? (
        <VolunteerGamePage
          renderUserVideoComponent={renderUserVideoComponent}
          mainStreamManager={mainStreamManager}
          subscribers={subscribers}
          session={session}
          toggleMyCamera={toggleMyCamera}
          toggleMyMic={toggleMyMic}
          isMyCameraOn={isMyCameraOn}
          isMyMicOn={isMyMicOn}
          isChildCameraOn={isChildCameraOn}
          isChildMicOn={isChildMicOn}
        />
      ) : (
        <VideoChattingLobby
          renderUserVideoComponent={renderUserVideoComponent}
          mainStreamManager={mainStreamManager}
          subscribers={subscribers}
          toggleMyCamera={toggleMyCamera}
          toggleMyMic={toggleMyMic}
          isMyCameraOn={isMyCameraOn}
          isMyMicOn={isMyMicOn}
          isChildCameraOn={isChildCameraOn}
          isChildMicOn={isChildMicOn}
        />
      )}

</div>
      {/* 게임 상태를 토글하는 버튼 */}
      <button onClick={signalToggleGameStarted}>
        {isGameStarted ? 'Stop Game' : 'Start Game'}
      </button>
    </>

  );
};

export default VideoChattingPage;
