export interface DataRecord {
  id: string;
  invoice_number: string;
  vendor_name: string;
  invoice_date: string;
  due_date: string;
  amount: number;
  status: 'PENDING' | 'APPROVED' | 'PAID' | 'OPEN';
  created_at: string;
  updated_at: string;
  module: 'Payables' | 'Receivables' | 'Procurement' | 'Inventory' | 'General Ledger' | 'Fixed Assets';
}

export const mockData: DataRecord[] = [
  {
    id: '1',
    invoice_number: 'INV-001',
    vendor_name: 'ABC Supplies Inc',
    invoice_date: '2024-01-15',
    due_date: '2024-02-15',
    amount: 1500,
    status: 'PENDING',
    created_at: '2025-09-25T07:20:17.234831+00:00',
    updated_at: '2025-09-25T07:20:17.234831+00:00',
    module: 'Payables'
  },
  {
    id: '2',
    invoice_number: 'INV-002',
    vendor_name: 'XYZ Services Ltd',
    invoice_date: '2024-01-20',
    due_date: '2024-02-20',
    amount: 2750.5,
    status: 'APPROVED',
    created_at: '2025-09-25T07:20:17.234831+00:00',
    updated_at: '2025-09-25T07:20:17.234831+00:00',
    module: 'Payables'
  },
  {
    id: '3',
    invoice_number: 'INV-003',
    vendor_name: 'Tech Solutions Corp',
    invoice_date: '2024-01-25',
    due_date: '2024-02-25',
    amount: 5200,
    status: 'PAID',
    created_at: '2025-09-25T07:20:17.234831+00:00',
    updated_at: '2025-09-25T07:20:17.234831+00:00',
    module: 'Payables'
  },
  {
    id: '4',
    invoice_number: 'AR-001',
    vendor_name: '-',
    invoice_date: '2024-01-10',
    due_date: '2024-02-10',
    amount: 3200,
    status: 'OPEN',
    created_at: '2025-09-25T07:20:17.234831+00:00',
    updated_at: '2025-09-25T07:20:17.234831+00:00',
    module: 'Receivables'
  },
  {
    id: '5',
    invoice_number: 'PO-001',
    vendor_name: 'Industrial Supplies Co',
    invoice_date: '2024-01-12',
    due_date: '2024-02-12',
    amount: 8750,
    status: 'APPROVED',
    created_at: '2025-09-25T07:20:17.234831+00:00',
    updated_at: '2025-09-25T07:20:17.234831+00:00',
    module: 'Procurement'
  },
  {
    id: '6',
    invoice_number: 'INV-004',
    vendor_name: 'Office Depot LLC',
    invoice_date: '2024-02-01',
    due_date: '2024-03-01',
    amount: 425.75,
    status: 'PENDING',
    created_at: '2025-09-25T07:20:17.234831+00:00',
    updated_at: '2025-09-25T07:20:17.234831+00:00',
    module: 'Procurement'
  },
  {
    id: '7',
    invoice_number: 'INV-005',
    vendor_name: 'Software Solutions Inc',
    invoice_date: '2024-02-05',
    due_date: '2024-03-05',
    amount: 12000,
    status: 'APPROVED',
    created_at: '2025-09-25T07:20:17.234831+00:00',
    updated_at: '2025-09-25T07:20:17.234831+00:00',
    module: 'General Ledger'
  },
  {
    id: '8',
    invoice_number: 'FA-001',
    vendor_name: 'Equipment Leasing Corp',
    invoice_date: '2024-02-10',
    due_date: '2024-03-10',
    amount: 25000,
    status: 'PAID',
    created_at: '2025-09-25T07:20:17.234831+00:00',
    updated_at: '2025-09-25T07:20:17.234831+00:00',
    module: 'Fixed Assets'
  },
  {
    id: '9',
    invoice_number: 'INV-006',
    vendor_name: 'Maintenance Co',
    invoice_date: '2024-02-15',
    due_date: '2024-03-15',
    amount: 1875.25,
    status: 'PENDING',
    created_at: '2025-09-25T07:20:17.234831+00:00',
    updated_at: '2025-09-25T07:20:17.234831+00:00',
    module: 'Inventory'
  },
  {
    id: '10',
    invoice_number: 'AR-002',
    vendor_name: 'Client Services Ltd',
    invoice_date: '2024-02-20',
    due_date: '2024-03-20',
    amount: 4500,
    status: 'OPEN',
    created_at: '2025-09-25T07:20:17.234831+00:00',
    updated_at: '2025-09-25T07:20:17.234831+00:00',
    module: 'Receivables'
  }
];

export const moduleOptions = [
  'All Modules',
  'Payables',
  'Receivables', 
  'Procurement',
  'Inventory',
  'General Ledger',
  'Fixed Assets'
] as const;

export const statusOptions = ['All Status', 'PENDING', 'APPROVED', 'PAID', 'OPEN'] as const;