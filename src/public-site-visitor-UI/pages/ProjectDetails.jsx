import {
  useEffect,
  useState,
} from "react";

import { useParams } from "react-router-dom";

import * as projectService
from "../../shared/services/project.service";

const ProjectDetails = () => {
  const { id } =
    useParams();

  const [
    project,
    setProject,
  ] = useState(null);

  useEffect(() => {
    const fetchProject =
      async () => {
        const data =
          await projectService.getProject(
            id
          );

        setProject(
          data
        );
      };

    fetchProject();
  }, [id]);

  if (!project)
    return (
      <div>
        Loading...
      </div>
    );

  return (
    <div
      className="
      min-h-screen
      bg-[#001E2B]
      p-10
    "
    >
      <img
        src={
          project.image
        }
        alt={
          project.title
        }
      />

      <h1
        className="
        text-4xl
        font-bold
        mt-8
      "
      >
        {
          project.title
        }
      </h1>

      <p className="mt-6">
        {
          project.description
        }
      </p>

      <div className="mt-8">
        <a
          href={
            project.liveUrl
          }
          target="_blank"
        >
          Live Demo
        </a>
      </div>
    </div>
  );
};

export default ProjectDetails;