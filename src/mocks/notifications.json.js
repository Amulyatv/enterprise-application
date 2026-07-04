export const mockNotifications = [
  {
    id: 1,
    type: 'success',
    message: 'Procurement request PR-002 approved',
    timestamp: new Date(Date.now() - 3600000),
    read: false,
  },
  {
    id: 2,
    type: 'warning',
    message: 'Vendor compliance certificate expires in 30 days',
    timestamp: new Date(Date.now() - 7200000),
    read: false,
  },
  {
    id: 3,
    type: 'error',
    message: 'Procurement request PR-003 rejected',
    timestamp: new Date(Date.now() - 10800000),
    read: true,
  },
  {
    id: 4,
    type: 'info',
    message: 'New audit report available for review',
    timestamp: new Date(Date.now() - 14400000),
    read: true,
  },
]
