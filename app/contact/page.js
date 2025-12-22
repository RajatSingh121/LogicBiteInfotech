import Button from '@/components/Button';
import styles from './page.module.css';

export default function ContactPage() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className="title-gradient">Get In Touch</h1>
                <p>Ready to transform your business? Let's talk.</p>
            </header>

            <div className={styles.content}>
                <form className={`${styles.form} glass`}>
                    <div className={styles.row}>
                        <input type="text" placeholder="First Name" className={styles.input} />
                        <input type="text" placeholder="Last Name" className={styles.input} />
                    </div>
                    <div className={styles.row}>
                        <input type="email" placeholder="Email Address" className={styles.input} />
                        <input type="tel" placeholder="Phone Number" className={styles.input} />
                    </div>
                    <input type="text" placeholder="Company Name" className={styles.input} />
                    <div className={styles.row}>
                        <select className={styles.input} defaultValue="">
                            <option value="" disabled>Interested Service</option>
                            <option>Custom Software Development</option>
                            <option>Cloud Infrastructure</option>
                            <option>AI & Machine Learning</option>
                            <option>Cybersecurity</option>
                            <option>IT Consulting</option>
                        </select>
                        <select className={styles.input} defaultValue="">
                            <option value="" disabled>Budget Range</option>
                            <option>$5k - $10k</option>
                            <option>$10k - $50k</option>
                            <option>$50k - $100k</option>
                            <option>$100k+</option>
                        </select>
                    </div>
                    <textarea placeholder="Tell us about your project requirements..." className={styles.textarea}></textarea>
                    <Button variant="primary" className={styles.submitBtn}>Send Message</Button>
                </form>

                <div className={styles.info}>
                    <div className={styles.infoBlock}>
                        <h3>Visit Us</h3>
                        <p>123 Innovation Drive<br />Tech City, TC 90210<br />United States</p>
                    </div>
                    <div className={styles.infoBlock}>
                        <h3>Email Us</h3>
                        <p>contact@logicbite.com<br />support@logicbite.com</p>
                    </div>
                    <div className={styles.infoBlock}>
                        <h3>Call Us</h3>
                        <p>+1 (555) 123-4567<br />Mon-Fri, 9am - 6pm EST</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
