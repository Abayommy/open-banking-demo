import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Mock payment response
    const payment = {
      Data: {
        PaymentId: `PMT-${Date.now()}`,
        Status: 'AcceptedSettlementInProcess',
        CreationDateTime: new Date().toISOString(),
        Amount: body.amount || '250.00',
        Currency: 'GBP',
        CreditorName: body.creditorName || 'Jane Doe',
        CreditorAccount: body.creditorAccount || 'GB29NWBK60161331926819',
        Reference: body.reference || 'Invoice #12345'
      },
      Links: {
        Self: '/api/payments'
      }
    };

    return NextResponse.json(payment, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'server_error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Payment Initiation Service',
    endpoints: {
      createPayment: 'POST /api/payments',
      requiredFields: ['amount', 'creditorName', 'creditorAccount', 'reference']
    }
  });
}
