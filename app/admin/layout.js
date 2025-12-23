import Link from 'next/link';
import styles from './admin.module.css';

export default function AdminLayout({ children }) {
    return (
        <div className={styles.container}>
            <aside className={styles.sidebar}>
                <div className={styles.title}>
                    <span>🛡️</span>
                    <span>Admin Panel</span>
                </div>
                <nav className={styles.nav}>
                    <Link href="/admin" className={styles.link}>
                        <span>📊</span>
                        <span>Dashboard</span>
                    </Link>
                    <Link href="/admin/billing" className={styles.link}>
                        <span>💳</span>
                        <span>Billing & Invoices</span>
                    </Link>
                    <Link href="/admin/hiring" className={styles.link}>
                        <span>👥</span>
                        <span>Hiring System</span>
                    </Link>
                    <Link href="/admin/salary-slip" className={styles.link}>
                        <span>📄</span>
                        <span>Salary Slip</span>
                    </Link>
                    <Link href="/admin/employees" className={styles.link}>
                        <span>👥</span>
                        <span>Employees</span>
                    </Link>

                    <Link href="/" className={styles.backLink}>← Back to Website</Link>
                </nav>
            </aside>
            <main className={styles.content}>
                {children}
            </main>
        </div>
    );
}
