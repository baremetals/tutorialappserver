import { useMeQuery, User } from "../generated/graphql";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppDispatch } from "app/hooks";
import { setUser } from "features/auth";


export const useNoAuth = () => {
  const { data, loading } = useMeQuery();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !data?.me.messages) {
      const me = data?.me as User;
      router.push(`/user-profile/${me.userIdSlug}`);
    } 
  }, [loading, data, router]);
};

export const useNoAuthPages = () => {
  const { data, loading } = useMeQuery();
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    if (loading && !data?.me.messages) {
      router.push(router.pathname);
    }

    if (!loading && !data?.me.messages ) {
      const me = data?.me as User;
      dispatch(setUser(me));
    }
    
  }, [loading, data]);
};