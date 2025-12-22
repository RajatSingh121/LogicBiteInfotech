'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Button from '@/components/Button';
import styles from './page.module.css';

export default function InvoiceViewPage() {
    const params = useParams();
    const [invoice, setInvoice] = useState(null);

    useEffect(() => {
        fetch(`/api/invoices/${params.id}`)
            .then(res => res.json())
            .then(data => setInvoice(data));
    }, [params.id]);

    if (!invoice) return <div className={styles.loading}>Loading...</div>;

    return (
        <div className={styles.container}>
            <div className={styles.actions}>
                <Button onClick={() => window.print()} variant="primary">Download/Print PDF</Button>
            </div>

            <div className={`${styles.invoice} invoice-print`}>
                <header className={styles.header}>
                    <div className={styles.brand}>
                        <h1>LogicBite<span className={styles.highlight}>Infotech</span></h1>
                        <p>123 Innovation Drive, Tech City, TC 90210</p>
                        <p>Tax ID: LBI-9988776655</p>
                    </div>
                    <div className={styles.meta}>
                        <h2 className={styles.invoiceTitle}>INVOICE</h2>
                        <p><strong>Invoice #:</strong> {invoice.id}</p>
                        <p><strong>Date:</strong> {new Date(invoice.invoiceDate || invoice.createdAt).toLocaleDateString()}</p>
                        <p><strong>Due Date:</strong> {invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : 'Upon Receipt'}</p>
                        <p><strong>Terms:</strong> {invoice.paymentTerms || 'Net 30'}</p>
                    </div>
                </header>

                <section className={styles.details}>
                    <div className={styles.to}>
                        <h3>Bill To:</h3>
                        <p className={styles.clientName}>{invoice.clientName}</p>
                        <p>{invoice.clientAddress}</p>
                        {invoice.taxId && <p><strong>Tax ID:</strong> {invoice.taxId}</p>}
                        <p>{invoice.clientEmail}</p>
                        {invoice.clientPhone && <p>{invoice.clientPhone}</p>}
                        {invoice.poNumber && <p><strong>PO #:</strong> {invoice.poNumber}</p>}
                    </div>
                </section>

                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th style={{ textAlign: 'center' }}>Qty</th>
                            <th style={{ textAlign: 'right' }}>Price</th>
                            <th style={{ textAlign: 'right' }}>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoice.items.map((item, index) => (
                            <tr key={index}>
                                <td className={styles.descCell}>{item.description}</td>
                                <td style={{ textAlign: 'center' }}>{item.quantity}</td>
                                <td style={{ textAlign: 'right' }}>{invoice.currency} {item.price.toFixed(2)}</td>
                                <td style={{ textAlign: 'right' }}>{invoice.currency} {(item.quantity * item.price).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <footer className={styles.footer}>
                    <div className={styles.totalSection}>
                        <div className={styles.row}>
                            <span>Subtotal:</span>
                            <span>{invoice.currency} {invoice.totalAmount.toFixed(2)}</span>
                        </div>
                        <div className={styles.row}>
                            <span>Tax (0%):</span>
                            <span>{invoice.currency} 0.00</span>
                        </div>
                        <div className={styles.grandTotal}>
                            <span>Total Amount:</span>
                            <span>{invoice.currency} {invoice.totalAmount.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className={styles.notes}>
                        <h4>Bank Details</h4>
                        <p>Bank: Tech City Bank</p>
                        <p>Account: 1234-5678-9000</p>
                        <p>SWIFT: TCBUS33</p>
                        <br />
                        <p>Thank you for your business!</p>
                    </div>
                </footer>
            </div>
        </div>
    );
}
