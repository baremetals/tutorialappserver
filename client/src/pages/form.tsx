import Converse from 'components/Conversation/Converse';
import Topbar from 'components/Dashboard/TopBar';
import { useIsAuth } from 'lib/isAuth';
import React, { useEffect, useState } from "react";


const form = () => {
  useIsAuth();

  return (
    <>
      <Topbar />
      {/* <Converse /> */}
    </>
  );
};

export default form;
