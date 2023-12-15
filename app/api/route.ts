import { NextResponse } from "next/server";
import { uid } from "uid";

import prismadb from "@/lib/db";

export async function POST(req: NextResponse) {
  try {
    const body = await req.json();
    let { content, editCode, alias } = body;

    // check if alias already exits
    const data = await prismadb.rentry.findFirst({
      where: {
        alias,
      },
    });

    if (data) {
      return new NextResponse("Url is already reserved", { status: 401 });
    }

    if (!content) {
      return new NextResponse("Content is required", { status: 404 });
    }

    if (!editCode) {
      editCode = uid(6);
    }

    if (!alias) {
      alias = uid();
    }

    const result = await prismadb.rentry.create({
      data: {
        content,
        editCode,
        alias,
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.log("CONTENT_POST", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
