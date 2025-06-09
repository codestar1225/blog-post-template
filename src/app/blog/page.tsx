"use client";

import useBlog from "@/hooks/useBlog";
import { BlogType } from "@/types/blogApiType";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";

const Page = () => {
  const { getBlogs, loading } = useBlog();
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [userId, setUserId] = useState<string>();
  const router = useRouter();
  useLayoutEffect(() => {
    (async () => {
      const res = await getBlogs();
      if (res.status === 200 && "blogs" in res) {
        setBlogs(res.blogs);
        setUserId(res.userId);
      }
      console.log(res);
    })();
  }, []);

  const handleDelete = async (blogId: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
      const res = await fetch(`/api/blog/delete/${blogId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer`, // Set your actual token
        },
      });

      if (res.ok) {
        // setBlogs((prev) => prev.filter((b) => b._id !== blogId));
      } else {
        const errorData = await res.json();
        alert("Failed to delete: " + errorData.message);
      }
    } catch (err) {
      alert("Error deleting blog.");
    }
  };

  const handleEdit = (blogId: string) => {
    router.push(`/blog/${blogId}`);
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-lg font-semibold">
        Loading blogs...
      </div>
    );
  } else {
    return (
      <main className="min-h-screen px-6 py-10">
        <h1 className="text-3xl font-bold text-center mb-10">Latest Blogs</h1>
        <div className="grid gap-6 max-w-4xl mx-auto">
          {blogs.map((item, index) => (
            <article
              key={index}
              className="border-[2px] border-foreground shadow-lg rounded-2xl p-6 transition hover:shadow-xl"
            >
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-semibold text-gray-300">
                  {item.title}
                </h2>

                {item.userId === userId && (
                  <div className="flex gap-2">
                    <button
                      className="text-blue-500 hover:underline text-sm"
                      onClick={() => handleEdit(item._id)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="text-red-500 hover:underline text-sm"
                      onClick={() => handleDelete(item._id)}
                    >
                      🗑 Delete
                    </button>
                  </div>
                )}
              </div>

              <p className="mt-2">{item.desc}</p>
              <div className="mt-4 flex justify-between text-sm text-gray-500">
                <span>👤 {item.userName}</span>
                <span>🕒 {new Date(item.time).toLocaleString()}</span>
              </div>
            </article>
          ))}
        </div>
      </main>
    );
  }
};

export default Page;
