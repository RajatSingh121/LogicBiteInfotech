'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '@/components/Button';
import styles from './page.module.css';

export default function BillingPage() {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        fetch('/api/invoices')
            .then(res => res.json())
            .then(data => {
                setInvoices(data);
                setLoading(false);
            });
    }, []);

    // Filter Logic
    const filteredInvoices = invoices.filter(inv => {
        const matchesSearch = inv.clientName.toLowerCase().includes(search.toLowerCase()) ||
            inv.id.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = filter === 'All' || inv.status === filter;
        return matchesSearch && matchesStatus;
    });

    const totalRevenue = invoices.reduce((acc, curr) => acc + (curr.status === 'Paid' ? curr.totalAmount : 0), 0);
    const pendingAmount = invoices.reduce((acc, curr) => acc + (curr.status === 'Pending' ? curr.totalAmount : 0), 0);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>Smart Billing</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Manage invoices & financial health</p>
                </div>
                <Link href="/admin/billing/create">
                    <Button variant="primary">Create New Invoice</Button>
                </Link>
            </header>

            {/* Smart Analytics Bar */}
            <div className={styles.analyticsBar}>
                <div className={styles.metric}>
                    <span className={styles.metricLabel}>Total Revenue</span>
                    <span className={styles.metricValue}>${totalRevenue.toLocaleString()}</span>
                    <div className={styles.progressBar}><div style={{ width: '80%', background: '#10b981' }}></div></div>
                </div>
                <div className={styles.metric}>
                    <span className={styles.metricLabel}>Pending Clearance</span>
                    <span className={styles.metricValue}>${pendingAmount.toLocaleString()}</span>
                    <div className={styles.progressBar}><div style={{ width: '45%', background: '#f59e0b' }}></div></div>
                </div>
                <div className={styles.metric}>
                    <span className={styles.metricLabel}>Invoices Sent</span>
                    <span className={styles.metricValue}>{invoices.length}</span>
                </div>
            </div>

            {/* Search & Filter Controls */}
            <div className={styles.controls}>
                <input
                    className={styles.searchInput}
                    placeholder="🔍 Search Client or Invoice ID..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div className={styles.filters}>
                    {['All', 'Paid', 'Pending', 'Overdue'].map(f => (
                        <button
                            key={f}
                            className={`${styles.filterBtn} ${filter === f ? styles.activeFilter : ''}`}
                            onClick={() => setFilter(f)}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <p>Loading invoices...</p>
            ) : filteredInvoices.length === 0 ? (
                <div className={styles.empty}>
                    <p>No invoices found matching your criteria.</p>
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
                            {filteredInvoices.map(inv => (
                                <tr key={inv.id}>
                                    <td style={{ fontFamily: 'monospace', fontWeight: 600 }}>{inv.id}</td>
                                    <td>
                                        <div style={{ fontWeight: 600 }}>{inv.clientName}</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{inv.clientEmail}</div>
                                    </td>
                                    <td>{new Date(inv.createdAt).toLocaleDateString()}</td>
                                    <td style={{ fontWeight: 700 }}>${inv.totalAmount.toLocaleString()}</td>
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
