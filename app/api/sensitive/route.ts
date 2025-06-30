import { checkBotId } from 'botid/server';
import { NextRequest, NextResponse } from 'next/server';
 
export async function POST(request: NextRequest) {
  const verification = await checkBotId();
 
  if (verification.isBot) {
    return NextResponse.json({ error: 'Access denied' }, { status: 403 });
  }
 
//   const data = await processUserRequest();
 
  return NextResponse.json({ data: "OK" });
}