"use client";

import { ArrowLeft02Icon } from "hugeicons-react";
import { useRouter } from "next/navigation";

export default function BaseHeaderBack() {
    const router = useRouter();

    return (
        <button className="cursor-pointer" onClick={() => router.back()}>
            <ArrowLeft02Icon className="text-black dark:text-white" />
        </button>
    );
}
