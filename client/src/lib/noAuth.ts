import { useMeQuery, User } from "../generated/graphql";
import { useRouter } from "next/router";
import { useEffect } from "react";
// import { useAppSelector } from "app/hooks";
// import { authenticatedUser } from "features/auth/selectors";

export const useNoAuth = () => {
  const { data, loading } = useMeQuery();
  // const authenticated = useAppSelector(authenticatedUser);
  // console.log(data)
  const router = useRouter();
  useEffect(() => {

    // if (authenticated) {
    //   const me = data?.me as User;
    //   router.push(`/user-profile/${me.username}`);
    // } 
    if (!loading && !data?.me.messages) {
        const me = data?.me as User;
      router.push(`/user-profile/${me.username}`);
    } 
  }, [loading, data, router]);
};
