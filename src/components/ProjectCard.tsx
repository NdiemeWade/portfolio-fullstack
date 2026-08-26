'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Project } from '@/types/project'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="group block bg-white rounded-2xl overflow-hidden border border-[#F0D3CE] hover:border-[#C86D7D] transition-all hover:shadow-lg flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* Image du projet */}
        <div className="relative h-48 w-full bg-[#FAF3F0] overflow-hidden">
          <Image
            src={project.image || '/placeholder-project.png'}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <span className="absolute top-3 left-3 bg-[#2C1820]/80 backdrop-blur-sm text-white text-[10px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
            {project.category}
          </span>
        </div>

        {/* Contenu */}
        <div className="p-6">
          <h3 className="text-xl font-serif font-bold text-[#2C1820] mb-2 group-hover:text-[#C86D7D] transition-colors">
            {project.title}
          </h3>
          <p className="text-[#7A5C66] text-sm line-clamp-3 mb-4 leading-relaxed">
            {project.shortDescription}
          </p>

          {/* Badges de technologies */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.technologies?.slice(0, 4).map((tech, i) => (
              <span
                key={i}
                className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-[#FAF3F0] text-[#7A5C66]"
              >
                {tech}
              </span>
            ))}
            {project.technologies?.length > 4 && (
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-[#FAF3F0] text-[#7A5C66]">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Pied de carte */}
      <div className="px-6 pb-6 pt-0 flex items-center justify-between text-xs font-semibold text-[#C86D7D]">
        <span>En savoir plus</span>
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </Link>
  )
}