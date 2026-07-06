import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import * as projectService from "../../shared/services/project.service";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await projectService.getProjectById(id);
        setProject(data);
      } catch (err) {
        setError("Project not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-[#001E2B] flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-[#00ED64] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-[#001E2B] flex items-center justify-center">
      <p className="text-red-400">{error}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#001E2B] p-10 max-w-4xl mx-auto">
      {/* Back button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-[#89979B] hover:text-white mb-8 transition-colors"
      >
        ← Back
      </Link>

      {/* Image */}
      {project.imageUrl && (
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-64 object-cover rounded-2xl"
        />
      )}

      {/* Title */}
      <h1 className="text-4xl font-bold text-white mt-8">
        {project.title}
      </h1>

      {/* Technologies */}
      {project.technologies?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-[#00ED64]/10 text-[#00ED64] text-sm rounded-full border border-[#00ED64]/20"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      {/* Description */}
      <p className="text-[#89979B] mt-6 leading-relaxed">
        {project.description}
      </p>

      {/* Links */}
      <div className="flex gap-4 mt-8">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 bg-[#00ED64] text-[#001E2B] font-bold rounded-lg hover:bg-[#00ED64]/90 transition-colors"
          >
            Live Demo
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 border border-[#1C3347] text-white rounded-lg hover:bg-[#1C3347] transition-colors"
          >
            GitHub
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;