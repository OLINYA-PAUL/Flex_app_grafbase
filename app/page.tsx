import react from 'react'
import { fetchAllProject } from "@/lib/action";
import { ProjectInterface } from '@/common.types';

interface ProjectSearch {

  ProjectSearch: {
    edges: { node: ProjectInterface }[];
    pageInfo: {
      hasPreviousPage: boolean,
      hasNextPage: boolean,
      startCusor: string,
      endCusor: string
    }
  }

}

const Home = async () => {
  const data = await fetchAllProject() as ProjectSearch | null;
  const projectToDisplay = data?.ProjectSearch?.edges || [];

  if (projectToDisplay.length === 0) {
    return (
      <section className=' flex-col flexStart p-10'>

        <h1>Oop's no project to display pls post a pproject</h1>
      </section>
    )

  }

  return (
    <section className="mt-5 pl-5 pr-5 w-full">

    </section>
  );
}

export default Home;
