import { connectToDatabase } from "../../config/mongodb"

const CreateOneBuilding = async (req: { body: { malt: any; }; }, res: { json: (arg0: any) => any; }) => {

  const { db } = await connectToDatabase();
  
  const MONGODB_DB = process.env.MONGODB_DB
  const PROCESS_ENV = process.env

  console.log(req.body)

  const malt = req?.body

  const malts = await db
    .collection("malts")
    .insertOne(malt)

  return res.json(malts);

};

export default CreateOneBuilding