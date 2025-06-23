import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export default function BaseFloatable(props: Props) {
    return (
        <div className="p-2 flex flex-col flex-grow sm:justify-center sm:items-center">
            <div className="flex flex-col flex-grow sm:flex-grow-0 sm:w-full sm:max-w-[480px]">
                <div
                    className="
                        flex flex-col flex-grow justify-center
                        py-12 px-4 sm:px-12
                        rounded-lg
                        shadow-2xl
                        bg-slate-50
                        dark:bg-slate-800
                        animation-drop-in
                    "
                >
                    {props.children}
                </div>
            </div>
        </div>
    );
}
