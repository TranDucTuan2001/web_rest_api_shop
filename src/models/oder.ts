import { Schema, Types, model } from 'mongoose';


interface IOrder extends Document {
  order_date: Date;
  total_amount: number;
  order_status: number;
  customer_id: Types.ObjectId;
}

const OrderSchema: Schema = new Schema({
  order_date: { type: Date,default: Date.now},
  total_amount: { type: Number, default: 0 },
  order_status: { type: Number, default: 0 },
  customer_id: { type: Schema.Types.ObjectId },
});

const Order = model<IOrder>('orders', OrderSchema);

export default Order;
