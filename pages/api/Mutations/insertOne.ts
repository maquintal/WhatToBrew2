import { connectToDatabase } from "@config/mongodb"

const insertOneHop = async (req: { body: { hop: any; }; }, res: { json: (arg0: any) => any; }) => {

  const { db } = await connectToDatabase();

  const hop = req?.body

  const hops = await db
    .collection("hops")
    .insertOne(hop)

  return res.json(hops);

};

export default insertOneHop