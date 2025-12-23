'use client';
import Link from 'next/link';
import styles from './admin.module.css';

export default function AdminDashboard() {
    // Mock Data for Dashboard Stats
    const stats = [
        { label: 'Total Revenue', value: '$124,500', trend: '+12%', color: 'blue' },
        { label: 'Active Clients', value: '45', trend: '+3', color: 'green' },
        { label: 'Pending Invoices', value: '12', trend: '$4.2k', color: 'orange' },
        { label: 'Open Positions', value: '8', trend: 'Hiring', color: 'purple' },
    ];

    const activities = [
        { id: 1, user: 'System', action: 'Generated Monthly Report', time: '2 hours ago' },
        { id: 2, user: 'John Doe', action: 'Created Invoice #INV-2024-001', time: '4 hours ago' },
        { id: 3, user: 'Sarah Smith', action: 'Updated Client: TechCorp Inc', time: 'Yesterday' },
        { id: 4, user: 'System', action: 'Payment Received: $2,500', time: 'Yesterday' },
    ];

    return (
        <div className={styles.dashboardContainer}>
            <header className={styles.pageHeader}>
                <div>
                    <h1 className={styles.pageTitle}>Dashboard Overview</h1>
                    <p className={styles.pageSubtitle}>Welcome back, Administrator</p>
                </div>
                <div className={styles.headerActions}>
                    <button className={styles.btnPrimary}>Generate Report</button>
                </div>
            </header>

            {/* Stats Grid */}
            <div className={styles.statsGrid}>
                {stats.map((stat, index) => (
                    <div key={index} className={`${styles.statCard} ${styles[`stat-${stat.color}`]}`}>
                        <div className={styles.statHeader}>
                            <span className={styles.statLabel}>{stat.label}</span>
                            <span className={styles.statTrend}>{stat.trend}</span>
                        </div>
                        <h3 className={styles.statValue}>{stat.value}</h3>
                    </div>
                ))}
            </div>

            <div className={styles.contentGrid}>
                {/* Recent Activity */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h3>Recent Activity</h3>
                        <Link href="#" className={styles.linkAccent}>View All</Link>
                    </div>
                    <div className={styles.activityList}>
                        {activities.map(activity => (
                            <div key={activity.id} className={styles.activityItem}>
                                <div className={styles.activityIcon}>•</div>
                                <div className={styles.activityDetails}>
                                    <p className={styles.activityAction}>{activity.action}</p>
                                    <span className={styles.activityMeta}>{activity.user} • {activity.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h3>Quick Actions</h3>
                    </div>
                    <div className={styles.actionGrid}>
                        <Link href="/admin/billing/create" className={styles.actionCard}>
                            <span className={styles.actionIcon}>📄</span>
                            <span>New Invoice</span>
                        </Link>
                        <Link href="/admin/hiring" className={styles.actionCard}>
                            <span className={styles.actionIcon}>👥</span>
                            <span>Review Applications</span>
                        </Link>
                        <Link href="/admin/settings" className={styles.actionCard}>
                            <span className={styles.actionIcon}>⚙️</span>
                            <span>Settings</span>
                        </Link>
                        <Link href="/admin/analytics" className={styles.actionCard}>
                            <span className={styles.actionIcon}>📊</span>
                            <span>Analytics</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
