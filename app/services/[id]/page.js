import { getServiceById, SERVICES } from '@/lib/services';
import styles from './page.module.css';
import Button from '@/components/Button';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    return SERVICES.map((service) => ({
        id: service.id,
    }));
}

export default async function ServicePage({ params }) {
    const { id } = await params;
    const service = getServiceById(id);

    if (!service) {
        notFound();
    }

    return (
        <div className={styles.container}>
            <div className={styles.hero}>
                <div className={styles.heroContent}>
                    <div className={styles.icon}>{service.icon}</div>
                    <h1 className="title-gradient">{service.title}</h1>
                    <p className={styles.subtitle}>{service.description}</p>
                </div>
            </div>

            <div className={styles.contentWrapper}>
                <div className={styles.mainContent}>
                    {/* Rendering Markdown-like content safely */}
                    <div className={styles.description}>
                        {service.longDescription.split('\n').map((line, index) => {
                            if (line.startsWith('# ')) return <h1 key={index}>{line.replace('# ', '')}</h1>;
                            if (line.startsWith('## ')) return <h2 key={index}>{line.replace('## ', '')}</h2>;
                            if (line.startsWith('- ')) return <li key={index}>{line.replace('- ', '')}</li>;
                            if (line.trim() === '') return <br key={index} />;
                            return <p key={index}>{line}</p>;
                        })}
                    </div>
                </div>

                <div className={styles.sidebar}>
                    <div className={`${styles.pricingCard} glass`}>
                        <h3>Pricing</h3>
                        <div className={styles.price}>
                            ₹{service.price.toLocaleString('en-IN')}
                            <span>/project</span>
                        </div>
                        <ul className={styles.features}>
                            <li>✅ Professional Service</li>
                            <li>✅ 24/7 Support</li>
                            <li>✅ Secure & Scalable</li>
                        </ul>
                        <Link href={`/checkout/initiate?serviceId=${service.id}`}>
                            <Button variant="primary" style={{ width: '100%' }}>Buy Now</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
