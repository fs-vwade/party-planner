// #region STATE

const COHORT = "2408-VVVVVV";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/party`;

const state = {
	roster: [],
};

function get_party_roster() {
	try {
		const response = fetch(API_URL);
		const result = response.json();

		state.roster = result.data;
	} catch (error) {
		console.error(error);
	}
}

function get_next_id() {
	return state.roster
		.map((e) => parseInt(e.id))
		.filter((e) => !!e)
		.reduce((a, b) => Math.max(a, b), -Infinity);
}

/**
 *
 * @param {Party} register
 */
function add_party(register) {
	try {
		const registration_id = get_next_id();
		const response = fetch(
			[API_URL, registration_id].map((e) => e.replace("^/|/$", "")).join("/"),
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					id: registration_id,
					name: register.name,
					date: register.date,
					time: register.time,
					location: register.location,
					description: register.description,
				}),
			}
		);
	} catch (error) {
		console.error(error);
	}
}
function update_party(register) {
	try {
		const registration_id = register.id || get_next_id();
		const response = fetch(
			[API_URL, registration_id].map((e) => e.replace("^/|/$", "")).join("/"),
			{
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					id: registration_id,
					name: register.name,
					date: register.date,
					time: register.time,
					location: register.location,
					description: register.description,
				}),
			}
		);
	} catch (error) {
		console.error(error);
	}
}
// #region RENDER
const $elements = {
	form: document.getElementById("input-form"),
	name: document.getElementById("input-name"),
	date: document.getElementById("input-date"),
	location: document.getElementById("input-location"),
	description: document.getElementById("input-description"),
};

// #region SCRIPT
document.addEventListener("DOMContentLoaded", () => {
	const loadHTML = async (url, element) => {
		try {
			const response = await fetch(url);
			if (!response.ok) throw new Error(`Failed to load ${url}`);
			const data = await response.text();
			element.innerHTML = data;
		} catch (error) {
			console.error(`Error: ${error}`);
		}
	};

	loadHTML("./pages/home.html", document.querySelector("main"));
	loadHTML("./html/header.html", document.querySelector("header"));
	loadHTML("./html/footer.html", document.querySelector("footer"));
});

// #region TEST
