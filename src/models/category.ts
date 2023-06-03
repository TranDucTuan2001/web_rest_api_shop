import { Schema, Types, model } from 'mongoose';

interface ICategory extends Document {
  category_name: string;
  status: number;
}

const CategorySchema: Schema = new Schema({
  category_name: { type: String },
  status: { type: Number },
});

const Category =model<ICategory>('categorys', CategorySchema);

export default Category;
