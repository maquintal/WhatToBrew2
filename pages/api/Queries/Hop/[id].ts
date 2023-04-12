import { connectToDatabase } from "@config/mongodb"

const fetchHopById = async (req: any, res: { json: (arg0: any) => any; }) => {

  const { db } = await connectToDatabase();

  const hops = await db
    .collection("hops")
    .find()
    .toArray()

  return hops;

};

export default fetchHopById