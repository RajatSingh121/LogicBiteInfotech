'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import Button from '@/components/Button';

export default function CreateInvoicePage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        clientName: '',
        clientEmail: '',
        clientPhone: '',
        clientAddress: '',
        taxId: '', // GSTIN or VAT ID
        invoiceDate: new Date().toISOString().split('T')[0],
        dueDate: '',
        currency: 'USD',
        paymentTerms: 'Net 30',
        poNumber: '',
        items: [{ description: '', quantity: 1, price: 0 }],
    });

    const handleItemChange = (index, field, value) => {
        const newItems = [...formData.items];
        newItems[index][field] = value;
        setFormData({ ...formData, items: newItems });
    };

    const addItem = () => {
        setFormData({
            ...formData,
            items: [...formData.items, { description: '', quantity: 1, price: 0 }],
        });
    };

    const removeItem = (index) => {
        const newItems = formData.items.filter((_, i) => i !== index);
        setFormData({ ...formData, items: newItems });
    };

    const calculateTotal = () => {
        return formData.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const totalAmount = calculateTotal();

        const res = await fetch('/api/invoices', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...formData, totalAmount }),
        });

        if (res.ok) {
            router.push('/admin/billing');
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Create New Invoice</h1>

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.section}>
                    <h2>Client Details</h2>
                    <div className={styles.grid}>
                        <div className={styles.formGroup}>
                            <label>Client Name</label>
                            <input
                                type="text"
                                required
                                value={formData.clientName}
                                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Tax ID / GSTIN</label>
                            <input
                                type="text"
                                placeholder="Optional"
                                value={formData.taxId}
                                onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Email</label>
                            <input
                                type="email"
                                required
                                value={formData.clientEmail}
                                onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Phone</label>
                            <input
                                type="tel"
                                value={formData.clientPhone}
                                onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <label>Billing Address</label>
                        <textarea
                            required
                            value={formData.clientAddress}
                            onChange={(e) => setFormData({ ...formData, clientAddress: e.target.value })}
                        />
                    </div>
                </div>

                <div className={styles.section}>
                    <h2>Invoice Details</h2>
                    <div className={styles.grid}>
                        <div className={styles.formGroup}>
                            <label>Invoice Date</label>
                            <input
                                type="date"
                                required
                                value={formData.invoiceDate}
                                onChange={(e) => setFormData({ ...formData, invoiceDate: e.target.value })}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Due Date</label>
                            <input
                                type="date"
                                required
                                value={formData.dueDate}
                                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Currency</label>
                            <select
                                value={formData.currency}
                                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                            >
                                <option>USD</option>
                                <option>EUR</option>
                                <option>GBP</option>
                                <option>INR</option>
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label>PO Number</label>
                            <input
                                type="text"
                                value={formData.poNumber}
                                onChange={(e) => setFormData({ ...formData, poNumber: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.section}>
                    <h2>Items</h2>
                    {formData.items.map((item, index) => (
                        <div key={index} className={styles.itemRow}>
                            <input
                                placeholder="Description"
                                value={item.description}
                                onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                                className={styles.descInput}
                                required
                            />
                            <input
                                type="number"
                                placeholder="Qty"
                                min="1"
                                value={item.quantity}
                                onChange={(e) => handleItemChange(index, 'quantity', Number(e.target.value))}
                                className={styles.numInput}
                            />
                            <input
                                type="number"
                                placeholder="Price"
                                min="0"
                                step="0.01"
                                value={item.price}
                                onChange={(e) => handleItemChange(index, 'price', Number(e.target.value))}
                                className={styles.numInput}
                            />
                            <button type="button" onClick={() => removeItem(index)} className={styles.removeBtn}>×</button>
                        </div>
                    ))}
                    <Button type="button" variant="secondary" onClick={addItem} className={styles.addBtn}>+ Add Item</Button>
                </div>

                <div className={styles.footer}>
                    <h3>Total: {formData.currency} {calculateTotal().toFixed(2)}</h3>
                    <Button type="submit" variant="primary">Generate Invoice</Button>
                </div>
            </form>
        </div>
    );
}
