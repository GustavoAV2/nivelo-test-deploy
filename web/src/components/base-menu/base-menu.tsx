import BaseMenuBackdrop from "./base-menu-backdrop";
import BaseMenuContainer from "./base-menu-container";

interface Props {
    isMenuOpen: boolean;
    onMenuClose: () => void;
    onMenuLogout: () => void;
}

export default function BaseMenu(props: Props) {
    return (
        <div>
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
