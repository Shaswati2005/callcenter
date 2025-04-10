import { NextResponse } from 'next/server';
import twilio from 'twilio';

const client = twilio(process.env.TWILIO_ACCOUNT_SID!, process.env.TWILIO_AUTH_TOKEN!);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sid = searchParams.get('sid');

  if (!sid) {
    return NextResponse.json({ error: 'Missing CallSid' }, { status: 400 });
  }

  try {
    const call = await client.calls(sid).fetch();
    return NextResponse.json({ status: call.status });
  } catch (error) {
    console.error('Error fetching call status:', error);
    return NextResponse.json({ error: 'Failed to fetch call status' }, { status: 500 });
  }
}
