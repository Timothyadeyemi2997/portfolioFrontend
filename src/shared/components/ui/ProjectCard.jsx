import { motion } from "framer-motion";

const ProjectCard = ({ project }) => {
  return (
    <motion.div
      whileHover={{
        y: -8,
      }}
      className="
        bg-gray-900
        border
        border-gray-800
        rounded-2xl
        overflow-hidden
      "
    >
      <img
        src={project.imageUrl}
        alt={project.title}
        className="
          h-56
          w-full
          object-cover
        "
      />

      <div className="p-5">
        <h3 className="text-xl font-bold">
          {project.title}
        </h3>

        <p className="text-gray-400 mt-2">
          {project.description}
        </p>

        <div className="flex gap-4 mt-4">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>

          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
          >
            Live Demo
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;