import { connectToDatabase } from "@config/mongodb"

const fetchMiscById = async (req: any, res: { json: (arg0: any) => any; }) => {

  const { db } = await connectToDatabase();

  const misc = await db
    .collection("misc")
    .find()
    .toArray()

  return misc;

};

export default fetchMiscById