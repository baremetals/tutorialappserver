import cookie from "cookie";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

export function requireAuthentication(gssp: GetServerSideProps) {
  return async (ctx: GetServerSidePropsContext) => {
    const { req } = ctx;

    if (!req.headers.cookie) {
      return {
        redirect: {
          permanent: false,
          destination: "/signin",
        },
      };
    } else {
      const accessToken = cookie.parse(req.headers.cookie);
      // console.log(accessToken);
      const tokens = Object.keys(accessToken).includes("maguyvathegreat");
      console.log(tokens);
      const token = tokens
      if (!token) {
        return {
          redirect: {
            permanent: false,
            destination: "/signin",
          },
        };
      }
    }
    return await gssp(ctx);
  };
}
