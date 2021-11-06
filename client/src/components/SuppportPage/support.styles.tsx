import styled from "styled-components";


export const SupportCardWrapper = styled.div`
  padding: 5px;
  align-items: center;
  justify-content: space-between;
`;

export const FAQTitle = styled.p`
  font-size: 20px;
  font-weight: 500;
  margin: 0 10px;
  padding-top: 20px;
`;

export const TextWrap = styled.div`
  margin: 10px 10px;
`;

export const ContactCardWrap = styled.div`
  padding-top: 20px;
`;

export const ContactCard = styled.div`
  display: flex;
  padding-top: 10px;
  margin: 10px 10px;
  /* background: #812b2b; */
  border-radius: 5px;
  border-style: solid #000000;
`;

export const FormWrap = styled.form`
  /* height: 100%; */
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (max-width: 400px) {
    height: 80%;
  }
`;

export const SupportMainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 60px;
  width: 30vw;

  /* box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px; */
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
    height: 80vh;
    h4 {
      font-size: small;
    }
  }

  @media only screen and (min-width: 411px) {
    width: 80vw;
    height: 70vh;
  }
  @media only screen and (min-width: 768px) {
    width: 80vw;
    height: 60vh;
  }
  @media only screen and (min-width: 1024px) {
    width: 70vw;
    height: 70vh;
  }
  @media only screen and (min-width: 1280px) {
    width: 30vw;
    height: 80vh;
  }
`;

export const SupportInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 25%;
  width: 100%;
  margin: 25px;
  grid-gap: 10px;
`;

export const SupportButtonContainer = styled.div`
  margin: 1rem 0 2rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SupportInput = styled.input`
  /* box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37); */
  border-radius: .5rem;
  width: 80%;
  height: 1rem;
  padding: 1rem;
  border: 1px solid rgba(31, 38, 135, 0.5);
  outline: none;
  color: #3c354e;
  font-size: 1rem;
  font-weight: bold;
  &:focus {
    display: inline-block;
    /* box-shadow: 0 0 0 0.2rem #b9abe0; */
    backdrop-filter: blur(12rem);
    border-radius: .5rem;
  }
  &::placeholder {
    color: #3c1a9899;
    font-weight: 100;
    font-size: 1rem;
  }
`;

export const SupportTextArea = styled.textarea`
  /* box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37); */
  border-radius: 0.5rem;
  border: 1px solid rgba(31, 38, 135, 0.5);
  width: 80%;
  height: 90px;
  padding: 1rem;
  outline: none;
  color: #3c354e;
  font-size: 1rem;
  font-weight: bold;
  &:focus {
    display: inline-block;
    /* box-shadow: 0 0 0 0.2rem #b9abe0; */
    backdrop-filter: blur(12rem);
    border-radius: .5rem;
  }
  &::placeholder {
    color: #3c1a9899;
    font-weight: 100;
    font-size: 1rem;
  }
`;