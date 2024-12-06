import assert from "node:assert";
import * as fs from "node:fs/promises";
import { parseArgs } from "node:util";

export type CLIOption = "string" | "boolean";

export interface CLIOptions {
  [key: string]: {
    type: CLIOption;
    short?: string;
  };
}

export const options: CLIOptions = {
  path: {
    type: "string",
    short: "p",
  },
};

export async function parseCLIArguments() {
  const { values, _ } = parseArgs({
    args: process.argv.slice(2),
    options,
  });

  assert(values.path !== undefined, "path is a required argument");
  const path = String(values.path);

  assert(await fs.exists(path), "directory must exist");

  return { path };
}
