import { ChangeEvent, FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import PageTransition from '../components/PageTransition';
import usePageTitle from '../hooks/usePageTitle';
import { submitComplaint } from '../services/api';
import { ComplaintPayload, ComplaintResponse, FraudType } from '../types';

const fraudOptions: FraudType[] = ['UPI', 'Phishing', 'Job Scam', 'Investment Scam', 'Sextortion', 'Other'];

const initialForm: ComplaintPayload = {
  fullName: '',
  phoneNumber: '',
  email: '',
  fraudType: 'UPI',
  amountLost: 0,
  description: '',
  evidence: null,
};

const FileComplaintPage = () => {
  usePageTitle('File Complaint');
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof ComplaintPayload, string>>>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ComplaintResponse | null>(null);

  const validate = () => {
    const nextErrors: Partial<Record<keyof ComplaintPayload, string>> = {};
    if (!form.fullName.trim()) nextErrors.fullName = 'Full name is required.';
    if (!/^\d{10}$/.test(form.phoneNumber)) nextErrors.phoneNumber = 'Enter a valid 10-digit phone number.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Enter a valid email.';
    if (form.amountLost < 0) nextErrors.amountLost = 'Amount cannot be negative.';
    if (!form.description.trim()) nextErrors.description = 'Description is required.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'amountLost' ? Number(value) : value,
    }));
  };

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setForm((prev) => ({ ...prev, evidence: file }));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) {
      toast.error('Please fix validation errors.');
      return;
    }

    try {
      setLoading(true);
      const response = await submitComplaint(form);
      setResult(response);
      toast.success('Complaint submitted successfully.');
    } catch {
      toast.error('Failed to submit complaint. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <section className="card border border-slate-200">
          <h2 className="text-2xl font-semibold">File Cybercrime Complaint</h2>
          <form className="mt-6 space-y-4" onSubmit={onSubmit} noValidate>
            {[
              { label: 'Full Name', name: 'fullName', type: 'text' },
              { label: 'Phone Number', name: 'phoneNumber', type: 'tel' },
              { label: 'Email', name: 'email', type: 'email' },
            ].map((field) => (
              <div key={field.name}>
                <label htmlFor={field.name} className="mb-1 block text-sm font-medium">
                  {field.label}
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  value={form[field.name as keyof ComplaintPayload] as string}
                  onChange={onChange}
                  className="input"
                  aria-invalid={Boolean(errors[field.name as keyof ComplaintPayload])}
                />
                {errors[field.name as keyof ComplaintPayload] && (
                  <p className="mt-1 text-xs text-alert">{errors[field.name as keyof ComplaintPayload]}</p>
                )}
              </div>
            ))}

            <div>
              <label htmlFor="fraudType" className="mb-1 block text-sm font-medium">Fraud Type</label>
              <select id="fraudType" name="fraudType" value={form.fraudType} onChange={onChange} className="input">
                {fraudOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="amountLost" className="mb-1 block text-sm font-medium">Amount Lost</label>
              <input
                id="amountLost"
                name="amountLost"
                type="number"
                min="0"
                value={form.amountLost}
                onChange={onChange}
                className="input"
              />
              {errors.amountLost && <p className="mt-1 text-xs text-alert">{errors.amountLost}</p>}
            </div>

            <div>
              <label htmlFor="description" className="mb-1 block text-sm font-medium">Description</label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={onChange}
                rows={5}
                className="input"
              />
              {errors.description && <p className="mt-1 text-xs text-alert">{errors.description}</p>}
            </div>

            <div>
              <label htmlFor="evidence" className="mb-1 block text-sm font-medium">Upload Evidence</label>
              <input id="evidence" name="evidence" type="file" onChange={onFileChange} className="input" />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center rounded-md bg-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-navy/90 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {loading ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Submitting...
                </>
              ) : (
                'Submit Complaint'
              )}
            </button>
          </form>
        </section>

        <aside className="card border border-slate-200">
          <h3 className="text-lg font-semibold">AI Classification Response</h3>
          {result ? (
            <ul className="mt-4 space-y-3 text-sm">
              <li><strong>Complaint ID:</strong> {result.complaintId}</li>
              <li><strong>Fraud Type:</strong> {result.fraudType}</li>
              <li><strong>Urgency Level:</strong> {result.urgencyLevel}</li>
              <li><strong>Risk Score:</strong> {result.riskScore}/100</li>
              <li><strong>Estimated Processing Priority:</strong> {result.estimatedProcessingPriority}</li>
            </ul>
          ) : (
            <p className="mt-3 text-sm text-slate-500">Submit a complaint to view AI risk analysis.</p>
          )}
        </aside>
      </div>
    </PageTransition>
  );
};

export default FileComplaintPage;
