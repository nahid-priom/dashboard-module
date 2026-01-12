import type { CatalogItem, CatalogCategory, CatalogStatus } from "./types";

// Seeded random number generator for deterministic data
class SeededRandom {
  private seed: number;
  
  constructor(seed: number) {
    this.seed = seed;
  }
  
  next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }
  
  range(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }
}

const categories: CatalogCategory[] = ["UI Kits", "Templates", "Landing Pages", "E-commerce"];
const statuses: CatalogStatus[] = ["active", "draft", "archived"];

const titles = [
  "Modern Dashboard", "Creative Portfolio", "Business Landing", "E-commerce Store",
  "Admin Panel", "Marketing Site", "Product Showcase", "Blog Template",
  "Saas Platform", "Mobile App UI", "Corporate Website", "Startup Landing",
  "Dashboard Pro", "Elegant Theme", "Minimal Design", "Bold Layout",
  "Clean Interface", "Professional Kit", "Creative Design", "Premium Template",
  "Responsive Layout", "Dark Theme", "Light Theme", "Colorful Design",
  "Typography Focus", "Animation Kit", "Component Library", "Icon Set",
  "Illustration Pack", "Mockup Collection", "Wireframe Kit", "Style Guide",
];

function generateMockItems(count: number): CatalogItem[] {
  const items: CatalogItem[] = [];
  const now = new Date();
  
  for (let i = 0; i < count; i++) {
    const rng = new SeededRandom(i + 1);
    const titleIndex = rng.range(0, titles.length - 1);
    const category = categories[rng.range(0, categories.length - 1)];
    const status = statuses[rng.range(0, statuses.length - 1)];
    const price = rng.range(19, 299);
    
    // Generate updatedAt dates spread across last 6 months
    const daysAgo = rng.range(0, 180);
    const updatedAt = new Date(now);
    updatedAt.setDate(updatedAt.getDate() - daysAgo);
    
    // Use placeholder images
    const thumbnailUrl = `https://picsum.photos/seed/${i + 1}/400/300`;
    
    items.push({
      id: `item-${String(i + 1).padStart(3, "0")}`,
      title: `${titles[titleIndex]} ${rng.range(1, 5) === 1 ? `v${rng.range(1, 3)}` : ""}`.trim(),
      category,
      status,
      price,
      updatedAt: updatedAt.toISOString(),
      thumbnailUrl,
    });
  }
  
  return items;
}

// Generate 100 items deterministically
export const mockCatalogItems: CatalogItem[] = generateMockItems(100);

