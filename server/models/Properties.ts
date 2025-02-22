// const mongoose:any = require("mongoose");
import mongoose from 'mongoose'
const PropertiesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    images: [{
      url: String,
      publicId: String
    }],
    videos: [{
      url: String,
      publicId: String
    }]
  },
  { timestamps: true }
);

// module.exports = mongoose.models.Properties || mongoose.model("Properties", PropertiesSchema);
export default mongoose.models["Properties"] ||
  mongoose.model("Properties", PropertiesSchema);