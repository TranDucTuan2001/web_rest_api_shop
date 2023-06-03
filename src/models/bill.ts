import { Schema, Types, model } from 'mongoose';


interface IBill {
    bill_date: Date;
    total_amount: number;
    order_id: Types.ObjectId;
}

const BillSchema: Schema = new Schema({
    bill_date: { type: Date,default: Date.now },
    total_amount: { type: Number },
    order_id: { type: Schema.Types.ObjectId },
});

const Bill = model<IBill>('bills', BillSchema);

export default Bill;
