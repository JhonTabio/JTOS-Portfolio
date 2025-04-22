import { openProject } from "../utils/utils";

interface ProjectProps
{
  project: string;
}

export function Project({ project }: ProjectProps)
{
  const projectData = openProject(project);

  return (
    <div className="gui_project_container">
      <div className="gui_project_desc">
        <h4>Description</h4>
        <p>{projectData?.description ?? "No description"}</p>
      </div>
    </div>
  );
}
