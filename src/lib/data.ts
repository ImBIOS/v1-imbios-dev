'use server'
import { JSDOM } from "jsdom";

export async function getGithubUserProfileBio() {
	const res = await fetch("https://github.com/ImBIOS");
	// The return value is *not* serialized
	// You can return Date, Map, Set, etc.

	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error("Failed to fetch data");
	}

	const dom = new JSDOM(await res.text());

	const userProfileBio =
		dom.window.document.querySelector(".user-profile-bio")?.textContent;

	return userProfileBio;
}

export async function getLatestStableNodejsCodename() {
	const res = await fetch("https://nodejs.org/en/about/previous-releases");
	// The return value is *not* serialized
	// You can return Date, Map, Set, etc.

	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error("Failed to fetch data");
	}

	const dom = new JSDOM(await res.text());

	/**
   *     versions = soup.find_all("td", attrs={"data-label": "Version"})
    version_list = [
        version.get_text().strip().replace("Node.js ", "") for version in versions
    ]
   */
	const codename = dom.window.document.querySelector(
		"td[data-label='Version']",
	)?.textContent;

	return codename;
}
