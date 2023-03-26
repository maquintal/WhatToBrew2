import { connectToDatabase } from "@config/mongodb"

const fetchAllMalts = async (req: any, res: { json: (arg0: any) => any; }) => {

  const { db } = await connectToDatabase();
  
  const MONGODB_DB = process.env.MONGODB_DB
  const PROCESS_ENV = process.env

  const malts = await db
    .collection("malts")
    .find()
    .toArray()

  return malts;

};

export default fetchAllMalts