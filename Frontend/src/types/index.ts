export type FraudType = 'UPI' | 'Phishing' | 'Job Scam' | 'Investment Scam' | 'Sextortion' | 'Other';

export interface ComplaintPayload {
  fullName: string;
  phoneNumber: string;
  email: string;
  fraudType: FraudType;
  amountLost: number;
  description: string;
  evidence?: File | null;
}

export interface ComplaintResponse {
  complaintId: string;
  fraudType: FraudType;
  urgencyLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  riskScore: number;
  estimatedProcessingPriority: string;
}

export interface StatusResponse {
  complaintId: string;
  currentStatus: string;
  priorityLevel: string;
  assignedUnit: string;
}

export interface DashboardResponse {
  totalComplaints: number;
  highRiskCases: number;
  fraudDistribution: Array<{ name: string; value: number }>;
  complaintsByState: Array<{ state: string; complaints: number }>;
  alerts: Array<{ id: string; title: string; detail: string }>;
  recentHighPriority: Array<{
    id: string;
    name: string;
    fraudType: string;
    riskScore: number;
    status: string;
  }>;
}
