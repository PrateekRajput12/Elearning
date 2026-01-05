// Step 3 razor pay


import mongoose, { model } from "mongoose";
import Razorpay from "razorpay";

const paymentSchema = new mongoose.Schema({
    razorpay_order_id: {
        type: String,
        require: true
    },
    razorpay_payment_id: {
        type: String,
        require: true
    },
    razorpay_signature: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


export const Payment = mongoose.model("Payment", paymentSchema)

