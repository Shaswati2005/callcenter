export async function POST(req: Request) {
  const form = await req.formData();
  const recordingUrl = form.get('RecordingUrl');
  console.log('Recording available at:', recordingUrl);
  return new Response("OK");
}
