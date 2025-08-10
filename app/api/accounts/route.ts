import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Mock account data
  const accounts = {
    Data: {
      Account: [
        {
          AccountId: 'ACC001',
          Currency: 'GBP',
          AccountType: 'Personal',
          AccountSubType: 'CurrentAccount',
          Nickname: 'Main Account',
          Account: {
            SchemeName: 'UK.OBIE.SortCodeAccountNumber',
            Identification: '12345698765432',
            Name: 'John Smith'
          },
          Balance: {
            Amount: '15234.56',
            Currency: 'GBP'
          }
        },
        {
          AccountId: 'ACC002',
          Currency: 'GBP',
          AccountType: 'Personal',
          AccountSubType: 'Savings',
          Nickname: 'Savings Pot',
          Account: {
            SchemeName: 'UK.OBIE.SortCodeAccountNumber',
            Identification: '12345698765433',
            Name: 'John Smith'
          },
          Balance: {
            Amount: '45678.90',
            Currency: 'GBP'
          }
        }
      ]
    },
    Links: {
      Self: 'https://api.corebank.example.com/accounts'
    }
  };

  return NextResponse.json(accounts);
}
