"use client";

import { useState } from "react";
import BaseMenu from "../base-menu/base-menu";
import BaseModal from "../base-modal/base-modal";
import { signOut } from "./_actions/actions";
import BaseHeaderBack from "./base-header-back";
import BaseHeaderToggle from "./base-header-toggle";

export default function BaseHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div
            className="
                py-2 px-4 z-20 min-h-12
                flex fixed top-0 left-0 right-0
                border-b shadow
                border-slate-300 dark:border-slate-600
                bg-slate-50 dark:bg-slate-700
            "
        >
            <div className="flex flex-row flex-grow justify-between items-center">
                <BaseHeaderBack />
                <BaseHeaderToggle toggleMenu={toggleMenu} />
            </div>
            <BaseMenu
                isMenuOpen={isMenuOpen}
                onMenuClose={toggleMenu}
                onMenuLogout={toggleModal}
            />
            <BaseModal
                modalTitle={"Retornar à tela de login?"}
                modalContent={"Seu usuário será desconectado."}
                isModalOpen={isModalOpen}
                onModalClose={toggleModal}
                onModalCancel={toggleModal}
                onModalConfirm={() => signOut()}
            />
        </div>
    );
}
