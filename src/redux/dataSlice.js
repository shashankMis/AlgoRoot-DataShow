import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    tableData: [],
    searchQuery: '',
    sortOrder: 'asc',
    currentPage: 1,
    itemsPerPage: 5,
  },
  reducers: {
    setData: (state, action) => { state.tableData = action.payload; },
    setSearchQuery: (state, action) => { state.searchQuery = action.payload; },
    toggleSortOrder: (state) => { state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc'; },
    setCurrentPage: (state, action) => { state.currentPage = action.payload; },
  },
});

export const { setData, setSearchQuery, toggleSortOrder, setCurrentPage } = dataSlice.actions;
export default dataSlice.reducer;
