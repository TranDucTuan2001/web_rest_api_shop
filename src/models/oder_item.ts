import { Schema, Types, model } from 'mongoose';


interface IOrderItem {
  quantity: number;
  order_id: Types.ObjectId;
  product_id: Types.ObjectId;
}

const OrderItemSchema: Schema = new Schema({
  quantity: { type: Number },
  order_id: { type: Schema.Types.ObjectId },
  product_id: { type: Schema.Types.ObjectId },
});

const OrderItem = model<IOrderItem>('orderItems', OrderItemSchema);

export default OrderItem;
