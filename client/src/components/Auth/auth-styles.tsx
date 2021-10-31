import { Form } from "formik";
import styled from "styled-components";

export const PageContainer = styled.div`
  background-color: #000;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: auto;
  &:before {
    content: "";
    background-image: url(https://images.unsplash.com/photo-1469981283837-561b3779462f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80);
    background-size: cover;
    background-position: center center;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    filter: blur(5px);
    opacity: 0.5;
  }
`;

export const FormWrap = styled(Form)`
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin: 5rem 0;
`;

export const MainContainer = styled.div`
  width: 100%;
  max-width: 550px;
  margin-left: auto;
  margin-right: auto;
  background-color: rgb(0 0 0 / 50%);
  box-shadow: 1px 1px 10px rgb(0 0 0);
  padding: 4rem;
  border-radius: 0;
  // backdrop-filter: blur(.25rem);
  z-index: 10;
  h4,
  h5 {
    font-size: 1rem;
  }
  @media screen and (max-width: 400px) {
    padding: 2rem;
  }
`;

export const WelcomeText = styled.h2`
  color: #fff;
  font-size: 2.5rem;
  text-transform: capitalize;
  margin-bottom: 3.5rem;
  text-align: center;
  span {
    display: inline-block;
    margin: 0 2rem;
    padding-bottom: 1rem;
    &.active {
      border-bottom: 5px solid rgb(255 255 255 / 50%);
    }
  }
  a {
    color: #fff;
    display: inline-block;
    text-decoration: none;
  }
`;

export const InputContainer = styled.div`
  margin-bottom: 1.5rem;
  input {
    height: 3.5rem;
    padding: 1rem 2rem;
    border: 1px solid rgb(255 255 255 / 25%);
    background-color: transparent;
    border-radius: 2rem !important;
    box-shadow: none !important;
    outline: none;
    color: #fff;
    font-size: 1.125rem;
    width: 100%;
    margin-bottom: 0;
    font-weight: 500;
    &::placeholder {
      color: inherit;
      opacity: 1;
      font-weight: inherit;
      font-size: inherit;
    }
  }
  span {
    color: red;
    font-size: 0.875rem;
    font-weight: 600;
    display: block;
    margin-bottom: 0rem;
    text-transform: capitalize;
  }
`;

export const ButtonContainer = styled.div`
  margin-bottom: 1.5rem;
  button {
    height: 3.5rem;
    border: none;
    color: white;
    border-radius: 2rem;
    cursor: pointer;
    box-shadow: 0 0 10px rgb(255 255 255 / 30%);
    background-color: transparent;
    font-size: 1.125rem;
    width: 100%;
    padding: 0.5rem;
    font-weight: 500;
    text-transform: none;
    letter-spacing: 0;
  }
`;

export const FooterLinkContainer = styled.div`
  padding-top: 0;
`;

export const HorizontalRule = styled.hr`
  width: 60%;
  height: 3px;
  border-radius: 1rem;
  border: none;
  background-color: rgb(255 255 255 / 20%);
  margin: 1.5rem auto;
`;

export const IconsContainer = styled.div`
  display: flex;
  width: 100%;
`;

export const LoginWith = styled.h5`
  cursor: pointer;
  color: white;
  text-align: center;
`;

export const ForgotPassword = styled.h4`
  cursor: pointer;
  color: white;
`;
export const Terms = styled.h5`
  color: #fff;
  text-align: center;
  a {
    color: #fff;
  }
`;

export const BackToLogin = styled.h4`
  cursor: pointer;
  color: #fff;
  text-align: center;
`;
