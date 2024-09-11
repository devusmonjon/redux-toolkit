import { api } from "./index";

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query({
      // @ts-ignore
      query: (params) => ({
        url: "/users",
        params,
      }),
      providesTags: ["User"],
    }),
    addUser: build.mutation({
      // @ts-ignore
      query: (body) => ({
        url: "/users",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    editUser: build.mutation({
      // @ts-ignore
      query: ({ id, body }) => ({
        url: "/users/" + id,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: build.mutation({
      // @ts-ignore
      query: (id) => ({
        url: "/users/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAddUserMutation,
  useEditUserMutation,
  useDeleteUserMutation,
} = userApi;
