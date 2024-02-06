import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import { updateChildInfo } from "../../store/childSlice";

const StyledCommonSidePanel = styled.div`
  background-color: rgb(255, 248, 223);
  padding: 2rem;
  color: white;
  width: 550px;
  border-radius: 20px 0 0 20px;
  height: 100%;
  /* border: 2px solid rgb(255, 183, 58);
  border-right: none; */

  @media (max-width: 768px) {
    max-width: 100%;
    border-radius: 0;
  }
`;

const LeftSide = styled.div`
  height: 150px;
  position: relative;

  @media (max-width: 768px) {
    height: 100%;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  left: 89%;
  border-radius: 25px;
  border: none;
  background-color: rgb(255, 248, 223);
  font-weight: bold;
  color: rgb(240, 165, 8);

  @media (max-width: 768px) {
    left: 85%;
  }
`;

const ProfileImage = styled.img`
  position: absolute;
  left: 10%;
  top: 2%;
  height: 8rem;
  width: 8rem;
  border-radius: 100px;
  border: 4px solid rgb(45,45,45);
  padding: 5px;

  @media (max-width: 768px) {
    position: relative;
    left: 0;
    top: 0;
    margin: 20px auto;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  height: 70%;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    height: auto;
  }
`;

const NameHeader = styled.h4`
  font-weight: bolder;
  color: rgb(45, 45, 45);
  text-decoration: none;
  position: absolute;
  top: 65%;
  left: 50%;
`;

const DetailContainer = styled.div`
  margin-top: 10px;
  width: 100%;
  height: 100%;
  color: rgb(0, 0, 0);
  padding: 1rem;
  background-color: rgb(255, 255, 255, 0.9);
  border-radius: 10px;
  /* border: 2px solid rgb(255, 183, 58); */

  overflow: auto;
  @media (max-width: 768px) {
    margin-top: 0;
  }
`;

const Age = ({ birth }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  //console.log(birth[0])
  //console.log(currentDate.getFullYear())

  return <div>나이 : {currentDate.getFullYear() - birth[0] + 1} 살</div>;
};

const Comment = ({ comment }) => {
  //console.log(comment);

  if (comment) {
    return <div>특이사항 : {comment}</div>;
  } else {
    return <div>특이사항 : 특이사항이 없습니다.</div>;
  }
};

const ChildCard = styled.div`
  border: 3px solid rgb(240, 165, 8);
  display: flex;
  align-items: center;

  margin-bottom: 10px;
  border-radius: 10px;
  padding: 1rem;
`;

const Button = styled.button`
  background: linear-gradient(
    300deg,
    rgba(255, 184, 36, 1),
    rgba(255, 237, 140, 1)
  );
  font-size: 17px;
  font-weight: bold;
  border: none;
  border-radius: 50px;
  /* margin: 0.5rem; */
  margin-left: 3px;
  padding: 0.5rem;
  height: 40px;
  width: 100px;
  margin-left: 90%;
  margin-top: 7%;
  color: white;
  text-decoration-line: none;
`;
const CommonSidePanel = () => {
  const [sidePanelStatus, setSidePanelStatus] = useState(true);
  //const [children, setChildren] = useState([]);
  const [id, setId] = useState([]);
  const dispatch = useDispatch();
  const childInfo = useSelector((state) => state.child.value);
  const children = useSelector((state) => state.children.value);
  const userInfo = useSelector((state) => state.user.value);
  const urlInfo = useSelector((state) => state.url.value)
  //console.log(userInfo.memberId);
  const userId = userInfo.memberId;
  //console.log(children);
  // console.log(childInfo);

  useEffect(() => {
    axios
      .get(`${urlInfo}/vol/list/${userId}`)
      .then((res) => {
        console.log(res, "여기서 아이들 리스트 정제하기");
      })
      .catch((err) => {
        console.log(err, "커먼사이드 패널에서 에러발생");
      });
  });

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch();
  // };

  //console.log(children);

  const renderSidePanel = () => {
    const postData = (child) => {
      dispatch(updateChildInfo(child));
      console.log(child.relationId);
    };
    if (sidePanelStatus) {
      return (
        <StyledCommonSidePanel>
          <LeftSide>
            <CloseButton onClick={() => setSidePanelStatus(false)}>
              {"<<"}
            </CloseButton>
            <ProfileImage src="./anonymous.jpg" alt="" />
            <NameHeader> {userInfo.volunteerName} _봉사자님</NameHeader>
          </LeftSide>
          <InfoContainer>
            <DetailContainer>
              {children.length > 0 ? (
                children.map((el) => (
                  <ChildCard key={el.childId}>
                    <div>
                    <h3>{el.childName}</h3>
                    <Age birth={el.childBirth}></Age>
                    <div>소속기관: {el.childCenterName}</div>
                    <Comment comment={el.childSpecialContent}></Comment>
                    <Button onClick={() => postData(el)}>선택하기</Button>
                    </div>
                  </ChildCard>
                ))
              ) : (
                <h4> 친구를 추가해주세요!</h4>
              )}
            </DetailContainer>
          </InfoContainer>
        </StyledCommonSidePanel>
      );
    } else {
      return (
        <div
          style={{
            backgroundColor: "rgb(255, 248, 223)",
            borderRadius: "20px 0 0 20px",
          }}
        >
          <button
            style={{
              height: "25px",
              borderRadius: "25px",
              backgroundColor: "rgb(255, 248, 223)",
              fontWeight: "bold",
              color: "rgb(240, 165, 8)",
              margin: "2rem",
              border: "none",
            }}
            onClick={() => setSidePanelStatus(true)}
          >
            {">>"}
          </button>
        </div>
      );
    }
  };

  return renderSidePanel();
};

export default CommonSidePanel;
