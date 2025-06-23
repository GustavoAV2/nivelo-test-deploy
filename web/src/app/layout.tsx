import { BaseNotificationProvider } from "@/components/base-notification/_contexts/base-notification-context";
import type { Metadata, Viewport } from "next";
import { Open_Sans } from "next/font/google";
import { ReactNode } from "react";
import "../styles/animations.css";
import "../styles/globals.css";

const openSans = Open_Sans({
    subsets: ["latin"]
});

export const metadata: Metadata = {
    title: "Nivelo",
    description: "Plataforma para gestão de finanças pessoais",
    appleWebApp: { title: "Nivelo" }
};

export const viewport: Viewport = {
    themeColor: "#1d293d"
};

interface Props {
    children: ReactNode;
};

export default function RootLayout(props: Readonly<Props>) {
    return (
        <html lang="pt-br">
            <body
                className={`
                ${openSans.className} antialiased
                flex flex-col min-h-dvh bg-gradient-to-br
                from-slate-100 to-slate-300
                dark:from-slate-900 dark:to-slate-800`}
            >
                <BaseNotificationProvider>
                    {props.children}
                </BaseNotificationProvider>
            </body>
        </html >
    );
}
