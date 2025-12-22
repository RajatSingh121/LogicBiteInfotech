import styles from './Button.module.css';

export default function Button({ children, onClick, type = 'button', variant = 'primary', className = '' }) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`${styles.btn} ${styles[variant]} ${className}`}
        >
            {children}
        </button>
    );
}
