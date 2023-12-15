import { redirect } from "next/navigation";
import Link from "next/link";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import rehypeSanitize from "rehype-sanitize";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

import { getRentryById } from "@/actions/getRentryById";
import Footer from "@/components/footer";

const Page = async ({ params }: { params: { contentId: string } }) => {
  const { contentId } = params;

  const data = await getRentryById(contentId);

  if (!data) {
    redirect("/");
  }

  if (data?.reserved) {
    redirect("/");
  }

  return (
    <div className="w-full h-full">
      <div className="max-w-screen-xl m-auto flex flex-col space-y-2 h-screen">
        <div className="flex-grow border p-4">
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
            {data?.content}
          </Markdown>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link
              href={`/${data?.alias}/edit`}
              className="py-2 px-4 border rounded-md"
            >
              Edit
            </Link>
            <button className="py-2 px-4 border rounded-md">Export</button>
          </div>
          <div className="flex flex-col items-end text-sm">
            <span>Pub: {`${data?.createdAt}`.split(" GMT")[0]}</span>
            <span>Update: {`${data?.updatedAt}`.split(" GMT")[0]}</span>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Page;
