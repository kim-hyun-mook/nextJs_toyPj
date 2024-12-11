// app/post/page.tsx
'use client'; // 클라이언트 컴포넌트

import { useRouter } from 'next/navigation';

export default function PostList() {
  const router = useRouter();

  const posts = [
    { id: 1, title: 'First Post' },
    { id: 2, title: 'Second Post' },
  ];

  return (
    <div>
      <h2>Post List</h2>
      <ul>
        {posts.map((post) => (
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
