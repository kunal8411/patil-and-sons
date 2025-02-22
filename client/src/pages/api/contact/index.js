// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// const { MongoClient } = require("mongodb");
import dbConnect from "../../../../../server/database/dbConnect";
// import Contact from "../../../models/Contact";

export default async function handler(req, res) {
  const { method } = req;
  let result = await dbConnect();
  switch (method) {
    case "GET":
      try {
        // const allContacts = await Contact.find();
        res.status(200).json({ success: true, data: [] });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
