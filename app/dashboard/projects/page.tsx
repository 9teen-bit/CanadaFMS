'use client';

import { Plus, Search, Filter, MoreVertical, Trees } from 'lucide-react';
import { useState } from 'react';
import { NewProjectModal, type ProjectFormData } from '@/components/projects/NewProjectModal';


const projectsData = [
  {
    id: 1,
    block_name: 'Block A - North Section',
    client: 'BC Timber Sales',
    planned_hectares: 450,
    completed_hectares: 320,
    start_date: '2024-01-10',
    end_date: '2024-03-15',
    status: 'In Progress',
    progress: 71,
  },
  {
    id: 2,
    block_name: 'Block B - Valley Ridge',
    client: 'Canfor Corp',
    planned_hectares: 380,
    completed_hectares: 280,
    start_date: '2024-01-05',
    end_date: '2024-02-28',
    status: 'In Progress',
    progress: 74,
  },
  {
    id: 3,
    block_name: 'Block C - East Forest',
    client: 'West Fraser',
    planned_hectares: 520,
    completed_hectares: 520,
    start_date: '2023-11-01',
    end_date: '2024-01-20',
    status: 'Completed',
    progress: 100,
  },
];

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm]   = useState('');
  const [modalOpen, setModalOpen]     = useState(false);

  const handleCreateProject = (data: ProjectFormData) => {
    // wire to your API here — for now just log it
    console.log('New project:', data);
  };

  const filteredProjects = projectsData.filter(project =>
    project.block_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
<div className="space-y-6">

      <NewProjectModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreateProject}
      />

      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" aria-hidden="true" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-border rounded-xl text-sm focus:outline-none focus:border-forest-primary"
              aria-label="Search projects"
            />
          </div>
          <button
            type="button"
            className="px-4 py-2 border border-gray-border rounded-xl text-sm hover:bg-gray-bg transition-colors flex items-center gap-2"
            aria-label="Filter projects"
          >
            <Filter className="w-4 h-4" aria-hidden="true" />
            Filter
          </button>
        </div>

        {/* This button now opens the modal */}
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="bg-forest-primary text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-forest-dark transition-colors flex items-center gap-2"
          aria-label="Create new project"
        >
          <Plus className="w-4 h-4" aria-hidden="true" />
          New Project
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-forest-light rounded-xl" aria-hidden="true">
                  <Trees className="w-5 h-5 text-forest-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-text">{project.block_name}</h3>
                  <p className="text-xs text-gray-500">{project.client}</p>
                </div>
              </div>
              <button 
                className="text-gray-400 hover:text-gray-600"
                aria-label="Project menu"
                title="More options"
              >
                <MoreVertical className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Progress</span>
                <span className="font-medium text-gray-text">{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2" aria-label={`Progress ${project.progress} percent`}>
                <div
                  className="bg-forest-primary rounded-full h-2 transition-all duration-500"
                
                  aria-hidden="true"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <p className="text-xs text-gray-500">Planned</p>
                  <p className="text-sm font-medium text-gray-text">{project.planned_hectares} ha</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Completed</p>
                  <p className="text-sm font-medium text-gray-text">{project.completed_hectares} ha</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Start Date</p>
                  <p className="text-sm font-medium text-gray-text">{project.start_date}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">End Date</p>
                  <p className="text-sm font-medium text-gray-text">{project.end_date}</p>
                </div>
              </div>

              <div className="pt-3">
                <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                  project.status === 'Completed' 
                    ? 'bg-green-100 text-green-700'
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {project.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}