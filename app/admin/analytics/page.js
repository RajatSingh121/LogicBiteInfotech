'use client';
import styles from '../admin.module.css';

export default function AnalyticsPage() {
    return (
        <div className={styles.dashboardContainer}>
            <header className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>Analytics Dashboard</h1>
            </header>
            <div className={styles.statsGrid}>
                <div className={`${styles.statCard} ${styles.stat_blue}`}>
                    <div className={styles.statHeader}>
                        <span className={styles.statLabel}>Monthly Visitors</span>
                        <span className={styles.statTrend}>+12%</span>
                    </div>
                    <h3 className={styles.statValue}>12,504</h3>
                </div>
                <div className={`${styles.statCard} ${styles.stat_green}`}>
                    <div className={styles.statHeader}>
                        <span className={styles.statLabel}>Conversion Rate</span>
                        <span className={styles.statTrend}>+0.5%</span>
                    </div>
                    <h3 className={styles.statValue}>3.2%</h3>
                </div>
            </div>
            <div className={styles.card}>
                <h3>Performance Metrics</h3>
                <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>Detailed graphs and charts under construction.</p>
            </div>
        </div>
    );
}
