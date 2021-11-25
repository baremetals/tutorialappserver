import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  @media (max-width: 991px) {
    flex-direction: column;
  }
`;

export const ForumRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -0.5rem;
  margin-right: -0.5rem;
`;

export const ForumColumn = styled.div`
  width: 33.33%;
  padding: 0.5rem;
  @media (max-width: 1365px) {
    width: 50%;
  }
  @media (max-width: 767px) {
    width: 100%;
  }
`;

export const ForumFilter = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  min-width: 100%;
  width: 100%;
  padding: 0.5rem;
`;

export const ForumFilterSortBy = styled.div`
  margin: 0.25rem 0;
  position: relative;
  &:after {
    content: "";
    position: absolute;
    top: calc(50% - 0.25rem);
    right: 1rem;
    border-bottom: 0.1rem solid #000;
    border-right: 0.1rem solid #000;
    width: 0.4rem;
    height: 0.4rem;
    transform: rotate(45deg);
    pointer-events: none;
  }
`;

export const FilterSearch = styled.input`
  width: 15rem;
  background-color: #e9e9e9;
  display: flex;
  align-items: center;
  border-radius: 2rem;
  height: 2.5rem;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  margin: 0.25rem 0;
  outline: none !important;
  @media (max-width: 767px) {
    width: 100%;
  }
`;

export const SelectCategory = styled.select`
  appearance: none;
  width: 10rem;
  background-color: #e9e9e9;
  display: flex;
  align-items: center;
  border-radius: 2rem;
  height: 2.5rem;
  outline: none !important;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
`;

export const CategoryOption = styled.option``;

export const InnerContainer = styled.div`
  flex: 1 0 0%;
  padding: 2.5rem;
  @media (max-width: 991px) {
    padding: 1rem 1.5rem 2rem;
  }
`;

export const PageHeading = styled.h1`
  color: #000;
  font-size: 2rem;
  margin-bottom: 2rem;
  line-height: 1;
  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

export const PageWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: -0.5rem;
  > div {
    margin: 0.5rem;
    @media (min-width: 1441px) {
      width: 16rem;
    }
    @media (max-width: 1440px) {
      width: calc(33.33% - 1rem);
    }
    @media (max-width: 1199px) {
      width: calc(50% - 1rem);
    }
    @media (max-width: 991px) {
      width: calc(33.33% - 1rem);
    }
    @media (max-width: 767px) {
      width: calc(50% - 1rem);
    }
    @media (max-width: 575px) {
      width: calc(100% - 1rem);
    }
  }
`;

export const PostCard = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease-in-out;

  &:hover {
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }
`;

export const CardTitle = styled.h2`
  font-size: 1rem;
  margin-bottom: 1rem;
  text-align: center;
`;
export const CardImage = styled.img`
  height: 8rem;
  width: 8rem;
  margin-bottom: 1rem;
`;
export const CardDescription = styled.p`
  font-size: 0.875rem;
  text-align: center;
  margin-bottom: 1rem;
`;

export const CardDuration = styled.span`
  font-size: 0.875rem;
  color: #5bb3aa;
`;

export const CardBottom = styled.div`
  margin-top: 0;
  text-align: center;
`;
export const CardStartDate = styled.span`
  font-size: 0.875rem;
  font-weight: bold;
  color: #125c55;
  display: block;
  margin-bottom: 1rem;
`;

export const ApplyButton = styled.button`
  background-color: #256ce1;
  color: #fff;
  font-size: 0.875rem;
  border-radius: 0.25rem;
  padding: 0.625rem 1.5rem;
  border: none;
  cursor: pointer;
  line-height: 1;
  text-transform: uppercase;
  font-weight: bold;
`;

export const PageRightSide = styled.div`
  max-width: 20rem;
  min-width: 20rem;
  padding: 2rem;
  @media (max-width: 1366px) {
    max-width: 18rem;
    min-width: 18rem;
  }
  @media (max-width: 991px) {
    display: none;
    padding: 2rem 1.5rem;
  }
`;
