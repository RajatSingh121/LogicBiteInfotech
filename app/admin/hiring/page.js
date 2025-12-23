'use client';
import { useState, useEffect } from 'react';
import Button from '@/components/Button';
import styles from './page.module.css';

export default function HiringDashboard() {
    const [view, setView] = useState('kanban'); // 'kanban' or 'jobs'
    const [jobs, setJobs] = useState([]);

    // Mock Data for Smart ATS
    const [candidates, setCandidates] = useState([
        { id: 1, name: 'Alice Walker', role: 'Frontend Dev', score: 92, stage: 'Screening', experience: '4 yrs' },
        { id: 2, name: 'Bob Smith', role: 'Backend Lead', score: 78, stage: 'Screening', experience: '6 yrs' },
        { id: 3, name: 'Charlie Liu', role: 'UI Designer', score: 85, stage: 'Interview', experience: '3 yrs' },
        { id: 4, name: 'David Kim', role: 'Frontend Dev', score: 96, stage: 'Offer', experience: '5 yrs' },
        { id: 5, name: 'Eva Green', role: 'Product Manager', score: 65, stage: 'New', experience: '2 yrs' },
    ]);

    const stages = ['New', 'Screening', 'Interview', 'Offer', 'Hired'];

    const moveCandidate = (id, direction) => {
        setCandidates(prev => prev.map(c => {
            if (c.id !== id) return c;
            const currentIndex = stages.indexOf(c.stage);
            const nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
            if (nextIndex >= 0 && nextIndex < stages.length) {
                return { ...c, stage: stages[nextIndex] };
            }
            return c;
        }));
    };

    const getScoreClass = (score) => {
        if (score >= 90) return styles.matchHigh;
        if (score >= 75) return styles.matchMed;
        return styles.matchLow;
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>Smart Hiring ATS</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>AI-Powered Applicant Tracking System</p>
                </div>
                <div className={styles.viewToggle}>
                    <button
                        className={`${styles.toggleBtn} ${view === 'kanban' ? styles.activeToggle : ''}`}
                        onClick={() => setView('kanban')}
                    >
                        📋 Kanban Board
                    </button>
                    <button
                        className={`${styles.toggleBtn} ${view === 'jobs' ? styles.activeToggle : ''}`}
                        onClick={() => setView('jobs')}
                    >
                        💼 Jobs
                    </button>
                </div>
            </header>

            {view === 'kanban' && (
                <div className={styles.boardContainer}>
                    {stages.map(stage => (
                        <div key={stage} className={styles.column}>
                            <div className={styles.columnHeader}>
                                <span className={styles.columnTitle}>{stage}</span>
                                <span className={styles.countBadge}>
                                    {candidates.filter(c => c.stage === stage).length}
                                </span>
                            </div>
                            <div className={styles.columnContent}>
                                {candidates.filter(c => c.stage === stage).map(candidate => (
                                    <div key={candidate.id} className={styles.candidateCard}>
                                        <div className={`${styles.aiBadge} ${getScoreClass(candidate.score)}`}>
                                            ✨ {candidate.score}% Match
                                        </div>
                                        <h3 className={styles.candidateName}>{candidate.name}</h3>
                                        <p className={styles.candidateRole}>{candidate.role} • {candidate.experience}</p>

                                        <div className={styles.cardActions}>
                                            {stage !== 'New' && (
                                                <button onClick={() => moveCandidate(candidate.id, 'back')} className={styles.actionBtn}>
                                                    ← Back
                                                </button>
                                            )}
                                            {stage !== 'Hired' && (
                                                <button onClick={() => moveCandidate(candidate.id, 'next')} className={styles.actionBtn}>
                                                    Next Stage →
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {view === 'jobs' && (
                <div className={styles.jobsList}>
                    {/* Placeholder for existing Jobs List View */}
                    <div className={styles.jobCard}>
                        <h3>Frontend Developer</h3>
                        <p className={styles.meta}>Engineering • Remote</p>
                        <p className={styles.date}>Posted: 2 days ago</p>
                    </div>
                </div>
            )}
        </div>
    );
}
