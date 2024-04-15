import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

const apiUrl = "http://localhost:3001/products";

// Define a service using a base URL and expected endpoints
export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery(),
  tagTypes: ["products"],
  endpoints: (builder) => ({
    getProductsbyname: builder.query({
      queryFn: async () => {
        try {
          const response = await axios.get(apiUrl);
          return { data: response.data };
        } catch (error) {
          return { error: error.message };
        }
      },
      providesTags: ["products"],
    }),
    getProductbyname: builder.query({
      queryFn: async (id) => {
        try {
          const response = await axios.get(apiUrl + "/" + id);
          console.log(response);

          return { data: response.data };
        } catch (error) {
          console.log(error.message);
          return { error: error.message };
        }
      },
      providesTags: ["products"],
    }),
    addProduct: builder.mutation({
      queryFn: async (product) => {
        try {
          await axios.post(apiUrl, product);
          return { data: "ok" };
        } catch (error) {
          return { error: error.message };
        }
      },
      invalidatesTags: ["products"],
    }),
    deleteProduct: builder.mutation({
      queryFn: async (id) => {
        try {
          await axios.delete(apiUrl + "/" + id);
          console.log("Product deleted");
          return { data: "ok" };
        } catch (error) {
          return { error: error.message };
        }
      },
      invalidatesTags: ["products"],
    }),
    updateProduct: builder.mutation({
      queryFn: async ({ id, product }) => {
        try {
          const response = await axios.put(apiUrl + "/" + id, product);
          console.log("updated product");
          console.log(response.data);
          return { data: "ok" };
        } catch (error) {
          return { error: error.message };
        }
      },
      invalidatesTags: ["products"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetProductsbynameQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useGetProductbynameQuery,
} = productsApi;
