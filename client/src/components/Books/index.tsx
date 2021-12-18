import React from 'react'
import { useGetBooksQuery, Book } from "generated/graphql";
import styled from "styled-components";
import Dashboard from "components/Dashboard";
import {
  PostCard,
  CardTitle,
  CardBody,
  CardImage,
  CardDescription,
  CardBottom,
  ApplyButton,
  PageHeading,
  PageWrapper,
} from "../../styles/common.styles";
import { ErrorMsg } from 'components/Input';


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
      <Dashboard>
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
                  <CardBody>
                    <CardTitle>{book.title}</CardTitle>
                    <CardDescription>{book.description}</CardDescription>
                    <CardBottom>
                      <BookAuthor>{book.author}</BookAuthor>
                      <ApplyButton>Buy</ApplyButton>
                    </CardBottom>
                  </CardBody>
                </PostCard>
              )
            )
          )}
        </PageWrapper>
      </Dashboard>
    </>
  );
}

export default BooksPage

export const BookAuthor = styled.span`
  font-size: 1rem;
  color: #a2a2c2;
  font-weight: 600;
  @media (max-width: 991px) {
    font-size: 0.75rem;
  }
`;