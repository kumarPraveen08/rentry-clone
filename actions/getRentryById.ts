import prismadb from "@/lib/db";

export const getRentryById = async (contentId: string) => {
  const data = await prismadb.rentry.findFirst({
    where: {
      alias: contentId,
    },
  });

  return data;
};
