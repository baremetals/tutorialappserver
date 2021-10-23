import React from 'react'
import TopBar from './TopBar'
import LeftSideBar from './LeftSideBar'
import RightSideBar from './RightSideBar'
import SmallFooter from './SmallFooter'
import styled from "styled-components";

const DashboardContainer = styled.div`
  width: 100%;
  display: flex;
`;

const Dashboard = ({children}: any) => {
    return (
      <>
        <TopBar />
        <DashboardContainer>
          <LeftSideBar />
          {children}
          <RightSideBar />
        </DashboardContainer>
        <SmallFooter />
      </>
    );
}

export default Dashboard
