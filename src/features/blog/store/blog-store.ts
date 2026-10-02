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
        const clean = (slug || "").trim().replace(/^\/+|\/+$/g, "").toLowerCase();
        const found = get().posts.find((p) => {
          const pSlug = (p.slug || "").trim().replace(/^\/+|\/+$/g, "").toLowerCase();
          const seoSlug = (p.seo?.slug || "").trim().replace(/^\/+|\/+$/g, "").toLowerCase();
          return pSlug === clean || seoSlug === clean;
        });
        if (found) return found;
        return MOCK_BLOGS.find((p) => {
          const pSlug = (p.slug || "").trim().replace(/^\/+|\/+$/g, "").toLowerCase();
          const seoSlug = (p.seo?.slug || "").trim().replace(/^\/+|\/+$/g, "").toLowerCase();
          return pSlug === clean || seoSlug === clean;
        });
      },
      updatePost: (id: string, updated: Partial<BlogPost>) => {
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === id
              ? {
                  ...post,
                  ...updated,
                  slug: updated.slug
                    ? updated.slug.trim().replace(/^\/+|\/+$/g, "")
                    : post.slug,
                  seo: updated.seo
                    ? {
                        ...post.seo,
                        ...updated.seo,
                        slug: updated.seo.slug
                          ? updated.seo.slug.trim().replace(/^\/+|\/+$/g, "")
                          : post.seo.slug,
                      }
                    : post.seo,
                }
              : post
          ),
        }));
      },
      updateSeo: (id: string, seoUpdate: Partial<BlogSeoConfig>) => {
        set((state) => ({
          posts: state.posts.map((post) => {
            if (post.id !== id) return post;
            const cleanSlug = seoUpdate.slug
              ? seoUpdate.slug.trim().replace(/^\/+|\/+$/g, "")
              : post.slug;
            return {
              ...post,
              slug: cleanSlug,
              seo: {
                ...post.seo,
                ...seoUpdate,
                slug: cleanSlug,
              },
            };
          }),
        }));
      },
      addPost: (newPost: BlogPost) => {
        const cleanSlug = (newPost.slug || newPost.seo?.slug || "")
          .trim()
          .replace(/^\/+|\/+$/g, "");
        const sanitizedPost: BlogPost = {
          ...newPost,
          slug: cleanSlug,
          seo: {
            ...newPost.seo,
            slug: cleanSlug,
          },
        };
        set((state) => ({
          posts: [sanitizedPost, ...state.posts.filter((p) => p.id !== newPost.id)],
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
      merge: (persistedState: unknown, currentState: BlogState) => {
        if (!persistedState || typeof persistedState !== "object") return currentState;
        const persisted = persistedState as { posts?: BlogPost[] };
        if (!Array.isArray(persisted.posts)) return currentState;

        const persistedPosts = persisted.posts;
        // Merge so any new items in MOCK_BLOGS are accessible while keeping user-saved posts
        const missingMocks = MOCK_BLOGS.filter(
          (mock) =>
            !persistedPosts.some(
              (p) =>
                p.id === mock.id ||
                p.slug.replace(/^\/+|\/+$/g, "") === mock.slug.replace(/^\/+|\/+$/g, "")
            )
        );

        return {
          ...currentState,
          posts: [...persistedPosts, ...missingMocks],
        };
      },
    }
  )
);
