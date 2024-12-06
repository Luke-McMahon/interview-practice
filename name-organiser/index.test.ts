import { expect, test } from "bun:test";
import { groupNamesByFirstLetter } from "./parse";

test("can parse", async () => {
  const input = ["Alice", "Aaron", "Bob", "Charlie", "Cindy"];
  const expected: Record<string, string[]> = {
    A: ["Alice", "Aaron"],
    B: ["Bob"],
    C: ["Charlie", "Cindy"],
  };

  const actual = await groupNamesByFirstLetter(input);
  expect(actual).toEqual(expected);
});
