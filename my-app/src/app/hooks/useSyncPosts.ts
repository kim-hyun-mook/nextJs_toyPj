// hooks/useSyncPosts.ts
import { useEffect } from 'react';
import usePostStore from '../store/zustand';

export const useSyncPosts = (posts: Post[] | undefined) => {
  const setPostList = usePostStore((state) => state.setPostList);

  useEffect(() => {
    if (posts) {
      setPostList(posts);
    }
  }, [posts, setPostList]);

  
};


export const useSyncSelectedPost = (post: Post | undefined, postList: Post[], id: string | undefined) => {
    const setSelectedPost = usePostStore((state) => state.setSelectedPost);
    const setSelectedPostIndex = usePostStore((state) => state.setSelectedPostIndex);
  
    useEffect(() => {
      if (post && id) {
        setSelectedPost({
          ...post,
          content: post.content || '',
        });
  
        const index = postList.findIndex((item) => item.id === parseInt(id));
        setSelectedPostIndex(index >= 0 ? index : null);
      }
    }, [post, id, postList, setSelectedPost, setSelectedPostIndex]);
  };
