import BaseMenuBackdrop from "./base-menu-backdrop";
import BaseMenuContainer from "./base-menu-container";

interface Props {
    className?: string;
    isMenuOpen: boolean;
    onMenuClose: () => void;
    onMenuLogout: () => void;
}

export default function BaseMenu(props: Props) {
    return (
        <div className={`${props.className}`}>
            <BaseMenuBackdrop
                isBackdropVisible={props.isMenuOpen}
                onBackdropClick={props.onMenuClose}
            />
            <BaseMenuContainer
                isMenuOpen={props.isMenuOpen}
                onMenuClose={props.onMenuClose}
                onMenuLogout={props.onMenuLogout}
            />
        </div>
    );
}
