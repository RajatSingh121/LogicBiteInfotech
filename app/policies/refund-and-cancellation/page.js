import { COMPANY_DETAILS } from '@/lib/company';
import styles from './page.module.css';

export const metadata = {
    title: 'Refund and Cancellation Policy | LogicBite Infotech',
    description: 'Refund and Cancellation Policy for LogicBite Infotech.',
};

export default function RefundPolicy() {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>Refund and Cancellation Policy</h1>
                <p className={styles.lastUpdated}>Last Updated: {new Date().toLocaleDateString()}</p>

                <section className={styles.section}>
                    <h2>1. Cancellation Policy</h2>
                    <p>Clients may cancel their service requests within 24 hours of placing an order or signing a contract, provided that work has not already commenced. Cancellations must be communicated in writing to {COMPANY_DETAILS.contact.email}.</p>
                </section>

                <section className={styles.section}>
                    <h2>2. Refund Policy</h2>
                    <p>We strive to deliver the highest quality services. If you are not satisfied with our services, please contact us immediately.</p>
                    <ul>
                        <li><strong>Service Defects:</strong> If there is a demonstrable defect in the service provided, we will attempt to rectify it. If we are unable to do so, a partial or full refund may be considered at our discretion.</li>
                        <li><strong>Advance Payments:</strong> Advance payments for larger projects are generally non-refundable once resources have been allocated and work has begun.</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>3. Processing of Refunds</h2>
                    <p>Approved refunds will be processed within 7-10 business days and credited back to the original method of payment.</p>
                </section>

                <section className={styles.section}>
                    <h2>4. Contact Us</h2>
                    <p>For any questions regarding cancellations or refunds, please contact us:</p>
                    <p>Email: {COMPANY_DETAILS.contact.email}</p>
                    <p>Phone: {COMPANY_DETAILS.contact.phone}</p>
                </section>
            </div>
        </div>
    );
}
