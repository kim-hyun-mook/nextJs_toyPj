'use client';  // 클라이언트 컴포넌트

import { create } from 'zustand';

// Post 타입 정의
export interface Post {
  id: number;
  title: string;
  content: string | undefined;
}

// Zustand 상태의 타입 정의
interface PostStore {
  postList: Post[]; // 게시글 목록
  selectedPost: Post | null; // 선택된 게시글
  selectedPostIndex: number | null; // 선택된 게시글의 인덱스
  setPostList: (posts: Post[]) => void; // 게시글 목록 설정
  setSelectedPost: (post: Post | null) => void; // 선택된 게시글 설정
  setSelectedPostIndex: (index: number | null) => void; // 선택된 게시글 인덱스 설정
  deletePost: (id: number) => void; // 게시글 삭제 메서드
  resetSelection: () => void; // 선택 초기화 메서드
}

// Zustand 스토어 생성
const usePostStore = create<PostStore>((set) => ({
  postList: [],
  selectedPost: null,
  selectedPostIndex: null,

  // 게시글 목록 설정
  setPostList: (posts) =>
    set(() => ({
      postList: posts,
    })),

  // 선택된 게시글 설정
  setSelectedPost: (post) =>
    set(() => ({
      selectedPost: post,
    })),

  // 선택된 게시글 인덱스 설정
  setSelectedPostIndex: (index) =>
    set(() => ({
      selectedPostIndex: index,
    })),

  // 게시글 삭제
  deletePost: (id) =>
    set((state) => {
      const updatedPostList = state.postList.filter((post) => post.id !== id);
      const isSelectedPostDeleted =
        state.selectedPost?.id === id || state.selectedPostIndex !== null;
      return {
        postList: updatedPostList,
        // 선택된 게시글이 삭제된 경우 초기화
        ...(isSelectedPostDeleted && {
          selectedPost: null,
          selectedPostIndex: null,
        }),
      };
    }),

  // 선택 초기화
  resetSelection: () =>
    set(() => ({
      selectedPost: null,
      selectedPostIndex: null,
    })),
}));

export default usePostStore;
