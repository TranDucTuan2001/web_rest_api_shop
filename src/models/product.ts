import { Schema, Types, model } from 'mongoose';

interface IProduct {
    product_name: string;
    price: number;
    description: string;
    quantity: number;
    size: string;
    img1: string;
    img2: string;
    created_at: Date;
    updated_at: Date;
    category_id: Types.ObjectId;
}

const ProductSchema: Schema = new Schema({
    product_name: { type: String },
    price: { type: Number },
    description: { type: String },
    quantity: { type: Number },
    size: { type: String },
    img1: { type: String },
    img2: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    category_id: { type: Schema.Types.ObjectId },
});

const Product = model<IProduct>('products', ProductSchema);

export default Product;
