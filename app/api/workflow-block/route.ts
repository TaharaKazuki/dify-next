import { NextRequest, NextResponse } from 'next/server';

const endpoint = `${process.env.DIFY_API_URL}/workflows/run`;
const DIFY_API_KEY = process.env.DIFY_API_WORKFLOW_KEY;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query } = body;
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${DIFY_API_KEY}`,
      },
      body: JSON.stringify({
        inputs: {
          query: query,
        },
        response_mode: 'blocking',
        user: 'user-123',
      }),
    });

    const data = await response.json();
    const outputText = data.data.outputs.result;

    return NextResponse.json(outputText);
  } catch (error) {
    console.error('APIエラー', error);
    return NextResponse.json('Dify側でエラーが発生しました');
  }
}
