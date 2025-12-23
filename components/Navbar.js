'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
    const pathname = usePathname();

    // Hide Navbar on Admin pages (Admin has its own Sidebar) and Login
    if (pathname.startsWith('/admin') || pathname.startsWith('/login')) {
        return null;
    }

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
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    );
}
