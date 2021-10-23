import React from 'react'
import ChangePassword from '../components/Auth/ChangePassword';
import { withApollo } from "../utils/withApollo";

function ForgotPassword() {
    return (<ChangePassword></ChangePassword>);
}

export default withApollo({ ssr: false })(ForgotPassword);
// export default ForgotPassword;