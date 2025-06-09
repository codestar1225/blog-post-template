"use client";

import {
  EditBlogErrorRes,
  EditBlogSuccessRes,
  GetBlogErrorRes,
  GetBlogsErrorRes,
  GetBlogsSuccessRes,
  GetBlogSuccessRes,
  PublishErrorRes,
  PublishSuccessRes,
} from "@/types/blogApiType";
import { GETBLOG, GETBLOGS, PUBLISH, UPDATEBLOG } from "@/utils/constant";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import Cookies from "js-cookie";

// Define response types

const useBlog = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const token = Cookies.get("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const blogConfig = (blogId: string) => ({
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "x-blog-id": blogId,
    },
  });

  //publish blog
  type BlogType = { title: string; desc: string; tags: string[] };
  const publishBlog = async (
    data: BlogType | undefined
  ): Promise<PublishSuccessRes | PublishErrorRes> => {
    setLoading(true);
    try {
      const res: AxiosResponse<PublishSuccessRes | PublishErrorRes> =
        await axios.post(PUBLISH, data, config);
      return res.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return {
          message:
            error.response?.data?.message === "Invalid data provided."
              ? "Invalid data provided."
              : "Something went wrong",
          status: error.response?.status || 500, // Add default/fallback status
        };
      }

      return {
        message: "An unknown error occurred",
        status: 500,
      };
    } finally {
      setLoading(false);
    }
  };

  //get blogs
  const getBlogs = async (): Promise<GetBlogsSuccessRes | GetBlogsErrorRes> => {
    setLoading(true);
    try {
      const res: AxiosResponse<GetBlogsSuccessRes | GetBlogsErrorRes> =
        await axios.get(GETBLOGS, config);
      return { ...res.data, status: res.status };
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return {
          message:
            error.response?.data?.message ===
            "User doesn't exist, please sign up firstly"
              ? "User doesn't exist, please sign up firstly"
              : "Something went wrong",
          status: error.response?.status || 500, // Add default/fallback status
        };
      }

      return {
        message: "An unknown error occurred",
        status: 500,
      };
    } finally {
      setLoading(false);
    }
  };

  //get blog
  const getBlog = async (
    blogId: string
  ): Promise<GetBlogSuccessRes | GetBlogErrorRes> => {
    setLoading(true);
    try {
      const res: AxiosResponse<GetBlogSuccessRes | GetBlogErrorRes> =
        await axios.get(GETBLOG, blogConfig(blogId));
      return { ...res.data, status: res.status };
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return {
          message:
            error.response?.data?.message ===
            "User doesn't exist, please sign up firstly"
              ? "User doesn't exist, please sign up firstly"
              : "Something went wrong",
          status: error.response?.status || 500, // Add default/fallback status
        };
      }

      return {
        message: "An unknown error occurred",
        status: 500,
      };
    } finally {
      setLoading(false);
    }
  };
  //get blog
  const updateBlog = async (
    blog: BlogType,
    blogId: string
  ): Promise<EditBlogSuccessRes | EditBlogErrorRes> => {
    setLoading(true);
    try {
      const res: AxiosResponse<EditBlogSuccessRes | EditBlogErrorRes> =
        await axios.put(UPDATEBLOG, blog, blogConfig(blogId));
      return { ...res.data, status: res.status };
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return {
          message:
            error.response?.data?.message ===
            "User doesn't exist, please sign up firstly"
              ? "User doesn't exist, please sign up firstly"
              : "Something went wrong",
          status: error.response?.status || 500, // Add default/fallback status
        };
      }

      return {
        message: "An unknown error occurred",
        status: 500,
      };
    } finally {
      setLoading(false);
    }
  };

  return { publishBlog, getBlogs, getBlog, updateBlog, loading };
};

export default useBlog;
