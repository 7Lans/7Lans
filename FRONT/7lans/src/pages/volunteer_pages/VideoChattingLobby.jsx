import React, {useState} from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { StreamManager } from "openvidu-browser";
import { useSelector } from "react-redux";
import { FiCamera , FiCameraOff } from "react-icons/fi";

import { Link } from "react-router-dom";

import MicOn from '../../images/meeting/mic_on.png';
import MicOff from '../../images/meeting/mic_off.png';
import getEnv from "../../utils/getEnv";

import ImgCaptureBtn from "../../img_upload/ImgCaptureBtn";

const FlexCenterContainer = styled.div`
  /* flex: 1; */
  /* background-color: rgb(255, 233, 156); */
  display: flex;
  padding: 2rem;
  /* height: 100%; */
  justify-content: space-between;
`;

const BorderBox = styled.div`
  width: 34vw;
  height: 74vh;
  background-color: rgb(255, 248, 224);
  border: 4px solid rgb(45, 45, 45);
  border-radius: 20px;
  margin-top: 30px;
`;

const CenteredBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  width: 25vw;
  height: 72vh;
  margin-top: 10px;
`;

const ResponsiveImage = styled.img`
  max-width: 100%;
  max-height: 68%;
`;

const CenteredText = styled.p`
  text-align: center;
  font-size: 30px;
  margin: 0;
`;

const StyledButton = styled.button`
  background: linear-gradient(
          190deg,
          rgba(255, 184, 36, 1),
          rgba(255, 237, 140, 1)
  );
  font-size: 19px;
  font-weight: bold;
  border: 3px solid rgb(45, 45, 45);
  border-radius: 50px;
  margin: 0.5rem;
  padding: 0.5rem;
  height: 50px;
  width: 130px;
  margin-top: 7%;
  margin-bottom: 0;
  text-decoration-line: none;
`;

const Mic = styled.img`
  width: 40px;
  height: 40px;
  margin-top: 3px;
`;


const Camera = styled.div`
  width: 35px;
  height: 35px;
`;

const VideoChattingLobby = ({
                              renderUserVideoComponent,
                              mainStreamManager,
                              subscribers,
                              toggleMyCamera,
                              toggleMyMic,
                              isMyCameraOn,
                              isMyMicOn,
                              isChildCameraOn,
                              isChildMicOn,
                              exitSessionSignal
                            }) => {
  const userDino = useSelector((state) => state.dino.value);

  return (
    <FlexCenterContainer>
      <BorderBox>
        <h2
          style={{
            paddingTop: "2rem",
            paddingBottom: "1rem",
            textAlign: "center",
          }}
        >
          {" "}
          💛 나의 화면 💛
        </h2>
        {mainStreamManager && renderUserVideoComponent(mainStreamManager)}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "end",
            gap: "15px",
            marginLeft: "78%",
            marginTop: "5px",
          }}
        >
          <Camera onClick={toggleMyCamera}
          >
            {isMyCameraOn ? <FiCamera style={{width: "100%", height: "100%"}}/>
              : <FiCameraOff style={{width: "100%", height: "100%"}}/>}
          </Camera>
          <Mic
            onClick={toggleMyMic}
            src={isMyMicOn ? MicOn : MicOff}
            alt="마이크 끄고켜기"
          />
        </div>
      </BorderBox>
      <CenteredBox>
        <CenteredText>
          <p>둘만의 화상채팅 공간이에요</p>
          <p>하고싶은 놀이를 선택해주세요</p>
        </CenteredText>
        <ResponsiveImage
          src={`${getEnv("PUBLIC_URL")}/dinosourImage/dinosaur${userDino}_study.png`}
          alt="CenterImage"
        />
        <img src="" alt="" />
        <div style={{display: 'flex', marginTop: '22px'}}>
        {/* <Link to="/volunteer_video_chatting_start"> */}
          <StyledButton
            onClick={exitSessionSignal}
          >
            화상채팅 종료
          </StyledButton>
        {/* </Link> */}
        <ImgCaptureBtn/>
        </div>
      </CenteredBox>
      <BorderBox>
        <h2
          style={{
            paddingTop: "2rem",
            paddingBottom: "1rem",
            textAlign: "center",
            marginTop: "5px",
          }}
        >
          {" "}
          💛 학생 화면 💛
        </h2>
        {subscribers.map(
          (subscriber) => subscriber && renderUserVideoComponent(subscriber)
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "end",
            gap: "15px",
            marginLeft: "78%",
          }}
        >
          <Camera
          >
            {isChildCameraOn ? <FiCamera style={{width: "100%", height: "100%"}}/>
              : <FiCameraOff style={{width: "100%", height: "100%"}}/>}
          </Camera>

          <Mic
            src={isChildMicOn ? MicOn : MicOff}
          />
        </div>
      </BorderBox>
    </FlexCenterContainer>
  );
};

VideoChattingLobby.propTypes = {
  // 화면을 렌더링하는 method
  renderUserVideoComponent: PropTypes.func.isRequired,
  // 사용자의 화면을 관리하는 Stream
  mainStreamManager: PropTypes.instanceOf(StreamManager).isRequired,
  // 사용자의 Session에 참여하고 있는 Subscriber의 List
  subscribers: PropTypes.arrayOf(PropTypes.instanceOf(StreamManager))
    .isRequired,
};

export default VideoChattingLobby;
