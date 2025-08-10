import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { client_id, client_secret, grant_type } = body;

    // Validate client credentials
    if (grant_type !== 'client_credentials') {
      return NextResponse.json(
        { error: 'unsupported_grant_type' },
        { status: 400 }
      );
    }

    // Generate mock token
    const token = {
      access_token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${Date.now()}`,
      token_type: 'Bearer',
      expires_in: 3600,
      scope: 'accounts payments'
    };

    return NextResponse.json(token);
  } catch (error) {
    return NextResponse.json(
      { error: 'server_error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Use POST method to get access token',
    endpoint: '/api/auth/token',
    required_fields: ['client_id', 'client_secret', 'grant_type']
  });
}
