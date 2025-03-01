import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { hatmelEscape, html } from "./index.js";
import { unsafe } from "./unsafe.js";

describe("escape", () => {
	it("escapes text", () => {
		assert.equal(hatmelEscape("<>"), "&lt;&gt;");
	});
});

describe("html", () => {
	it("generates html", () => {
		const out = html`
      <h1>Some HTML</h1>
      <p>${5} cats is ${"<"} 6 cats</p>
    `;

		assert.equal(
			out.toString(),
			`
      <h1>Some HTML</h1>
      <p>5 cats is &lt; 6 cats</p>
    `,
		);
	});

	it("handles unsafe keys", () => {
		assert.equal(html`${unsafe("<>")}`.toString(), "<>");
	});
});
