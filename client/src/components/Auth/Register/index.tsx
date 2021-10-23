import React, { useState } from "react";

import {
  useRegisterMutation,
} from "../../../generated/graphql";
import { useRouter } from "next/router";
import Link from "next/link";
import { Formik} from "formik";
import Button from "../Button";
import { Input, Error, ErrorMsg } from "../../Input";
import { getRegisterValidationSchema } from "../../../utils/formValidation";
import AuthModal from "../../Modal"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialValues = {
  email: "",
  username: "",
  fullName: "",
  password: "",
  error: "",
};

import {
  MainContainer,
  WelcomeText,
  InputContainer,
  ButtonContainer,
  LoginWith,
  HorizontalRule,
  Terms,
  PageContainer,
  FormWrap,
} from "./styles";


const Register = () => {
  const [errorMsg, setErrorMsg] = useState(false);
  let err: any;
  const router = useRouter();

  const [register] = useRegisterMutation();
  
  const handleSubmit = async ({ ...values }: any) => {
    try {
      const response = await register({
        variables: {
          ...values,
        },
      });
      if (response.data?.register !== "Registration successful.") { 
        err = response.data?.register;
        initialValues.error = err;
        setErrorMsg(true);
      } else {
        toast.success(response.data?.register);
        setTimeout(() => {
          router.push("/signin");
        }, 5000);
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <>
      <AuthModal isOpen={false}>{initialValues.error}</AuthModal>;
      <PageContainer>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={getRegisterValidationSchema}
        >
          {({ isSubmitting, errors, touched }) => (
            <FormWrap>
              <MainContainer>
                <WelcomeText>Register</WelcomeText>
                {errorMsg && <ErrorMsg>{initialValues.error}</ErrorMsg>}
                <InputContainer>
                  <Input type="text" placeholder="Full Name" name="fullName" />
                  {errors.fullName && touched.fullName && (
                    <Error>{errors.fullName}</Error>
                  )}
                  <Input
                    type="text"
                    placeholder="username"
                    name="username"
                    values="username"
                  />
                  {errors.username && touched.username && (
                    <Error>{errors.username}</Error>
                  )}
                  <Input type="email" placeholder="Email" name="email" />
                  {errors.email && touched.email && (
                    <Error>{errors.email}</Error>
                  )}
                  <Input
                    type="password"
                    placeholder="Password"
                    name="password"
                  />
                  {errors.password && touched.password && (
                    <Error>{errors.password}</Error>
                  )}
                </InputContainer>
                <ButtonContainer>
                  <Button
                    content="Sign Up"
                    type="submit"
                    disabled={isSubmitting}
                  />
                </ButtonContainer>
                <Link href="/signin">
                  <LoginWith>OR LOGIN </LoginWith>
                </Link>
                <HorizontalRule />
                <Terms>
                  By creating your account you agree to the{" "}
                  <Link href="/terms">terms</Link> and
                  <Link href="/privacy">privacy policy</Link>
                </Terms>
              </MainContainer>
            </FormWrap>
          )}
        </Formik>
      </PageContainer>
      <ToastContainer />
    </>
  );
};

export default Register;
