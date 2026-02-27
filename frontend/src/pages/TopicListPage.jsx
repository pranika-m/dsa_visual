import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTopicBySlug } from '../api/client';
import './TopicListPage.css';

function TopicListPage() {
    const { slug } = useParams();
    const [topic, setTopic] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        setLoading(true);
        getTopicBySlug(slug)
            .then((res) => {
                setTopic(res.data);
                setLoading(false);
            })
            .catch(() => {
                setError('Unable to load this topic right now.');
                setLoading(false);
            });
    }, [slug]);

    if (loading) {
        return (
            <div className="loader">
                <div className="spinner"></div>
            </div>
        );
    }

    if (!topic) {
        return (
            <div className="container" style={{ paddingTop: '4rem', textAlign: 'center' }}>
                <h2>{error || 'Topic not found'}</h2>
                <Link to="/" className="btn btn--primary" style={{ marginTop: '1rem' }}>
                    ← Back Home
                </Link>
            </div>
        );
    }

    return (
        <div className="topic-page">
            <div className="container">
                {/* Header */}
                <div className="topic-page__header animate-fade-in">
                    <Link to="/" className="topic-page__back">← Back to Topics</Link>
                    <div className="topic-page__title-row">
                        <span className="topic-page__icon">{topic.icon}</span>
                        <div>
                            <h1 className="topic-page__title">{topic.title}</h1>
                            <div className="topic-page__meta">
                                <span className={`badge badge--${topic.difficulty}`}>
                                    {topic.difficulty}
                                </span>
                            </div>
                        </div>
                    </div>
                    <p className="topic-page__description">{topic.short_description}</p>
                </div>

                {/* Concepts Grid */}
                <div className="topic-page__label">Available Concepts</div>
                <div className="concepts-grid">
                    {topic.concepts?.map((concept, idx) => (
                        <Link
                            key={concept.id}
                            to={`/learn/${concept.slug}`}
                            className="concept-card animate-fade-in"
                            style={{ animationDelay: `${idx * 0.1}s` }}
                        >
                            <div className="concept-card__number">{String(idx + 1).padStart(2, '0')}</div>
                            <div className="concept-card__content">
                                <h3 className="concept-card__title">{concept.title}</h3>
                                <p className="concept-card__overview">{concept.overview}</p>
                            </div>
                            <div className="concept-card__arrow">→</div>
                        </Link>
                    ))}
                </div>

                {(!topic.concepts || topic.concepts.length === 0) && (
                    <div className="topic-page__empty">
                        <p>🚧 Content for this topic is coming soon!</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TopicListPage;
