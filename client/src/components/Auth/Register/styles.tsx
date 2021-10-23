import styled from 'styled-components'
import { Form } from "formik";


export const PageContainer = styled.div`
align-items: center;
justify-content: center;
display: flex;
  min-height: 692px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  z-index: 0;
  overflow: hidden;
  background: linear-gradient(
    108deg,
    #696d6b 0%,
    #594463 100%
  );
`;

export const FormWrap = styled(Form)`
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
  /* height: 860px; */
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
    height: 90vh;
    hr {
      margin-bottom: 0.3rem;
    }
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 360px) {
    width: 80vw;
    height: 120vh;
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 411px) {
    width: 80vw;
    height: 87vh;
  }
  @media only screen and (min-width: 768px) {
    width: 80vw;
    height: 80vh;
  }
  @media only screen and (min-width: 1024px) {
    width: 70vw;
    height: 90vh;
  }
  @media only screen and (min-width: 1280px) {
    width: 30vw;
    height: 80vh;
  }
  @media only screen and (max-width: 600px) {
    width: 70vw;
    height: 97vh;
    margin-top: 35px;
  }
`;

export const WelcomeText = styled.h2`
  margin: 3rem 0 2rem 0;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 50%;
  width: 100%;
 
`;

export const ButtonContainer = styled.div`
  margin: 1rem 0 2rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoginWith = styled.h5`
  cursor: pointer;
`;

export const HorizontalRule = styled.hr`
  width: 90%;
  height: 0.3rem;
  border-radius: 0.8rem;
  border: none;
  background: linear-gradient(to right, #14163c 0%, #03217b 79%);
  background-color: #ebd0d0;
  margin: 1.5rem 0 1rem 0;
  backdrop-filter: blur(25px);
`;


export const Terms = styled.h5`
  max-width: 440px;
  margin-bottom: 35px;
  font-size: 12px;
  line-height: 24px;
  /* font-weight: 10rem; */
  cursor: pointer;

  @media only screen and (min-width: 360px) {
    max-width: 260px;
    font-size: 12px;
    line-height: 24px;
    overflow: scroll;
  }
  @media only screen and (min-width: 411px) {
    overflow: scroll;
  }
  @media only screen and (min-width: 768px) {
    max-width: 440px;
  }
  /* @media only screen and (m-width: 1024px) {
    overflow: scroll;
  } */
  @media only screen and (min-width: 1280px) {
    max-width: 340px;
    overflow: scroll;
  }
`;
