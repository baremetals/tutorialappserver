import React from "react";
import Register from "../components/Auth/Register";
import { withApollo } from "../utils/withApollo";
import { useNoAuth } from "lib/noAuth";


function SignUp() {
  useNoAuth();
  return (
    <>
      <Register></Register>
    </>
  );
}

export default withApollo({ ssr: false })(SignUp);