import styled from "styled-components";
import { BsUpload } from "react-icons/bs";



export const Background = styled.div`
  width: 100%;
  height: 100%;
  min-height: 692px;
  background: linear-gradient(108deg, #fefefe 0%, #cac3ce 100%);
  /* background: rgba(0, 0, 0, 0.8); */
  /* position: fixed; */
  display: flex;
  justify-content: center;
  align-items: center;
`;


export const PageContainer = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  margin: 80px 670px;
  padding: 0px;
  /* min-height: 692px; */
  /* position: absolute; */
  /* bottom: 0;
  left: 0;
  right: 0;
  top: 0; */
  z-index: 0;
  overflow: hidden;
  background: linear-gradient(108deg, #04213f 0%, #f2f2f2 100%);
`;

export const FormWrap = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (max-width: 400px) {
    height: 80%;
  }
`;

export const MainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 30vw;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.4rem;
  @media only screen and (max-width: 320px) {
    width: 80vw;
    height: 40vh;
    hr {
      margin-bottom: 0.3rem;
    }
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 360px) {
    width: 80vw;
    height: 60vh;
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 411px) {
    width: 80vw;
    height: 57vh;
  }
  @media only screen and (min-width: 768px) {
    width: 80vw;
    height: 50vh;
  }
  @media only screen and (min-width: 1024px) {
    width: 70vw;
    height: 50vh;
  }
  @media only screen and (min-width: 1280px) {
    width: 30vw;
    height: 55vh;
  }
  @media only screen and (max-width: 600px) {
    width: 70vw;
    height: 57vh;
    margin-top: 35px;
  }
`;

export const CardText = styled.h2`
  margin: .5rem 0 2rem 0;
`;
export const CloseButtonWrap = styled.span`
  display: flex;
  margin: 8px;
  cursor: pointer;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 1.2em;
  justify-content: space-around;
  align-items: center;
  height: 40%;
  width: 100%;
  padding-top: 40px;
`;

export const TitleInput = styled.input`
  background: rgb(255, 255, 255);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border-radius: .2rem;
  width: 50%;
  height: 1rem;
  padding: 1rem;
  border: none;
  outline: none;
  color: #3c354e;
  font-size: 1rem;
  font-weight: bold;
  &:focus {
    display: inline-block;
    box-shadow: 0 0 0 0.2rem #b9abe0;
    backdrop-filter: blur(12rem);
    border-radius: .2rem;
  }
  &::placeholder {
    color: #3c1a9899;
    font-weight: 100;
    font-size: 1rem;
  }
`;
export const UploadWrapper = styled.div`
  width: 50%;
`;
export const UploadLabel = styled.label`
  
`;

export const UploadIcon = styled(BsUpload)``;

export const UploadInput = styled.input`
  background: rgb(255, 255, 255);
  border-radius: .2rem;
  width: 100%;
  padding: .5rem;
  font-size: 1rem;
  font-weight: bold;
  
    /* display: none; */
  &::placeholder {
    color: #3c1a9899;
    font-weight: 100;
    font-size: 1rem;
  }
`;

export const CategorySecetion = styled.select`
  background: rgb(255, 255, 255);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border-radius: .2rem;
  width: 50%;
  /* height: 2rem; */
  padding: .5rem;
  border: none;
  outline: none;
  color: #3c354e;
  font-size: 1rem;
  font-weight: bold;
  &:focus {
    display: inline-block;
    box-shadow: 0 0 0 0.2rem #b9abe0;
    backdrop-filter: blur(12rem);
    border-radius: .2rem;
  }
  &::placeholder {
    color: #3c1a9899;
    font-weight: 100;
    font-size: 1rem;
  }
`;

export const CategoryOptions = styled.option`
`;

export const BodyTextWrapper = styled.div``;

export const BodyText = styled.textarea`
  background: rgb(255, 255, 255);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border-radius: 0.2rem;
  width: 340px;
  height: 100px;
  padding: 10px;
  border: none;
  outline: none;
  color: #3c354e;
  font-size: 1rem;
  font-weight: bold;
  &:focus {
    display: inline-block;
    box-shadow: 0 0 0 0.2rem #b9abe0;
    backdrop-filter: blur(12rem);
    border-radius: 0.2rem;
  }
  &::placeholder {
    color: #3c1a9899;
    font-weight: 100;
    font-size: 1rem;
  }
`;

export const ButtonContainer = styled.div`
  margin: 7rem 0 2rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
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
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  width: 15%;
  height: 1.5rem;
  border: none;
  color: white;
  border-radius: .2rem;
  cursor: pointer;
`;
export const CloseButton = styled.button`
  background: linear-gradient(to right, #dc4b4b 0%, #7b2d03 79%);
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  width: 15%;
  height: 1.5rem;
  border: none;
  color: white;
  border-radius: .2rem;
  cursor: pointer;
  margin-right: 8rem;
`;