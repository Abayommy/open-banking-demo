import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Open Banking Demo API',
    version: 'v3.1.10',
    environment: process.env.NODE_ENV,
    services: {
      api_gateway: 'operational',
      core_bank: 'operational',
      auth_service: 'operational'
    }
  });
}
