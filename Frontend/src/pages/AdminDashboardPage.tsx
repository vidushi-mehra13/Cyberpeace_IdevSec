import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from 'recharts';
import PageTransition from '../components/PageTransition';
import StatCard from '../components/StatCard';
import usePageTitle from '../hooks/usePageTitle';
import { getDashboardData } from '../services/api';
import { DashboardResponse } from '../types';

const COLORS = ['#0b1f3a', '#1f3b5c', '#3c6382', '#5f87a6', '#86a9c4', '#adc9de'];

const AdminDashboardPage = () => {
  usePageTitle('Admin Dashboard');
  const [data, setData] = useState<DashboardResponse | null>(null);

  useEffect(() => {
    getDashboardData().then(setData);
  }, []);

  if (!data) {
    return <p className="text-center text-slate-500">Loading dashboard...</p>;
  }

  return (
    <PageTransition>
      <div className="space-y-6">
        <section className="grid gap-4 sm:grid-cols-2">
          <StatCard label="Total Complaints" value={data.totalComplaints} />
          <StatCard label="High Risk Cases" value={data.highRiskCases} />
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="card border border-slate-200">
            <h3 className="mb-4 text-lg font-semibold">Fraud Type Distribution</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={data.fraudDistribution} dataKey="value" nameKey="name" outerRadius={100}>
                    {data.fraudDistribution.map((entry, index) => (
                      <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card border border-slate-200">
            <h3 className="mb-4 text-lg font-semibold">Complaints by State</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.complaintsByState}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="state" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="complaints" fill="#0b1f3a" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        <section className="card border border-alert/20">
          <h3 className="text-lg font-semibold text-alert">Live Risk Alerts</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {data.alerts.map((alert) => (
              <article key={alert.id} className="rounded-lg border border-alert/30 bg-red-50 p-4">
                <p className="font-semibold text-alert">{alert.title}</p>
                <p className="mt-1 text-sm text-red-900/80">{alert.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="card border border-slate-200">
          <h3 className="text-lg font-semibold">Recent High Priority Complaints</h3>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b text-slate-500">
                  <th className="px-2 py-2">Complaint ID</th>
                  <th className="px-2 py-2">Name</th>
                  <th className="px-2 py-2">Fraud Type</th>
                  <th className="px-2 py-2">Risk Score</th>
                  <th className="px-2 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.recentHighPriority.map((item) => (
                  <tr key={item.id} className="border-b last:border-none">
                    <td className="px-2 py-3 font-medium">{item.id}</td>
                    <td className="px-2 py-3">{item.name}</td>
                    <td className="px-2 py-3">{item.fraudType}</td>
                    <td className="px-2 py-3">{item.riskScore}</td>
                    <td className="px-2 py-3">{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default AdminDashboardPage;
