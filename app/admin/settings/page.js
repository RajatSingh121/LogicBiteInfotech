'use client';
import styles from '../admin.module.css';

export default function SettingsPage() {
    return (
        <div className={styles.dashboardContainer}>
            <header className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>System Settings</h1>
            </header>
            <div className={styles.card}>
                <p style={{ color: 'var(--text-secondary)' }}>Configuration options coming soon...</p>
                <div style={{ marginTop: '2rem' }}>
                    <h3>Theme Preferences</h3>
                    <p>Current Theme: System Default</p>
                </div>
            </div>
        </div>
    );
}
