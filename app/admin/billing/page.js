'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '@/components/Button';
import styles from './page.module.css';

export default function BillingPage() {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/invoices')
            .then(res => res.json())
            .then(data => {
                setInvoices(data);
                setLoading(false);
            });
    }, []);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Invoices</h1>
                <Link href="/admin/billing/create">
                    <Button variant="primary">Create New Invoice</Button>
                </Link>
            </header>

            {loading ? (
                <p>Loading invoices...</p>
            ) : invoices.length === 0 ? (
                <div className={styles.empty}>
                    <p>No invoices found. Create one to get started.</p>
                </div>
            ) : (
                <div className={styles.tableReflow}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Client</th>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoices.map(inv => (
                                <tr key={inv.id}>
                                    <td>{inv.id}</td>
                                    <td>{inv.clientName}</td>
                                    <td>{new Date(inv.createdAt).toLocaleDateString()}</td>
                                    <td>${inv.totalAmount}</td>
                                    <td>
                                        <span className={`${styles.status} ${styles[inv.status.toLowerCase()]}`}>
                                            {inv.status}
                                        </span>
                                    </td>
                                    <td>
                                        <Button variant="secondary" className={styles.smBtn}>View</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
