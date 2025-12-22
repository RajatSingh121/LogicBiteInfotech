import Razorpay from 'razorpay';
import { NextResponse } from 'next/server';

const razorpay = new Razorpay({
    key_id: 'rzp_live_RUWgpAfB2W728L',
    key_secret: 'hWApiVF5mtPhmSBJmMBmR9jY',
});

export async function POST(request) {
    try {
        const { amount, receiptId } = await request.json();

        const options = {
            amount: Math.round(amount * 100), // Amount in paise
            currency: 'INR',
            receipt: receiptId,
        };

        const order = await razorpay.orders.create(options);

        return NextResponse.json({
            id: order.id,
            currency: order.currency,
            amount: order.amount,
            key: 'rzp_live_RUWgpAfB2W728L' // Passing key to frontend
        });
    } catch (error) {
        console.error('Razorpay Error:', error);
        return NextResponse.json({ error: 'Error creating order' }, { status: 500 });
    }
}
