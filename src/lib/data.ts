// TODO Try migrate these Server Actions to API Routes
"use server";

export async function getGithubUserProfileBio() {
	const res = await fetch("https://github.com/ImBIOS");

	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}

	const html = await res.text();
	// This regular expression looks for the specific pattern that surrounds the user bio.
	// Note: This is fragile and might need updates if GitHub changes their markup.
	const bioRegex = /<div class="user-profile-bio"><div>(.*?)<\/div><\/div>/;
	const match = bioRegex.exec(html);

	if (match?.[1]) {
		// Unescape HTML entities in the bio text.
		const bio = match[1]
			.replace(/&lt;/g, "<")
			.replace(/&gt;/g, ">")
			.replace(/&amp;/g, "&")
			.replace(/&quot;/g, '"')
			.replace(/&#39;/g, "'");
		return bio;
	}

	throw new Error("User profile bio not found");
}

// export async function getLatestStableNodejsCodename() {
// 	const res = await fetch("https://nodejs.org/en/about/previous-releases");
// 	// The return value is *not* serialized
// 	// You can return Date, Map, Set, etc.

// 	if (!res.ok) {
// 		// This will activate the closest `error.js` Error Boundary
// 		throw new Error("Failed to fetch data");
// 	}

// 	const dom = new JSDOM(await res.text());

// 	/**
//    *     versions = soup.find_all("td", attrs={"data-label": "Version"})
//     version_list = [
//         version.get_text().strip().replace("Node.js ", "") for version in versions
//     ]
//    */
// 	const codename = dom.window.document.querySelector(
// 		"td[data-label='Version']",
// 	)?.textContent;

// 	return codename;
// }
