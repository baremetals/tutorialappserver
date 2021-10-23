import React from 'react'
import styled from 'styled-components';
import CoursesTaken from '../CoursesTaken';


export const MainContainer = styled.aside`
  flex: 3.5;
`;

export const MainWrapper = styled.div`
  padding: 20px 20px 0 0;
`;
const RightBarTitle = styled.h4`
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 10px;
`;

const RightBarInfo = styled.div`
  margin-bottom: 30px;
`;

const RightBarInfoItem = styled.div`
  margin-bottom: 10px;
`;

const RightBarInfoKey = styled.span`
  font-weight: 500;
  margin-right: 15px;
  color: #555;
`;

const RightBarInfoValue = styled.span`
  font-weight: 300;
`;

function ProfileRightBar() {
    return (
      <>
        <MainContainer>
          <MainWrapper>
            <RightBarTitle>User Information</RightBarTitle>
            <RightBarInfo>
              <RightBarInfoItem>
                <RightBarInfoKey>City</RightBarInfoKey>
                <RightBarInfoValue>Accra</RightBarInfoValue>
              </RightBarInfoItem>
              <RightBarInfoItem>
                <RightBarInfoKey>Courses Taken</RightBarInfoKey>
                <RightBarInfoValue>20</RightBarInfoValue>
              </RightBarInfoItem>
              <RightBarInfoItem>
                <RightBarInfoKey>Complete</RightBarInfoKey>
                <RightBarInfoValue>12</RightBarInfoValue>
              </RightBarInfoItem>
              <RightBarInfoItem>
                <RightBarInfoKey>Ratings</RightBarInfoKey>
                <RightBarInfoValue>Superb</RightBarInfoValue>
              </RightBarInfoItem>
            </RightBarInfo>
            <CoursesTaken />
          </MainWrapper>
        </MainContainer>
      </>
    );
}

export default ProfileRightBar
