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
                <Button onClick={() => window.location.href = `/checkout/${invoice.id}`} variant="primary" style={{ marginRight: '1rem', background: '#28a745' }}>Pay Now</Button>
                <Button onClick={() => window.print()} variant="primary">Download/Print PDF</Button>
            </div>

            <div className={`${styles.invoice} invoice-print`}>
                <header className={styles.header}>
                    <div className={styles.brand}>
                        <img src="/company_logo.png" alt="LogicBite Logo" className={styles.logo} />
                        <h1 className={styles.companyName}>LOGICBITE INFOTECH OPC PVT LTD</h1>
                        <p>Chhanabe, Sadar, Gaipura, Kalana, Mirzapur</p>
                        <p>Uttar Pradesh, 231303, India</p>
                        <div className={styles.contactInfo}>
                            <p><strong>Email:</strong> logicbite25@gmail.com</p>
                            <p><strong>WhatsApp:</strong> +91 9026181492</p>
                        </div>
                    </div>
                    <div className={styles.meta}>
                        <h2 className={styles.invoiceTitle}>INVOICE</h2>
                        <p><strong>Invoice #:</strong> {invoice.id}</p>
                        <p><strong>Date:</strong> {new Date(invoice.invoiceDate || invoice.createdAt).toLocaleDateString()}</p>
                        <p><strong>Due Date:</strong> {invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : 'Upon Receipt'}</p>
                        <div className={styles.legalMeta}>
                            <p><strong>GSTIN:</strong> 09AAGCL4213P1Z5</p>
                            <p><strong>CIN:</strong> U62099UP2025OPC229455</p>
                            <p><strong>PAN:</strong> AAGCL4213P</p>
                        </div>
                    </div>
                </header>

                <section className={styles.details}>
                    <div className={styles.to}>
                        <h3>Bill To:</h3>
                        <p className={styles.clientName}>{invoice.clientName}</p>
                        <p>{invoice.clientAddress}</p>
                        {invoice.taxId && <p><strong>GSTIN:</strong> {invoice.taxId}</p>}
                        <p>{invoice.clientEmail}</p>
                        {invoice.clientPhone && <p>{invoice.clientPhone}</p>}
                        {invoice.poNumber && <p><strong>PO #:</strong> {invoice.poNumber}</p>}
                    </div>
                </section>

                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>HSN/SAC</th>
                            <th style={{ textAlign: 'center' }}>Qty</th>
                            <th style={{ textAlign: 'right' }}>Price</th>
                            <th style={{ textAlign: 'right' }}>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoice.items.map((item, index) => (
                            <tr key={index}>
                                <td className={styles.descCell}>{item.description}</td>
                                <td>{item.hsn || '-'}</td>
                                <td style={{ textAlign: 'center' }}>{item.quantity}</td>
                                <td style={{ textAlign: 'right' }}>₹ {item.price ? item.price.toFixed(2) : '0.00'}</td>
                                <td style={{ textAlign: 'right' }}>₹ {((item.quantity || 1) * (item.price || 0)).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <footer className={styles.footer}>
                    <div className={styles.totalSection}>
                        <div className={styles.row}>
                            <span>Subtotal:</span>
                            <span>₹ {invoice.totalAmount.toFixed(2)}</span>
                        </div>
                        <div className={styles.row}>
                            <span>Tax (0%):</span>
                            <span>₹ 0.00</span>
                        </div>
                        <div className={styles.grandTotal}>
                            <span>Total Amount:</span>
                            <span>₹ {invoice.totalAmount.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className={styles.notes}>
                        <h4>Bank Details</h4>
                        <p><strong>Account Name:</strong> LOGICBITE INFOTECH OPC PVT LTD</p>
                        <p><strong>Account Number:</strong> 259026181492</p>
                        <p><strong>IFSC Code:</strong> INDB0001682</p>
                        <p><strong>Branch:</strong> MIRZAPUR</p>
                        <p><strong>Bank:</strong> IndusInd Bank</p>
                        <br />
                        <p>Thank you for your business!</p>
                    </div>
                </footer>
            </div>
        </div>
    );
}
