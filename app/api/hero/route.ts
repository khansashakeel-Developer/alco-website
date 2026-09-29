import connectMongoDB from "@/libs/mongodb";
import Hero from "@/models/hero";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    const hero = await Hero.find();
    return NextResponse.json({ hero });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch hero" }, { status: 500 });
  }
}

// export async function POST(request: Request) {
//   try {
//     const { title, description } = await request.json();
//     await connectMongoDB();
//     const hero = await Hero.create({ title, description });
//     return NextResponse.json(hero, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to create hero" }, { status: 500 });
//   }
// }
export async function POST(request: Request) {
  try {
    const {
      title,
      description,
      image = "",
      button1 = { text: "", link: "" },
      button2 = { text: "", link: "" },
    } = await request.json();

    await connectMongoDB();

    // Validate required fields
    if (!title?.line1 || !title?.line2 || !description) {
      return NextResponse.json(
        { error: "Title lines and description are required" },
        { status: 400 }
      );
    }

    const hero = await Hero.create({
      title,
      description,
      image,
      button1,
      button2,
    });

    return NextResponse.json(hero, { status: 201 });
  } catch (error) {
    console.error("POST /api/hero error:", error);
    return NextResponse.json({ error: "Failed to create hero" }, { status: 500 });
  }
}

export async function DELETE(request: any) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Hero.findByIdAndDelete(id);
  return NextResponse.json({ message: "Hero deleted" }, { status: 200 });
}