// api.ts
export const fetchPosts = async (): Promise<Post[]> => {
    const response = await fetch("https://koreanjson.com/posts");
    if (!response.ok) {
      throw new Error("Error fetching posts");
    }
    return response.json();
  };
  
  export const fetchPostById = async (id: string): Promise<Post> => {
    const response = await fetch(`https://koreanjson.com/posts/${id}`);
    if (!response.ok) {
      throw new Error("Error fetching post by id");
    }
    const data = await response.json();
    return {
      ...data,
      content: data.content || "",
    };
  };
  