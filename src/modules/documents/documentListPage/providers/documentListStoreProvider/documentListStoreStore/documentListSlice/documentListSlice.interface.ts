import type { RowSelectionState, SortingState, VisibilityState } from '@tanstack/react-table';

export type TDocumentListViewMode = 'table' | 'grid';

export interface IDocumentListSlice {
  page: number;
  search: string;
  searchInput: string;
  sorting: SortingState;
  rowSelection: RowSelectionState;
  columnVisibility: VisibilityState;
  viewMode: TDocumentListViewMode;
  columnsOpen: boolean;

  setPage: (page: number | ((prev: number) => number)) => void;
  setSearch: (search: string) => void;
  setSearchInput: (value: string) => void;
  setSorting: (updater: SortingState | ((old: SortingState) => SortingState)) => void;
  setRowSelection: (updater: RowSelectionState | ((old: RowSelectionState) => RowSelectionState)) => void;
  setColumnVisibility: (updater: VisibilityState | ((old: VisibilityState) => VisibilityState)) => void;
  setViewMode: (viewMode: TDocumentListViewMode) => void;
  setColumnsOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
  submitSearch: () => void;
  clearRowSelection: () => void;
}
