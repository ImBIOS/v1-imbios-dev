// TODO Try migrate these Server Actions to API Routes
"use server";

export async function getGithubUserProfileBio() {
	const res = await fetch("https://github.com/ImBIOS");

	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}

	const html = await res.text();
	// Adjusted to capture only the inner content of the div with "user-profile-bio" class
	const bioRegex =
		/<div class="[^"]*user-profile-bio[^"]*"[^>]*data-bio-text="([^"]+)">/;
	const match = bioRegex.exec(html);

	if (match?.[1]) {
		// Extracting bio from the `data-bio-text` attribute to get the expected result directly
		const bio = match[1]
			.replace(/&lt;/g, "<")
			.replace(/&gt;/g, ">")
			.replace(/&amp;/g, "&")
			.replace(/&quot;/g, '"')
			.replace(/&#39;/g, "'");
		return bio;
	}

	// Fallback to matching the inner HTML of the div if the data-bio-text attribute is not found
	const fallbackRegex =
		/<div class="[^"]*user-profile-bio[^"]*"[^>]*>\s*<div>(.*?)<\/div>\s*<\/div>/;
	const fallbackMatch = fallbackRegex.exec(html);

	if (fallbackMatch?.[1]) {
		const bio = fallbackMatch[1]
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
