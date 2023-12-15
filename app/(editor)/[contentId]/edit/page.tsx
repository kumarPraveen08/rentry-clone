import Footer from "@/components/footer";
import prismadb from "@/lib/db";
import { EditForm } from "./components/edit-form";

export default async function EditPage({
  params,
}: {
  params: { contentId: string };
}) {
  const rentry = await prismadb.rentry.findUnique({
    where: {
      alias: params.contentId,
    },
  });

  return (
    <div className="w-full">
      <div className="max-w-screen-xl m-auto h-screen flex flex-col">
        <EditForm initialData={rentry} />
        <Footer />
      </div>
    </div>
  );
}
