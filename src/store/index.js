import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authSlice from './slices/authSlice'
import dashboardSlice from './slices/dashboardSlice'
import procurementSlice from './slices/procurementSlice'
import vendorSlice from './slices/vendorSlice'
import riskSlice from './slices/riskSlice'
import complianceSlice from './slices/complianceSlice'
import auditSlice from './slices/auditSlice'
import reportSlice from './slices/reportSlice'
import notificationSlice from './slices/notificationSlice'
import uiSlice from './slices/uiSlice'

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'ui', 'notification'],
  version: 1,
}

// Persist auth reducer
const persistedAuthReducer = persistReducer(persistConfig, authSlice)

// Configure store with Redux DevTools
const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    dashboard: dashboardSlice,
    procurement: procurementSlice,
    vendor: vendorSlice,
    risk: riskSlice,
    compliance: complianceSlice,
    audit: auditSlice,
    report: reportSlice,
    notification: notificationSlice,
    ui: uiSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: import.meta.env.DEV,
})

const persistor = persistStore(store)

export { store, persistor }
export default store
