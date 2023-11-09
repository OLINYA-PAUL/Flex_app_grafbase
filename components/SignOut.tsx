'use client'
import React from 'react'
import Button from './Button'
import { signOut } from 'next-auth/react'
const SignOut = () => {
    return (
        <div>
            <Button
                title="Sign out"
                handleClick={() => signOut()}
            />
        </div>
    )
}

export default SignOut