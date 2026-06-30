import { useProjects }
from "../../../shared/hooks/useProjects";

import ProjectCard
from "../../../public-site-visitor-UI/components/project/ProjectCard";

const ProjectsSection = () => {
  const {
    projects,
    loading,
  } = useProjects();

  if (loading) {
    return (
      <section className="py-20">
        Loading Projects...
      </section>
    );
  }

  return (
    <section
      id="projects"
      className="
      py-20
      bg-[#001E2B]
    "
    >
      <div className="container mx-auto px-6">
        <h2
          className="
          text-4xl
          font-bold
          mb-12
        "
        >
          Featured Projects
        </h2>

        <div
          className="
          grid
          md:grid-cols-2
          lg:grid-cols-3
          gap-8
        "
        >
          {(projects || []).map(
            (project) => (
              <ProjectCard
                key={
                  project._id
                }
                project={
                  project
                }
              />
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;