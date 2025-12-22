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
                        <h3>IT Consulting</h3>
                        <p>Strategic guidance to align technology with your business goals.</p>
                    </div>
                    <div className={`${styles.card} glass`}>
                        <h3>Web Development</h3>
                        <p>Stunning, high-performance websites and web applications.</p>
                    </div>
                    <div className={`${styles.card} glass`}>
                        <h3>Cloud Solutions</h3>
                        <p>Scalable cloud infrastructure and migration services.</p>
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
