import { FaEdit, FaTrash, FaExternalLinkAlt, FaGithub } from "react-icons/fa";

const ProjectRow = ({ project, onEdit, onDelete }) => (
  <tr className="border-b border-[#1C3347] hover:bg-[#112733] transition-colors group">
    <td className="py-4 px-4">
      <div className="flex items-center gap-3">
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
          />
        ) : (
          <div className="w-10 h-10 rounded-lg bg-[#1C3347] flex items-center justify-center text-[#00ED64] font-bold text-sm flex-shrink-0">
            {project.title?.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="min-w-0">
          <p className="text-white font-medium text-sm truncate">{project.title}</p>
          <p className="text-[#89979B] text-xs mt-0.5 truncate max-w-[200px]">
            {project.description}
          </p>
        </div>
      </div>
    </td>

    <td className="py-4 px-4">
      <div className="flex flex-wrap gap-1">
        {project.techStack?.slice(0, 3).map((tech, i) => (
          <span
            key={i}
            className="text-xs px-2 py-0.5 rounded-full bg-[#00ED64]/10 text-[#00ED64] border border-[#00ED64]/20"
          >
            {tech}
          </span>
        ))}
        {project.techStack?.length > 3 && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-[#1C3347] text-[#89979B]">
            +{project.techStack.length - 3}
          </span>
        )}
      </div>
    </td>

    <td className="py-4 px-4">
      <span className={`text-xs px-2.5 py-1 rounded-full font-medium border ${
        project.featured
          ? "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20"
          : "bg-[#1C3347] text-[#89979B] border-transparent"
      }`}>
        {project.featured ? "★ Featured" : "Standard"}
      </span>
    </td>

    <td className="py-4 px-4 text-[#89979B] text-sm whitespace-nowrap">
      {new Date(project.createdAt).toLocaleDateString("en-US", {
        month: "short", day: "numeric", year: "numeric",
      })}
    </td>

    <td className="py-4 px-4">
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-[#89979B] hover:text-[#00ED64] hover:bg-[#00ED64]/10 transition-colors"
            title="Live URL"
          >
            <FaExternalLinkAlt size={12} />
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-[#89979B] hover:text-white hover:bg-[#1C3347] transition-colors"
            title="GitHub"
          >
            <FaGithub size={12} />
          </a>
        )}
        <button
          onClick={() => onEdit(project)}
          className="p-2 rounded-lg text-[#89979B] hover:text-[#00ED64] hover:bg-[#00ED64]/10 transition-colors"
          title="Edit"
        >
          <FaEdit size={12} />
        </button>
        <button
          onClick={() => onDelete(project)}
          className="p-2 rounded-lg text-[#89979B] hover:text-red-400 hover:bg-red-400/10 transition-colors"
          title="Delete"
        >
          <FaTrash size={12} />
        </button>
      </div>
    </td>
  </tr>
);

export default ProjectRow;