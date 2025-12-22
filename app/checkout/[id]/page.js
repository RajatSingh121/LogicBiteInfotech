'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Head from 'next/head';
import styles from './page.module.css';

export default function CheckoutPage() {
    const params = useParams();
    const router = useRouter();
    const [invoice, setInvoice] = useState(null);
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('razorpay');

    useEffect(() => {
        // Load Razorpay script
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);

        // Fetch Invoice
        fetch(`/api/invoices/${params.id}`)
            .then(res => res.json())
            .then(data => setInvoice(data));

        return () => {
            document.body.removeChild(script);
        }
    }, [params.id]);

    if (!invoice) return <div className={styles.loading}>Loading Invoice...</div>;

    const discount = invoice.discount || 0;
    const subtotal = invoice.items.reduce((sum, item) => sum + ((item.quantity * item.price) || 0), 0);
    const totalAmount = invoice.totalAmount || (subtotal - discount);

    const handlePayment = async () => {
        setLoading(true);

        if (paymentMethod === 'razorpay') {
            try {
                const res = await fetch('/api/payment/razorpay', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        amount: totalAmount,
                        receiptId: invoice.id
                    }),
                });
                const data = await res.json();

                if (data.error) throw new Error(data.error);

                const options = {
                    key: data.key,
                    amount: data.amount,
                    currency: data.currency,
                    name: 'LogicBite Infotech',
                    description: `Invoice Payment #${invoice.id}`,
                    image: '/company_logo.png',
                    order_id: data.id,
                    handler: async function (response) {
                        // Validate payment on server
                        try {
                            const verifyRes = await fetch('/api/payment/verify', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    orderCreationId: data.id,
                                    razorpayPaymentId: response.razorpay_payment_id,
                                    razorpaySignature: response.razorpay_signature,
                                    invoiceId: invoice.id,
                                    amount: totalAmount.toFixed(2),
                                    clientEmail: invoice.clientEmail,
                                    clientName: invoice.clientName
                                })
                            });

                            if (verifyRes.ok) {
                                router.push('/checkout/success');
                            } else {
                                alert('Payment Verification Failed');
                            }
                        } catch (error) {
                            console.error(error);
                            alert('Server Error during verification');
                        }
                    },
                    prefill: {
                        name: invoice.clientName,
                        email: invoice.clientEmail,
                        contact: invoice.clientPhone
                    },
                    theme: {
                        color: '#002D62'
                    }
                };

                const rzp = new window.Razorpay(options);
                rzp.open();
            } catch (err) {
                alert('Payment Initialization Failed: ' + err.message);
            } finally {
                setLoading(false);
            }
        } else if (paymentMethod === 'easebuzz') {
            try {
                const txnid = `TXN_${invoice.id}_${Date.now()}`;

                const res = await fetch('/api/payment/easebuzz', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        amount: totalAmount.toFixed(2),
                        txnid: txnid,
                        productinfo: 'Invoice Payment',
                        firstname: invoice.clientName.split(' ')[0],
                        email: invoice.clientEmail,
                        phone: invoice.clientPhone || '9999999999'
                    })
                });

                const data = await res.json();

                if (data.error) throw new Error(data.error);

                // For Easebuzz Seamless/Hosted, we post to their URL
                // Using the "Initiate Payment" flow which gives an access_key
                // Then redirecting to the payment page or creating a form

                // Form Post Method
                const form = document.createElement('form');
                form.method = 'POST';
                form.action = 'https://pay.easebuzz.in/pay/v1/payment/access';

                const inputs = [
                    { name: 'access_key', value: data.access_key },
                    { name: 'pay_mode', value: 'production' } // or test
                ];

                inputs.forEach(item => {
                    const input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = item.name;
                    input.value = item.value;
                    form.appendChild(input);
                });

                document.body.appendChild(form);
                form.submit();

            } catch (err) {
                alert('Easebuzz Error: ' + err.message);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <img src="/company_logo.png" alt="Logo" className={styles.logo} />
                    <h1>Secure Checkout</h1>
                </div>

                <div className={styles.summary}>
                    <div className={styles.row}>
                        <span>Invoice #</span>
                        <span>{invoice.id}</span>
                    </div>
                    <div className={styles.row}>
                        <span>Client</span>
                        <span>{invoice.clientName}</span>
                    </div>
                    <div className={styles.totalRow}>
                        <span>Total Amount</span>
                        <span>₹ {totalAmount.toFixed(2)}</span>
                    </div>
                </div>

                <div className={styles.methods}>
                    <h3>Select Payment Method</h3>
                    <div
                        className={`${styles.method} ${paymentMethod === 'razorpay' ? styles.active : ''}`}
                        onClick={() => setPaymentMethod('razorpay')}
                    >
                        <input type="radio" checked={paymentMethod === 'razorpay'} readOnly />
                        <span className={styles.methodName}>Razorpay</span>
                        <span className={styles.badges}>Cards, UPI, Netbanking</span>
                    </div>
                    <div
                        className={`${styles.method} ${paymentMethod === 'easebuzz' ? styles.active : ''}`}
                        onClick={() => setPaymentMethod('easebuzz')}
                    >
                        <input type="radio" checked={paymentMethod === 'easebuzz'} readOnly />
                        <span className={styles.methodName}>Easebuzz</span>
                        <span className={styles.badges}>Wallet, UPI, EMI</span>
                    </div>
                </div>

                <button
                    className={styles.payBtn}
                    onClick={handlePayment}
                    disabled={loading}
                >
                    {loading ? 'Processing...' : `Pay ₹ ${totalAmount.toFixed(2)}`}
                </button>

                <div className={styles.secured}>
                    🔒 Secured by 256-bit SSL Encryption
                </div>
            </div>
        </div>
    );
}
