import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import PageTransition from '../components/PageTransition';
import usePageTitle from '../hooks/usePageTitle';
import { getComplaintStatus } from '../services/api';
import { StatusResponse } from '../types';

const TrackComplaintPage = () => {
  usePageTitle('Track Complaint');
  const [complaintId, setComplaintId] = useState('');
  const [status, setStatus] = useState<StatusResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!complaintId.trim()) {
      toast.error('Please enter a Complaint ID.');
      return;
    }

    try {
      setLoading(true);
      const response = await getComplaintStatus(complaintId.trim());
      setStatus(response);
      toast.success('Status fetched successfully.');
    } catch {
      toast.error('Unable to fetch status at the moment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <section className="mx-auto max-w-3xl space-y-6">
        <div className="card border border-slate-200">
          <h2 className="text-2xl font-semibold">Track Complaint</h2>
          <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-3 sm:flex-row">
            <div className="flex-1">
              <label htmlFor="complaintId" className="mb-1 block text-sm font-medium">Complaint ID</label>
              <input
                id="complaintId"
                value={complaintId}
                onChange={(event) => setComplaintId(event.target.value)}
                className="input"
                placeholder="e.g. CYB-342111"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-6 rounded-md bg-navy px-5 py-3 text-sm font-semibold text-white hover:bg-navy/90 disabled:bg-slate-400"
            >
              {loading ? 'Fetching...' : 'Fetch Status'}
            </button>
          </form>
        </div>

        {status && (
          <div className="card border border-slate-200">
            <h3 className="text-lg font-semibold">Status Overview</h3>
            <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              <p><strong>Complaint ID:</strong> {status.complaintId}</p>
              <p><strong>Current Status:</strong> {status.currentStatus}</p>
              <p><strong>Priority Level:</strong> {status.priorityLevel}</p>
              <p><strong>Assigned Unit:</strong> {status.assignedUnit}</p>
            </div>
          </div>
        )}
      </section>
    </PageTransition>
  );
};

export default TrackComplaintPage;
