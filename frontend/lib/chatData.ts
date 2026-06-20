import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

const FOLDERS = ["policies", "products", "projects", "services", "steels", "woods"];

// Keywords that map to specific folders
const FOLDER_KEYWORDS: Record<string, string[]> = {
  woods: [
    "wood", "timber", "hardwood", "softwood", "lumber", "grain", "species",
    "cypress", "eucalyptus", "oak", "pine", "teak", "mvule", "mahogany",
    "walnut", "cherry", "tree", "plank", "board",
  ],
  steels: [
    "steel", "metal", "iron", "mild steel", "stainless", "gunmetal", "alloy",
    "rust", "galvan",
  ],
  products: [
    "product", "furniture", "table", "chair", "shelf", "shelving", "desk",
    "bed", "stool", "cabinet", "wardrobe", "sofa", "bench", "console",
    "bar stool", "bookshelf", "bed frame", "coffee table",
  ],
  services: [
    "service", "clean", "maintain", "maintenance", "repair", "restoration",
    "refinish", "inspect", "storage", "upholster", "care", "polish",
    "outdoor care", "rust prevention", "seasonal", "gunmetal", "powder coat",
  ],
  projects: [
    "project", "commission", "custom", "bespoke", "order", "bulk", "hotel",
    "restaurant", "office", "commercial", "interior", "fitout", "industrial",
    "outdoor", "cabinetry", "design", "weld", "welding", "fabricat", "forge",
  ],
  policies: [
    "policy", "warrant", "guarantee", "deliver", "payment", "quote",
    "quotation", "support", "return", "refund", "manufactur", "process",
    "mpesa", "m-pesa", "visa", "paypal", "how long", "lead time",
  ],
};

// Always include these as a lightweight base (they're short)
const ALWAYS_INCLUDE: Array<{ folder: string; file: string }> = [];

function readFile(folder: string, file: string): string {
  const filePath = path.join(DATA_DIR, folder, file);
  if (!fs.existsSync(filePath)) return "";
  const content = fs.readFileSync(filePath, "utf-8").trim();
  const label = file.replace(".md", "").replace(/-/g, " ");
  return `## ${label}\n${content}`;
}

function getAllFilesInFolder(folder: string): string[] {
  const folderPath = path.join(DATA_DIR, folder);
  if (!fs.existsSync(folderPath)) return [];
  return fs.readdirSync(folderPath).filter((f) => f.endsWith(".md"));
}

function matchesQuery(filename: string, query: string): boolean {
  // Check if the filename keywords appear in the query
  const name = filename.replace(".md", "").replace(/-/g, " ").toLowerCase();
  const words = name.split(" ");
  return words.some((w) => w.length > 3 && query.includes(w));
}

export function loadRelevantData(userMessage: string): string {
  const query = userMessage.toLowerCase();
  const sections: string[] = [];

  // Determine which folders are relevant
  const relevantFolders = FOLDERS.filter((folder) => {
    const keywords = FOLDER_KEYWORDS[folder] ?? [];
    return keywords.some((kw) => query.includes(kw.toLowerCase()));
  });

  // If no folder matched, load a small default set (products + policies)
  const foldersToSearch =
    relevantFolders.length > 0 ? relevantFolders : ["products", "policies"];

  for (const folder of foldersToSearch) {
    const files = getAllFilesInFolder(folder);

    // First try to find files that directly match the query
    let matched = files.filter((f) => matchesQuery(f, query));

    // If no specific file matched, load all files in the relevant folder
    // (folders are small - max ~12 files each, each file ~200 tokens)
    if (matched.length === 0) matched = files;

    const content = matched
      .map((f) => readFile(folder, f))
      .filter(Boolean)
      .join("\n\n");

    if (content) {
      sections.push(`# ${folder.toUpperCase()}\n\n${content}`);
    }
  }

  return sections.join("\n\n---\n\n");
}

// Keep full loader available for admin/debug use
export function loadAllChatData(): string {
  return FOLDERS.map((folder) => {
    const files = getAllFilesInFolder(folder);
    const content = files
      .map((f) => readFile(folder, f))
      .filter(Boolean)
      .join("\n\n");
    if (!content) return "";
    return `# ${folder.toUpperCase()}\n\n${content}`;
  })
    .filter(Boolean)
    .join("\n\n---\n\n");
}