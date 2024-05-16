import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { isUnsafe, unsafe } from "./unsafe.js";

describe("inUnsafe", () => {
	it("works on an unsafe string", () => {
		assert.equal(isUnsafe(unsafe("unsafe string")), true);
	});

	it("works on any other value", () => {
		assert.equal(isUnsafe("foobar"), false);
	});
});
