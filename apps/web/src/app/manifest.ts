import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "RedCity Dental Care & Implant Centre",
    short_name: "RedCity Dental",
    description:
      "Dental implant, best prosthodontist in Ludhiana — Dr. Arvind Sahu, MDS (Prosthodontics).",
    start_url: "/",
    display: "browser",
    background_color: "#FFFFFF",
    theme_color: "#A61C2E",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
