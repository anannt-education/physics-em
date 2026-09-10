import type { MetadataRoute } from "next";
import { BASE_PATH, PUBLIC_LESSONS, ROBOTS_DISALLOW, SITE_ORIGIN, absUrl } from "@/lib/mount";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          `${BASE_PATH}$`,
          `${BASE_PATH}/`,
          `${BASE_PATH}/exam/2027`,
          `${BASE_PATH}/faq`,
          `${BASE_PATH}/legal`,
          `${BASE_PATH}/diagnostic`,
          `${BASE_PATH}${PUBLIC_LESSONS[0].path}`,
          `${BASE_PATH}${PUBLIC_LESSONS[1].path}`,
          "/exam/2027",
          "/faq",
          "/legal",
          "/diagnostic",
          PUBLIC_LESSONS[0].path,
          PUBLIC_LESSONS[1].path,
        ],
        disallow: ROBOTS_DISALLOW,
      },
    ],
    sitemap: absUrl("/sitemap.xml"),
    host: SITE_ORIGIN,
  };
}
