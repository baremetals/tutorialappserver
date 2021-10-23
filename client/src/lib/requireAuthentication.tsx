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
      const tokens = Object.keys(accessToken)
      const token = tokens[0]
      if (token !== "maguyvathegreat") {
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
