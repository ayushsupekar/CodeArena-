import Link from 'next/link'
import { Plus, Users, Lock, Globe, Calendar } from 'lucide-react'


const projects = [
  {
    id: '1',
    title: 'E-commerce API',
    description: 'Building a RESTful API for an online store with authentication and payment processing',
    isPublic: true,
    collaborators: 3,
    lastUpdated: new Date('2024-01-10'),
    technologies: ['Node.js', 'Express', 'MongoDB']
  },
  {
    id: '2',
    title: 'Chat Application',
    description: 'Real-time messaging app with WebSocket support and user presence',
    isPublic: false,
    collaborators: 1,
    lastUpdated: new Date('2024-01-08'),
    technologies: ['React', 'Socket.io', 'Redis']
  },
  {
    id: '3',
    title: 'Algorithm Visualizer',
    description: 'Interactive tool to visualize sorting and graph algorithms',
    isPublic: true,
    collaborators: 5,
    lastUpdated: new Date('2024-01-05'),
    technologies: ['JavaScript', 'Canvas', 'D3.js']
  }
]

// amazonq-ignore-next-line
export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Projects</h1>
          <Link href="/projects/create" className="btn-primary flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>New Project</span>
          </Link>
        </div>

        <div className="grid gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{project.title}</h3>
                    <div className="flex items-center space-x-1">
                      {project.isPublic ? (
                        <Globe className="h-4 w-4 text-green-600" />
                      ) : (
                        <Lock className="h-4 w-4 text-gray-600" />
                      )}
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {project.isPublic ? 'Public' : 'Private'}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                  
                  <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{project.collaborators} collaborator{project.collaborators !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Updated {project.lastUpdated.toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Link 
                    href={`/projects/${project.id}/collaborate`}
                    className="text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-300">
                  >
                    Collaborate
                  </Link>
                  <Link 
                    href={`/projects/${project.id}`}
                    className="btn-primary"
                  >
                    Open
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Project Templates</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Web Application</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Full-stack web app with React and Node.js</p>
              <Link href="/projects/create?template=web-app" className="btn-secondary">Use Template</Link>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">REST API</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Backend API with Express and database</p>
              <Link href="/projects/create?template=rest-api" className="btn-secondary">Use Template</Link>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Mobile App</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">React Native cross-platform mobile app</p>
              <Link href="/projects/create?template=mobile-app" className="btn-secondary">Use Template</Link>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Data Science</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Python project with Jupyter notebooks</p>
              <Link href="/projects/create?template=data-science" className="btn-secondary">Use Template</Link>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Machine Learning</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">ML model training and deployment</p>
              <Link href="/projects/create?template=ml" className="btn-secondary">Use Template</Link>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Blockchain</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Smart contracts and DApp development</p>
              <Link href="/projects/create?template=blockchain" className="btn-secondary">Use Template</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}