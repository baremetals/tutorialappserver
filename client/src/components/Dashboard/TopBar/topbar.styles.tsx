import styled from "styled-components";

import { HiSearch } from "react-icons/hi";

export const TopbarContainer = styled.div`
  width: 100%;
  height: 100px;
  background-color: #9e609e;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 999;
`;

export const TopLeftWrap = styled.div`
  flex: 3;
`;

export const TopBarLogo = styled.span`
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-self: flex-start;
  margin-left: 24px;
`;

export const TopCenterWrap = styled.div`
  flex: 5;
`;

export const SearchBar = styled.div`
  width: 100%;
  height: 30px;
  background-color: white;
  border-radius: 30px;
  display: flex;
  align-items: center;
`;

export const SearchIcon = styled(HiSearch)`
  font-size: 20px;
  margin-left: 10px;
`;

export const SearchInput = styled.input`
  border: none;
  width: 70%;

  &:focus {
    outline: none;
  }
`;

export const TopRightWrap = styled.div`
  flex: 4;
  display: flex;
  align-items: center;
  justify-content: space-around;
  /* color: white; */
`;

export const TopBarNavLinks = styled.div`
  margin-right: 10px;
  font-size: 14px;
  cursor: pointer;
  color: white;
`;

export const NavLinks = styled.span`
  margin-right: 10px;
  font-size: 14px;
  cursor: pointer;
`;

export const Icons = styled.div`
  display: flex;
`;

export const IconItem = styled.div`
  margin-right: 15px;
  cursor: pointer;
  position: relative;
  font-size: 20px;
`;

export const IconBadge = styled.span`
  width: 15px;
  height: 15px;
  background-color: red;
  border-radius: 50%;
  color: white;
  position: absolute;
  top: -5px;
  right: -5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px; ;
`;

export const ProfileImg = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
`;