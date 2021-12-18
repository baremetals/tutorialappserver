
import React from "react";
import Login from "../components/Auth/Login";
import { useNoAuth } from "lib/noAuth";
import { withApollo } from "../utils/withApollo";


function SignIn() {
  useNoAuth()
  return (
    <>
      <Login />
    </>
  );
}

export default withApollo({ ssr: false })(SignIn);