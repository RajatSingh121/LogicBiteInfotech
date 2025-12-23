import Link from 'next/link';
import { COMPANY_DETAILS } from '@/lib/company';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    <div className={styles.col}>
                        <h3 className={styles.logo}>LogicBite<span className={styles.highlight}>Infotech</span></h3>
                        <p className={styles.description}>
                            Transforming businesses through innovative IT solutions and world-class consulting services.
                        </p>
                        <div className={styles.contactDetails}>
                            <p>{COMPANY_DETAILS.address.city}, {COMPANY_DETAILS.address.country}</p>
                            <p>{COMPANY_DETAILS.contact.email}</p>
                            <p>{COMPANY_DETAILS.contact.phone}</p>
                        </div>
                    </div>

                    <div className={styles.col}>
                        <h4>Services</h4>
                        <ul>
                            <li><Link href="/services">Software Development</Link></li>
                            <li><Link href="/services">Cloud Solutions</Link></li>
                            <li><Link href="/services">Cybersecurity</Link></li>
                            <li><Link href="/services">Digital Transformation</Link></li>
                        </ul>
                    </div>

                    <div className={styles.col}>
                        <h4>Company & Legal</h4>
                        <ul>
                            <li><Link href="/about">About Us</Link></li>
                            <li><Link href="/careers">Careers</Link></li>
                            <li><Link href="/contact">Contact</Link></li>
                            <li><Link href="/policies/terms-and-conditions">Terms & Conditions</Link></li>
                            <li><Link href="/policies/refund-and-cancellation">Refund Policy</Link></li>
                            <li><Link href="/policies/legal">Legal Information</Link></li>
                        </ul>
                    </div>

                    <div className={styles.col}>
                        <h4>Connect</h4>
                        <div className={styles.socials}>
                            <span>LinkedIn</span>
                            <span>Twitter</span>
                            <span>Facebook</span>
                        </div>
                        <p className={styles.copyright}>© {new Date().getFullYear()} {COMPANY_DETAILS.name}. All rights reserved.</p>
                        <p className={styles.cin}>CIN: {COMPANY_DETAILS.legal.cin}</p>

                    </div>
                </div>
            </div>
        </footer>
    );
}
