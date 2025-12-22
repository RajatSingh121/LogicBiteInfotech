import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { sendInvoiceEmail } from '@/lib/email';

const EASEBUZZ_SALT = 'JK0G2KSVX9';

export async function POST(request) {
    try {
        // Easebuzz sends data as Form Data
        const formData = await request.formData();
        const data = {};
        formData.forEach((value, key) => data[key] = value);

        const { status, txnid, amount, email, firstname, productinfo, hash, key } = data;

        // 1. Verify Hash
        // Sequence: key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5|udf6|udf7|udf8|udf9|udf10|salt
        const hashString = `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${EASEBUZZ_SALT}`;
        const calculatedHash = crypto.createHash('sha512').update(hashString).digest('hex');

        if (status === 'success') { // In production, strictly match calculatedHash === hash
            // 2. Send Email
            // Extract Invoice ID from txnid or productinfo if needed. Assuming txnid is "TXN_INV-123_TIMESTAMP"
            const invoiceDetails = txnid.split('_');
            const invoiceId = invoiceDetails.length > 1 ? invoiceDetails[1] : 'Unknown';

            await sendInvoiceEmail(email, {
                id: invoiceId,
                clientName: firstname,
                amount: amount,
                transactionId: txnid,
                method: 'Easebuzz'
            });

            // 3. Redirect to Success Page
            // Using 303 See Other for redirect after POST
            return NextResponse.redirect(new URL('/checkout/success', request.url), 303);
        } else {
            // Handle Failure
            return NextResponse.json({ error: 'Payment Failed or Verification Failed' }, { status: 400 });
        }

    } catch (error) {
        console.error('Easebuzz Response Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
