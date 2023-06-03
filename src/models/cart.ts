import { Schema, Types, model } from 'mongoose';


interface ICart   {
    product_id: Types.ObjectId;
    user_id: Types.ObjectId;
    quantity: number;
}

const CartSchema: Schema = new Schema({
    product_id: { type: Schema.Types.ObjectId },
    user_id: { type: Schema.Types.ObjectId },
    quantity: {type: Number}
});

const Cart = model<ICart>('carts', CartSchema);

export default Cart;
