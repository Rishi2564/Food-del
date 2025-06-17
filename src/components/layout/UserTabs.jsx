import Link from 'next/link'
import React, { useState } from 'react'

const UserTabs = ({isAdmin}) => {

  return (
    <div className="flex gap-3 tabs justify-center">
            <Link className="active !bg-primary" href={'/profile'}>Profile</Link>
            {isAdmin && (
              <>
              <Link className="" href={'/categories'}>Categories</Link>
              <Link className="" href={'/menu-items'}>Menu Items</Link>
              <Link className="" href={'/users'}>Users</Link>

              </>
            )}
          </div>
  )
}

export default UserTabs