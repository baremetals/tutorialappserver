import styled from "styled-components";

export const BooksH1 = styled.h1`
  font-size: 2.5rem;
  color: #655e5e;
  margin-bottom: 34px;

  @media screen and (max-width: 480px) {
    font-size: 2rem;
  }
`;

export const BooksWrapper = styled.div`
  align-items: center;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 16px;

  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0 20px;
  }
`;

export const BooksCard = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px;
  max-height: 440px;
  padding: 30px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }
`;

export const BookTitle = styled.h2`
  font-size: 1rem;
  margin-bottom: 10px;
`;

export const BookImage = styled.img`
  height: 120px;
  width: 120px;
  margin-bottom: 10px;
`;

export const BookDescription = styled.p`
  font-size: 1rem;
  text-align: center;
`;

export const BookBottom = styled.div`
  align-items: center;
  padding-top: 10px;
`;
export const BookAuthor = styled.span`
  font-size: 0.8rem;
  font-weight: bold;
  color: #125c55;
  margin-right: 4.5rem;
`;

export const BuyButton = styled.button`
  background: #256ce1;
  color: #fff;
  font-size: 14px;
  border-radius: 4px;
  padding: 5px 11px;
  border: none;
  outline: none;
  cursor: pointer;
  margin-left: auto;
`;