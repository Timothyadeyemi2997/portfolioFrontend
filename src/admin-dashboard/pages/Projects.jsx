import { useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import ProjectTable from "../components/ProjectTable";
import CreateProjectModal from "../modals/CreateProjectModal";
import EditProjectModal from "../modals/EditProjectModal";
import DeleteConfirmModal from "../modals/DeleteConfirmModal";
import { useProjects } from "../../shared/hooks/useProjects";

const ProjectsPage = () => {
  const { projects, loading, createProject, updateProject, deleteProject } = useProjects();
  const [showCreate, setShowCreate] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  return (
    <AdminLayout>
      <div className="space-y-2 mb-8">
        <h1 className="text-white text-2xl font-bold">Projects</h1>
        <p className="text-[#89979B] text-sm">Create, update, and manage your portfolio projects.</p>
      </div>

      <ProjectTable
        projects={projects}
        loading={loading}
        onAdd={() => setShowCreate(true)}
        onEdit={setEditTarget}
        onDelete={setDeleteTarget}
      />

      <CreateProjectModal
        isOpen={showCreate}
        onClose={() => setShowCreate(false)}
        onSubmit={createProject}
      />
      <EditProjectModal
        isOpen={!!editTarget}
        onClose={() => setEditTarget(null)}
        onSubmit={updateProject}
        project={editTarget}
      />
      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => deleteProject(deleteTarget?._id)}
        projectTitle={deleteTarget?.title}
      />
    </AdminLayout>
  );
};

export default ProjectsPage;