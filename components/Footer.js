import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    <div className={styles.col}>
                        <h3 className={styles.logo}>LogicBite<span className={styles.highlight}>Infotech</span></h3>
                        <p className={styles.description}>
                            Transforming businesses through innovative IT solutions and world-class consulting services.
                        </p>
                    </div>

                    <div className={styles.col}>
                        <h4>Services</h4>
                        <ul>
                            <li>Software Development</li>
                            <li>Cloud Solutions</li>
                            <li>Cybersecurity</li>
                            <li>Digital Transformation</li>
                        </ul>
                    </div>

                    <div className={styles.col}>
                        <h4>Company</h4>
                        <ul>
                            <li>About Us</li>
                            <li>Careers</li>
                            <li>Contact</li>
                            <li>Privacy Policy</li>
                        </ul>
                    </div>

                    <div className={styles.col}>
                        <h4>Connect</h4>
                        <div className={styles.socials}>
                            <span>LinkedIn</span>
                            <span>Twitter</span>
                            <span>Facebook</span>
                        </div>
                        <p className={styles.copyright}>© 2025 LogicBite Infotech. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
