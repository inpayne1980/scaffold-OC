import React, { useEffect, useState } from 'react';
import { Card } from '../components/ui/Card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, Users, DollarSign, Activity, Sparkles, Send } from 'lucide-react';
import { generateDashboardInsights, chatWithAssistant } from '../services/geminiService';
import { AuditLogEntry } from '../types';

const mockData = [
  { name: 'Mon', active: 4000, revenue: 2400 },
  { name: 'Tue', active: 3000, revenue: 1398 },
  { name: 'Wed', active: 2000, revenue: 9800 },
  { name: 'Thu', active: 2780, revenue: 3908 },
  { name: 'Fri', active: 1890, revenue: 4800 },
  { name: 'Sat', active: 2390, revenue: 3800 },
  { name: 'Sun', active: 3490, revenue: 4300 },
];

const mockLogs: AuditLogEntry[] = [
  { uuid: '1', action: 'plan_updated', target: 'Pro Plan', created_at: '2 min ago' },
  { uuid: '2', action: 'api_key_created', target: 'production_key', created_at: '1 hour ago' },
  { uuid: '3', action: 'user_invited', target: 'jane@company.com', created_at: '4 hours ago' },
  { uuid: '4', action: 'invoice_paid', target: 'INV-2024-001', created_at: '1 day ago' },
];

export const Dashboard: React.FC = () => {
  const [insight, setInsight] = useState<string>('Analyzing system data...');
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const [isChatting, setIsChatting] = useState(false);

  useEffect(() => {
    // Simulate AI loading
    const loadInsight = async () => {
      // In a real scenario, we'd fetch real stats
      const result = await generateDashboardInsights(mockLogs, { mrr: 12500, users: 1234 });
      setInsight(result);
    };
    loadInsight();
  }, []);

  const handleChat = async () => {
    if (!chatInput.trim()) return;
    setIsChatting(true);
    const newHistory = [...chatHistory, `User: ${chatInput}`];
    setChatHistory(newHistory);
    setChatInput('');
    
    const response = await chatWithAssistant(newHistory, chatInput);
    setChatHistory([...newHistory, `NexusBot: ${response}`]);
    setIsChatting(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg">
              <DollarSign size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Total Revenue</p>
              <div className="flex items-baseline gap-2">
                <h4 className="text-2xl font-bold text-slate-900">$12,500</h4>
                <span className="text-xs text-green-600 flex items-center font-medium">
                  <ArrowUpRight size={12} /> +12%
                </span>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Active Users</p>
              <div className="flex items-baseline gap-2">
                <h4 className="text-2xl font-bold text-slate-900">1,234</h4>
                <span className="text-xs text-green-600 flex items-center font-medium">
                  <ArrowUpRight size={12} /> +4%
                </span>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg">
              <Activity size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">System Status</p>
              <div className="flex items-baseline gap-2">
                <h4 className="text-2xl font-bold text-slate-900">99.9%</h4>
                <span className="text-xs text-slate-500 font-medium">Uptime</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2">
          <Card title="Revenue & Activity" className="h-full">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#6366f1" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* AI Assistant Column */}
        <div className="space-y-6">
           {/* Insights Card */}
           <Card className="bg-gradient-to-br from-indigo-50 to-white border-indigo-100">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="text-indigo-600" size={20} />
              <h3 className="font-semibold text-indigo-900">AI Insights</h3>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              {insight}
            </p>
          </Card>

          {/* Chat Widget */}
          <Card title="Nexus Assistant" className="flex flex-col h-[300px]">
            <div className="flex-1 overflow-y-auto mb-4 space-y-2 p-1">
              {chatHistory.length === 0 && (
                <p className="text-xs text-slate-400 text-center italic mt-10">Ask me about your metrics...</p>
              )}
              {chatHistory.map((msg, i) => (
                <div key={i} className={`text-sm p-2 rounded ${msg.startsWith('User:') ? 'bg-indigo-50 text-indigo-900 ml-4' : 'bg-slate-50 text-slate-800 mr-4'}`}>
                  {msg}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input 
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleChat()}
                placeholder="Ask Nexus..."
                className="flex-1 text-sm border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button 
                onClick={handleChat}
                disabled={isChatting}
                className="bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
              >
                <Send size={16} />
              </button>
            </div>
          </Card>
        </div>
      </div>

      {/* Recent Activity Table */}
      <Card title="Audit Log">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-medium">
              <tr>
                <th className="px-4 py-3">Event</th>
                <th className="px-4 py-3">Target</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockLogs.map((log) => (
                <tr key={log.uuid} className="hover:bg-slate-50/50">
                  <td className="px-4 py-3 font-medium text-slate-800">{log.action.replace('_', ' ').toUpperCase()}</td>
                  <td className="px-4 py-3 text-slate-600">{log.target}</td>
                  <td className="px-4 py-3 text-slate-500">{log.created_at}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Success</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
