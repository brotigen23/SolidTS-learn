import { createSignal, createResource } from 'solid-js'
import './App.css'
import { getProjects } from './api/projects'
import type { Project } from './types'
import ProjectList from './components/ProjectComponent'
import TaskList from './components/TaskComponents'

export default function App() {
  const [selectedProjectID, setSelectedProjectID] = createSignal<number | null>(null)

  const [projects] = createResource<Project[]>(getProjects)

  return (
    <main>
      <ProjectList 
        projects={ projects } 
        loading={() => projects.loading}
        error={() => projects.error}
        selectedID={selectedProjectID}
        onSelect={(id) => setSelectedProjectID(id)}
        />
      <TaskList 
        projectID={selectedProjectID}
      />
    </main>
  )
}
