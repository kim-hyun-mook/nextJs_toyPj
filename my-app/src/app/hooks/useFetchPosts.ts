import { useQuery } from "react-query";

export interface Post {
  id: number;
  title: string;
  content?: string;
}

export const useFetchPosts = () => {
  return useQuery<Post[]>("posts", async () => {
    const response = await fetch("https://koreanjson.com/posts");
    if (!response.ok) {
      throw new Error("Error");
    }
    return response.json();
  });
};

export const useFetchPostById = (id: string) => {
  return useQuery<Post>(
    ["post", id],
    async () => {
      const response = await fetch(`https://koreanjson.com/posts/${id}`);
      if (!response.ok) {
        throw new Error("Error");
      }
      const data = await response.json();
      return {
        ...data,
        content: data.content || "", // content가 undefined일 경우 빈 문자열로 처리
      };
    },
    {
      enabled: !!id, // id가 존재할 때만 요청
    }
  );
};
