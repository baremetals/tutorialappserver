import React, { useState } from 'react'
import Link from "next/link";
import { useRouter } from 'next/router';
import { Formik } from "formik";
import { getLoginValidationSchema } from "utils/formValidation";
import { useLoginMutation } from "generated/graphql";


// Redux imports
import { useAppDispatch } from "app/hooks";
import { setSuccess, setError } from "features/ui/reducers";


// Design imports
import { Input, Error, ErrorMsg } from "../../Input";
import Button from '../Button';
import {
  MainContainer,
  WelcomeText,
  InputContainer,
  ButtonContainer,
  LoginWith,
  HorizontalRule,
  ForgotPassword,
  PageContainer,
  FormWrap,
} from "../auth-styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FooterLinkContainer } from "components/Footer/styles";



const initialValues = {
  usernameOrEmail: "",
  password: "",
  error: "",
};

const Login = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [login] = useLoginMutation();
  const [errorMsg, setErrorMsg] = useState(false);
  let err: any;
  


  const handleSubmit = async ({ ...values }: any) => {

    try {
      const response = await login({
        variables: {
          ...values,
        },
      });
      if (!response.data?.login) {
        err = response.data?.login;
        initialValues.error = err;
        setErrorMsg(true);
        dispatch(setError(response.data?.login));
      } else {
        dispatch(setSuccess(response.data?.login));
        const me = response.data?.login;
        toast.success("login successful");
        setTimeout(() => {
          router.push(`/user-profile/${me}`);
        }, 800);
      }
    } catch (ex) {
      console.log(ex);
      throw ex;
    }
  };
  return (
    <>
      <PageContainer>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={getLoginValidationSchema}
        >
          {({ isSubmitting, errors, touched }) => (
            <FormWrap>
              <MainContainer>
                <WelcomeText>login</WelcomeText>
                {errorMsg && <ErrorMsg>{initialValues.error}</ErrorMsg>}
                <InputContainer>
                  <div className="form-group">
                    <Input
                      type="text"
                      placeholder="Username or Email"
                      name="usernameOrEmail"
                    />
                    {errors.usernameOrEmail && touched.usernameOrEmail && (
                      <Error>{errors.usernameOrEmail}</Error>
                    )}
                  </div>
                  <div className="form-group">
                    <Input
                      type="password"
                      placeholder="Password"
                      name="password"
                    />
                    {errors.password && touched.password && (
                      <Error>{errors.password}</Error>
                    )}
                  </div>
                </InputContainer>
                <ButtonContainer>
                  <Button
                    type="submit"
                    content="Sign in"
                    disabled={isSubmitting}
                  />
                </ButtonContainer>
                <HorizontalRule />
                <FooterLinkContainer className="d-flex">
                  <Link href="/signup">
                    <LoginWith>Register </LoginWith>
                  </Link>
                  &nbsp;&nbsp;|&nbsp;&nbsp;
                  <Link href="/forgot-password">
                    <ForgotPassword>forgot password?</ForgotPassword>
                  </Link>
                </FooterLinkContainer>
              </MainContainer>
            </FormWrap>
          )}
        </Formik>
      </PageContainer>
      <ToastContainer />
    </>
  );
}

export default Login
