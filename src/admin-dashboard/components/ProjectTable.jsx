import ProjectRow from "./ProjectRow";
import { FaPlus } from "react-icons/fa";

const ProjectTable = ({ projects, loading, onEdit, onDelete, onAdd }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-[#00ED64] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-[#0D2137] border border-[#1C3347] rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#1C3347]">
        <div>
          <h2 className="text-white font-semibold">All Projects</h2>
          <p className="text-[#89979B] text-xs mt-0.5">{projects.length} total</p>
        </div>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 bg-[#00ED64] hover:bg-[#00ED64]/90 active:scale-95 text-[#001E2B] text-sm font-bold px-4 py-2 rounded-lg transition-all"
        >
          <FaPlus size={11} />
          New Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-52 text-[#89979B] gap-2">
          <p className="text-base font-medium text-white">No projects yet</p>
          <p className="text-sm">Click "New Project" to add your first one</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1C3347]">
                {["Project", "Tech Stack", "Status", "Created", "Actions"].map((h) => (
                  <th
                    key={h}
                    className="text-left text-xs font-semibold text-[#89979B] uppercase tracking-wider px-4 py-3"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <ProjectRow
                  key={p._id}
                  project={p}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProjectTable;