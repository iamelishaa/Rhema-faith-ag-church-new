'use client';

import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Search, Filter } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

type FilterType = 'newest' | 'oldest';

type SermonSearchProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  filter: FilterType;
  onFilterChange: (value: FilterType) => void;
};

export function SermonSearch({
  searchQuery,
  onSearchChange,
  filter,
  onFilterChange,
}: SermonSearchProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-12">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Search sermons..."
          className="pl-10 h-12 text-base"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="h-12 px-4">
            <Filter className="w-4 h-4 mr-2" />
            {filter === 'newest' ? 'Newest First' : 'Oldest First'}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Sort By</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={filter}
            onValueChange={(value: string) => {
              if (value === 'newest' || value === 'oldest') {
                onFilterChange(value);
              }
            }}
          >
            <DropdownMenuRadioItem value="newest">Newest First</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="oldest">Oldest First</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
