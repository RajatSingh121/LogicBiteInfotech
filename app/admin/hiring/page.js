'use client';
import { useState, useEffect } from 'react';
import Button from '@/components/Button';
import styles from './page.module.css';

export default function HiringDashboard() {
    const [jobs, setJobs] = useState([]);
    const [applications, setApplications] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        department: 'Engineering',
        location: 'Remote',
        type: 'Full-time',
        experience: 'Mid-Level',
        salaryRange: '',
        description: ''
    });

    useEffect(() => {
        fetch('/api/jobs').then(res => res.json()).then(data => setJobs(data));
        fetch('/api/applications').then(res => res.json()).then(data => setApplications(data));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/jobs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        if (res.ok) {
            const newJob = await res.json();
            setJobs([...jobs, newJob]);
            setShowForm(false);
            setFormData({
                title: '', department: 'Engineering', location: 'Remote',
                type: 'Full-time', experience: 'Mid-Level', salaryRange: '', description: ''
            });
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Hiring Dashboard</h1>
                <Button variant="primary" onClick={() => setShowForm(!showForm)}>
                    {showForm ? 'Cancel' : 'Post New Job'}
                </Button>
            </header>

            {showForm && (
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.grid}>
                        <input
                            placeholder="Job Title"
                            required
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                            className={styles.input}
                        />
                        <select
                            value={formData.department}
                            onChange={e => setFormData({ ...formData, department: e.target.value })}
                            className={styles.input}
                        >
                            <option>Engineering</option>
                            <option>Design</option>
                            <option>Marketing</option>
                            <option>Sales</option>
                            <option>HR</option>
                            <option>Operations</option>
                        </select>
                        <select
                            value={formData.location}
                            onChange={e => setFormData({ ...formData, location: e.target.value })}
                            className={styles.input}
                        >
                            <option>Remote</option>
                            <option>Bengaluru, India</option>
                            <option>Mumbai, India</option>
                            <option>New York, USA</option>
                            <option>London, UK</option>
                        </select>
                        <select
                            value={formData.type}
                            onChange={e => setFormData({ ...formData, type: e.target.value })}
                            className={styles.input}
                        >
                            <option>Full-time</option>
                            <option>Part-time</option>
                            <option>Contract</option>
                            <option>Internship</option>
                        </select>
                        <select
                            value={formData.experience}
                            onChange={e => setFormData({ ...formData, experience: e.target.value })}
                            className={styles.input}
                        >
                            <option>Junior (0-2 yrs)</option>
                            <option>Mid-Level (3-5 yrs)</option>
                            <option>Senior (5-8 yrs)</option>
                            <option>Lead (8+ yrs)</option>
                        </select>
                        <input
                            placeholder="Salary Range (e.g. $80k - $120k)"
                            value={formData.salaryRange}
                            onChange={e => setFormData({ ...formData, salaryRange: e.target.value })}
                            className={styles.input}
                        />
                    </div>
                    <textarea
                        placeholder="Job Description & Requirements"
                        required
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                        className={styles.textarea}
                    />
                    <Button type="submit" variant="secondary" className={styles.submitBtn}>Post Job</Button>
                </form>
            )}

            <div className={styles.jobsList}>
                <h2>Active Job Postings</h2>
                {jobs.length === 0 ? <p className={styles.empty}>No active jobs.</p> : (
                    <div className={styles.gridList}>
                        {jobs.map(job => (
                            <div key={job.id} className={styles.jobCard}>
                                <h3>{job.title}</h3>
                                <p className={styles.meta}>
                                    {job.department} • {job.location} • {job.type}
                                </p>
                                <p className={styles.meta} style={{ color: '#81e6d9' }}>
                                    {job.experience} • {job.salaryRange || 'Competitive'}
                                </p>
                                <p className={styles.date}>Posted: {new Date(job.postedAt).toLocaleDateString()}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className={styles.jobsList} style={{ marginTop: '3rem' }}>
                <h2>Recent Applications</h2>
                {applications.length === 0 ? <p className={styles.empty}>No applications received yet.</p> : (
                    <div className={styles.gridList}>
                        {applications.map(app => (
                            <div key={app.id} className={styles.jobCard}>
                                <h3>{app.applicantName}</h3>
                                <p className={styles.meta}>Role: <span style={{ color: '#fff' }}>{app.jobTitle}</span></p>
                                <p className={styles.meta}>Current CTC: {app.currentCTC} | Expected: {app.expectedCTC}</p>
                                <p className={styles.meta}>Notice Period: {app.noticePeriod}</p>
                                <div className={styles.links}>
                                    <a href={app.resumeLink} target="_blank" className={styles.link}>Resume</a>
                                    {app.linkedin && <a href={app.linkedin} target="_blank" className={styles.link}>LinkedIn</a>}
                                    {app.portfolio && <a href={app.portfolio} target="_blank" className={styles.link}>Portfolio</a>}
                                </div>
                                <p className={styles.date}>Submitted: {new Date(app.submittedAt).toLocaleDateString()}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
