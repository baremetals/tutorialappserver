import { useMeQuery, User } from "../generated/graphql";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const useNoAuth = () => {
  const { data, loading } = useMeQuery();

  const router = useRouter();
  useEffect(() => {
    if (!loading && data?.me) {
        const me = data?.me as User;
      router.push(`/user-profile/${me.username}`);
    } 
  }, [loading, data, router]);
};
