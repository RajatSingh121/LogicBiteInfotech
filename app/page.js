import styles from './page.module.css'
import Button from '@/components/Button'
import Link from 'next/link'

export default function Home() {
    return (
        <main className={styles.main}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1 className="title-gradient">
                        Innovate with <br />
                        LogicBite Infotech
                    </h1>
                    <p className={styles.heroSubtitle}>
                        We build world-class digital solutions that transform businesses.
                        From strategic consulting to cutting-edge software development.
                    </p>
                    <div className={styles.heroButtons}>
                        <Link href="/contact">
                            <Button variant="primary">Get Started</Button>
                        </Link>
                        <Link href="/services">
                            <Button variant="secondary">Our Services</Button>
                        </Link>
                    </div>
                </div>
                <div className={styles.heroGlow} />
            </section>

            {/* Services Preview */}
            <section className={styles.services}>
                <h2 className={styles.sectionTitle}>Our Expertise</h2>
                <div className={styles.grid}>
                    <div className={`${styles.card} glass`}>
                        <h3>Custom Software</h3>
                        <p>Scalable software tailored to your specific business needs.</p>
                        <Link href="/services/custom-software-development"><span className={styles.linkArrow}>Learn more &rarr;</span></Link>
                    </div>
                    <div className={`${styles.card} glass`}>
                        <h3>Cloud Infrastructure</h3>
                        <p>Secure cloud solutions for migration and management.</p>
                        <Link href="/services/cloud-infrastructure"><span className={styles.linkArrow}>Learn more &rarr;</span></Link>
                    </div>
                    <div className={`${styles.card} glass`}>
                        <h3>Data Analytics</h3>
                        <p>Turn your data into actionable insights with AI.</p>
                        <Link href="/services/data-analytics-ai"><span className={styles.linkArrow}>Learn more &rarr;</span></Link>
                    </div>
                </div>
            </section>

            {/* Hiring Teaser */}
            <section className={styles.hiring}>
                <div className={`${styles.hiringCard} glass`}>
                    <h2>Join Our Team</h2>
                    <p>We are always looking for top talent. Explore our open positions.</p>
                    <Link href="/careers"><Button variant="primary">View Careers</Button></Link>
                </div>
            </section>
        </main>
    )
}
