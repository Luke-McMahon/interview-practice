import assert from "node:assert";
import { parseArgs } from "node:util";
import { options } from "./args";

export function groupNamesByFirstLetter(
  names: string[],
): Record<string, string[]> {
  const map: Record<string, string[]> = {};

  for (const name of names) {
    const firstLetter = name[0];
    if (!map[firstLetter]) {
      map[firstLetter] = [];
    }

    map[firstLetter].push(name);
  }
  return map;
}

export async function parseCLIArguments() {
  const { values, _ } = parseArgs({
    args: process.argv.slice(2),
    options,
  });

  assert(values.file !== undefined, "missing required argument --file | -f");
  const filepath = String(values.file);
  assert(await Bun.file(filepath).exists(), `${filepath} does not exists`);

  const saveToDisk = values.save || false;
  if (saveToDisk) {
    assert(
      values.outputFile !== undefined,
      "--outputFile | -o must be provided when --save | -s is enabled",
    );
  }

  const outputFile = values.outputFile ? String(values.outputFile) : undefined;

  return {
    filepath,
    saveToDisk,
    outputFile,
  };
}
