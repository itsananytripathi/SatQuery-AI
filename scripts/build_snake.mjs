#!/usr/bin/env node
/**
 * Build profile snake SVGs from GitHub contributions.
 * March 2026 is sanitized to exactly six days (18–23) with tiered levels.
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { generateSnakeAnimation } from "./snake-engine.mjs";

const username = process.env.GITHUB_USER ?? "Sai-Vidyut";
const token = process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN;

if (!token) {
  console.error("GITHUB_TOKEN is required");
  process.exit(1);
}

mkdirSync("dist", { recursive: true });

const palette = {
  colorDotBorder: "#1b1f230a",
  colorEmpty: "#ebedf0",
  colorSnake: "#216e39",
  colorDots: {
    0: "#ebedf0",
    1: "#9be9a8",
    2: "#40c463",
    3: "#30a14e",
    4: "#216e39",
  },
  sizeCell: 16,
  sizeDot: 12,
  sizeDotBorderRadius: 2,
  dark: {
    colorDotBorder: "#1b1f230a",
    colorEmpty: "#161b22",
    colorSnake: "#00c647",
    colorDots: {
      0: "#161b22",
      1: "#01311f",
      2: "#034525",
      3: "#0f6d31",
      4: "#00c647",
    },
  },
};

const animationOptions = {
  stepDurationMs: 220,
  frameByStep: 1,
};

const outputs = [
  {
    format: "svg",
    drawOptions: palette,
    animationOptions,
  },
  {
    format: "svg",
    drawOptions: {
      ...palette,
      colorDotBorder: palette.dark.colorDotBorder,
      colorEmpty: palette.dark.colorEmpty,
      colorSnake: palette.dark.colorSnake,
      colorDots: palette.dark.colorDots,
    },
    animationOptions,
  },
];

const [light, dark] = await generateSnakeAnimation(
  { platform: "github", username, githubToken: token },
  outputs,
);

writeFileSync("dist/snake-light.svg", light);
writeFileSync("dist/snake-dark.svg", dark);
console.log("wrote dist/snake-light.svg");
console.log("wrote dist/snake-dark.svg");
