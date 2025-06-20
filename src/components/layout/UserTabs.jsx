"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

const UserTabs = ({isAdmin}) => {
  const path=usePathname();
  return (
    <div className="flex gap-3 tabs justify-center">
            <Link className={path=== '/profile'?'active':''} href={'/profile'}>Profile</Link>
            {isAdmin && (
              <>
              <Link className={path=== '/categories'?'active':''} href={'/categories'}>Categories</Link>
              <Link className={path.includes('menu-item')?'active':''} href={'/menu-items'}>Menu Items</Link>
              <Link className={path=== '/users'?'active':''} href={'/users'}>Users</Link>

              </>
            )}
          </div>
  )
}

export default UserTabs