import { connectToDatabase } from "@config/mongodb"

const insertOneMisc = async (req: { body: { misc: any; }; }, res: { json: (arg0: any) => any; }) => {

  const { db } = await connectToDatabase();

  const misc = req?.body

  const malts = await db
    .collection("misc")
    .insertOne(misc)

  return res.json(misc);

};

export default insertOneMisc