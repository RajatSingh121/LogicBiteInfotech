import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
    return (
        <nav className={`${styles.navbar} glass`}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    LogicBite<span className={styles.highlight}>Infotech</span>
                </Link>
                <div className={styles.links}>
                    <Link href="/services" className={styles.link}>Services</Link>
                    <Link href="/careers" className={styles.link}>Careers</Link>
                    <Link href="/contact" className={styles.link}>Contact</Link>
                    <Link href="/admin/billing" className={`${styles.link} ${styles.adminLink}`}>Admin</Link>
                </div>
            </div>
        </nav>
    );
}
