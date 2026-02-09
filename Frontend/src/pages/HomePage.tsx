import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import usePageTitle from '../hooks/usePageTitle';

const HomePage = () => {
  usePageTitle('Home');

  return (
    <PageTransition>
      <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-card md:p-12">
        <p className="mb-3 inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
          National Cybercrime Intelligence Platform
        </p>
        <h1 className="text-3xl font-bold leading-tight md:text-4xl">
          CyberShield AI – Intelligent Cybercrime Reporting System
        </h1>
        <p className="mt-4 max-w-3xl text-slate-600">
          CyberShield AI helps citizens submit fraud complaints securely while AI triages risk, prioritizes urgent
          cases, and protects agencies from report surges through intelligent queue management.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link to="/file-complaint" className="rounded-md bg-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-navy/90">
            File Complaint
          </Link>
          <Link to="/admin-dashboard" className="rounded-md border border-navy px-5 py-3 text-sm font-semibold text-navy transition hover:bg-slate-100">
            Admin Dashboard
          </Link>
        </div>
      </section>
    </PageTransition>
  );
};

export default HomePage;
