import { getRentryById } from "@/actions/getRentryById";
import Footer from "@/components/footer";
import { redirect } from "next/navigation";
import Markdown from "react-markdown";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

const Page = async ({ params }: { params: { pageId: string } }) => {
  console.log(params.pageId);
  const data = await getRentryById(params.pageId);

  if (!data) {
    redirect("/");
  }

  if (!data?.reserved) {
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
        <Footer />
      </div>
    </div>
  );
};

export default Page;
