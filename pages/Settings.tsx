import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { User, Mail, Shield, Plus, Trash2 } from 'lucide-react';
import { ApiKey } from '../types';

export const Settings: React.FC = () => {
  const [keys, setKeys] = useState<ApiKey[]>([
    { uuid: 'k_1', key: 'nk_live_....................4a21', created_at: '2023-10-01', revoked: false },
    { uuid: 'k_2', key: 'nk_test_....................b892', created_at: '2023-11-15', revoked: false }
  ]);

  const generateKey = () => {
    const newKey: ApiKey = {
      uuid: `k_${Date.now()}`,
      key: `nk_live_${Math.random().toString(36).substring(2)}`,
      created_at: new Date().toISOString().split('T')[0],
      revoked: false
    };
    setKeys([...keys, newKey]);
  };

  const revokeKey = (uuid: string) => {
    setKeys(keys.map(k => k.uuid === uuid ? { ...k, revoked: true } : k));
  };

  return (
    <div className="space-y-8">
      <div className="max-w-2xl space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">General Settings</h2>
          <p className="text-slate-500">Manage your profile and account preferences.</p>
        </div>

        <Card title="Profile">
          <div className="flex items-start gap-6">
            <div className="relative">
              <img 
                src="https://picsum.photos/100/100" 
                alt="Avatar" 
                className="w-20 h-20 rounded-full object-cover ring-4 ring-slate-50"
              />
              <button className="absolute bottom-0 right-0 bg-white border border-slate-200 p-1 rounded-full shadow-sm hover:bg-slate-50">
                <User size={14} className="text-slate-600" />
              </button>
            </div>
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Display Name</label>
                  <input 
                    type="text" 
                    defaultValue="Alex Johnson"
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-2.5 text-slate-400" />
                    <input 
                      type="email" 
                      defaultValue="alex@nexus-saas.com"
                      className="w-full rounded-md border border-slate-300 pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                 <button className="bg-slate-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-800">
                   Save Changes
                 </button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="max-w-4xl space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Developer Access</h2>
          <p className="text-slate-500">Manage API keys for external integrations.</p>
        </div>

        <Card 
          title="API Keys" 
          action={
            <button onClick={generateKey} className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700">
              <Plus size={16} /> Generate New Key
            </button>
          }
        >
          <div className="space-y-4">
            {keys.map((key) => (
              <div key={key.uuid} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-md ${key.revoked ? 'bg-slate-200 text-slate-500' : 'bg-indigo-100 text-indigo-600'}`}>
                    <Shield size={20} />
                  </div>
                  <div>
                    <code className={`text-sm font-mono ${key.revoked ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                      {key.key}
                    </code>
                    <p className="text-xs text-slate-500">Created: {key.created_at}</p>
                  </div>
                </div>
                {!key.revoked && (
                  <button 
                    onClick={() => revokeKey(key.uuid)}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                    title="Revoke Key"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
                {key.revoked && <span className="text-xs font-medium text-slate-400 px-2">Revoked</span>}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
