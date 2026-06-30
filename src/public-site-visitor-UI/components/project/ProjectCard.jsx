import { motion } from "framer-motion";
import { Link, } from "react-router-dom";

const ProjectCard = ({ project }) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        y: -10,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
      }}
      className="
        bg-[#081620] border transition border-gray-800 rounded-2xl overflow-hidden"
    >
      <img
        src={project.imageUrl}
        alt={project.title}
        className=" h-56 w-full object-cover"
      />

      <div className="p-6">
        <h3 className="text-xl font-bold">
          {project.title}
        </h3>

        <p className="text-gray-400 mt-2">
          {project.description}
        </p>

        <Link
          to={`/projects/${project._id}`}
          className="
          inline-block
          mt-6
          text-green-500
        "
        >
          View Details →
        </Link>
      </div>
    </motion.div>
  );
};

export default ProjectCard;