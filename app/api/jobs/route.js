import { NextResponse } from 'next/server';
import { getJSON, saveJSON } from '@/lib/db';

export async function GET() {
    const jobs = getJSON('jobs.json');
    return NextResponse.json(jobs);
}

export async function POST(request) {
    const data = await request.json();
    const jobs = getJSON('jobs.json');

    const newJob = {
        id: `JOB-${Date.now()}`,
        postedAt: new Date().toISOString(),
        ...data
    };

    jobs.push(newJob);
    saveJSON('jobs.json', jobs);

    return NextResponse.json(newJob);
}
