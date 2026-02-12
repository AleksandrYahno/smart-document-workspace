import type { IDocumentListStore, ImmerDocumentListStoreSetter } from '../documentListStore.interface';
import type { IDocumentListSlice } from './documentListSlice.interface';

export const documentListSlice = (set: ImmerDocumentListStoreSetter): IDocumentListSlice => ({
  page: 1,
  search: '',
  searchInput: '',
  sorting: [],
  rowSelection: {},
  columnVisibility: {},
  viewMode: 'table',
  columnsOpen: false,

  setPage: (updater) => {
    set((state: IDocumentListStore) => {
      const next = typeof updater === 'function' ? updater(state.documentListSlice.page) : updater;
      state.documentListSlice.page = next;
    });
  },

  setSearch: (search) => {
    set((state: IDocumentListStore) => {
      state.documentListSlice.search = search;
    });
  },

  setSearchInput: (value) => {
    set((state: IDocumentListStore) => {
      state.documentListSlice.searchInput = value;
    });
  },

  setSorting: (updater) => {
    set((state: IDocumentListStore) => {
      const next = typeof updater === 'function' ? updater(state.documentListSlice.sorting) : updater;
      state.documentListSlice.sorting = next;
    });
  },

  setRowSelection: (updater) => {
    set((state: IDocumentListStore) => {
      const next = typeof updater === 'function' ? updater(state.documentListSlice.rowSelection) : updater;
      state.documentListSlice.rowSelection = next;
    });
  },

  setColumnVisibility: (updater) => {
    set((state: IDocumentListStore) => {
      const next = typeof updater === 'function' ? updater(state.documentListSlice.columnVisibility) : updater;
      state.documentListSlice.columnVisibility = next;
    });
  },

  setViewMode: (viewMode) => {
    set((state: IDocumentListStore) => {
      state.documentListSlice.viewMode = viewMode;
    });
  },

  setColumnsOpen: (updater) => {
    set((state: IDocumentListStore) => {
      const next = typeof updater === 'function' ? updater(state.documentListSlice.columnsOpen) : updater;
      state.documentListSlice.columnsOpen = next;
    });
  },

  submitSearch: () => {
    set((state: IDocumentListStore) => {
      const slice = state.documentListSlice;
      slice.search = slice.searchInput;
      slice.page = 1;
    });
  },

  clearRowSelection: () => {
    set((state: IDocumentListStore) => {
      state.documentListSlice.rowSelection = {};
    });
  },
});
