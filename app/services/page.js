import Link from 'next/link';
import Button from '@/components/Button';
import { SERVICES } from '@/lib/services';
import styles from './page.module.css';

export default function ServicesPage() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className="title-gradient">Our Services</h1>
                <p>Comprehensive IT solutions for the modern enterprise.</p>
            </header>

            <div className={styles.grid}>
                {SERVICES.map((service) => (
                    <div key={service.id} className={`${styles.card} glass`}>
                        <div className={styles.icon}>{service.icon}</div>
                        <h3>{service.title}</h3>
                        <p>{service.description}</p>

                        <div className={styles.priceTag}>
                            Starts at ₹{service.price.toLocaleString('en-IN')}
                        </div>

                        <div className={styles.actions}>
                            <Link href={`/services/${service.id}`}>
                                <Button variant="secondary" className={styles.readMoreBtn}>Read More</Button>
                            </Link>
                            <Link href={`/checkout/initiate?serviceId=${service.id}`}>
                                <Button variant="primary" className={styles.buyNowBtn}>Buy Now</Button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
