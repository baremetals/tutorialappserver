import styled from "styled-components";
import { BsUpload } from "react-icons/bs";



export const Background = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgb(0 0 0 / 50%);
  z-index: 1000;
  display: flex;
  align-items: center;
  > div {
    width: 100%;
  }
`;

export const PageContainer = styled.div`
  margin: 2rem auto;
  background-color: rgb(0 0 0 / 50%);
  border-radius: 1rem;
  max-width: 45rem;
  padding: 3rem;
  backdrop-filter: blur(0.25rem);
`;

export const FormWrap = styled.form`
  display: block;
`;

export const MainContainer = styled.div`
  display: block;
  width: 100%;
`;

export const CardText = styled.h2`
  margin-bottom: 1.5rem;
  color: #fff;
`;
export const CloseButtonWrap = styled.span`
  cursor: pointer;
  float: right;
  svg {
    width: 1.75rem;
    height: 1.75rem;
    fill: #fff;
  }
`;

export const InputContainer = styled.div`
  border-top: 1px solid rgb(255 255 255 / 40%);
  padding-top: 1.5rem;
`;

export const TitleInput = styled.input`
  background-color: rgb(0 0 0 / 20%);
  border: 1px solid rgb(255 255 255 / 20%);
  border-radius: 2rem;
  width: calc(50% - 1rem);
  padding: 0.875rem 1.5rem;
  color: #fff;
  font-size: 1rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
  &:focus {
    border-color: rgb(255 255 255 / 20%);
    outline: none;
  }
  &::placeholder {
    color: inherit;
    font-weight: inherit;
    font-size: inherit;
  }
`;
export const UploadWrapper = styled.div`
  width: 100%;
  margin-bottom: 1rem;
`;
export const UploadLabel = styled.label``;

export const UploadIcon = styled(BsUpload)``;

export const UploadInput = styled.input`
  background-color: rgb(0 0 0 / 20%);
  border: 1px solid rgb(255 255 255 / 20%);
  border-radius: 2rem;
  width: 100%;
  padding: 0.875rem 1.5rem;
  color: #fff;
  font-size: 1rem;
  display: block;
  &:focus {
    border-color: rgb(255 255 255 / 20%);
    outline: none;
  }
  &::placeholder {
    color: inherit;
    font-weight: inherit;
    font-size: inherit;
  }
`;

export const Category = styled.select`
  background-color: rgb(0 0 0 / 20%);
  border: 1px solid rgb(255 255 255 / 20%);
  border-radius: 2rem;
  width: 50%;
  padding: 0.875rem 1.5rem;
  color: #fff;
  font-size: 1rem;
  margin-bottom: 1rem;
  &:focus {
    border-color: rgb(255 255 255 / 20%);
    outline: none;
  }
  &::placeholder {
    color: inherit;
    font-weight: inherit;
    font-size: inherit;
  }
`;

export const CategoryOptions = styled.option``;

export const BodyTextWrapper = styled.div``;

export const BodyText = styled.textarea`
  background-color: rgb(0 0 0 / 20%);
  border: 1px solid rgb(255 255 255 / 20%);
  border-radius: 2rem;
  width: 100%;
  padding: 0.875rem 1.5rem;
  color: #fff;
  font-size: 1rem;
  margin-bottom: 1rem;
  display: block;
  height: 8rem;
  &:focus {
    border-color: rgb(255 255 255 / 20%);
    outline: none;
  }
  &::placeholder {
    color: inherit;
    font-weight: inherit;
    font-size: inherit;
  }
`;

export const ButtonContainer = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-between;
`;

export const LoginWith = styled.h5`
  cursor: pointer;
`;

export const HorizontalRule = styled.hr`
  width: 75%;
  height: 0.3rem;
  border-radius: 0.8rem;
  border: none;
  background: linear-gradient(to right, #14163c 0%, #03217b 79%);
  background-color: #ebd0d0;
  margin: 4rem 0 0;
  backdrop-filter: blur(25px);
`;
export const SubmitButton = styled.button`
  background: linear-gradient(to right, #14163c 0%, #03217b 79%);
  cursor: pointer;
  padding: 0.75rem 3.5rem;
  font-size: 1rem;
  color: #fff;
  text-transform: capitalize;
  border: none;
  border-radius: 2rem;
  box-shadow: 0 0 1rem rgb(0 0 0 / 50%);
`;
export const CloseButton = styled.button`
  background: linear-gradient(to right, #dc4b4b 0%, #7b2d03 79%);
  cursor: pointer;
  padding: 0.75rem 3.5rem;
  font-size: 1rem;
  color: #fff;
  text-transform: capitalize;
  border: none;
  border-radius: 2rem;
  box-shadow: 0 0 1rem rgb(0 0 0 / 50%);
`;