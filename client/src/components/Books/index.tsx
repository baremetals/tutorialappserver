import React from 'react'
import { useGetBooksQuery, Book } from "generated/graphql";
import styled from "styled-components";
import LeftSideBar from '../Dashboard/LeftSideBar'
import SmallFooter from '../Dashboard/SmallFooter'
import TopBar from '../Dashboard/TopBar'
import {
  PageContainer,
  InnerContainer,
  PageRightSide,
  PageHeading,
  PageWrapper,
  PostCard,
  CardTitle,
  CardImage,
  CardDescription,
  CardBottom,
  ApplyButton,
} from "../../styles/common.styles";
import { ErrorMsg } from 'components/Input';


// type BookPageType = {
//   title: string;
//   image: string;
//   description: string;
//   author: string;
//   link: string;
// };

function BooksPage() {
  const { data, loading, error } = useGetBooksQuery();
  if (!data || loading) {
    return <div>loading...</div>;
  }
  if (error) return <ErrorMsg>{error}</ErrorMsg>;
  const bk: any = data?.getBooks 
  const books   = bk.books
  // console.log(bk); 

  return (
    <>
      <TopBar />
      <PageContainer>
        <LeftSideBar />
        <InnerContainer>
          <PageHeading>Recommended Books</PageHeading>
          <PageWrapper>
            {!books ? (
              <div>loading...</div>
            ) : (
              books.map((book: Book, id: string) =>
                !book ? null : (
                  <PostCard key={id}>
                    <a href={book.link}>
                      <CardImage alt="course image" src={book.image} />
                    </a>
                    <CardTitle>{book.title}</CardTitle>
                    <CardDescription>{book.description}</CardDescription>
                    <CardBottom>
                      <BookAuthor>{book.author}</BookAuthor>
                      <ApplyButton>Buy</ApplyButton>
                    </CardBottom>
                  </PostCard>
                )
              )
            )}
          </PageWrapper>
        </InnerContainer>
        <PageRightSide>Live Forever Young</PageRightSide>
      </PageContainer>
      <SmallFooter />
    </>
  );
}

export default BooksPage

export const BookAuthor = styled.span`
  font-size: 0.875rem;
  font-weight: bold;
  color: #125c55;
  display: block;
  margin-bottom: 1rem;
`;