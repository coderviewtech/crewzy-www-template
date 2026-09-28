import assert from "node:assert/strict";
import { test } from "node:test";
import { pinScope } from "../app/scroll-layout.ts";

test("tall screens retain the heading with the cards", () => {
  assert.equal(pinScope(1324, 689, 274), "section");
  assert.equal(pinScope(1324, 640, 250), "section");
});

test("laptops keep the card-only reveal without clipping the heading", () => {
  assert.equal(pinScope(900, 689, 274), "cards");
  assert.equal(pinScope(800, 640, 250), "cards");
});

test("short screens and enlarged content use ordinary tabs", () => {
  assert.equal(pinScope(679, 400, 100), "none");
  assert.equal(pinScope(800, 720, 250), "none");
});

test("fit boundaries reserve header and bottom clearance", () => {
  assert.equal(pinScope(900, 600, 188), "section");
  assert.equal(pinScope(900, 600, 189), "cards");
  assert.equal(pinScope(900, 788, 100), "cards");
  assert.equal(pinScope(900, 789, 100), "none");
});
