// Fetches Shadhin-f's public repos from GitHub, merges in hand-written
// context from data/curated.json, and writes the result to projects.json.
// Run weekly by .github/workflows/update-projects.yml.

const fs = require("fs");
const path = require("path");

const USERNAME = "Shadhin-f";
const EXCLUDE = ["Shadhin-f", "shadhin-f.github.io"];

async function main() {
  const headers = {
    "User-Agent": "shadhin-folio-generator",
    Accept: "application/vnd.github+json",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const res = await fetch(
    `https://api.github.com/users/${USERNAME}/repos?per_page=100`,
    { headers }
  );
  if (!res.ok) {
    throw new Error(`GitHub API request failed: ${res.status} ${res.statusText}`);
  }
  const repos = await res.json();

  const curatedPath = path.join(__dirname, "..", "data", "curated.json");
  const curated = JSON.parse(fs.readFileSync(curatedPath, "utf8"));

  const projects = repos
    .filter((r) => !r.fork && !EXCLUDE.includes(r.name))
    .map((r) => {
      const extra = curated[r.name] || {};
      return {
        name: r.name,
        displayName: extra.displayName || r.name,
        url: r.html_url,
        date: r.created_at.slice(0, 7), // YYYY-MM
        description: extra.description || r.description || "No description provided.",
        tools: extra.tools || (r.language ? [r.language] : []),
        experience: extra.experience || null,
        tags: extra.tags || (r.language ? [r.language] : []),
        createdAt: r.created_at,
      };
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const output = {
    generatedAt: new Date().toISOString(),
    projects,
  };

  fs.writeFileSync(
    path.join(__dirname, "..", "projects.json"),
    JSON.stringify(output, null, 2) + "\n"
  );

  console.log(`Wrote ${projects.length} projects to projects.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
