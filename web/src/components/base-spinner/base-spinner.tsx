import styles from "./_styles/base-spinner.module.css";

export default function Spinner() {
    return (
        <div className="animation-drop-in">
            <div className={styles.spinner}></div>
        </div>
    );
}
