'use client';

import { useRouter } from 'next/navigation';
import { useFetchPosts } from './hooks/useFetchPosts';
import usePostStore from './store/zustand';
import { ListStyle, Title } from './styles/ListDetailStyles';
import Button from './components/Button';
import { useSyncPosts } from './hooks/useSyncPosts';

export default function PostListPage() {
  const { data: posts, isLoading, error } = useFetchPosts();
  const postList = usePostStore((state) => state.postList);
  const deletePost = usePostStore((state) => state.deletePost);
  const router = useRouter();

 
  useSyncPosts(posts);

  const handleDelete = (id: number) => {
    console.log('Deleting post with ID:', id);
    deletePost(id);
  };

  if (isLoading) {
    return <p>Loading posts...</p>;
  }

  if (error) {
    return <p>Error fetching posts.</p>;
  }

  console.log('Rendered Post List:', postList);

  return (
    <div>
      <Title>Post List</Title>
      <ListStyle>
        {postList.map((post) => (
          <li key={post.id}>
            <span>{post.title}</span>
            <Button
              color="primary"
              variant="solid"
              onClick={() => router.push(`/post/${post.id}`)}
            >
              자세히 보기
            </Button>
            <Button isCloseBtn onClick={() => handleDelete(post.id)} />
          </li>
        ))}
      </ListStyle>
    </div>
  );
}
