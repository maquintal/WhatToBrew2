import { connectToDatabase } from "@config/mongodb"
import { NextRequest } from "next/server";

export default async function fetchAllMisc (req: any, res: any) {

  const { db } = await connectToDatabase();

  const misc = await db
    .collection("misc")
    .find()
    .toArray()

  res.status(200).json(misc)

};