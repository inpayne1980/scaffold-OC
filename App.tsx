import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { Billing } from './pages/Billing';
import { Settings } from './pages/Settings';
import { Auth } from './pages/Auth';
import { User, Profile, Subscription } from './types';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  // Mock Global State that would come from Context
  const [user] = useState<User>({
    uuid: 'u_123',
    email: 'user@nexus.com',
    role: 'admin' as any,
    created_at: new Date().toISOString()
  });

  if (!isAuthenticated) {
    return <Auth onLogin={() => setIsAuthenticated(true)} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'billing': return <Billing />;
      case 'settings':
      case 'security': 
        return <Settings />;
      case 'audit':
        // Reuse dashboard but focused, or just show Dashboard for demo simplicity
        return <Dashboard />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      <Sidebar 
        currentPage={currentPage} 
        onNavigate={setCurrentPage} 
        onLogout={() => setIsAuthenticated(false)} 
      />
      
      <main className="flex-1 ml-64 p-8 overflow-y-auto h-screen">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 capitalize">{currentPage.replace('-', ' ')}</h1>
            <p className="text-slate-500 text-sm">Welcome back, {user.email}</p>
          </div>
          <div className="flex items-center gap-3">
             <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-slate-900">Nexus Admin</p>
                <p className="text-xs text-slate-500">Workspace Owner</p>
             </div>
             <img 
               src="https://picsum.photos/40/40" 
               alt="User" 
               className="w-10 h-10 rounded-full border border-slate-200"
             />
          </div>
        </header>
        
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
