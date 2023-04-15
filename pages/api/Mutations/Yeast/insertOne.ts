import { connectToDatabase } from "@config/mongodb"

const insertOneYeast = async (req: { body: { yeast: any; }; }, res: { json: (arg0: any) => any; }) => {

  const { db } = await connectToDatabase();

  const yeast = req?.body

  const yeasts = await db
    .collection("yeasts")
    .insertOne(yeast)

  return res.json(yeasts);

};

export default insertOneYeast