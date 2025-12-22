import { NextResponse } from 'next/server';
import { getJSON, saveJSON } from '@/lib/db';

export async function GET() {
    const invoices = getJSON('invoices.json');
    return NextResponse.json(invoices);
}

export async function POST(request) {
    const data = await request.json();
    const invoices = getJSON('invoices.json');

    const newInvoice = {
        id: `INV-${Date.now()}`,
        createdAt: new Date().toISOString(),
        status: 'Pending',
        ...data
    };

    invoices.push(newInvoice);
    saveJSON('invoices.json', invoices);

    return NextResponse.json(newInvoice);
}
