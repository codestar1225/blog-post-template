"use client";

import {
  PublishErrorResponse,
  PublishSuccessResponse,
} from "@/types/blogApiType";
import { PUBLISH } from "@/utils/constant";
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

  //publish blog
  type Data = { title: string; desc: string; tags: string[] };

  const publishBlog = async (
    data: Data | undefined
  ): Promise<PublishSuccessResponse | PublishErrorResponse> => {
    setLoading(true);
    try {
      const res: AxiosResponse<PublishSuccessResponse | PublishErrorResponse> =
        await axios.post(PUBLISH, data, config);
      return res.data;
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

  return { publishBlog, loading };
};

export default useBlog;
