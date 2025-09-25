import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { DataRecord } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface DataTableProps {
  data: DataRecord[];
  onSort: (column: keyof DataRecord, direction: 'asc' | 'desc') => void;
  sortColumn?: keyof DataRecord;
  sortDirection?: 'asc' | 'desc';
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString();
};

const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleString();
};

const formatAmount = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export function DataTable({ data, onSort, sortColumn, sortDirection }: DataTableProps) {
  const getSortIcon = (column: keyof DataRecord) => {
    if (sortColumn !== column) {
      return <ArrowUpDown className="ml-2 h-4 w-4" />;
    }
    return sortDirection === 'asc' ? 
      <ArrowUp className="ml-2 h-4 w-4" /> : 
      <ArrowDown className="ml-2 h-4 w-4" />;
  };

  const handleSort = (column: keyof DataRecord) => {
    if (sortColumn === column) {
      onSort(column, sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      onSort(column, 'asc');
    }
  };

  return (
    <div className="rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-muted/50">
            <TableHead className="text-card-foreground">
              <Button
                variant="ghost"
                onClick={() => handleSort('invoice_number')}
                className="h-auto p-0 font-medium hover:bg-transparent hover:text-primary"
              >
                Invoice Number
                {getSortIcon('invoice_number')}
              </Button>
            </TableHead>
            <TableHead className="text-card-foreground">
              <Button
                variant="ghost"
                onClick={() => handleSort('vendor_name')}
                className="h-auto p-0 font-medium hover:bg-transparent hover:text-primary"
              >
                Vendor Name
                {getSortIcon('vendor_name')}
              </Button>
            </TableHead>
            <TableHead className="text-card-foreground">
              <Button
                variant="ghost"
                onClick={() => handleSort('invoice_date')}
                className="h-auto p-0 font-medium hover:bg-transparent hover:text-primary"
              >
                Invoice Date
                {getSortIcon('invoice_date')}
              </Button>
            </TableHead>
            <TableHead className="text-card-foreground">
              <Button
                variant="ghost"
                onClick={() => handleSort('due_date')}
                className="h-auto p-0 font-medium hover:bg-transparent hover:text-primary"
              >
                Due Date
                {getSortIcon('due_date')}
              </Button>
            </TableHead>
            <TableHead className="text-card-foreground">
              <Button
                variant="ghost"
                onClick={() => handleSort('amount')}
                className="h-auto p-0 font-medium hover:bg-transparent hover:text-primary"
              >
                Amount
                {getSortIcon('amount')}
              </Button>
            </TableHead>
            <TableHead className="text-card-foreground">
              <Button
                variant="ghost"
                onClick={() => handleSort('status')}
                className="h-auto p-0 font-medium hover:bg-transparent hover:text-primary"
              >
                Status
                {getSortIcon('status')}
              </Button>
            </TableHead>
            <TableHead className="text-card-foreground">
              <Button
                variant="ghost"
                onClick={() => handleSort('created_at')}
                className="h-auto p-0 font-medium hover:bg-transparent hover:text-primary"
              >
                Created At
                {getSortIcon('created_at')}
              </Button>
            </TableHead>
            <TableHead className="text-card-foreground">
              <Button
                variant="ghost"
                onClick={() => handleSort('updated_at')}
                className="h-auto p-0 font-medium hover:bg-transparent hover:text-primary"
              >
                Updated At
                {getSortIcon('updated_at')}
              </Button>
            </TableHead>
            <TableHead className="text-card-foreground">
              <Button
                variant="ghost"
                onClick={() => handleSort('module')}
                className="h-auto p-0 font-medium hover:bg-transparent hover:text-primary"
              >
                Module
                {getSortIcon('module')}
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((record) => (
            <TableRow 
              key={record.id} 
              className="border-border hover:bg-muted/30 transition-colors"
            >
              <TableCell className="font-medium text-card-foreground">
                {record.invoice_number}
              </TableCell>
              <TableCell className="text-card-foreground">
                {record.vendor_name}
              </TableCell>
              <TableCell className="text-card-foreground">
                {formatDate(record.invoice_date)}
              </TableCell>
              <TableCell className="text-card-foreground">
                {formatDate(record.due_date)}
              </TableCell>
              <TableCell className="text-card-foreground font-medium">
                {formatAmount(record.amount)}
              </TableCell>
              <TableCell>
                <StatusBadge status={record.status}>
                  {record.status}
                </StatusBadge>
              </TableCell>
              <TableCell className="text-card-foreground text-sm">
                {formatDateTime(record.created_at)}
              </TableCell>
              <TableCell className="text-card-foreground text-sm">
                {formatDateTime(record.updated_at)}
              </TableCell>
              <TableCell className="text-card-foreground">
                {record.module}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}