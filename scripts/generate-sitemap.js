#!/usr/bin/env node

const fs = require("fs");

const DOCS_PATH = "docs.json";
const OUTPUT_PATH = "sitemap.xml";
const DROPDOWN_INDEX = 0;
const LASTMOD = new Date().toISOString().slice(0, 10);
const CHANGEFREQ = "weekly";
const PRIORITY = "1.0";

function collectPages(node) {
  if (typeof node === "string") {
    return [node];
  }

  if (Array.isArray(node)) {
    return node.flatMap(collectPages);
  }

  if (node && typeof node === "object") {
    if (node.hidden) {
      return [];
    }

    if (Array.isArray(node.pages)) {
      return collectPages(node.pages);
    }
  }

  return [];
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function getBaseUrl(docs) {
  const baseUrl = docs.seo?.metatags?.canonical || docs.seo?.metatags?.["og:url"];

  if (!baseUrl) {
    throw new Error("Missing base URL in docs.json seo.metatags.");
  }

  return baseUrl.replace(/\/$/, "");
}

function buildSitemap(urls) {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset',
    '  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"',
    '  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">',
    ...urls.flatMap((url) => [
      "  <url>",
      `    <loc>${escapeXml(url)}</loc>`,
      `    <lastmod>${LASTMOD}</lastmod>`,
      `    <changefreq>${CHANGEFREQ}</changefreq>`,
      `    <priority>${PRIORITY}</priority>`,
      "  </url>",
    ]),
    "</urlset>",
    "",
  ].join("\n");
}

function main() {
  const docs = JSON.parse(fs.readFileSync(DOCS_PATH, "utf8"));
  const baseUrl = getBaseUrl(docs);
  const dropdown = docs.navigation?.dropdowns?.[DROPDOWN_INDEX];

  if (!dropdown) {
    throw new Error(`navigation.dropdowns[${DROPDOWN_INDEX}] was not found.`);
  }

  const pages = collectPages(dropdown.groups || []);
  const uniquePages = [...new Set(pages)];
  const urls = uniquePages.map((page) => `${baseUrl}/${page.replace(/^\/+/, "")}`);

  fs.writeFileSync(OUTPUT_PATH, buildSitemap(urls));
  console.log(`Generated ${OUTPUT_PATH} with ${urls.length} URLs.`);
}

main();
