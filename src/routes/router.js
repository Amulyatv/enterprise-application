import { createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import App from '../App'
import Login from '@features/auth/pages/Login'
import ForgotPassword from '@features/auth/pages/ForgotPassword'
import ResetPassword from '@features/auth/pages/ResetPassword'
import Dashboard from '@features/dashboard/pages/Dashboard'
import Procurement from '@features/procurement/pages/Procurement'
import ProcurementDetails from '@features/procurement/pages/ProcurementDetails'
import Vendors from '@features/vendor/pages/Vendors'
import VendorDetails from '@features/vendor/pages/VendorDetails'
import Risk from '@features/risk/pages/Risk'
import Compliance from '@features/compliance/pages/Compliance'
import Audit from '@features/audit/pages/Audit'
import Reports from '@features/report/pages/Reports'
import Settings from '@features/settings/pages/Settings'
import NotFound from '@components/common/NotFound'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      // Public Routes
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: 'reset-password/:token',
        element: <ResetPassword />,
      },
      // Protected Routes
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'procurement',
        element: (
          <ProtectedRoute>
            <Procurement />
          </ProtectedRoute>
        ),
      },
      {
        path: 'procurement/:id',
        element: (
          <ProtectedRoute>
            <ProcurementDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: 'vendors',
        element: (
          <ProtectedRoute>
            <Vendors />
          </ProtectedRoute>
        ),
      },
      {
        path: 'vendors/:id',
        element: (
          <ProtectedRoute>
            <VendorDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: 'risk',
        element: (
          <ProtectedRoute>
            <Risk />
          </ProtectedRoute>
        ),
      },
      {
        path: 'compliance',
        element: (
          <ProtectedRoute>
            <Compliance />
          </ProtectedRoute>
        ),
      },
      {
        path: 'audit',
        element: (
          <ProtectedRoute>
            <Audit />
          </ProtectedRoute>
        ),
      },
      {
        path: 'reports',
        element: (
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        ),
      },
      {
        path: 'settings',
        element: (
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        ),
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
])

export default router
