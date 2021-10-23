import styled from "styled-components";

export const ShareContainer = styled.div`
  width: 100%;
  height: 170px;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
`;
export const ShareWrapper = styled.div`
  padding: 10px;
`;
export const ShareTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
export const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
  margin-bottom: 10px;
`;
export const InputLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
`;
export const Title = styled.input`
  border: 1px;
  width: 80%;
  margin-bottom: 10px;

  &:focus {
    outline: none;
  }
`;

export const Body = styled.select`
  border: none;
  width: 80%;

  &:focus {
    outline: none;
  }
`;

export const SelectOptions = styled.option`
  border: none;
  width: 80%;

  &:focus {
    outline: none;
  }
`;


export const ShareHr = styled.hr`
  margin: 20px;
`;
export const ShareBottomWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const ShareOptions = styled.div`
  display: flex;
  margin-left: 20px;
`;
export const ShareOptionItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 15px;
  cursor: pointer;
`;
export const ShareOptionsIcon = styled.label`
  font-size: 18px;
  margin-right: 3px;
`;
export const ShareOptionstext = styled.span`
  font-size: 14px;
  font-weight: 500;
`;
export const ShareButton = styled.button`
  border: none;
  padding: 7px;
  border-radius: 5px;
  background-color: green;
  font-weight: 500;
  margin-right: 20px;
  cursor: pointer;
  color: white;
`;