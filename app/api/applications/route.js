import { NextResponse } from 'next/server';
import { getJSON, saveJSON } from '@/lib/db';

export async function POST(request) {
    const data = await request.json();
    const applications = getJSON('applications.json');

    const newApplication = {
        id: `APP-${Date.now()}`,
        submittedAt: new Date().toISOString(),
        status: 'New',
        ...data
    };

    applications.push(newApplication);
    saveJSON('applications.json', applications);

    return NextResponse.json(newApplication);
}

export async function GET() {
    const applications = getJSON('applications.json');
    return NextResponse.json(applications);
}
