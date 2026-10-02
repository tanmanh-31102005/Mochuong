import { create } from "zustand";
import { persist } from "zustand/middleware";
import { BlogPost, BlogSeoConfig } from "../types";
import { MOCK_BLOGS } from "../data/mock-blogs";

interface BlogState {
  posts: BlogPost[];
  getPostById: (id: string) => BlogPost | undefined;
  getPostBySlug: (slug: string) => BlogPost | undefined;
  updatePost: (id: string, updated: Partial<BlogPost>) => void;
  updateSeo: (id: string, seo: Partial<BlogSeoConfig>) => void;
  addPost: (post: BlogPost) => void;
  deletePost: (id: string) => void;
  resetToDefault: () => void;
}

export const useBlogStore = create<BlogState>()(
  persist(
    (set, get) => ({
      posts: MOCK_BLOGS,
      getPostById: (id: string) => {
        return get().posts.find((p) => p.id === id);
      },
      getPostBySlug: (slug: string) => {
        return get().posts.find((p) => p.slug === slug || p.seo?.slug === slug);
      },
      updatePost: (id: string, updated: Partial<BlogPost>) => {
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === id
              ? {
                  ...post,
                  ...updated,
                  seo: updated.seo
                    ? { ...post.seo, ...updated.seo }
                    : post.seo,
                }
              : post
          ),
        }));
      },
      updateSeo: (id: string, seoUpdate: Partial<BlogSeoConfig>) => {
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === id
              ? {
                  ...post,
                  slug: seoUpdate.slug ?? post.slug,
                  seo: {
                    ...post.seo,
                    ...seoUpdate,
                  },
                }
              : post
          ),
        }));
      },
      addPost: (newPost: BlogPost) => {
        set((state) => ({
          posts: [newPost, ...state.posts],
        }));
      },
      deletePost: (id: string) => {
        set((state) => ({
          posts: state.posts.filter((p) => p.id !== id),
        }));
      },
      resetToDefault: () => {
        set({ posts: MOCK_BLOGS });
      },
    }),
    {
      name: "mochuong-blog-storage",
    }
  )
);
