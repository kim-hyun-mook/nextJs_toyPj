'use client';

import { useRouter } from 'next/navigation';
import usePostStore from '../store/zustand';
export default function PostList() {
  const router = useRouter();
  const postList = usePostStore((state) => state.postList);

  
  if (postList.length === 0) {
    return <div>Loading posts...</div>;
  }

  return (
    <div>
      <h2>Post List</h2>
      <ul>
        {postList.map((post) => (
          <li key={post.id}>
            <span>{post.title}</span>
            <button onClick={() => router.push(`/post/${post.id}`)}>
              View Details
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
