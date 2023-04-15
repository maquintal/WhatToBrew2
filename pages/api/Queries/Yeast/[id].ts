import { connectToDatabase } from "@config/mongodb"

const fetchYeastById = async (req: any, res: { json: (arg0: any) => any; }) => {

  console.log(req.query)

  const { db } = await connectToDatabase();

  const yeasts = await db
    .collection("yeasts")
    .find()
    .toArray()

  return yeasts;

};

export default fetchYeastById