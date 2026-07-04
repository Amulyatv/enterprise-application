import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  theme: localStorage.getItem('theme') || 'light',
  sidebarOpen: true,
  sidebarCollapsed: false,
  language: localStorage.getItem('language') || 'en',
  pageTitle: 'Dashboard',
  breadcrumbs: [],
  modals: {
    confirmDialog: { open: false, data: null },
    createDialog: { open: false, data: null },
    editDialog: { open: false, data: null },
  },
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload
      localStorage.setItem('theme', action.payload)
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setSidebarCollapsed: (state, action) => {
      state.sidebarCollapsed = action.payload
    },
    setLanguage: (state, action) => {
      state.language = action.payload
      localStorage.setItem('language', action.payload)
    },
    setPageTitle: (state, action) => {
      state.pageTitle = action.payload
    },
    setBreadcrumbs: (state, action) => {
      state.breadcrumbs = action.payload
    },
    openConfirmDialog: (state, action) => {
      state.modals.confirmDialog = { open: true, data: action.payload }
    },
    closeConfirmDialog: (state) => {
      state.modals.confirmDialog = { open: false, data: null }
    },
    openCreateDialog: (state, action) => {
      state.modals.createDialog = { open: true, data: action.payload }
    },
    closeCreateDialog: (state) => {
      state.modals.createDialog = { open: false, data: null }
    },
    openEditDialog: (state, action) => {
      state.modals.editDialog = { open: true, data: action.payload }
    },
    closeEditDialog: (state) => {
      state.modals.editDialog = { open: false, data: null }
    },
  },
})

export const {
  setTheme,
  toggleSidebar,
  setSidebarCollapsed,
  setLanguage,
  setPageTitle,
  setBreadcrumbs,
  openConfirmDialog,
  closeConfirmDialog,
  openCreateDialog,
  closeCreateDialog,
  openEditDialog,
  closeEditDialog,
} = uiSlice.actions
export default uiSlice.reducer