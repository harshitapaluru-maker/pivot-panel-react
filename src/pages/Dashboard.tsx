import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { ChartView } from "@/components/ui/chart-view";
import { Filters } from "@/components/ui/filters";
import { DataPagination } from "@/components/ui/data-pagination";
import { useTheme } from "@/components/theme-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Database, 
  RefreshCw, 
  Moon, 
  Sun, 
  Table as TableIcon, 
  BarChart3, 
  Download,
  ChevronDown,
} from "lucide-react";
import { mockData, type DataRecord } from "@/data/mockData";
import { exportToCSV, exportToExcel, exportToPDF } from "@/utils/exportUtils";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();

  // State management
  const [viewMode, setViewMode] = useState<'table' | 'chart'>('table');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedModule, setSelectedModule] = useState('All Modules');
  const [sortColumn, setSortColumn] = useState<keyof DataRecord>('invoice_date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let filtered = mockData.filter((record) => {
      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const searchMatch = 
          record.invoice_number.toLowerCase().includes(searchLower) ||
          record.vendor_name.toLowerCase().includes(searchLower) ||
          record.status.toLowerCase().includes(searchLower) ||
          record.module.toLowerCase().includes(searchLower);
        if (!searchMatch) return false;
      }

      // Module filter
      if (selectedModule !== 'All Modules' && record.module !== selectedModule) {
        return false;
      }

      return true;
    });

    // Sort data
    filtered.sort((a, b) => {
      let aValue = a[sortColumn];
      let bValue = b[sortColumn];

      // Handle different data types
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [mockData, searchTerm, selectedModule, sortColumn, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedData.length / pageSize);
  const paginatedData = filteredAndSortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Active filters count
  const activeFiltersCount = [
    searchTerm,
    selectedModule !== 'All Modules' ? selectedModule : null,
  ].filter(Boolean).length;

  // Handlers
  const handleSort = (column: keyof DataRecord, direction: 'asc' | 'desc') => {
    setSortColumn(column);
    setSortDirection(direction);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedModule('All Modules');
    setCurrentPage(1);
  };

  const handleExport = (format: 'csv' | 'excel' | 'pdf') => {
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    const filename = `data-export-${timestamp}`;

    try {
      switch (format) {
        case 'csv':
          exportToCSV(filteredAndSortedData, `${filename}.csv`);
          break;
        case 'excel':
          exportToExcel(filteredAndSortedData, `${filename}.xlsx`);
          break;
        case 'pdf':
          exportToPDF(filteredAndSortedData, `${filename}.pdf`);
          break;
      }
      toast({
        title: "Export successful",
        description: `Data exported as ${format.toUpperCase()} format.`,
      });
    } catch (error) {
      toast({
        title: "Export failed", 
        description: "There was an error exporting the data.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Database className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-card-foreground">Data Management System</h1>
                <p className="text-sm text-muted-foreground">Enterprise data visualization and export platform</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Records</CardDescription>
              <CardTitle className="text-3xl">{mockData.length}</CardTitle>
              <p className="text-sm text-muted-foreground">All Modules</p>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Current View</CardDescription>
              <CardTitle className="text-3xl">{filteredAndSortedData.length}</CardTitle>
              <p className="text-sm text-muted-foreground">Page {currentPage} of {totalPages}</p>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Active Filters</CardDescription>
              <CardTitle className="text-3xl">{activeFiltersCount}</CardTitle>
              <p className="text-sm text-muted-foreground">Applied filters</p>
            </CardHeader>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <Filters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedModule={selectedModule}
              onModuleChange={setSelectedModule}
              onClearFilters={handleClearFilters}
            />
          </CardHeader>
        </Card>

        {/* View Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'table' ? 'default' : 'outline'}
              onClick={() => setViewMode('table')}
              size="sm"
            >
              <TableIcon className="h-4 w-4 mr-2" />
              Table View
            </Button>
            <Button
              variant={viewMode === 'chart' ? 'default' : 'outline'}
              onClick={() => setViewMode('chart')}
              size="sm"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Chart View
            </Button>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exporting
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-popover border-border">
              <DropdownMenuItem 
                onClick={() => handleExport('csv')}
                className="hover:bg-accent cursor-pointer"
              >
                CSV
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleExport('excel')}
                className="hover:bg-accent cursor-pointer"
              >
                Excel
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleExport('pdf')}
                className="hover:bg-accent cursor-pointer"
              >
                PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Main Content */}
        {viewMode === 'table' ? (
          <div className="space-y-4">
            <DataTable
              data={paginatedData}
              onSort={handleSort}
              sortColumn={sortColumn}
              sortDirection={sortDirection}
            />
            {filteredAndSortedData.length > pageSize && (
            <DataPagination
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              totalItems={filteredAndSortedData.length}
              onPageChange={setCurrentPage}
              onPageSizeChange={(newPageSize) => {
                setPageSize(newPageSize);
                setCurrentPage(1);
              }}
            />
            )}
          </div>
        ) : (
          <ChartView data={filteredAndSortedData} />
        )}
      </div>
    </div>
  );
}