import { getGithubUserProfileBio } from "@/lib/data";

const Note = async () => {
	const userProfileBio = await getGithubUserProfileBio();
	return <code className="font-mono font-bold">{userProfileBio}</code>;
};

export default Note;
