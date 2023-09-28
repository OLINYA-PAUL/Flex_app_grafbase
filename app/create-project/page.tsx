import Model from '@/components/Model'
import ProjectForm from '@/components/ProjectForm'
import { getCurrentUser } from '@/lib/session'
import React from 'react'
import { redirect } from 'next/navigation'

const Createproject = async () => {
    const session = await getCurrentUser()
    if (!session?.user) redirect('/')

    return (
        <Model>
            <h1 className='model_text'>Create New Project</h1>
            <ProjectForm
                type='create'
                session={session}
            />
        </Model>
    )
}

export default Createproject
