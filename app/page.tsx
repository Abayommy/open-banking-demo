'use client';

import React, { useState } from 'react';
import { 
  Activity, Users, CreditCard, Shield, Database, 
  Home, FileText, Building, CheckCircle, ArrowRight,
  Key, Lock, RefreshCw, Eye, Send, AlertCircle
} from 'lucide-react';

export default function OpenBankingDemo() {
  const [activeView, setActiveView] = useState('overview');
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [isOnboarding, setIsOnboarding] = useState(false);
  const [aisStep, setAisStep] = useState(0);
  const [isAisFlow, setIsAisFlow] = useState(false);
  const [pisStep, setPisStep] = useState(0);
  const [isPisFlow, setIsPisFlow] = useState(false);
  const [accounts, setAccounts] = useState<any[]>([]);
  const [payment, setPayment] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const startOnboarding = () => {
    setIsOnboarding(true);
    setOnboardingStep(0);
  };

  const nextStep = () => {
    if (onboardingStep < 4) {
      setOnboardingStep(onboardingStep + 1);
    } else {
      setIsOnboarding(false);
      setOnboardingStep(0);
    }
  };

  const startAisFlow = () => {
    setIsAisFlow(true);
    setAisStep(0);
  };

  const nextAisStep = async () => {
    if (aisStep === 2) {
      setIsLoading(true);
      try {
        const response = await fetch('/api/accounts');
        const data = await response.json();
        setAccounts(data.Data.Account);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
      setIsLoading(false);
    }
    
    if (aisStep < 3) {
      setAisStep(aisStep + 1);
    } else {
      setIsAisFlow(false);
      setAisStep(0);
      setAccounts([]);
    }
  };

  const startPisFlow = () => {
    setIsPisFlow(true);
    setPisStep(0);
  };

  const nextPisStep = async () => {
    if (pisStep === 2) {
      setIsLoading(true);
      try {
        const response = await fetch('/api/payments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: '250.00',
            creditorName: 'Jane Doe',
            creditorAccount: 'GB29NWBK60161331926819',
            reference: 'Invoice #12345'
          })
        });
        const data = await response.json();
        setPayment(data.Data);
      } catch (error) {
        console.error('Error creating payment:', error);
      }
      setIsLoading(false);
    }
    
    if (pisStep < 4) {
      setPisStep(pisStep + 1);
    } else {
      setIsPisFlow(false);
      setPisStep(0);
      setPayment(null);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-4">
        <div className="flex items-center mb-8">
          <Database className="w-8 h-8 text-blue-500 mr-2" />
          <h1 className="text-xl font-bold">Open Banking Demo</h1>
        </div>
        
        <nav className="space-y-2">
          <button
            onClick={() => {setActiveView('overview'); setIsAisFlow(false); setIsOnboarding(false); setIsPisFlow(false);}}
            className={`w-full flex items-center p-3 rounded-lg transition ${
              activeView === 'overview' ? 'bg-blue-600' : 'hover:bg-gray-800'
            }`}
          >
            <Home className="w-5 h-5 mr-3" />
            Overview
          </button>
          
          <button
            onClick={() => {setActiveView('registry'); setIsAisFlow(false); setIsPisFlow(false);}}
            className={`w-full flex items-center p-3 rounded-lg transition ${
              activeView === 'registry' ? 'bg-blue-600' : 'hover:bg-gray-800'
            }`}
          >
            <Users className="w-5 h-5 mr-3" />
            PSP Registry
          </button>
          
          <button
            onClick={() => {setActiveView('ais'); setIsOnboarding(false); setIsPisFlow(false);}}
            className={`w-full flex items-center p-3 rounded-lg transition ${
              activeView === 'ais' ? 'bg-blue-600' : 'hover:bg-gray-800'
            }`}
          >
            <FileText className="w-5 h-5 mr-3" />
            Account Info (AIS)
          </button>
          
          <button
            onClick={() => {setActiveView('pis'); setIsOnboarding(false); setIsAisFlow(false);}}
            className={`w-full flex items-center p-3 rounded-lg transition ${
              activeView === 'pis' ? 'bg-blue-600' : 'hover:bg-gray-800'
            }`}
          >
            <CreditCard className="w-5 h-5 mr-3" />
            Payments (PIS)
          </button>

          <button
            onClick={() => {setActiveView('security'); setIsOnboarding(false); setIsAisFlow(false); setIsPisFlow(false);}}
            className={`w-full flex items-center p-3 rounded-lg transition ${
              activeView === 'security' ? 'bg-blue-600' : 'hover:bg-gray-800'
            }`}
          >
            <Shield className="w-5 h-5 mr-3" />
            Security
          </button>
        </nav>

        <div className="mt-8 p-4 bg-gray-800 rounded-lg">
          <h3 className="text-sm font-semibold mb-2">System Status</h3>
          <div className="space-y-2">
            <div className="flex items-center text-xs">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              API Gateway: Active
            </div>
            <div className="flex items-center text-xs">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Core Bank: Connected
            </div>
            <div className="flex items-center text-xs">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Auth Service: Ready
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <h2 className="text-3xl font-bold mb-6">
          {activeView === 'overview' && 'Open Banking Demo Platform'}
          {activeView === 'registry' && 'PSP Registry & Onboarding'}
          {activeView === 'ais' && 'Account Information Service (AIS)'}
          {activeView === 'pis' && 'Payment Initiation Service (PIS)'}
          {activeView === 'security' && 'Security & API Gateway'}
        </h2>
        
        {/* Overview */}
        {activeView === 'overview' && (
          <div>
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow p-6">
                <Users className="w-8 h-8 text-blue-500 mb-2" />
                <h3 className="text-lg font-semibold">PSP Registry</h3>
                <p className="text-gray-500">3 Active Providers</p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <Activity className="w-8 h-8 text-green-500 mb-2" />
                <h3 className="text-lg font-semibold">API Calls</h3>
                <p className="text-gray-500">124,532 Today</p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <Shield className="w-8 h-8 text-purple-500 mb-2" />
                <h3 className="text-lg font-semibold">Security</h3>
                <p className="text-gray-500">All Systems Secure</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-3 gap-4">
                <button 
                  onClick={() => {setActiveView('registry'); setIsOnboarding(true);}}
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500"
                >
                  <Users className="w-6 h-6 text-blue-500 mb-2" />
                  <p>Onboard PSP</p>
                </button>
                <button 
                  onClick={() => {setActiveView('ais'); setIsAisFlow(true);}}
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-500"
                >
                  <FileText className="w-6 h-6 text-green-500 mb-2" />
                  <p>Test AIS Flow</p>
                </button>
                <button 
                  onClick={() => {setActiveView('pis'); setIsPisFlow(true);}}
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500"
                >
                  <CreditCard className="w-6 h-6 text-purple-500 mb-2" />
                  <p>Test PIS Flow</p>
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* PSP Registry */}
        {activeView === 'registry' && !isOnboarding && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4">Registered PSPs</h3>
            <table className="w-full mb-6">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">PSP Name</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Certificate</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">FinTech Solutions Ltd</td>
                  <td className="p-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">Active</span>
                  </td>
                  <td className="p-2">Valid</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Digital Payments Inc</td>
                  <td className="p-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">Active</span>
                  </td>
                  <td className="p-2">Valid</td>
                </tr>
              </tbody>
            </table>
            <button 
              onClick={startOnboarding}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Onboard New PSP
            </button>
          </div>
        )}

        {/* PSP Onboarding Flow */}
        {activeView === 'registry' && isOnboarding && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4">PSP Onboarding Flow</h3>
            <div className="flex mb-8">
              {['Registration', 'KYC', 'Certificate', 'API Keys', 'Complete'].map((step, index) => (
                <div key={index} className="flex items-center flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    onboardingStep > index ? 'bg-green-500 text-white' : 
                    onboardingStep === index ? 'bg-blue-500 text-white' : 'bg-gray-300'
                  }`}>
                    {onboardingStep > index ? <CheckCircle className="w-5 h-5" /> : index + 1}
                  </div>
                  {index < 4 && <div className={`flex-1 h-1 mx-2 ${
                    onboardingStep > index ? 'bg-green-500' : 'bg-gray-300'
                  }`} />}
                </div>
              ))}
            </div>
            <div className="mb-6">
              {onboardingStep === 0 && (
                <div>
                  <h4 className="font-semibold mb-3">PSP Registration</h4>
                  <input placeholder="Company Name" className="w-full p-2 border rounded mb-2" />
                  <input placeholder="Registration Number" className="w-full p-2 border rounded mb-2" />
                  <input placeholder="Contact Email" className="w-full p-2 border rounded" />
                </div>
              )}
              {onboardingStep === 1 && (
                <div>
                  <h4 className="font-semibold mb-3">KYC Verification</h4>
                  <div className="bg-yellow-50 p-4 rounded">
                    <p className="text-sm">Verifying company details...</p>
                    <p className="text-xs mt-2">✓ Company registration validated</p>
                    <p className="text-xs">✓ Director verification complete</p>
                    <p className="text-xs">✓ AML checks passed</p>
                  </div>
                </div>
              )}
              {onboardingStep === 2 && (
                <div>
                  <h4 className="font-semibold mb-3">Certificate Generation</h4>
                  <div className="bg-gray-100 p-4 rounded">
                    <Lock className="w-8 h-8 text-green-500 mb-2" />
                    <p className="font-mono text-sm">QWAC Certificate Generated</p>
                    <p className="text-xs mt-2">Valid until: 2025-08-09</p>
                  </div>
                </div>
              )}
              {onboardingStep === 3 && (
                <div>
                  <h4 className="font-semibold mb-3">API Key Provisioning</h4>
                  <div className="bg-gray-100 p-4 rounded">
                    <Key className="w-8 h-8 text-blue-500 mb-2" />
                    <p className="font-mono text-sm">Client ID: psp_3_client_2024</p>
                    <p className="font-mono text-sm">API Key: sk_live_PSP003_******</p>
                  </div>
                </div>
              )}
              {onboardingStep === 4 && (
                <div className="text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h4 className="font-semibold text-xl mb-2">Onboarding Complete!</h4>
                  <p className="text-gray-600">PSP has been successfully registered</p>
                </div>
              )}
            </div>
            <button 
              onClick={nextStep}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
            >
              {onboardingStep === 4 ? 'Finish' : 'Next Step'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        )}
        
        {/* AIS */}
        {activeView === 'ais' && !isAisFlow && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4">Account Information Service</h3>
            <p className="mb-4">Access customer account information with consent</p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="border rounded-lg p-4">
                <Eye className="w-8 h-8 text-green-500 mb-2" />
                <h4 className="font-semibold">View Accounts</h4>
                <p className="text-sm text-gray-600">Access account details and balances</p>
              </div>
              <div className="border rounded-lg p-4">
                <Activity className="w-8 h-8 text-blue-500 mb-2" />
                <h4 className="font-semibold">Transaction History</h4>
                <p className="text-sm text-gray-600">Retrieve transaction records</p>
              </div>
            </div>
            <button 
              onClick={startAisFlow}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Start AIS Flow
            </button>
          </div>
        )}

        {/* AIS Flow */}
        {activeView === 'ais' && isAisFlow && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4">AIS Transaction Flow</h3>
            <div className="flex mb-8">
              {['OAuth Request', 'Consent', 'Authorization', 'Account Data'].map((step, index) => (
                <div key={index} className="flex items-center flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    aisStep > index ? 'bg-green-500 text-white' : 
                    aisStep === index ? 'bg-blue-500 text-white' : 'bg-gray-300'
                  }`}>
                    {aisStep > index ? <CheckCircle className="w-5 h-5" /> : index + 1}
                  </div>
                  {index < 3 && <div className={`flex-1 h-1 mx-2 ${
                    aisStep > index ? 'bg-green-500' : 'bg-gray-300'
                  }`} />}
                </div>
              ))}
            </div>
            <div className="mb-6">
              {aisStep === 0 && (
                <div>
                  <h4 className="font-semibold mb-3">OAuth 2.0 Request</h4>
                  <div className="bg-gray-100 p-4 rounded mb-4">
                    <p className="text-sm font-mono">GET /authorize</p>
                    <p className="text-sm mt-2">Parameters:</p>
                    <ul className="text-xs font-mono mt-1">
                      <li>response_type: code</li>
                      <li>client_id: psp_3_client_2024</li>
                      <li>scope: accounts</li>
                    </ul>
                  </div>
                </div>
              )}
              {aisStep === 1 && (
                <div>
                  <h4 className="font-semibold mb-3">Consent Request</h4>
                  <div className="bg-blue-50 p-4 rounded mb-4">
                    <p className="font-semibold mb-2">Requesting access to:</p>
                    <ul className="text-sm space-y-1">
                      <li>✓ Account details</li>
                      <li>✓ Account balances</li>
                      <li>✓ Transaction history</li>
                    </ul>
                    <p className="text-xs mt-2 text-gray-600">Valid for: 90 days</p>
                  </div>
                </div>
              )}
              {aisStep === 2 && (
                <div>
                  <h4 className="font-semibold mb-3">Core Bank Authorization</h4>
                  <div className="bg-yellow-50 p-4 rounded mb-4">
                    <p className="font-semibold mb-2">Core Bank Login</p>
                    <input placeholder="Username" className="w-full p-2 border rounded mb-2" defaultValue="john.smith" />
                    <input type="password" placeholder="Password" className="w-full p-2 border rounded mb-2" defaultValue="••••••••" />
                    <p className="text-sm mt-2">SMS OTP: 123456</p>
                  </div>
                </div>
              )}
              {aisStep === 3 && (
                <div>
                  <h4 className="font-semibold mb-3">Account Information Retrieved</h4>
                  {isLoading ? (
                    <div className="flex items-center justify-center p-8">
                      <RefreshCw className="w-8 h-8 animate-spin text-blue-500" />
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {accounts.map((account, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-semibold">{account.AccountType} - {account.AccountSubType}</p>
                              <p className="text-sm text-gray-600">{account.Nickname}</p>
                              <p className="text-xs text-gray-500">Account: {account.Account.Identification}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold">£{account.Balance.Amount}</p>
                              <p className="text-sm text-gray-600">{account.Currency}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            <button 
              onClick={nextAisStep}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center"
            >
              {aisStep === 3 ? 'Complete' : 'Continue'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        )}
        
        {/* PIS */}
        {activeView === 'pis' && !isPisFlow && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4">Payment Initiation Service</h3>
            <p className="mb-4">Initiate payments on behalf of customers</p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="border rounded-lg p-4">
                <CreditCard className="w-8 h-8 text-purple-500 mb-2" />
                <h4 className="font-semibold">Domestic Payments</h4>
                <p className="text-sm text-gray-600">UK Faster Payments</p>
              </div>
              <div className="border rounded-lg p-4">
                <Building className="w-8 h-8 text-blue-500 mb-2" />
                <h4 className="font-semibold">International</h4>
                <p className="text-sm text-gray-600">SEPA & SWIFT transfers</p>
              </div>
            </div>
            <button 
              onClick={startPisFlow}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            >
              Start PIS Flow
            </button>
          </div>
        )}

        {/* PIS Flow */}
        {activeView === 'pis' && isPisFlow && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4">Payment Initiation Flow</h3>
            
            <div className="flex mb-8">
              {['Payment Details', 'Consent', 'SCA', 'Execution', 'Confirmation'].map((step, index) => (
                <div key={index} className="flex items-center flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    pisStep > index ? 'bg-green-500 text-white' : 
                    pisStep === index ? 'bg-purple-500 text-white' : 'bg-gray-300'
                  }`}>
                    {pisStep > index ? <CheckCircle className="w-5 h-5" /> : index + 1}
                  </div>
                  {index < 4 && <div className={`flex-1 h-1 mx-2 ${
                    pisStep > index ? 'bg-green-500' : 'bg-gray-300'
                  }`} />}
                </div>
              ))}
            </div>

            <div className="mb-6">
              {pisStep === 0 && (
                <div>
                  <h4 className="font-semibold mb-3">Payment Details</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-600">Creditor Account</label>
                      <input className="w-full p-2 border rounded" defaultValue="GB29NWBK60161331926819" />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Creditor Name</label>
                      <input className="w-full p-2 border rounded" defaultValue="Jane Doe" />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Amount</label>
                      <input className="w-full p-2 border rounded" defaultValue="250.00 GBP" />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Reference</label>
                      <input className="w-full p-2 border rounded" defaultValue="Invoice #12345" />
                    </div>
                  </div>
                </div>
              )}

              {pisStep === 1 && (
                <div>
                  <h4 className="font-semibold mb-3">Payment Consent</h4>
                  <div className="bg-purple-50 p-4 rounded mb-4">
                    <p className="font-semibold mb-2">Payment Summary:</p>
                    <div className="text-sm space-y-1">
                      <p>From: Current Account (...5432)</p>
                      <p>To: Jane Doe (...6819)</p>
                      <p>Amount: £250.00</p>
                      <p>Reference: Invoice #12345</p>
                      <p>Execution: Immediate</p>
                    </div>
                  </div>
                </div>
              )}

              {pisStep === 2 && (
                <div>
                  <h4 className="font-semibold mb-3">Strong Customer Authentication</h4>
                  <div className="bg-yellow-50 p-4 rounded mb-4">
                    <AlertCircle className="w-8 h-8 text-yellow-600 mb-2" />
                    <p className="font-semibold mb-2">Core Bank SCA</p>
                    <p className="text-sm mb-2">Enter SMS code sent to ****1234</p>
                    <input placeholder="Enter OTP" className="w-full p-2 border rounded" defaultValue="789012" />
                  </div>
                </div>
              )}

              {pisStep === 3 && (
                <div>
                  <h4 className="font-semibold mb-3">Payment Execution</h4>
                  <div className="bg-blue-50 p-4 rounded mb-4">
                    {isLoading ? (
                      <div className="flex items-center">
                        <RefreshCw className="w-5 h-5 text-blue-500 animate-spin mr-2" />
                        <p className="font-semibold">Processing Payment...</p>
                      </div>
                    ) : payment && (
                      <div>
                        <Send className="w-8 h-8 text-blue-500 mb-2" />
                        <p className="font-semibold mb-2">Payment Initiated</p>
                        <div className="text-sm space-y-1">
                          <p>Payment ID: {payment.PaymentId}</p>
                          <p>Status: {payment.Status}</p>
                          <p>Amount: £{payment.Amount}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {pisStep === 4 && (
                <div className="text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h4 className="font-semibold text-xl mb-2">Payment Successful!</h4>
                  <p className="text-gray-600 mb-2">Transaction completed</p>
                  {payment && (
                    <div className="bg-green-50 p-4 rounded text-sm">
                      <p>Payment ID: {payment.PaymentId}</p>
                      <p>Amount: £{payment.Amount} {payment.Currency}</p>
                      <p>To: {payment.CreditorName}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <button 
              onClick={nextPisStep}
              className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 flex items-center"
            >
              {pisStep === 4 ? 'Complete' : 'Continue'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        )}

        {/* Security */}
        {activeView === 'security' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4">Security & API Gateway</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  API Gateway Layer
                </h4>
                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                  <li>• Rate limiting: 100 requests/minute</li>
                  <li>• DDoS protection enabled</li>
                  <li>• Request/Response logging</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold flex items-center">
                  <Lock className="w-5 h-5 mr-2" />
                  Authentication
                </h4>
                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                  <li>• OAuth 2.0 with PKCE</li>
                  <li>• JWT tokens (RS256)</li>
                  <li>• Consent-based access</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold flex items-center">
                  <Key className="w-5 h-5 mr-2" />
                  Certificates
                </h4>
                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                  <li>• eIDAS QWAC certificates</li>
                  <li>• mTLS for API communication</li>
                  <li>• Certificate pinning</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gray-900 text-green-400 rounded font-mono text-xs">
              <p>{`GET /api/health → {"status": "healthy"}`}</p>
              <p>{`POST /api/auth/token → {"access_token": "..."}`}</p>
              <p>{`GET /api/accounts → {"Data": {"Account": [...]}}`}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
