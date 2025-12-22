'use client';
import { useState, useEffect } from 'react';
import Button from '@/components/Button';
import styles from './page.module.css';

export default function CareersPage() {
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [applicationForm, setApplicationForm] = useState({
        name: '',
        email: '',
        phone: '',
        currentCTC: '',
        expectedCTC: '',
        noticePeriod: '',
        linkedin: '',
        portfolio: '',
        resumeLink: '',
        coverLetter: ''
    });
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        fetch('/api/jobs')
            .then(res => res.json())
            .then(data => setJobs(data));
    }, []);

    const handleApply = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/applications', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                jobId: selectedJob.id,
                jobTitle: selectedJob.title,
                applicantName: applicationForm.name,
                ...applicationForm
            })
        });

        if (res.ok) {
            setSubmitted(true);
            setTimeout(() => {
                setSubmitted(false);
                setSelectedJob(null);
                setApplicationForm({
                    name: '', email: '', phone: '', currentCTC: '', expectedCTC: '',
                    noticePeriod: '', linkedin: '', portfolio: '', resumeLink: '', coverLetter: ''
                });
            }, 3000);
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className="title-gradient">Join LogicBite Infotech</h1>
                <p>Build the future of technology with us.</p>
            </header>

            <div className={styles.content}>
                <div className={styles.jobList}>
                    {jobs.length === 0 ? <p>No open positions at the moment.</p> : (
                        jobs.map(job => (
                            <div key={job.id} className={`${styles.jobCard} glass ${selectedJob?.id === job.id ? styles.active : ''}`}>
                                <h3>{job.title}</h3>
                                <p className={styles.meta}>{job.department} • {job.location}</p>
                                <p className={styles.meta} style={{ fontSize: '0.85rem', color: '#888' }}>
                                    {job.experience} • {job.type}
                                </p>
                                <Button variant="secondary" onClick={() => setSelectedJob(job)} className={styles.viewBtn}>
                                    {selectedJob?.id === job.id ? 'Viewing' : 'View Details'}
                                </Button>
                            </div>
                        ))
                    )}
                </div>

                {selectedJob && (
                    <div className={`${styles.detailsPanel} glass`}>
                        <button className={styles.closeBtn} onClick={() => setSelectedJob(null)}>×</button>
                        <h2>{selectedJob.title}</h2>
                        <div className={styles.tags}>
                            <span>{selectedJob.type}</span>
                            <span>{selectedJob.location}</span>
                            <span>{selectedJob.salaryRange || 'Competitive'}</span>
                        </div>
                        <div className={styles.description}>
                            <p>{selectedJob.description}</p>
                        </div>

                        <hr className={styles.divider} />

                        <h3>Apply for this role</h3>
                        {submitted ? (
                            <div className={styles.success}>
                                Application submitted successfully! We will contact you soon.
                            </div>
                        ) : (
                            <form onSubmit={handleApply} className={styles.form}>
                                <div className={styles.row}>
                                    <input
                                        placeholder="Full Name"
                                        required
                                        value={applicationForm.name}
                                        onChange={e => setApplicationForm({ ...applicationForm, name: e.target.value })}
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        required
                                        value={applicationForm.email}
                                        onChange={e => setApplicationForm({ ...applicationForm, email: e.target.value })}
                                    />
                                </div>
                                <div className={styles.row}>
                                    <input
                                        type="tel"
                                        placeholder="Phone Number"
                                        required
                                        value={applicationForm.phone}
                                        onChange={e => setApplicationForm({ ...applicationForm, phone: e.target.value })}
                                    />
                                    <input
                                        placeholder="Notice Period (e.g. 30 days)"
                                        required
                                        value={applicationForm.noticePeriod}
                                        onChange={e => setApplicationForm({ ...applicationForm, noticePeriod: e.target.value })}
                                    />
                                </div>
                                <div className={styles.row}>
                                    <input
                                        placeholder="Current CTC"
                                        value={applicationForm.currentCTC}
                                        onChange={e => setApplicationForm({ ...applicationForm, currentCTC: e.target.value })}
                                    />
                                    <input
                                        placeholder="Expected CTC"
                                        value={applicationForm.expectedCTC}
                                        onChange={e => setApplicationForm({ ...applicationForm, expectedCTC: e.target.value })}
                                    />
                                </div>
                                <div className={styles.row}>
                                    <input
                                        placeholder="LinkedIn URL"
                                        value={applicationForm.linkedin}
                                        onChange={e => setApplicationForm({ ...applicationForm, linkedin: e.target.value })}
                                    />
                                    <input
                                        placeholder="Portfolio URL (Optional)"
                                        value={applicationForm.portfolio}
                                        onChange={e => setApplicationForm({ ...applicationForm, portfolio: e.target.value })}
                                    />
                                </div>
                                <input
                                    placeholder="Link to Resume (Google Drive/Dropbox)"
                                    required
                                    value={applicationForm.resumeLink}
                                    onChange={e => setApplicationForm({ ...applicationForm, resumeLink: e.target.value })}
                                />
                                <textarea
                                    placeholder="Cover Letter"
                                    value={applicationForm.coverLetter}
                                    onChange={e => setApplicationForm({ ...applicationForm, coverLetter: e.target.value })}
                                />
                                <Button type="submit" variant="primary">Submit Application</Button>
                            </form>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
