import styled from "styled-components";

export const Button = styled.button`
  background: linear-gradient(to right, #14163c 0%, #03217b 79%);
  cursor: pointer;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: #fff;
  text-transform: capitalize;
  border: none;
  width: 30%;
  border-radius: 0.5rem;
  box-shadow: 0 0 1rem rgb(0 0 0 / 50%);
`;

export const Input = styled.input`
  /* width: 15rem; */
  background-color: #e9e9e9;
  display: flex;
  align-items: center;
  border-radius: 0.5rem;
  height: 2rem;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0.25rem 0;
  outline: none !important;
  &:focus {
    display: inline-block;
    box-shadow: 0 0 0 0.2rem #b9abe0;
    backdrop-filter: blur(12rem);
    border-radius: 0.5rem;
    margin-top: 0.2rem;
  }
  @media (max-width: 767px) {
    width: 100%;
  }
  width: 70%;
`;

export const StyledInput = styled.input`
  background: #e9e9e9fd;
  box-shadow: 0 2px 8px 0 rgba(31, 38, 135, 0.37);
  border-radius: 0.5rem;
  width: 70%;
  height: 2rem;
  padding: 0.5rem 1rem;
  border: none;
  outline: none;
  font-size: 1rem;
  font-weight: 500;
  margin-top: 0.2rem;
  &:focus {
    display: inline-block;
    box-shadow: 0 0 0 0.2rem #b9abe0;
    backdrop-filter: blur(12rem);
    border-radius: 0.5rem;
    margin-top: 0.2rem;
  }
  &::placeholder {
    color: #a8a4b199;
    font-weight: 100;
    font-size: 1rem;
  }
  @media (max-width: 767px) {
    width: 100%;
  }
`;

export const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
  margin-bottom: 10px;
`;

export const BackGroundImage = styled.img`
  width: 100px;
  height: 60px;
  /* border-radius: 70%; */
  /* object-fit: cover; */
  src: url();
  margin-right: 10px;
  margin-bottom: 10px;
`;

export const HorizontalRule = styled.hr`
  width: 100%;
  height: 3px;
  border-radius: 1rem;
  border: none;
  background-color: rgb(31, 38, 135, 0.37);
  margin: 1.5rem auto;
`;

export const PageContentWrap = styled.div`
  align-items: center;
`;
