import React from "react";
import Register from "../components/Auth/Register";
import { withApollo } from "../utils/withApollo";


function SignUp() {

  return (
    <>
      <Register></Register>
    </>
  );
}

export default withApollo({ ssr: false })(SignUp);