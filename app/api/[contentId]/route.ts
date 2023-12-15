import prismadb from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: NextResponse,
  { params }: { params: { contentId: string } }
) {
  try {
    const body = await req.json();
    let { content, confirmEditCode, editCode, alias } = body;
    let { contentId } = params;

    const data = await prismadb.rentry.findFirst({
      where: {
        alias: contentId,
      },
    });

    if (!data) {
      return new NextResponse("Bad request, content not found with Id", {
        status: 404,
      });
    }

    console.log(data?.editCode, confirmEditCode);

    if (data?.editCode !== confirmEditCode) {
      return new NextResponse("Bad request, Unauthorized", {
        status: 401,
      });
    }

    if (!content) {
      return new NextResponse("Content is required", { status: 404 });
    }

    if (!editCode) {
      editCode = data?.editCode;
    }

    if (!alias) {
      alias = data?.alias;
    }

    const result = await prismadb.rentry.update({
      where: {
        alias: contentId,
      },
      data: {
        content,
        editCode,
        alias,
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.log("[CONTENT_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: NextResponse,
  { params }: { params: { contentId: string } }
) {
  try {
    const { contentId } = params;

    const result = await prismadb.rentry.delete({
      where: {
        alias: contentId,
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.log("[CONTENT_DELETE]", error);
    return new NextResponse("Internal Errro", { status: 500 });
  }
}
