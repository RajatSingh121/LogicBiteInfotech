import Link from 'next/link';
import styles from './admin.module.css';

export default function AdminLayout({ children }) {
    return (
        <div className={styles.container}>
            <aside className={styles.sidebar}>
                <h2 className={styles.title}>Admin Panel</h2>
                <nav className={styles.nav}>
                    <Link href="/admin/billing" className={styles.link}>Billing & Invoices</Link>
                    <Link href="/admin/hiring" className={styles.link}>Hiring System</Link>
                    <Link href="/" className={styles.backLink}>← Back to Home</Link>
                </nav>
            </aside>
            <main className={styles.content}>
                {children}
            </main>
        </div>
    );
}
