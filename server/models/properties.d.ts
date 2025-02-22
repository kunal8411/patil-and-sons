import { Document, Model } from 'mongoose';

interface IProperty extends Document {
  title: string;
  description: string;
  price: number;
  // Add other property fields you have in your schema
}

declare const Properties: Model<IProperty>;
export default Properties; 