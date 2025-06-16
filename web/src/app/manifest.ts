import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Nivelo",
        short_name: "Nivelo",
        description:
            "Faça a gestão das suas finanças de maneira prática e rápida " +
            "com o Nivelo de qualquer dispositivo móvel ou computador.",
        start_url: "/",
        display: "standalone",
        background_color: "#314158",
        theme_color: "#314158",
        icons: [
            {
                src: "/web-app-manifest-192x192.png",
                sizes: "192x192",
                type: "image/png",
                purpose: "maskable"
            },
            {
                src: "/web-app-manifest-512x512.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "maskable"
            },
            {
                src: "/web-app-manifest-512x512.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "any"
            }
        ],
        screenshots: [
            {
                src: "/web-app-screenshot-640x320.png",
                sizes: "640x320",
                type: "image/png",
                form_factor: "wide"
            },
            {
                src: "/web-app-screenshot-320x640.png",
                sizes: "320x640",
                type: "image/png",
                form_factor: "narrow"
            }
        ]
    };
}
