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
        <h4>Quick description - <a href={projectData?.html_url} target="_blank" rel="noopener noreferrer">{projectData?.html_url}</a></h4>
        <p>{projectData?.description ?? "No description"}</p>
        {projectData?.homepage !== "https://N/A" && <p>Homepage: <a href={projectData?.homepage!} target="_blank" rel="noopener noreferrer">{projectData?.homepage}</a></p>}
      </div>
    </div>
  );
}
