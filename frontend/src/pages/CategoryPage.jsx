import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCategoryBySlug } from '../api/client';
import './CategoryPage.css';

function CategoryPage() {
    const { slug } = useParams();
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        setLoading(true);
        getCategoryBySlug(slug)
            .then((res) => {
                setCategory(res.data);
                setLoading(false);
            })
            .catch(() => {
                setError('Unable to load topics for this category.');
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

    if (!category) {
        return (
            <div className="container" style={{ paddingTop: '4rem', textAlign: 'center' }}>
                <h2>{error || 'Category not found'}</h2>
                <Link to="/" className="btn btn--primary" style={{ marginTop: '1rem' }}>
                    ← Back Home
                </Link>
            </div>
        );
    }

    return (
        <div className="cat-page">
            <div className="container">
                {/* Header */}
                <div className="cat-page__header animate-fade-in">
                    <Link to="/" className="cat-page__back">← Back to Categories</Link>
                    <div className="cat-page__title-row">
                        <span className="cat-page__icon">{category.icon}</span>
                        <div>
                            <h1 className="cat-page__title">{category.name}</h1>
                            <p className="cat-page__count">{category.topics?.length || 0} topics</p>
                        </div>
                    </div>
                    <p className="cat-page__description">{category.description}</p>
                </div>

                {/* Topics Grid */}
                <div className="cat-page__label">Available Topics</div>
                <div className="cat-page__grid">
                    {category.topics?.map((topic, idx) => (
                        <Link
                            key={topic.id}
                            to={`/topics/${topic.slug}`}
                            className="topic-card animate-fade-in"
                            style={{ animationDelay: `${idx * 0.08}s` }}
                        >
                            <div className="topic-card__icon">{topic.icon}</div>
                            <div className="topic-card__content">
                                <h3 className="topic-card__title">{topic.title}</h3>
                                <p className="topic-card__desc">{topic.short_description}</p>
                            </div>
                            <div className="topic-card__meta">
                                <span className={`badge badge--${topic.difficulty}`}>
                                    {topic.difficulty}
                                </span>
                                <span className="topic-card__arrow">→</span>
                            </div>
                        </Link>
                    ))}
                </div>

                {(!category.topics || category.topics.length === 0) && (
                    <div className="cat-page__empty">
                        <p>🚧 Topics for this category are coming soon!</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CategoryPage;
