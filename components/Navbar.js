import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';

export default function Navbar() {
    return (
        <nav className={`${styles.navbar} glass`}>
            <div className={styles.container}>
                <Link href="/" className={styles.logoContainer}>
                    <Image
                        src="/company_logo.png"
                        alt="LogicBite Infotech Logo"
                        width={180}
                        height={50}
                        className={styles.logoImage}
                        priority
                    />
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
