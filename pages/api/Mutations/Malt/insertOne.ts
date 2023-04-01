import { connectToDatabase } from "@config/mongodb"

const insertOneMalt = async (req: { body: { malt: any; }; }, res: { json: (arg0: any) => any; }) => {

  const { db } = await connectToDatabase();

  const malt = req?.body

  const malts = await db
    .collection("malts")
    .insertOne(malt)

  return res.json(malts);

};

export default insertOneMalt