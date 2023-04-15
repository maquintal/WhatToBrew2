import { connectToDatabase } from "@config/mongodb"
import { NextRequest } from "next/server";

export default async function fetchAllYeasts (req: any, res: any) {

  const { db } = await connectToDatabase();

  const yeasts = await db
    .collection("yeasts")
    .find()
    .toArray()

  res.status(200).json(yeasts)

};