import styled from "styled-components";

import { HiSearch } from "react-icons/hi";

export const TopbarContainer = styled.div`
  width: 100%;
  height: 100px;
  background-color: #fff;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 999;
  padding-left: 2rem;
  padding-right: 2rem;
  @media (max-width: 991px) {
    height: 70px;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
`;

export const TopLeftWrap = styled.div`
  
`;

export const TopBarLogo = styled.span`
  svg {
    display: block;
    @media (max-width: 991px) {
      width: 36px;
    }
  }
`;

export const TopCenterWrap = styled.div`
  flex: auto;
  margin-left: 1rem;
  margin-right: 1rem;
`;

export const SearchBar = styled.div`
  max-width: 50rem;
  background-color: #e9e9e9;
  display: flex;
  align-items: center;
  border-radius: 2rem;
  margin-left: auto;
  margin-right: auto;
`;

export const SearchIcon = styled(HiSearch)`
  font-size: 1.25rem;
  margin-left: 1rem;
  margin-right: 0.5rem;
`;

export const SearchInput = styled.input`
  border: none;
  width: 100%;
  background-color: transparent;
  height: 2.5rem;
  font-size: 0.875rem;
  &:focus {
    outline: none;
  }
`;

export const TopRightWrap = styled.div`
  display: flex;
  align-items: center;
`;

export const Icons = styled.div`
  display: flex;
  svg {
    width: 1.5rem;
    height: 1.5rem;
    fill: #ababab;
    display: block;
    @media (max-width: 991px) {
      width: 1.25rem;
      height: 1.25rem;
    }
  }
`;

export const IconItem = styled.div`
  margin-right: 1.5rem;
  cursor: pointer;
  position: relative;
  font-size: 1.25rem;
  @media (max-width: 991px) {
    margin-right: 0.75rem;
  }
`;

export const IconBadge = styled.span`
  width: 1rem;
  height: 1rem;
  background-color: #ad00bb;
  border-radius: 50%;
  color: white;
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  font-size: 0.75rem;
  text-align: center;
  font-weight: bold;
  line-height: 1.2;
`;

export const ProfileImg = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  display: block;
  box-shadow: 0 0 0 0.125rem rgb(0 0 0 / 10%);
  overflow: hidden;
  @media (max-width: 991px) {
    width: 2.25rem;
    height: 2.25rem;
  }
`;

export const ProfileSetting = styled.div`
  position: relative;
  @media (max-width: 991px) {
    margin-left: 0.5rem;
  }
`;

export const ProfileDropdown = styled.ul`
  display: none;
  position: absolute;
  top: 100%;
  width: 160px;
  right: 0;
  background-color: #fff;
  padding: 0.5rem 0;
  list-style: none;
  margin-top: 1.5rem;
  box-shadow: 0 0 10px rgb(0 0 0 / 5%);
  border-radius: 0.25rem;
  &.opened {
    display: block;
  }
`;

export const ProfileItem = styled.li`
  a {
    text-decoration: none;
    font-size: 1rem;
    color: #000;
    font-weight: 500;
    display: block;
    padding: 0.5rem 1.5rem;
    &:hover {
      background-color: rgb(237 237 237 / 50%);
    }
  }
`;