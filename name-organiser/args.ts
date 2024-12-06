export type CLIOption = "string" | "boolean";

export interface CLIOptions {
  [key: string]: {
    type: CLIOption;
    short?: string;
  };
}

export const options: CLIOptions = {
  file: {
    type: "string",
    short: "f",
  },
  save: {
    type: "boolean",
    short: "s",
  },
  outputFile: {
    type: "string",
    short: "o",
  },
};
