import { ReactNode } from "react";

interface Props {
    children?: ReactNode;
}

export default function BaseFooter(props: Props) {
    return (
        <div className="fixed bottom-0 left-0 right-0 px-6 py-4 animation-drop-in">
            <div
                className="
                    min-h-12 rounded-lg
                    flex flex-row justify-around items-center
                    w-full max-w-[480px] mx-auto
                    border shadow overflow-hidden
                    border-slate-300 dark:border-slate-600
                    bg-slate-50 dark:bg-slate-700
                "
            >
                {props.children}
            </div>
        </div>
    );
}
