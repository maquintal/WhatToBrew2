import { connectToDatabase } from "@config/mongodb"

const fetchMaltById = async (req: any, res: { json: (arg0: any) => any; }) => {

  console.log(req.query)

  const { db } = await connectToDatabase();

  const malts = await db
    .collection("malts")
    .find()
    .toArray()

  return malts;

};

export default fetchMaltById