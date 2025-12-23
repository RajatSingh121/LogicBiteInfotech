import { COMPANY_DETAILS } from '@/lib/company';
import styles from './page.module.css';

export const metadata = {
    title: 'Legal Policy | LogicBite Infotech',
    description: 'Legal Policy and Company Information for LogicBite Infotech.',
};

export default function LegalPolicy() {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>Legal Policy</h1>
                <p className={styles.lastUpdated}>Last Updated: {new Date().toLocaleDateString()}</p>

                <section className={styles.section}>
                    <h2>1. Company Information</h2>
                    <p>LogicBite Infotech is a registered One Person Company (OPC) Private Limited entity in India.</p>
                    <div className={styles.detailsCard}>
                        <p><strong>Legal Name:</strong> {COMPANY_DETAILS.name}</p>
                        <p><strong>Corporate Identity Number (CIN):</strong> {COMPANY_DETAILS.legal.cin}</p>
                        <p><strong>GSTIN:</strong> {COMPANY_DETAILS.legal.gstin}</p>
                        <p><strong>PAN:</strong> {COMPANY_DETAILS.legal.pan}</p>
                        <p><strong>Registered Address:</strong> {COMPANY_DETAILS.address.line1}, {COMPANY_DETAILS.address.city}, {COMPANY_DETAILS.address.state}, {COMPANY_DETAILS.address.pincode}, {COMPANY_DETAILS.address.country}</p>
                    </div>
                </section>

                <section className={styles.section}>
                    <h2>2. Privacy Policy</h2>
                    <p>We are committed to protecting your privacy. We collect only necessary information to provide our services and do not share your personal data with third parties without your consent, except as required by law.</p>
                </section>

                <section className={styles.section}>
                    <h2>3. Disclaimer</h2>
                    <p>The information provided on this website is for general informational purposes only. While we try to keep the information up-to-date and correct, we make no representations or warranties of any kind about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information.</p>
                </section>

                <section className={styles.section}>
                    <h2>4. Governing Law</h2>
                    <p>These terms and conditions are governed by and construed in accordance with the laws of India. Any disputes relating to these terms and conditions will be subject to the exclusive jurisdiction of the courts of {COMPANY_DETAILS.address.city}, {COMPANY_DETAILS.address.state}.</p>
                </section>
            </div>
        </div>
    );
}
