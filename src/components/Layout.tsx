import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X, 
  Home, 
  Users, 
  BarChart3, 
  Settings, 
  CreditCard, 
  FileText, 
  UserCircle,
  LogOut,
  Bell,
  Search
} from 'lucide-react';
import { Input } from '@/components/ui/input';

interface LayoutProps {
  children: React.ReactNode;
  userType: 'admin' | 'core' | 'client';
  currentPage?: string;
}

const Layout = ({ children, userType, currentPage }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any stored auth data if needed
    navigate('/');
  };

  const getNavigationItems = () => {
    switch (userType) {
      case 'admin':
        return [
          { name: 'Dashboard', icon: Home, href: '/admin-dashboard' },
          { name: 'User Management', icon: Users, href: '/admin-users' },
          { name: 'Billing & Plans', icon: CreditCard, href: '/admin-billing' },
          { name: 'Audit Logs', icon: FileText, href: '/admin-logs' },
        ];
      case 'core':
        return [
          { name: 'Dashboard', icon: Home, href: '/core-dashboard' },
          { name: 'Clients', icon: Users, href: '/core-clients' },
          { name: 'Reports', icon: BarChart3, href: '/core-reports' },
          { name: 'Subscription', icon: CreditCard, href: '/subscription' },
          { name: 'Profile', icon: UserCircle, href: '/core-profile' },
        ];
      case 'client':
        return [
          { name: 'My Reports', icon: BarChart3, href: '/client-dashboard' },
          { name: 'Profile', icon: UserCircle, href: '/client-profile' },
        ];
      default:
        return [];
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white shadow-sm border-r transition-all duration-300`}>
        <div className="flex items-center justify-between p-4 border-b">
          {sidebarOpen && (
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-semibold">Viz Tec</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>

        <nav className="mt-4">
          <div className="px-2 space-y-1">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-gray-100 hover:text-gray-900 ${
                  currentPage === item.href ? 'bg-blue-50 text-blue-700' : 'text-gray-600'
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {sidebarOpen && item.name}
              </a>
            ))}
          </div>
        </nav>

      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-semibold text-gray-900">
                {currentPage === '/admin-dashboard' && 'Admin Dashboard'}
                {currentPage === '/core-dashboard' && 'Core Dashboard'}
                {currentPage === '/client-dashboard' && 'My Reports'}
                {currentPage === '/core-profile' && 'Profile Settings'}
                {!currentPage && 'Dashboard'}
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-9 w-64"
                />
              </div>
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-700">
                  {userType === 'admin' && 'Admin User'}
                  {userType === 'core' && 'Core User'}
                  {userType === 'client' && 'Client User'}
                </span>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;