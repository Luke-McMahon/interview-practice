import { assert } from "node:console";
import { parseCLIArguments } from "./args";
import { readdir, mkdir, unlink } from "node:fs/promises";

const mapExtToFolderName: Record<string, string> = {
  jpg: "Images",
  mp4: "Videos",
  docx: "Documents",
  txt: "Others",
};

function getFolderFromFileExtension(filename: string): string {
  const ext = filename.split(".")[1];

  assert(ext !== undefined, `${filename} must include a file extension`);
  assert(mapExtToFolderName[ext] !== undefined, `unsupported file type`);

  return mapExtToFolderName[ext];
}

async function createDirectories(parentDirectory: string, names: string[]) {
  for (const name of names) {
    await mkdir(`${parentDirectory}/${name}`);
  }
}

async function main() {
  const { path } = await parseCLIArguments();

  const files = await readdir(path);
  const newDirectories: Record<string, string[]> = {};

  for (const file of files) {
    const newDirectory = getFolderFromFileExtension(file);
    if (!newDirectories[newDirectory]) {
      newDirectories[newDirectory] = [];
    }
    newDirectories[newDirectory].push(file);
  }

  await createDirectories(path, Object.keys(newDirectories));

  for (const dir in newDirectories) {
	const files = newDirectories[dir];
	for (const file of files) {
	  const old = `${path}/${file}`;
	  const newPath = `${path}/${dir}/${file}`;

	  const data = Bun.file(old);
	  await Bun.write(newPath, data);
	  await unlink(old);
	}
  }
}

main();

