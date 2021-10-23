import React from "react";
import PasswordReset from "components/Auth/PasswordReset";
import { withApollo } from "utils/withApollo";

const ResetPassword = () => {
  return (
    <>
      <PasswordReset />
    </>
  );
};

export default withApollo({ ssr: false })(ResetPassword);
