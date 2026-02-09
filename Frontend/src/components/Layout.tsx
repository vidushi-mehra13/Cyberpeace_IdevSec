import { Link, NavLink } from 'react-router-dom';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/file-complaint', label: 'File Complaint' },
  { to: '/track-complaint', label: 'Track Complaint' },
  { to: '/admin-dashboard', label: 'Admin Dashboard' },
];

const Layout = ({ children }: LayoutProps) => (
  <div className="min-h-screen bg-slatebg text-navy">
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        <Link to="/" className="text-lg font-semibold tracking-tight">CyberShield AI</Link>
        <nav className="flex flex-wrap gap-2 md:gap-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm font-medium transition ${
                  isActive ? 'bg-navy text-white' : 'text-slate-600 hover:bg-slate-100'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
    <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">{children}</main>
  </div>
);

export default Layout;
