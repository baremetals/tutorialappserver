import styled from "styled-components"

export const ChatContainer = styled.div`
  &:nth-child(0) ~ div {
    margin-left: -0.5rem;
  }
`;

export const OnlineUsersWrap = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  cursor: pointer;
  margin-top: 10px;
  @media (max-width: 991px) {
    margin-top: 0;
  }
`;

export const OnlineUsersImageWrap = styled.div`
  position: relative;
  margin-right: 10px;
  @media (max-width: 991px) {
    margin-right: 0;
  }
`;

export const OnlineUsersImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid white;
  display: block;
`;

export const OnlineUsersImageBadge = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: limegreen;
  position: absolute;
  top: 2px;
  right: 2px;
`; 

export const OnlineUsersName = styled.span`
  @media screen and (max-width: 991px) {
    display: none;
  }
`;