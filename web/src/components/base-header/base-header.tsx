"use client";

import { useState } from "react";
import BaseMenu from "../base-menu/base-menu";
import BaseModal from "../base-modal/base-modal";
import { signOut } from "./_actions/actions";
import BaseHeaderToggle from "./base-header-toggle";

interface Props {
    className?: string;
}

export default function BaseHeader(props: Props) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className={`
            ${props.className}
            p-3 z-20
            sticky top-0 min-h-12
            flex shrink-0
            bg-blue-300 dark:bg-gray-700 dark:text-white
            `}
        >
            <BaseHeaderToggle
                toggleMenu={toggleMenu}
            />
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
                onModalConfirm={() => signOut()} />
        </div>
    );
}
