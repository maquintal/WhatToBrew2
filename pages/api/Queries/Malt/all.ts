import { connectToDatabase } from "@config/mongodb"
import { NextRequest } from "next/server";

export default async function fetchAllMalts (req: any, res: any) {

  const { db } = await connectToDatabase();

  const malts = await db
    .collection("malts")
    .find()
    .toArray()

  res.status(200).json(malts)

};