import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios'

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 10px solid rgb(255, 215, 7);
`;

const Header = styled.header`
  align-self: flex-start;
  margin: 1rem;
`;

const H1 = styled.h1`
  font-weight: bold;
  color: rgb(134, 134, 134);
`

const ContentWrapper = styled.div`
  flex: 1;
  width: 100vw;
  display: flex;
`;

const LeftContent = styled.div`
  width: 50vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const RightContent = styled.div`
  width: 50vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  input, button {
    background-color: rgb(255, 241, 165);
    border: none;
    border-radius: 1rem;
    margin: 0.5rem;
    padding: 0.5rem;
  }

  p {
    margin: 0.5rem;
  }
`;

const LogoImage = styled.img`
  height: 20vh;
`;

const InfoSpan = styled.span`
  background-color: rgb(255, 241, 165);
  padding: 0.5rem;
  border-radius: 1rem;
`;

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signUp = function (email, password) {

    axios({
      method: 'post',
      url: 'https://i10e103.p.ssafy.io/api/v1/member/register',
      data: {
        email, password
      }
    })
      .then((res) => {
        
        console.log(res.data)
        // token.value = res.data.key
        window.alert('회원가입을 축하합니다.')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <Container>
      <Header>
        <Link to={'/'}>
          <FaArrowLeft />
        </Link>
      </Header>
      <H1>로그인</H1>
      <ContentWrapper>
        <LeftContent>
          <LogoImage src="./7lans_logo.png" alt="" />
          <InfoSpan>
            <h5>
              봉사자와 피봉사자의 연결을 도와주는 보조 웹 사이트
            </h5>
          </InfoSpan>
        </LeftContent>
        <RightContent>
          <div>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <p>아이디 찾기 | 비밀번호 찾기 | 로그인</p>
            <button type='submit' onClick={() => signUp(email, password)}>회원가입</button>
          </div>
        </RightContent>
      </ContentWrapper>
    </Container>
  );
}

export default Register;
