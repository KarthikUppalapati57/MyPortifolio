import React, { useState } from 'react';
import { PROJECTS, MINI_PROJECTS, CERTIFICATIONS } from '../constants';
import { Project, Certification } from '../types';
import { GithubIcon, ExternalLinkIcon, BriefcaseIcon, FlaskConicalIcon, AwardIcon } from './IconComponents';

// --- Reusable Card Components ---

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <div className="group animate-fade-in relative aspect-square rounded-md overflow-hidden shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10 border border-gray-700 bg-gray-900">
    <img
      src={project.imageUrl}
      alt={project.title}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-all duration-300 group-hover:from-black/90 group-hover:via-black/60"></div>
    <div className="relative h-full flex flex-col justify-end p-5 md:p-6 text-white">
      <div className="absolute top-4 right-4 flex items-center space-x-2 z-10">
        {project.sourceUrl && (
          <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100 text-gray-200 hover:text-red-500" aria-label={`${project.title} source code`}>
            <GithubIcon className="w-5 h-5" />
          </a>
        )}
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 delay-200 text-gray-200 hover:text-red-500" aria-label={`${project.title} live preview`}>
            <ExternalLinkIcon className="w-5 h-5" />
          </a>
        )}
      </div>
      <div className="transform transition-transform duration-500 ease-out group-hover:-translate-y-2">
        <h3 className="text-xl md:text-2xl font-bold text-gray-50 drop-shadow-md mb-2">{project.title}</h3>
        <div className="transition-all duration-500 ease-out max-h-0 opacity-0 group-hover:max-h-48 group-hover:opacity-100">
          <p className="text-gray-300 text-sm mb-3 leading-snug">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="bg-red-900/60 text-red-300 text-xs font-semibold px-2.5 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const CertificationCard: React.FC<{ cert: Certification }> = ({ cert }) => (
    <div className="group animate-fade-in relative flex flex-col bg-gray-800/80 rounded-md p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10 hover:-translate-y-1 border border-gray-700">
        <div className="flex justify-between items-start mb-2">
            <h4 className="text-xl font-bold text-gray-100 flex-1 pr-4">{cert.name}</h4>
            {cert.url && (
                <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0" aria-label={`View certificate for ${cert.name}`}>
                    <ExternalLinkIcon className="w-5 h-5" />
                </a>
            )}
        </div>
        <p className="text-red-400 font-semibold mb-3">{cert.issuer}</p>
        <p className="text-gray-300 flex-grow">{cert.description}</p>
    </div>
);


// --- Main Projects Section Component ---
const Projects: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'projects' | 'mini' | 'certs' | null>(null);

  const tabs = [
    { id: 'projects', label: 'Major Projects', icon: BriefcaseIcon },
    { id: 'mini', label: 'Mini Projects', icon: FlaskConicalIcon },
    { id: 'certs', label: 'Certifications', icon: AwardIcon },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'projects':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        );
      case 'mini':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MINI_PROJECTS.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        );
      case 'certs':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CERTIFICATIONS.map((cert) => (
              <CertificationCard key={cert.name} cert={cert} />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="projects" className="py-24">
      <h2 className="text-3xl font-bold text-center mb-4 text-gray-100">
        <span className="text-red-500 font-mono text-2xl">02.</span> My Work
      </h2>
      <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
        A curated collection of my professional projects, experiments, and certifications. Click a category to explore.
      </p>

      {/* Tab Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as 'projects' | 'mini' | 'certs')}
            className={`group flex flex-col items-center justify-center p-6 rounded-lg transition-all duration-300 border-2 transform hover:-translate-y-1.5 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
              activeTab === tab.id
                ? 'bg-red-900/20 border-red-500'
                : 'bg-gray-900/50 border-gray-700 hover:bg-gray-800/70 hover:border-gray-600'
            }`}
          >
            <tab.icon
              className={`w-12 h-12 mb-4 transition-colors duration-300 ${
                activeTab === tab.id ? 'text-red-400' : 'text-gray-500 group-hover:text-red-400'
              }`}
            />
            <span
              className={`font-bold text-lg text-center transition-colors duration-300 ${
                activeTab === tab.id ? 'text-white' : 'text-gray-300 group-hover:text-white'
              }`}
            >
              {tab.label}
            </span>
          </button>
        ))}
      </div>


      {/* Content Grid */}
      <div className="max-w-6xl mx-auto px-4 md:px-0">
        {renderContent()}
      </div>
    </section>
  );
};

export default Projects;