import React, { useEffect, useState } from "react";
import Share from "../Dashboard/Share";
import styled from "styled-components";
import { useCategoryQuery } from "generated/graphql";



import {
  PageHeading,
  ForumRow,
  ForumFilter,
  ForumFilterSortBy,
  SelectCategory,
  CategoryOption,
  FilterSearch,
} from "../../styles/common.styles";
import Card from "./Card";
import Dashboard from 'components/Dashboard';


const ForumPage = ({ ...props }: any) => {
  
  const { data } = useCategoryQuery();

  const postData = props.props;
  const categories = data?.getAllCategories;
  const [filteredcategories, setFilteredcategories] = useState([]);
  const [values, setValues] = useState({
    category: "",
    search: "",
  });
  // console.log(postData);

  useEffect(() => {
    setFilteredcategories(postData);
  }, [postData]);

  const handleCategorySearch =
    (name: string) => (event: { target: { value: any } }) => {
      setValues({ ...values, [name]: event.target.value });
      // console.log(event.target.value);
      const categoryName = event.target.value;
      if (categoryName !== "" || null || undefined) {
        const filteredData = postData.filter((post: any) => {
          return post.category.name == categoryName;
          // return cat.vote_average == ratings;
        });
        setFilteredcategories(filteredData);
      } else setFilteredcategories(postData);
    };

  const handleSearch =
    (name: string) => (event: { target: { value: string } }) => {
      setValues({ ...values, [name]: event.target.value });
      // console.log(event.target.value);
      const searchValue = event.target.value;
      if (searchValue !== "") {
        const filteredData = postData.filter((post: string) => {
          return Object.values(post)
            .join(" ")
            .toLowerCase()
            .includes(searchValue.toLowerCase());
        });
        setFilteredcategories(filteredData);
      } else setFilteredcategories(postData);
    };
  return (
    <Dashboard>
      <PageHeading>Forum</PageHeading>
      <Share />
      <ForumRow>
        <ForumFilter>
          <ForumFilterSortBy>
            <SelectCategory onChange={handleCategorySearch("category")}>
              <CategoryOption value={values.category}>
                Category Search
              </CategoryOption>
              {categories?.map((c: { name: string; id: string }) => (
                <CategoryOption key={c.id} value={c.name}>
                  {c.name}
                </CategoryOption>
              ))}
            </SelectCategory>
          </ForumFilterSortBy>
          <FilterSearch
            type="text"
            name="search"
            onChange={handleSearch("category")}
            placeholder="Search"
          ></FilterSearch>
        </ForumFilter>
        {!filteredcategories ? (
          <div>loading...</div>
        ) : (
          filteredcategories.map((post: any, id) =>
            !post ? null : (
              <ForumContainer key={id}>
                <Card
                  username={post.creator.username}
                  userIdSlug={post.creator.userIdSlug}
                  image={post.creator.profileImage}
                  date={post.createdOn}
                  title={post.title}
                  body={post.category.name}
                  likeCount={post.points}
                  commentCount={12}
                  slug={post.slug}
                />
              </ForumContainer>
            )
          )
        )}
      </ForumRow>
    </Dashboard>
  );
};

export default ForumPage;

export const ForumContainer = styled.div`
  width: 33.33%;
  padding: 0.75rem;
  @media (max-width: 1366px) {
    width: 50%;
  }
  @media (max-width: 575px) {
    width: 100%;
    padding: 0.5rem;
  }
`;
