"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import Markdown from "react-markdown";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import toast from "react-hot-toast";
import axios from "axios";

import { markdownDocs } from "@/app/_data";

type FormValues = {
  content: string;
  editCode: string;
  alias: string;
};

const routes = [{ name: "Text" }, { name: "Preview" }, { name: "How" }];

const AddForm = () => {
  const router = useRouter();
  const [current, setCurrent] = useState<string>("Text");
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<FormValues>();

  const handleChange = (e: any) => {
    setContent(e.target.value);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      setLoading(true);
      const results = await axios.post(`/api`, data);
      router.refresh();
      router.push(`/${results?.data?.alias}`);
      toast.success(
        `pastbin created successfully, your edit code: ${results?.data?.editCode}`,
        { duration: 7000 }
      );
    } catch (error: any) {
      console.log("Something went wrong", error);
      toast.error(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const onClick = (name: string) => {
    setCurrent(name);
  };

  return (
    <>
      <div className="flex items-center">
        {routes.map((route) => (
          <span
            className={cn(
              "p-4 cursor-pointer border hover:bg-gray-20",
              current === route.name ? "bg-gray-200 dark:bg-gray-900" : ""
            )}
            key={route.name}
            onClick={() => onClick(route?.name)}
          >
            {route?.name}
          </span>
        ))}
      </div>
      <form
        className="flex-grow flex flex-col space-y-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex-grow p-4 border dark:bg-gray-900">
          {current === "Text" ? (
            <textarea
              className="outline-none border h-full w-full p-2 border-none bg-transparent"
              style={{ scrollbarWidth: "none" }}
              value={content}
              required
              {...register("content", {
                onChange: (e) => handleChange(e),
              })}
            />
          ) : current === "Preview" ? (
            <Markdown
              className="prose max-w-full h-full dark:prose-invert"
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[
                rehypeRaw,
                rehypeHighlight,
                rehypeAutolinkHeadings,
                rehypeSlug,
                rehypeSanitize,
              ]}
            >
              {content}
            </Markdown>
          ) : (
            <Markdown
              className="prose max-w-full h-full dark:prose-invert overflow-y-hidden"
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[
                rehypeRaw,
                rehypeHighlight,
                rehypeAutolinkHeadings,
                rehypeSlug,
                rehypeSanitize,
              ]}
            >
              {markdownDocs}
            </Markdown>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Add Edit Code"
              className="p-2 outline-none border rounded-md dark:bg-gray-900"
              {...register("editCode")}
            />
            <input
              type="text"
              placeholder="Add Custom Url"
              className="p-2 outline-none border rounded-md dark:bg-gray-900"
              required
              {...register("alias")}
            />
          </div>
          <button
            type="submit"
            className="py-2 px-4 border rounded-md"
            disabled={loading}
          >
            Go
          </button>
        </div>
      </form>
    </>
  );
};

export default AddForm;
