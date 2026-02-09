import axios from 'axios';
import {
  ComplaintPayload,
  ComplaintResponse,
  DashboardResponse,
  StatusResponse,
} from '../types';

const api = axios.create({
  baseURL: '/',
  timeout: 7000,
});

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const useMock = true;

export const submitComplaint = async (payload: ComplaintPayload): Promise<ComplaintResponse> => {
  if (useMock) {
    await wait(1200);
    const score = Math.min(99, Math.max(10, Math.round((payload.amountLost / 1000) * 12)));
    return {
      complaintId: `CYB-${Date.now().toString().slice(-6)}`,
      fraudType: payload.fraudType,
      urgencyLevel: score > 80 ? 'Critical' : score > 55 ? 'High' : score > 30 ? 'Medium' : 'Low',
      riskScore: score,
      estimatedProcessingPriority: score > 60 ? 'Priority Queue A (under 2 hours)' : 'Queue B (under 24 hours)',
    };
  }

  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      formData.append(key, value as string | Blob);
    }
  });
  const { data } = await api.post<ComplaintResponse>('/api/complaint', formData);
  return data;
};

export const getComplaintStatus = async (id: string): Promise<StatusResponse> => {
  if (useMock) {
    await wait(800);
    return {
      complaintId: id,
      currentStatus: 'Under Investigation',
      priorityLevel: 'High',
      assignedUnit: 'State Cyber Response Cell',
    };
  }
  const { data } = await api.get<StatusResponse>(`/api/status/${id}`);
  return data;
};

export const getDashboardData = async (): Promise<DashboardResponse> => {
  if (useMock) {
    await wait(900);
    return {
      totalComplaints: 894,
      highRiskCases: 217,
      fraudDistribution: [
        { name: 'UPI', value: 230 },
        { name: 'Phishing', value: 188 },
        { name: 'Job Scam', value: 130 },
        { name: 'Investment Scam', value: 170 },
        { name: 'Sextortion', value: 91 },
        { name: 'Other', value: 85 },
      ],
      complaintsByState: [
        { state: 'Maharashtra', complaints: 160 },
        { state: 'Karnataka', complaints: 145 },
        { state: 'Delhi', complaints: 120 },
        { state: 'Tamil Nadu', complaints: 110 },
        { state: 'UP', complaints: 95 },
      ],
      alerts: [
        { id: 'A1', title: 'Phishing Surge', detail: '41 reports in the last hour from metro regions.' },
        { id: 'A2', title: 'UPI Fraud Cluster', detail: 'Spike detected tied to 5 suspicious accounts.' },
      ],
      recentHighPriority: [
        { id: 'CYB-342111', name: 'Amit Sharma', fraudType: 'Investment Scam', riskScore: 91, status: 'Escalated' },
        { id: 'CYB-341908', name: 'Neha Verma', fraudType: 'Sextortion', riskScore: 88, status: 'Assigned' },
        { id: 'CYB-341801', name: 'Rohan Das', fraudType: 'UPI', riskScore: 83, status: 'Under Review' },
      ],
    };
  }
  const { data } = await api.get<DashboardResponse>('/api/dashboard');
  return data;
};
