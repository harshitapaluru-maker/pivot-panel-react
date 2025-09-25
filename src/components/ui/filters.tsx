import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Search, Filter, Plus } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { moduleOptions, statusOptions } from "@/data/mockData";

interface FiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedModule: string;
  onModuleChange: (module: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  dateFrom?: Date;
  dateTo?: Date;
  onDateFromChange: (date?: Date) => void;
  onDateToChange: (date?: Date) => void;
  onClearFilters: () => void;
}

export function Filters({
  searchTerm,
  onSearchChange,
  selectedModule,
  onModuleChange,
  selectedStatus,
  onStatusChange,
  dateFrom,
  dateTo,
  onDateFromChange,
  onDateToChange,
  onClearFilters,
}: FiltersProps) {
  const hasActiveFilters = 
    searchTerm ||
    selectedModule !== 'All Modules' ||
    selectedStatus !== 'All Status' ||
    dateFrom ||
    dateTo;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-card-foreground">
        <Filter className="h-5 w-5" />
        <h3 className="text-lg font-semibold">Filters & Search</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="module" className="text-card-foreground">Module/Functionality</Label>
          <Select value={selectedModule} onValueChange={onModuleChange}>
            <SelectTrigger className="bg-background border-border">
              <SelectValue placeholder="Select module" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              {moduleOptions.map((module) => (
                <SelectItem key={module} value={module} className="hover:bg-accent">
                  {module}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="search" className="text-card-foreground">Search</Label>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search across all fields..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-8 bg-background border-border"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-card-foreground">Additional Filters</h4>
          <Button 
            variant="outline" 
            size="sm"
            className="text-primary border-primary hover:bg-primary hover:text-primary-foreground"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Filter
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label className="text-card-foreground">Status</Label>
            <Select value={selectedStatus} onValueChange={onStatusChange}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                {statusOptions.map((status) => (
                  <SelectItem key={status} value={status} className="hover:bg-accent">
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-card-foreground">Date From</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal bg-background border-border",
                    !dateFrom && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateFrom ? format(dateFrom, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-popover border-border" align="start">
                <Calendar
                  mode="single"
                  selected={dateFrom}
                  onSelect={onDateFromChange}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label className="text-card-foreground">Date To</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal bg-background border-border",
                    !dateTo && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateTo ? format(dateTo, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-popover border-border" align="start">
                <Calendar
                  mode="single"
                  selected={dateTo}
                  onSelect={onDateToChange}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {hasActiveFilters && (
          <div className="flex justify-end">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}