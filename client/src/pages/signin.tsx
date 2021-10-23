import React from "react";

import Login from "../components/Auth/Login";
import { withApollo } from "../utils/withApollo";



function SignIn() {
  
  return (
    <>
     <Login></Login> 
    </>
  );
}

// export default SignIn;

export default withApollo({ ssr: false })(SignIn);