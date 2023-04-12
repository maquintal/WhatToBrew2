import { connectToDatabase } from "@config/mongodb"
import { NextRequest } from "next/server";

export default async function fetchAllHops (req: any, res: any) {

  const { db } = await connectToDatabase();

  const hops = await db
    .collection("hops")
    .find()
    .toArray()

  res.status(200).json(hops)

};