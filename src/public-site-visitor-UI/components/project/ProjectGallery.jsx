import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { useProjectsContext } from "../../../shared/hooks/useProjects";

const ProjectGallery = () => {
  const { projects, loading } = useProjectsContext();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.15,
          },
        },
      }}
      className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {(projects || []).map((project) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </motion.section>
  );
};

export default ProjectGallery;