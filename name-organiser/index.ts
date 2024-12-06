import assert from "node:assert";
import { parseCLIArguments, groupNamesByFirstLetter } from "./parse";

async function main() {
  const { filepath, saveToDisk, outputFile } = await parseCLIArguments();

  const file = await Bun.file(filepath, { type: "application/json" }).text();
  const names: string[] = JSON.parse(file);

  const map = groupNamesByFirstLetter(names);

  const result = JSON.stringify(map, null, 2);
  if (saveToDisk) {
    const output = await Bun.write(outputFile!, result);
    assert(output > 0, "failed to write output");
  } else {
    console.log(result);
  }
}

main();

