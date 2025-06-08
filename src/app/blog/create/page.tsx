"use client";

import useBlog from "@/hooks/useBlog";
import { ChangeEvent, ReactElement, useState } from "react";
import Tag from "@/app/_components/tag.json";
import { toast } from "react-toastify";

const Page = (): ReactElement => {
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [tag, setTag] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const { loading, publishBlog } = useBlog();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
      return toast.error("Enter the Title", { autoClose: 2000 });
    } else if (!desc) {
      return toast.error("Fill the Description", { autoClose: 2000 });
    } else if (!tags) {
      return toast.error("Select the one more tag", { autoClose: 2000 });
    }
    const data = { title, desc, tags };
    publishBlog(data);
  };

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedTag = e.target.value;
    setTag(selectedTag);
    setTags((prevTags) => [...prevTags, selectedTag]);
  };

  return (
    <main className="h-[90svh] flex justify-center items-center text-[16px]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl mx-auto flex flex-col gap-3 justify-center items-center px-4 py-6 bg-white rounded-2xl shadow-xl text-gray-800"
      >
        <div className="w-full">
          <label htmlFor="title" className="block mb-1 font-semibold">
            Title
          </label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the title here..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <div className="w-full">
          <label htmlFor="desc" className="block mb-1 font-semibold">
            Description
          </label>
          <textarea
            id="desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Enter the description here..."
            rows={4}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <div className="w-full">
          <label htmlFor="tags" className="block mb-1 font-semibold">
            Tags
          </label>
          <select
            id="tags"
            value={tag}
            onChange={handleSelect}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="" disabled>
              -- Select a tag --
            </option>
            {Tag.map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
          </select>

          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((item, index) => (
              <span
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                key={index}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="w-full flex flex-col">
          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Publishing..." : "Publish"}
          </button>
          <a
            href="/blog"
            className="mt-4 w-full text-center bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50"
          >
            Cancel
          </a>
        </div>
      </form>
    </main>
  );
};

export default Page;
