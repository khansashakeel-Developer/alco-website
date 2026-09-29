// import { NextRequest, NextResponse } from "next/server";
// import dbConnect from "../../../utils/db";
// import Post from "../../../models/Post";

// export async function GET() {
//   await dbConnect();
//   const posts = await Post.find({});
//   return NextResponse.json(posts);
// }

// export async function POST(req: NextRequest) {
//   await dbConnect();
//   const { title, content, slug } = await req.json();

//   try {
//     const post = await Post.create({ title, content, slug });
//     return NextResponse.json(post, { status: 201 });
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 400 });
//   }
// }
import { NextResponse } from "next/server";

const posts = [
  { _id: "1", title: "Post One", content: "Content One", slug: "post-one" },
  { _id: "2", title: "Post Two", content: "Content Two", slug: "post-two" },
];

export async function GET() {
  return NextResponse.json(posts);
}