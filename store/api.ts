import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface BlogPost {
  id: number;
  title: string;
  body: string;
  author: string;
}

export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
  endpoints: (builder) => ({
    getPosts: builder.query<BlogPost[], void>({
      query: () => 'posts',
    }),
    getPostById: builder.query<BlogPost, number>({
      query: (id) => `posts/${id}`,
    }),
    createPost: builder.mutation<BlogPost, Partial<BlogPost>>({
      query: (newPost) => ({
        url: 'posts',
        method: 'POST',
        body: newPost,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          blogApi.util.updateQueryData('getPosts', undefined, (draft) => {
            draft.push({
              id: Math.random(), 
              title: arg.title || '',
              body: arg.body || '',
              author: arg.author || '',
            });
          })
        );

        try {
          const { data } = await queryFulfilled;
          dispatch(
            blogApi.util.updateQueryData('getPosts', undefined, (draft) => {
              const postIndex = draft.findIndex((post) => post.id === Math.random());
              if (postIndex !== -1) {
                draft[postIndex] = data; 
              }
            })
          );
        } catch {
          patchResult.undo(); 
        }
      },
    }),
  }),
});

export const { useGetPostsQuery, useGetPostByIdQuery, useCreatePostMutation } = blogApi;
