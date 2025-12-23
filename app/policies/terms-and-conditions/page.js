import { COMPANY_DETAILS } from '@/lib/company';
import styles from './page.module.css';

export const metadata = {
    title: 'Terms and Conditions | LogicBite Infotech',
    description: 'Terms and Conditions for LogicBite Infotech.',
};

export default function TermsAndConditions() {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>Terms and Conditions</h1>
                <p className={styles.lastUpdated}>Last Updated: {new Date().toLocaleDateString()}</p>

                <section className={styles.section}>
                    <h2>1. Introduction</h2>
                    <p>Welcome to LogicBite Infotech. These Terms and Conditions govern your use of our website and services. By accessing or using our services, you agree to be bound by these terms.</p>
                </section>

                <section className={styles.section}>
                    <h2>2. Services</h2>
                    <p>LogicBite Infotech provides IT consulting, software development, and related services. Detailed descriptions of our services are available on our website.</p>
                </section>

                <section className={styles.section}>
                    <h2>3. User Responsibilities</h2>
                    <p>You agree to use our services only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website.</p>
                </section>

                <section className={styles.section}>
                    <h2>4. Intellectual Property</h2>
                    <p>All content included on this website, such as text, graphics, logos, images, and software, is the property of LogicBite Infotech or its content suppliers and protected by international copyright laws.</p>
                </section>

                <section className={styles.section}>
                    <h2>5. Limitation of Liability</h2>
                    <p>LogicBite Infotech shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your access to, or use of, our services.</p>
                </section>

                <section className={styles.section}>
                    <h2>6. Contact Us</h2>
                    <p>If you have any questions about these Terms, please contact us at:</p>
                    <p><strong>{COMPANY_DETAILS.name}</strong></p>
                    <p>{COMPANY_DETAILS.address.line1}, {COMPANY_DETAILS.address.city}, {COMPANY_DETAILS.address.state}, {COMPANY_DETAILS.address.pincode}</p>
                    <p>Email: {COMPANY_DETAILS.contact.email}</p>
                </section>
            </div>
        </div>
    );
}
