export default function ProjectCard({ project }) {
  return (
    <div className="p-4 rounded-xl border border-gray-100 hover:shadow transition bg-[--color-neutral-light] cursor-pointer">
      <h3 className="font-semibold text-[--color-secondary]">
        {project.title}
      </h3>
      <p className="text-sm text-gray-600">{project.description}</p>
    </div>
  );
}
