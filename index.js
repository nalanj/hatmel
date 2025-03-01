import { isUnsafe, unsafe } from "./unsafe.js";

const escapes = {
	"&": "&amp;",
	'"': "&quot;",
	"'": "&apos;",
	"<": "&lt;",
	">": "&gt;",
};

export function hatmelEscape(str) {
	return str.replace(/[&"'<>]/g, (c) => escapes[c]);
}

export function html(strings, ...keys) {
	const result = [strings[0]];

	keys.forEach((key, i) => {
		result.push(render(key));
		result.push(strings[i + 1]);
	});

	return unsafe(result.join(""));
}

html.map = async (entries, render) => {
	if (entries?.map) {
		return Promise.all(entries.map((entry, i) => render(entry, i)));
	}

	if (entries) {
		return await render(entries);
	}

	return "";
};

function render(toRender) {
	if (toRender === undefined || toRender === null || toRender === false) {
		return "";
	}

	if (isUnsafe(toRender)) {
		return toRender.toString();
	}

	if (Array.isArray(toRender)) {
		return toRender.map((item) => render(item)).join("");
	}

	return hatmelEscape(toRender.toString());
}

export { unsafe };
