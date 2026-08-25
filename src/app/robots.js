export default function robots() {
  const BASE_URL = "https://decordazzlers.in";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/*",
          "/adminlogin",
          "/adminlogin/*",
          "/api/*",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
