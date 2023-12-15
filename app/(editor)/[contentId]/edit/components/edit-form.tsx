"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
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
import { Rentry } from "@prisma/client";

type FormValues = {
  content: string;
  confirmEditCode: string;
  editCode: string;
  alias: string;
};

interface EditFormProps {
  initialData: Rentry | null;
}

const routes = [{ name: "Text" }, { name: "Preview" }, { name: "How" }];

export const EditForm: React.FC<EditFormProps> = ({ initialData }) => {
  if (initialData === null) {
    redirect("/");
  }

  const router = useRouter();
  const [current, setCurrent] = useState<string>("Text");
  const [code, setCode] = useState<string>("");
  const [content, setContent] = useState<string>(`${initialData?.content}`);
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<FormValues>();

  const handleChange = (e: any) => {
    setContent(e.target.value);
  };

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    const data = { ...values, confirmEditCode: code };
    try {
      setLoading(true);
      const results = await axios.patch(`/api/${initialData?.alias}`, data);
      router.refresh();
      router.push(`/${results?.data?.alias}`);
      toast.success("updated successfully");
    } catch (error) {
      console.log("Internal Error", error);
      toast.error(error?.response?.data);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    if (!code) {
      toast.error("Edit Code cannot be empty");
    } else if (code !== initialData?.editCode) {
      toast.error("Bad request, Edit code is not valid");
    } else {
      try {
        setLoading(true);
        await axios.delete(`/api/${initialData?.alias}`);
        router.refresh();
        router.push("/");
        toast.success("post deleted successfully");
      } catch (error) {
        setLoading(false);
        console.log("Internal Error", error);
        toast.error(error?.response?.data);
      } finally {
        setLoading(false);
      }
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
              current === route?.name ? "bg-gray-200 dark:bg-gray-900" : ""
            )}
            key={route?.name}
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
        <div className="flex-grow dark:bg-gray-900 p-4 border">
          {current === "Text" ? (
            <textarea
              className="outline-none border h-full w-full p-2 border-none bg-transparent"
              style={{ scrollbarWidth: "none" }}
              value={content}
              disabled={loading}
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
              {initialData?.content}
            </Markdown>
          ) : (
            "TODO: write documentation of markdown here"
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          <input
            type="text"
            placeholder="Add Edit Code"
            className="p-2 outline-none border rounded-md dark:bg-gray-900"
            required
            {...(register("confirmEditCode"),
            {
              onChange: (e) => setCode(e.target.value),
            })}
            disabled={loading}
          />
          <input
            type="text"
            placeholder="Edit Code - Optional"
            className="p-2 outline-none border rounded-md dark:bg-gray-900"
            disabled={loading}
            {...register("editCode")}
          />
          <input
            type="text"
            placeholder="Edit Url - Optional"
            className="p-2 outline-none border rounded-md dark:bg-gray-900"
            disabled={loading}
            {...register("alias")}
          />
          <button className="py-2 px-4 border rounded-md" disabled={loading}>
            Save
          </button>
        </div>
      </form>
      <div className="flex items-center mt-2 justify-between space-x-2">
        <button
          className="py-2 px-4 border rounded-md"
          onClick={() => router.back()}
        >
          Back
        </button>
        <button
          className="py-2 px-4 border rounded-md"
          onClick={onDelete}
          disabled={loading}
        >
          Delete
        </button>
      </div>
    </>
  );
};
