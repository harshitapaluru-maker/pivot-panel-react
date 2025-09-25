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
import { Search, Filter } from "lucide-react";
import { moduleOptions } from "@/data/mockData";

interface FiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedModule: string;
  onModuleChange: (module: string) => void;
  onClearFilters: () => void;
}

export function Filters({
  searchTerm,
  onSearchChange,
  selectedModule,
  onModuleChange,
  onClearFilters,
}: FiltersProps) {
  const hasActiveFilters = 
    searchTerm ||
    selectedModule !== 'All Modules';

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
  );
}