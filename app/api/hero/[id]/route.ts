// import connectMongoDB from "@/libs/mongodb";
// import Hero from "@/models/hero";
// import { NextResponse } from "next/server";

// export async function PUT(request:any, { params } :any) {
//   const { id } = params;
//   const { newTitle: title, newDescription: description } = await request.json();
//   await connectMongoDB();
//   await Hero.findByIdAndUpdate(id, { title, description });
//   return NextResponse.json({ message: "Hero updated" }, { status: 200 });
// }

// export async function GET(request: any, { params } :any) {
//   const { id } = params;
//   await connectMongoDB();
//   const hero = await Hero.findOne({ _id: id });
//   return NextResponse.json({ hero }, { status: 200 });
// }

// import connectMongoDB from "@/libs/mongodb";
// import Hero from "@/models/hero";
// import { NextResponse } from "next/server";

// export async function PUT(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   const { id } = params; // ✅ only this

//   const { title, description } = await request.json();

//   await connectMongoDB();

//   const hero = await Hero.findByIdAndUpdate(
//     id,
//     { title, description },
//     { new: true, returnDocument: "after" } // avoid deprecation warning
//   );

//   return NextResponse.json({ hero }, { status: 200 });
// }

// export async function GET(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   const { id } = params; // ✅ only this

//   await connectMongoDB();

//   const hero = await Hero.findById(id);

//   return NextResponse.json({ hero }, { status: 200 });
// }

import connectMongoDB from "@/libs/mongodb";
import Hero from "@/models/hero";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const { title, description } = await request.json();

  await connectMongoDB();

  const hero = await Hero.findByIdAndUpdate(
    id,
    { title, description },
    { new: true }
  );

  return NextResponse.json({ hero }, { status: 200 });
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await connectMongoDB();

  const hero = await Hero.findById(id);

  return NextResponse.json({ hero }, { status: 200 });
}