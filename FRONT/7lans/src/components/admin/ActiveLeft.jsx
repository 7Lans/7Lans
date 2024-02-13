import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import getEnv from "../../utils/getEnv";
import axios from "axios";
import styled, { keyframes } from "styled-components";
import { adminSelectAcitve } from "../../store/adminSelectActiveSlice";
import { adminApproveBtn } from "../../store/adminApproveBtnSlice";
import { adminNoList } from "../../store/adminNoListSlice";
import { adminAddFriend } from "../../store/adminAddFriendSlice";

const LeftContainer = styled.div`
  height: 90%;
  display: flex;
  flex-direction: column;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  width: 100%;
`;

const SearchBar = styled.input`
  width: 50%;
  padding: 10px;
  margin-bottom: 20px;
  border: 2px solid #ddd;
  border-radius: 5px;
`;

const ActiveList = styled.div`
  flex-direction: column;
  overflow-y: auto;
  max-height: 100vh;
  width: 90%;
  height: 100%;
  padding: -500px;
  margin-left: -80px;
  border-radius: 20px;
  position: relative;
  justify-content: center;
  align-items: center;
`;

const PostContainer = styled.div`
  background-color: #fff;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 60%;
  margin-bottom: 15px;
  margin-left: 200px;
  padding: 15px;
  border: 2px solid black;
  border-radius: 10px;
  cursor: pointer;

  transition: background-color 0.3s ease;

  &:hover {
    background-color: #cbf3f0;
  }

  &.selected {
    background-color: #2ec4b6;
    animation: none;
  }
`;

const PostTitle = styled.h4`
  color: #333;
  margin-bottom: 5px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const InfoLabel = styled.p`
  color: #666;
  margin-right: 10px;
  margin-bottom: 5px;
  min-width: 60px;
`;

const InfoValue = styled.p`
  color: #333;
  margin-bottom: 5px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px; /* Title과 ToggleBtn 사이 여백 추가 */
`;

const Title = styled.h1`
  text-align: center;
  flex: 1; /* Title이 남은 공간을 모두 차지하도록 설정 */
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  margin-bottom: 20px; /* ToggleBtn을 수직 중앙 정렬 */
`;

const ToggleBtn = styled.input`
  position: relative;
  height: 30px;
  width: 60px;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  border-radius: 30px;
  background-color: ${({ isApproved }) => (isApproved ? "#2ecc71" : "#ff6b81")};
  transition: background-color 0.3s ease;
  outline: none;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: ${({ isApproved }) =>
      isApproved
        ? "calc(100% - 25px)"
        : "5px"}; // Adjusted left position to keep the circle indicator inside the button
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: white;
    transition: left 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:checked::before {
    left: ${({ isApproved }) =>
      isApproved
        ? "5px"
        : "calc(100% - 25px)"}; // Adjusted left position when checked to keep the circle indicator inside the button
  }
`;

const filterPosts = (posts, searchTerm) => {
  return posts.filter((post) => {
    const lowercaseSearchTerm = searchTerm.toLowerCase();
    const { volunteerName, childName, activityId, dateInfo } = post;
    return (
      (volunteerName &&
        volunteerName.toLowerCase().includes(lowercaseSearchTerm)) ||
      (childName && childName.toLowerCase().includes(lowercaseSearchTerm)) ||
      (activityId && activityId.toString().includes(searchTerm)) ||
      (dateInfo && dateInfo.includes(searchTerm)) // 작성시간 검색 추가
    );
  });
};

const ActiveLeft = () => {
  const [posts, setPosts] = useState([]);
  const [approvePosts, setApprovePosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPostIndex, setSelectedPostIndex] = useState(null);
  const isApproval = useSelector((state) => state.adminApproveBtn.value);
  const urlInfo = getEnv("API_URL");
  const userInfo = useSelector((state) => state.user);
  const centerId = userInfo.value.centerId;
  const stateCheck = useSelector((state) => state.adminAddFriend);
  const dispatch = useDispatch();

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `${urlInfo}/activityLog/manager/disapprovedList/${centerId}`
      );
      console.log(response.data, "ActiveManage 승인안된 활동일지리스트");
      setPosts(response.data);
      dispatch(adminAddFriend(false));
    } catch (error) {
      console.error("Error ActiveLeft", error);
    }
  };

  const fetchApprovePosts = async () => {
    try {
      const response = await axios.get(
        `${urlInfo}/activityLog/manager/approvedList/${centerId}`
      );
      console.log(response.data, "ActiveManage 승인되어버린 활동일지리스트");
      setApprovePosts(response.data);
      dispatch(adminAddFriend(false));
    } catch (error) {
      console.error("Error ActiveLeft", error);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchApprovePosts();
  }, [stateCheck]);

  const filteredPosts = filterPosts(posts, searchTerm);
  const filteredApprovePosts = filterPosts(approvePosts, searchTerm);

  const onClick = (activityId, relationId, index) => {
    dispatch(adminSelectAcitve({ activityId, relationId }));
    console.log(activityId, relationId, "ccccccc");
    setSelectedPostIndex(index); // 선택된 인덱스 업데이트
  };

  const toggleApprovalStatus = () => {
    dispatch(adminApproveBtn());
    console.log(isApproval, "승인상태"); // 승인 상태를 토글
  };

  useEffect(() => {
    dispatch(
      adminNoList({
        filteredListLen: filteredPosts.length,
        filteredApproveListLen: filteredApprovePosts.length,
      })
    );
  }, [filteredPosts.length, filteredApprovePosts.length, isApproval]);

  return (
    <>
      <LeftContainer>
        <Header>
          <Title>
            {isApproval
              ? "승인이 '완료된' 활동일지 목록"
              : "승인이 '필요한' 활동일지 목록"}{" "}
            {isApproval ? <span>&#128035;</span> : <span>&#128036;</span>}
          </Title>
        </Header>
        <SearchContainer>
          <SearchBar
            type="text"
            placeholder="봉사자, 학생, 작성날짜으로 검색 가능"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ToggleContainer>
            <ToggleBtn
              type="checkbox"
              checked={isApproval}
              onChange={toggleApprovalStatus}
            />
          </ToggleContainer>
        </SearchContainer>
        {isApproval ? (
          <ActiveList>
            {filteredApprovePosts.length > 0 ? (
              filteredApprovePosts.map((post, index) => (
                <PostContainer
                  key={index}
                  onClick={() =>
                    onClick(post.activityId, post.relationId, index)
                  }
                  className={index === selectedPostIndex ? "selected" : ""}
                >
                  <PostTitle>날짜: {post.dateInfo}</PostTitle>
                  <Info>
                    <InfoLabel>봉사자:</InfoLabel>
                    <InfoValue>{post.volunteerName}</InfoValue>
                  </Info>
                  <Info>
                    <InfoLabel>학생:</InfoLabel>
                    <InfoValue>{post.childName}</InfoValue>
                  </Info>
                </PostContainer>
              ))
            ) : (
              <p>검색 결과가 없습니다.</p>
            )}
          </ActiveList>
        ) : (
          <ActiveList>
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, index) => (
                <PostContainer
                  key={index}
                  onClick={() =>
                    onClick(post.activityId, post.relationId, index)
                  }
                  className={index === selectedPostIndex ? "selected" : ""}
                >
                  <PostTitle>날짜: {post.dateInfo}</PostTitle>
                  <Info>
                    <InfoLabel>봉사자:</InfoLabel>
                    <InfoValue>{post.volunteerName}</InfoValue>
                  </Info>
                  <Info>
                    <InfoLabel>학생:</InfoLabel>
                    <InfoValue>{post.childName}</InfoValue>
                  </Info>
                </PostContainer>
              ))
            ) : (
              <p>검색 결과가 없습니다.</p>
            )}
          </ActiveList>
        )}
      </LeftContainer>
    </>
  );
};

export default ActiveLeft;
