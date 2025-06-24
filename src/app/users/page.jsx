"use client"
import UserTabs from '@/components/layout/UserTabs'
import { useProfile } from '@/components/useProfile'
import React, { useEffect } from 'react'

const UsersPage = () => {
    const {loading, data}= useProfile();
    useEffect(()=>{
        fetch('/api/users')
    },[])
    if(loading){
        return 'Loading user info'
    }
    if(!data.admin){
        return 'You are not an admin'
    }
  return (
    <section className='mt-8 max-w-2xl mx-auto '>
        <UserTabs isAdmin={true} />
    </section>
  )
}

export default UsersPage