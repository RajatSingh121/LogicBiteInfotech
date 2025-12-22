'use client';
import styles from './page.module.css';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';

export default function SuccessPage() {
    const router = useRouter();

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.icon}>🎉</div>
                <h1>Payment Successful!</h1>
                <p>Thank you for your payment. Your transaction has been completed successfully.</p>

                <div className={styles.message}>
                    <p>We have sent a confirmation email with the invoice attached to your registered email address.</p>
                </div>

                <div className={styles.actions}>
                    <Button onClick={() => router.push('/admin/billing')} variant="primary">Return to Dashboard</Button>
                </div>
            </div>
        </div>
    );
}
