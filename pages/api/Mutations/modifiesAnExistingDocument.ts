import { connectToDatabase } from "@config/mongodb"
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next/types";

const findOneAndReplace = async (req: NextApiRequest, res: NextApiResponse) => {

  const { db } = await connectToDatabase();

  const object = req?.body

  const { _id, update, collection } = object

  const objectId = new ObjectId(_id)

  try {
    const findOneAndUpdate = await db
      .collection(`${collection}`)
      .updateOne(
        { _id: objectId },
        { $set: update }
      );

    res.status(200).json({ findOneAndUpdate })
  }
  catch (e) {
    throw e;
  }


};

export default findOneAndReplace