'use client';
import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from './page.module.css';
import Button from '@/components/Button';
import { SERVICES, getServiceById } from '@/lib/services';

function CheckoutForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const serviceId = searchParams.get('serviceId');
    const service = getServiceById(serviceId);

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        clientName: '',
        clientEmail: '',
        clientPhone: '',
        clientAddress: ''
    });

    if (!service) {
        return <div className={styles.error}>Service not found. Please return to the services page.</div>;
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Create Invoice
            const res = await fetch('/api/invoices', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    items: [{
                        description: service.title,
                        quantity: 1,
                        price: service.price,
                        hsn: '998311' // Default generic HSN for IT services
                    }],
                    dueDate: new Date().toISOString().split('T')[0], // Due Today
                    status: 'Pending',
                    paymentTerms: 'Immediate'
                })
            });

            if (res.ok) {
                const invoice = await res.json();
                router.push(`/checkout/${invoice.id}`);
            } else {
                alert('Failed to initiate checkout. Please try again.');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className="title-gradient">Checkout</h1>
                <div className={styles.summary}>
                    <h3>Order Summary</h3>
                    <div className={styles.item}>
                        <span>{service.title}</span>
                        <span>₹{service.price.toLocaleString('en-IN')}</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="clientName"
                            required
                            placeholder="John Doe"
                            value={formData.clientName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Email Address</label>
                        <input
                            type="email"
                            name="clientEmail"
                            required
                            placeholder="john@example.com"
                            value={formData.clientEmail}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Phone Number</label>
                        <input
                            type="tel"
                            name="clientPhone"
                            required
                            placeholder="+91 98765 43210"
                            value={formData.clientPhone}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Billing Address</label>
                        <textarea
                            name="clientAddress"
                            required
                            placeholder="Your billing address..."
                            value={formData.clientAddress}
                            onChange={handleChange}
                            rows={3}
                        />
                    </div>

                    <Button type="submit" variant="primary" disabled={loading}>
                        {loading ? 'Processing...' : 'Proceed to Payment'}
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default function InitiateCheckoutPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CheckoutForm />
        </Suspense>
    );
}
