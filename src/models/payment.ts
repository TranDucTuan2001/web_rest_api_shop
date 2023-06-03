import { Schema, Types, model } from 'mongoose';



interface IPayment{
  payment_method: string;
  payment_status: number;
  order_id: Types.ObjectId;
}

const PaymentSchema: Schema = new Schema({
  payment_method: { type: String },
  payment_status: { type: Number },
  order_id: { type: Schema.Types.ObjectId },
});

const Payment = model<IPayment>('payments', PaymentSchema);

export default Payment;
