import ProjectItem from "./project-item";

const getNpmDownloads = async (packageName: string) => {
	const res = await fetch(
		`https://api.npmjs.org/downloads/point/last-week/${packageName}`,
	);
	const data = await res.json();
	return data.downloads;
};

function convert(n: number, b: number, s: string) {
	return ((n / b) | 0) + s;
}

function human(value: string) {
	const n = parseInt(value);
	if (n > 1000000000) return convert(n, 1000000000, "B");
	if (n > 1000000) return convert(n, 1000000, "M");
	if (n > 1000) return convert(n, 1000, "K");
	return n;
}

const getDockerPulls = async (imageName: string) => {
	const res = await fetch(
		`https://hub.docker.com/v2/repositories/imbios/${imageName}/`,
	);
	const data = await res.json();
	return human(data.pull_count);
};

const Projects = async () => {
	// TODO Make it dynamic based on ranking or something
	const projects = [
		{
			title: "i18n-num-in-words",
			description: "Convert Numbers to Words in Multiple Languages",
			href: "https://www.npmjs.com/package/i18n-num-in-words",
			stats: `${await getNpmDownloads("i18n-num-in-words")} downloads/week`,
		},
		{
			title: "bun-node",
			description:
				"Pre-configured Bun and Node.js Docker Images for Seamless, Optimized Development and Deployment.",
			href: "https://hub.docker.com/r/imbios/bun-node",
			stats: `${await getDockerPulls("bun-node")} pulls`,
		},
	];

	return projects.map((project) => (
		<ProjectItem key={project.title} {...project} />
	));
};

export default Projects;
