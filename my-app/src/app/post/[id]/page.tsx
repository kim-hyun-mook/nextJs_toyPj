// app/post/[id]/page.tsx

'use client'; // 클라이언트 컴포넌트

import { useRouter, useParams } from 'next/navigation';
import { useEffect } from 'react';
import usePostStore from '../../store/zustand'; // zustand store 임포트
import { useFetchPostById } from '../../hooks/useFetchPosts'; // React Query 훅
import { DetailStyle } from '../../styles/ListDetailStyles';



const PostDetail: React.FC = () => {
  const router = useRouter();
  const { id } = useParams(); // Next.js에서 동적 라우팅의 id를 받아옴

  // Zustand 상태
  const postList = usePostStore((state) => state.postList); // 전체 게시글 목록
  const setSelectedPost = usePostStore((state) => state.setSelectedPost);
  const setSelectedPostIndex = usePostStore((state) => state.setSelectedPostIndex);

  // React Query를 사용해 데이터 fetching
  const { data: post, isLoading, error } = useFetchPostById(id as string);

  // Zustand 상태 업데이트
  useEffect(() => {
    if (post && id) {
      setSelectedPost({
        ...post,
        content: post.content || '', // content가 undefined일 경우 빈 문자열로 처리
      });

      // 선택된 게시글의 인덱스를 postList에서 찾아 저장
      const index = postList.findIndex((item) => item.id === parseInt(id as string));
      setSelectedPostIndex(index >= 0 ? index : null);
    }
  }, [post, id, postList, setSelectedPost, setSelectedPostIndex]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error instanceof Error ? error.message : 'Unknown error'}</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  // 몇 번째 게시글인지 출력하는 메시지
  const indexMessage =
    postList.findIndex((item) => item.id === post.id) !== -1
      ? `${postList.findIndex((item) => item.id === post.id) + 1}번째 리스트 게시글`
      : 'Error';

  return (
    <DetailStyle>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>Post ID: {id}</p>
      <p>{indexMessage}</p>
    </DetailStyle>
  );
};


export default PostDetail;

