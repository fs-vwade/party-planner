// #region STATE
import * from "./types/global"

const ids = {
	form: "new-party"
}
const state = {
	party_roster: []
}

function add_party()
// #region RENDER
// #region SCRIPT
document.addEventListener("DOMContentLoaded", () => {
	// Function to load an external HTML file into an element
	const loadHTML = async (url, element) => {
		try {
			const parser = new DOMParser();
			const response = await fetch(url);
			if (!response.ok) throw new Error(`Failed to load ${url}`);
			const data = await response.text();
			element.innerHTML = parser.parseFromString(data, "text/html");
		} catch (error) {
			console.error(`Error: ${error}`);
		}
	};

	// Load header, footer, and main content dynamically
	loadHTML("./pages/home.html", document.querySelector("main"));
	loadHTML("./html/header.html", document.querySelector("header"));
	loadHTML("./html/footer.html", document.querySelector("footer"));
});

// #region TEST
