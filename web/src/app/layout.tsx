import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { ReactNode } from "react";
import "../styles/globals.scss";

const openSans = Open_Sans({
    subsets: ["latin"]
});

export const metadata: Metadata = {
    title: "Plataforma Finanças",
    description: "Plataforma para gestão de finanças pessoais"
};

interface Props {
    children: ReactNode;
};

export default function RootLayout(props: Readonly<Props>) {
    return (
        <html lang="en">
            <body className={`
        ${openSans.className}
        antialiased`}
            >
                {props.children}
            </body>
        </html>
    );
}
