// hooks.ts
import { useQuery } from "react-query";
import { fetchPosts, fetchPostById } from "../api/api";

export const useFetchPosts = () => {
  return useQuery<Post[]>("posts", fetchPosts);
};

export const useFetchPostById = (id: string) => {
  return useQuery<Post>(
    ["post", id],
    () => fetchPostById(id),
    {
      enabled: !!id, // Only fetch if id exists
    }
  );
};
