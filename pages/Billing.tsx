import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Check, CreditCard, Zap } from 'lucide-react';
import { Plan, BillingInterval } from '../types';

const plans: Plan[] = [
  {
    uuid: 'p_free',
    name: 'Starter',
    price: 0,
    billing_interval: BillingInterval.MONTH,
    features: ['1 Team Member', 'Basic Analytics', '1000 Events/mo', 'Community Support']
  },
  {
    uuid: 'p_pro',
    name: 'Pro',
    price: 29,
    billing_interval: BillingInterval.MONTH,
    features: ['5 Team Members', 'Advanced Analytics', '50,000 Events/mo', 'Priority Support', 'AI Insights']
  },
  {
    uuid: 'p_ent',
    name: 'Enterprise',
    price: 99,
    billing_interval: BillingInterval.MONTH,
    features: ['Unlimited Members', 'Custom Reporting', 'Unlimited Events', 'Dedicated Manager', 'SSO & Audit Logs']
  }
];

export const Billing: React.FC = () => {
  const [currentPlan, setCurrentPlan] = useState('p_free');
  const [interval, setInterval] = useState<BillingInterval>(BillingInterval.MONTH);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Subscription & Billing</h2>
          <p className="text-slate-500">Manage your plan and payment details</p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-lg self-start">
          <button 
            onClick={() => setInterval(BillingInterval.MONTH)}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${interval === BillingInterval.MONTH ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Monthly
          </button>
          <button 
            onClick={() => setInterval(BillingInterval.YEAR)}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${interval === BillingInterval.YEAR ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Yearly <span className="text-xs text-green-600 ml-1">-20%</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const isCurrent = currentPlan === plan.uuid;
          return (
            <div 
              key={plan.uuid} 
              className={`relative rounded-xl border-2 p-6 bg-white transition-all ${
                isCurrent ? 'border-indigo-600 shadow-lg ring-1 ring-indigo-600' : 'border-slate-100 hover:border-indigo-200'
              }`}
            >
              {plan.name === 'Pro' && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <Zap size={12} fill="currentColor" /> MOST POPULAR
                </div>
              )}
              <h3 className="text-lg font-semibold text-slate-900">{plan.name}</h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-3xl font-bold tracking-tight text-slate-900">
                  ${interval === BillingInterval.YEAR ? Math.floor(plan.price * 0.8) : plan.price}
                </span>
                <span className="ml-1 text-sm font-medium text-slate-500">/{interval}</span>
              </div>
              <ul className="mt-6 space-y-3">
                {plan.features.map((feat, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-slate-600">
                    <Check size={18} className="text-green-500 shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setCurrentPlan(plan.uuid)}
                disabled={isCurrent}
                className={`mt-8 w-full py-2.5 px-4 rounded-lg text-sm font-semibold transition-colors ${
                  isCurrent 
                    ? 'bg-slate-100 text-slate-400 cursor-default'
                    : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                {isCurrent ? 'Current Plan' : 'Upgrade'}
              </button>
            </div>
          );
        })}
      </div>

      <Card title="Payment Method">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-slate-100 p-3 rounded-md">
              <CreditCard className="text-slate-600" />
            </div>
            <div>
              <p className="font-medium text-slate-900">Visa ending in 4242</p>
              <p className="text-sm text-slate-500">Expires 12/2025</p>
            </div>
          </div>
          <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
            Edit
          </button>
        </div>
      </Card>
    </div>
  );
};
