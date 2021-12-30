
import { useIsAuth } from 'lib/isAuth';
import React, { useEffect, useState } from "react";

import {
  FacebookShareCount,
  HatenaShareCount,
  OKShareCount,
  PinterestShareCount,
  RedditShareCount,
  TumblrShareCount,
  VKShareCount,
} from "react-share";


const form = () => {
  useIsAuth();

  return (
    <>
      {/* <ErrorPage statusCode={500} /> */}
      {/* <Converse /> */}
    </>
  );
};

export default form;
