import styles from './page.module.css'
import Button from '@/components/Button'
import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'
import AnimatedCounter from '@/components/AnimatedCounter'

export default function Home() {
    return (
        <main className={styles.main}>
            {/* 1. HERO SECTION WITH AURORA EFFECT */}
            <section className={styles.hero}>
                <div className={styles.heroBackground}></div>
                <div className={styles.heroContent}>
                    <ScrollReveal animation="zoom-in">
                        <h1 className={styles.title}>
                            Innovate with <br />
                            <span className={styles.titleGradient}>LogicBite Infotech</span>
                        </h1>
                    </ScrollReveal>

                    <ScrollReveal animation="fade-up" delay={0.2}>
                        <p className={styles.heroSubtitle}>
                            We build world-class digital solutions that transform businesses.
                            From strategic consulting to cutting-edge software development.
                        </p>
                    </ScrollReveal>

                    <ScrollReveal animation="fade-up" delay={0.4}>
                        <div className={styles.heroButtons}>
                            <Link href="/contact">
                                <Button variant="primary">Get Started</Button>
                            </Link>
                            <Link href="/services">
                                <Button variant="secondary">Our Services</Button>
                            </Link>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* 2. MARQUEE SECTION (TRUST PROOF) */}
            <section className={styles.marqueeSection}>
                <div className={styles.marqueeContent}>
                    {/* Duplicate items for infinite scroll illusion */}
                    {['MICROSOFT', 'GOOGLE', 'AMAZON', 'NETFLIX', 'SPOTIFY', 'HULU', 'MICROSOFT', 'GOOGLE', 'AMAZON', 'NETFLIX'].map((logo, i) => (
                        <span key={i} className={styles.partnerLogo}>{logo}</span>
                    ))}
                </div>
            </section>

            {/* 3. SMART STATS SECTION */}
            <section className={styles.statsSection}>
                <div className={styles.statsGrid}>
                    <div className={styles.statItem}>
                        <span className={styles.statNumber}>
                            <AnimatedCounter end={150} suffix="+" />
                        </span>
                        <span className={styles.statLabel}>Projects Delivered</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statNumber}>
                            <AnimatedCounter end={50} suffix="+" />
                        </span>
                        <span className={styles.statLabel}>Happy Clients</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statNumber}>
                            <AnimatedCounter end={12} suffix="" />
                        </span>
                        <span className={styles.statLabel}>Awards Won</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statNumber}>
                            <AnimatedCounter end={99} suffix="%" />
                        </span>
                        <span className={styles.statLabel}>Retention Rate</span>
                    </div>
                </div>
            </section>

            {/* 4. 3D SERVICE CARDS */}
            <section className={styles.services}>
                <ScrollReveal>
                    <h2 className={styles.sectionTitle}>Our Expertise</h2>
                </ScrollReveal>
                <div className={styles.grid}>
                    <ScrollReveal animation="fade-left" delay={0.1}>
                        <div className={styles.card}>
                            <h3>Custom Software</h3>
                            <p>Scalable software tailored to your specific business needs. We build what you imagine.</p>
                            <Link href="/services/custom-software-development"><span className={styles.linkArrow}>Learn more &rarr;</span></Link>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal animation="fade-up" delay={0.2}>
                        <div className={styles.card}>
                            <h3>Cloud Infrastructure</h3>
                            <p>Secure cloud solutions for migration and management. AWS, Azure, and Google Cloud experts.</p>
                            <Link href="/services/cloud-infrastructure"><span className={styles.linkArrow}>Learn more &rarr;</span></Link>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal animation="fade-right" delay={0.3}>
                        <div className={styles.card}>
                            <h3>Data Analytics</h3>
                            <p>Turn your data into actionable insights with AI. Predictive modeling and big data solutions.</p>
                            <Link href="/services/data-analytics-ai"><span className={styles.linkArrow}>Learn more &rarr;</span></Link>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* 5. HIRING TEASER */}
            <section className={styles.hiring}>
                <ScrollReveal animation="zoom-in">
                    <div className={styles.hiringCard}>
                        <h2>Join Our Team</h2>
                        <p>We are always looking for top talent. Explore our open positions and grow with us.</p>
                        <Link href="/careers"><Button variant="primary">View Careers</Button></Link>
                    </div>
                </ScrollReveal>
            </section>
        </main>
    )
}
