import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { sendInvoiceEmail } from '@/lib/email';

const RAZORPAY_SECRET = 'hWApiVF5mtPhmSBJmMBmR9jY';

export async function POST(request) {
    try {
        const { orderCreationId, razorpayPaymentId, razorpaySignature, invoiceId, amount, clientEmail, clientName } = await request.json();

        // 1. Verify Signature
        const shasum = crypto.createHmac('sha256', RAZORPAY_SECRET);
        shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
        const digest = shasum.digest('hex');

        if (digest !== razorpaySignature) {
            return NextResponse.json({ error: 'Transaction not legit!' }, { status: 400 });
        }

        // 2. Send Email
        await sendInvoiceEmail(clientEmail, {
            id: invoiceId,
            clientName: clientName,
            amount: amount,
            transactionId: razorpayPaymentId,
            method: 'Razorpay'
        });

        // 3. TODO: Update database status to 'Paid' here

        return NextResponse.json({
            msg: 'success',
            orderId: razorpayPaymentId,
            paymentId: razorpayPaymentId,
        });

    } catch (error) {
        console.error('Verification Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
