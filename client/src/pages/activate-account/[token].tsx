import React, { useEffect } from "react";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
} from "next";
import styled from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {client} from "../_app";

// for data fetching
import { ErrorMsg } from "components/Input";
import {
  ActivateAccountDocument,
  ActivateAccountMutationOptions,
} from "generated/graphql";
import { withApollo } from "utils/withApollo";


const ActivateAccount = (props: any) => {
  const router = useRouter();
  const response = props;
  const res = response.data.activateAccount;

  useEffect(() => {
    if (res == "Your account is now confirmed.") {
      console.log(response.data);
      toast.success(response.data?.activateAccount);
      setTimeout(() => {
        router.push("/signin");
      }, 5000);
    } else {
      setTimeout(() => {
        toast.error(response.data?.activateAccount);
      }, 5000);
    }
  }, []);

  return (
    <Container>
      {res !== "Your account is now confirmed." ? (
        <ErrorMsg>{res}</ErrorMsg>
      ) : (
        <div>
          Thanks for registering an account please{" "}
          <Link href="/signin">login</Link> to access your account
        </div>
      )}
      <ToastContainer />
    </Container>
  );
};
export const getServerSideProps: GetServerSideProps = async({ query: { token } }: GetServerSidePropsContext) =>{
  const { data } = await client.mutate<ActivateAccountMutationOptions>({
    mutation: ActivateAccountDocument,
    variables: {
      token: token,
    },
  });
  return {
    props:  { data }, // will be passed to the page component as props
    // redirect: {
    //   permanent: false,
    //   destination: "/signin"
    // }
  };
}
const Container = styled.div``;

export default withApollo({ ssr: false })(ActivateAccount);



