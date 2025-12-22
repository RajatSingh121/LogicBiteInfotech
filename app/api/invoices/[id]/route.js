import { NextResponse } from 'next/server';
import { getJSON } from '@/lib/db';

export async function GET(request, { params }) {
    const { id } = await params;
    const invoices = getJSON('invoices.json');
    const invoice = invoices.find(inv => inv.id === id);

    if (!invoice) {
        return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
    }

    return NextResponse.json(invoice);
}
