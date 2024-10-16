'use client'
import { useSession } from 'next-auth/react';
import React from 'react'
import User from '@/app/components/User';
import ListOfUsers from '../components/ListOfUsers';
import Chat from '../components/Chat';

const page = () => {
    console.log("jhew");

  return (
    <div className='flex items-start mt-16 h-screen'> 

        <ListOfUsers/>
        <Chat/>
    </div>
  )
}

export default page