import styles from './page.module.css';

const services = [
    {
        title: 'Custom Software Development',
        description: 'We build scalable, robust software tailored to your specific business needs using cutting-edge technologies.',
        icon: '💻'
    },
    {
        title: 'Cloud Infrastructure',
        description: 'Secure and scalable cloud solutions helping you migrate, manage, and optimize your infrastructure.',
        icon: '☁️'
    },
    {
        title: 'Cybersecurity',
        description: 'Comprehensive security assessments and implementation to protect your valuable data and assets.',
        icon: '🔒'
    },
    {
        title: 'Data Analytics & AI',
        description: 'Turn your data into actionable insights with our advanced analytics and machine learning solutions.',
        icon: '📊'
    },
    {
        title: 'Mobile App Development',
        description: 'Native and cross-platform mobile applications that deliver exceptional user experiences.',
        icon: '📱'
    },
    {
        title: 'IT Consulting',
        description: 'Strategic technology consulting to help you navigate digital transformation and growth.',
        icon: '🚀'
    }
];

export default function ServicesPage() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className="title-gradient">Our Services</h1>
                <p>Comprehensive IT solutions for the modern enterprise.</p>
            </header>

            <div className={styles.grid}>
                {services.map((service, index) => (
                    <div key={index} className={`${styles.card} glass`}>
                        <div className={styles.icon}>{service.icon}</div>
                        <h3>{service.title}</h3>
                        <p>{service.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
