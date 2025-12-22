import { NextResponse } from 'next/server';
import crypto from 'crypto';

const EASEBUZZ_KEY = 'O5LUJ0JGKA';
const EASEBUZZ_SALT = 'JK0G2KSVX9';
const ENV = 'prod'; // Live environment

export async function POST(request) {
    try {
        const { amount, txnid, productinfo, firstname, email, phone } = await request.json();

        const hashString = `${EASEBUZZ_KEY}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${EASEBUZZ_SALT}`;
        const hash = crypto.createHash('sha512').update(hashString).digest('hex');

        const payload = new URLSearchParams();
        payload.append('key', EASEBUZZ_KEY);
        payload.append('txnid', txnid);
        payload.append('amount', amount);
        payload.append('productinfo', productinfo);
        payload.append('firstname', firstname);
        payload.append('email', email);
        payload.append('phone', phone);
        payload.append('surl', `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/payment/easebuzz/response`);
        payload.append('furl', `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/payment/easebuzz/response`);
        payload.append('hash', hash);

        // Initiate Payment API
        const response = await fetch('https://pay.easebuzz.in/payment/initiateLink', {
            method: 'POST',
            body: payload,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        });

        const data = await response.json();

        if (data.status === 1) {
            return NextResponse.json({
                access_key: data.data,
                key: EASEBUZZ_KEY,
                env: ENV
            });
        } else {
            return NextResponse.json({ error: data.data || 'Easebuzz Initiation Failed' }, { status: 400 });
        }

    } catch (error) {
        console.error('Easebuzz Error:', error);
        return NextResponse.json({ error: 'Error initiating payment' }, { status: 500 });
    }
}
