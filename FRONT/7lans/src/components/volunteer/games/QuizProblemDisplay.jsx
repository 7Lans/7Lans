import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 93%;
  width: 90%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: 20px;
  margin-top: 2px;
  align-items: center;
`;

const Heading = styled.h1`
  font-size: 30px;
  font-weight: bolder;
  color: black;
  text-shadow: 2px 2px 2px rgb(255, 215, 3);
`;

const ShadowDiv = styled.div`
  width: 95%;
  height: 30%;
  border-radius: 20px;
  background-color: rgb(255, 242, 176);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 7px;
`;

const Problem = styled.h1`
  font-size: 80px;
  font-weight: bolder;
  color: black;
  text-shadow: 2px 2px 2px rgb(255, 215, 3);
`;

const ButtonContainer = styled.div`
  width: 100%;
  height: 55%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  height: 70%;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background-color: rgb(255, 242, 176);
  border: 5px solid rgb(240, 165, 8);
  margin-left: 4rem;
  margin-top: 4rem;
`;

const StyledButton = styled.button`
  font-size: 100px;
  margin: 0 60px 0 60px;
  border: none;
  font-weight: bolder;
  background-color: rgb(255, 242, 176);
  color: rgb(58, 131, 214);
`;

// 컴포넌트 코드
function QuizProblemDisplay({submitAnswer, setAnsCorrect, dispatch, gameChange, problem}) {
    return (
        <Container>
            <Heading>[ 문제 ]</Heading>
            <ShadowDiv>
                <Problem>{problem}</Problem>
            </ShadowDiv>
            <ButtonContainer>
                <ButtonDiv>
                    <StyledButton onClick={() => {
                        submitAnswer('O');
                        dispatch(gameChange(true))
                    }}>
                        O
                    </StyledButton>
                </ButtonDiv>
                <ButtonDiv>
                    <StyledButton onClick={() => {
                        submitAnswer('X');
                        dispatch(gameChange(true))
                    }}>
                        X
                    </StyledButton>
                </ButtonDiv>
            </ButtonContainer>
        </Container>
    )
}

export default QuizProblemDisplay;