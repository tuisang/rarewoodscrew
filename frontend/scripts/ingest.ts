import fs from "fs";
import path from "path";

import { prisma } from "../lib/prisma";
import { createEmbedding } from "../lib/embeddings";

const DATA_DIR = path.join(process.cwd(), "data");

function getMarkdownFiles(dir: string): string[] {
  let files: string[] = [];

  for (const item of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, item);

    if (fs.statSync(fullPath).isDirectory()) {
      files.push(...getMarkdownFiles(fullPath));
    } else if (item.endsWith(".md")) {
      files.push(fullPath);
    }
  }

  return files;
}

async function main() {
  const files = getMarkdownFiles(DATA_DIR);

  console.log(`Found ${files.length} documents`);

  for (const file of files) {
    const content = fs.readFileSync(file, "utf8");

    const embedding =
      await createEmbedding(content);

    const vector = `[${embedding.join(",")}]`;

    await prisma.$executeRawUnsafe(
      `
      INSERT INTO "Document"
      (content, embedding)
      VALUES ($1, $2::vector)
      `,
      content,
      vector
    );

    console.log(`✓ ${path.basename(file)}`);
  }

  console.log("Done!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());