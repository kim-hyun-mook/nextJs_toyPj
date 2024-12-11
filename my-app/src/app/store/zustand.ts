'use client';  // 클라이언트 컴포넌트

import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

// Post 타입 정의
export interface Post {
  id: number;
  title: string;
  content: string; // 필수 속성으로 변경
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

// `persist` 타입을 명시적으로 지정하여 상태 저장 및 복원 설정
const usePostStore = create<PostStore, [['zustand/persist', PostStore]]>(
  persist(
    (set) => ({
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
    }),
    {
      name: 'post-store', // 로컬 스토리지에 저장할 이름
      getStorage: () => localStorage, // 로컬 스토리지 사용
    } as PersistOptions<PostStore> // persist의 타입 명시
  )
);

export default usePostStore;
