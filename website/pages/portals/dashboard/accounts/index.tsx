/* eslint-disable prettier/prettier */
import React from 'react'

import DefaultLayoutDashboard from '@/layouts/dashboard/default'
import AccountsDashboard from '@/components/dashboard/accounts'

const Accounts = () => {
  return (
    <DefaultLayoutDashboard>
      <AccountsDashboard />
    </DefaultLayoutDashboard>
  )
}

export default Accounts
