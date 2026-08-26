'use client'

import { Project } from '@/types/project'
import { X, ExternalLink } from 'lucide-react'

interface ProjectDetailModalProps {
  project: Project | null
  onClose: () => void
}

export default function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  if (!project) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C1820]/40 backdrop-blur-xs">
      <div className="bg-white rounded-3xl border border-[#F0D3CE] max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-[#FAF3F0] text-[#7A5C66] hover:text-[#2C1820] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title & Badge */}
        <div className="mb-6">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#FAF3F0] text-[#C86D7D] mb-3 inline-block">
            {project.category}
          </span>
          <h2 className="text-3xl font-serif font-bold text-[#2C1820]">{project.title}</h2>
        </div>

        {/* Banner Image */}
        {project.image && (
          <div className="h-64 rounded-2xl overflow-hidden mb-6 border border-[#F0D3CE]">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Dynamic Sections */}
        <div className="space-y-6 text-[#7A5C66] text-sm leading-relaxed">
          {project.solution && (
            <div>
              <h4 className="font-serif font-bold text-lg text-[#2C1820] mb-2">💡 La Solution</h4>
              <p>{project.solution}</p>
            </div>
          )}

          {project.role && (
            <div>
              <h4 className="font-serif font-bold text-lg text-[#2C1820] mb-2">👤 Mon Rôle</h4>
              <p>{project.role}</p>
            </div>
          )}

          {project.challenges && (
            <div>
              <h4 className="font-serif font-bold text-lg text-[#2C1820] mb-2">⚡ Challenges rencontrés</h4>
              <p>{project.challenges}</p>
            </div>
          )}

          {project.learnings && (
            <div>
              <h4 className="font-serif font-bold text-lg text-[#2C1820] mb-2">🚀 Ce que j'ai appris</h4>
              <p>{project.learnings}</p>
            </div>
          )}

          {project.results && (
            <div>
              <h4 className="font-serif font-bold text-lg text-[#2C1820] mb-2">📈 Résultats</h4>
              <p>{project.results}</p>
            </div>
          )}

          {/* Tech Stack */}
          <div>
            <h4 className="font-serif font-bold text-lg text-[#2C1820] mb-3">🛠️ Technologies utilisées</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, i) => (
                <span key={i} className="text-xs font-mono px-3 py-1.5 rounded-lg bg-[#FAF3F0] text-[#2C1820] border border-[#F0D3CE]">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 pt-6 border-t border-[#F0D3CE] flex gap-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center space-x-2 py-3 rounded-full bg-[#2C1820] text-white text-sm font-medium hover:bg-black transition-all"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>Voir le code GitHub</span>
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center space-x-2 py-3 rounded-full bg-[#C86D7D] text-white text-sm font-medium hover:bg-[#B55869] transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Voir la démo en ligne</span>
            </a>
          )}
        </div>

      </div>
    </div>
  )
}