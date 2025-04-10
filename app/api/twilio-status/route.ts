import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const formData = await req.formData();
  const callSid = formData.get('CallSid');
  const callStatus = formData.get('CallStatus');

  console.log(`Call SID: ${callSid} | Status: ${callStatus}`);

  // Optional: Save to DB or emit to WebSocket
  return NextResponse.json({ received: true,st:callStatus });
}
