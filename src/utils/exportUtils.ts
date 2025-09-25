import { DataRecord } from '@/data/mockData';

export const exportToCSV = (data: DataRecord[], filename: string = 'data-export.csv') => {
  const headers = [
    'Invoice Number',
    'Vendor Name', 
    'Invoice Date',
    'Due Date',
    'Amount',
    'Status',
    'Created At',
    'Updated At',
    'Module'
  ];

  const csvContent = [
    headers.join(','),
    ...data.map(row => [
      row.invoice_number,
      `"${row.vendor_name}"`,
      row.invoice_date,
      row.due_date,
      row.amount,
      row.status,
      row.created_at,
      row.updated_at,
      row.module
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToExcel = (data: DataRecord[], filename: string = 'data-export.xlsx') => {
  // Simple TSV format that Excel can open
  const headers = [
    'Invoice Number',
    'Vendor Name',
    'Invoice Date', 
    'Due Date',
    'Amount',
    'Status',
    'Created At',
    'Updated At',
    'Module'
  ];

  const tsvContent = [
    headers.join('\t'),
    ...data.map(row => [
      row.invoice_number,
      row.vendor_name,
      row.invoice_date,
      row.due_date,
      row.amount,
      row.status,
      row.created_at,
      row.updated_at,
      row.module
    ].join('\t'))
  ].join('\n');

  const blob = new Blob([tsvContent], { type: 'application/vnd.ms-excel' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToPDF = (data: DataRecord[], filename: string = 'data-export.pdf') => {
  // Simple HTML to PDF approach using print
  const printWindow = window.open('', '', 'width=800,height=600');
  if (!printWindow) return;

  const htmlContent = `
    <html>
      <head>
        <title>Data Export</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; font-size: 12px; }
          th { background-color: #f2f2f2; font-weight: bold; }
          h1 { color: #333; margin-bottom: 20px; }
        </style>
      </head>
      <body>
        <h1>Data Management System Export</h1>
        <p>Generated on: ${new Date().toLocaleString()}</p>
        <table>
          <thead>
            <tr>
              <th>Invoice Number</th>
              <th>Vendor Name</th>
              <th>Invoice Date</th>
              <th>Due Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Module</th>
            </tr>
          </thead>
          <tbody>
            ${data.map(row => `
              <tr>
                <td>${row.invoice_number}</td>
                <td>${row.vendor_name}</td>
                <td>${row.invoice_date}</td>
                <td>${row.due_date}</td>
                <td>$${row.amount.toLocaleString()}</td>
                <td>${row.status}</td>
                <td>${row.module}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </body>
    </html>
  `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();
  printWindow.focus();
  
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 250);
};