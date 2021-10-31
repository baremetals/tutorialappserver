import styled from "styled-components";

export const LeftSideContainer = styled.div`
  max-width: 18rem;
  min-width: 18rem;
  min-height: calc(100vh - 100px);
  // overflow-y: auto;
  position: sticky;
  background-color: rgb(0 0 0 / 5%);
  border-right: 1px solid rgb(0 0 0 / 10%);
  top: 0;
  padding-top: 2rem;
  padding-bottom: 2rem;
  padding-right: 1rem;
  transition: transform 0.2s ease-in-out;
  &:before {
    content: "";
    background-color: rgb(0 0 0 / 5%);
    position: absolute;
    top: 0;
    bottom: 0;
    right: 100%;
    left: -50vw;
  }

  @media (max-width: 991px) {
    transform: translateX(-100%);
    background-color: #ededed;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    padding: 2rem 1rem;
  }
  &.open {
    transform: none;
  }
`;

export const LeftSideBarWrapper = styled.div`
  padding: 0;
`;

export const BackOverlay = styled.div`
  background-color: rgb(0 0 0 / 30%);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;
export const ToggleButton = styled.button`
  width: 1.5rem;
  background-color: transparent;
  border: none;
  vertical-align: top;
  margin-top: 1rem;
  @media (min-width: 992px) {
    display: none;
  }
  span {
    height: 2px;
    display: block;
    background-color: #000;
    margin: 0.375rem 0;
  }
`;

export const LeftSideBarList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;
export const LeftSideBarListItem = styled.li`
  display: flex;
  align-items: center;
  font-size: 1rem;
  cursor: pointer;
  padding: 1rem 1.75rem;
  transition: all 0.2s ease-in-out;
  border-radius: 10rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
  svg {
    transition: transform 0.2s ease-in-out;
  }
  &.active {
    color: #ad00bb;
    background-color: rgb(173 0 187 / 10%);
  }
  &:hover {
    color: #ad00bb;
    background-color: rgb(173 0 187 / 10%);
    svg {
      transform: scale(1.375);
    }
  }
`;
export const LeftSideBarIcon = styled.div`
  margin-right: 1rem;
  display: flex;
  position: relative;
`;
export const LeftSideBarListItemText = styled.span``;

export const IconBadge = styled.span`
  width: 0.625rem;
  height: 0.625rem;
  background-color: #4cbaed;
  border-radius: 50%;
  color: white;
  position: absolute;
  top: -0.25rem;
  right: -0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.625rem;
  z-index: 1;
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
