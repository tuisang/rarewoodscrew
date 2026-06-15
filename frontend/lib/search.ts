import { prisma } from "@/lib/prisma";

export async function searchDocuments(vectorString: string) {
  const docs = await prisma.$queryRawUnsafe(
    `
    SELECT *
    FROM "Document"
    ORDER BY embedding <=> $1::vector
    LIMIT 5
    `,
    vectorString
  );
  return docs;
}