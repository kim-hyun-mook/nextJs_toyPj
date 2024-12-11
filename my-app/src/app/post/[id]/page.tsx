'use client'; // 클라이언트 컴포넌트

import { useRouter, useParams } from 'next/navigation';
import { useFetchPostById } from '../../hooks/useFetchPosts'; 
import { DetailStyle, DetailTitle } from '../../styles/ListDetailStyles';
import { useSyncSelectedPost } from '../../hooks/useSyncPosts';
import usePostStore from '../../store/zustand';

const PostDetail: React.FC = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>(); // Next.js에서 동적 라우팅의 id를 받아옴

  // Zustand 상태
  const postList = usePostStore((state) => state.postList); // 전체 게시글 목록
  const selectedPostIndex = usePostStore((state) => state.selectedPostIndex); // 선택된 게시글 인덱스

  // React Query를 사용해 데이터 fetching
  const { data: post, isLoading, error } = useFetchPostById(id as string);

  // 상태 동기화
  useSyncSelectedPost(post, postList, id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error instanceof Error ? error.message : 'Unknown error'}</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  // 선택된 게시글의 인덱스를 state에서 가져와서 출력
  const indexMessage =
    selectedPostIndex !== null
      ? `${selectedPostIndex + 1}번째 리스트 게시글`
      : '인덱스 정보를 찾을 수 없습니다.';

  return (
    <DetailStyle>
      <DetailTitle>Post Detail</DetailTitle>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p><span>Post ID:</span>{id}</p>
      <p>{indexMessage}</p>
    </DetailStyle>
  );
};

export default PostDetail;
