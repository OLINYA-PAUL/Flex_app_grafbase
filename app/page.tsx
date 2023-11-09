import react from 'react'
import { fetchAllProject } from "@/lib/action";
import { ProjectInterface } from '@/common.types';

interface ProjectSearch {
  projectSearch: {
    edges: { node: ProjectInterface }[];
    pageInfo: {
      hasPreviousPage: boolean,
      hasNextPage: boolean,
      startCursor: string,  // Corrected spelling
      endCursor: string    // Corrected spelling
    }

  }
}


const Home = async () => {
  const data = await fetchAllProject() as ProjectSearch;
  const projectToDisplay = data?.projectSearch?.edges || [];

  if (projectToDisplay.length === 0) {
    return (
      <section className=' flex-col w-full p-10'>

        <h1 className='text-center text-lg text-gray font-bold'>Oop's no project to display pls post a project</h1>
      </section>
    )

  }

  return (
    <section className="mt-5 pl-5 pr-5 w-full">

    </section>
  );
}

export default Home;
