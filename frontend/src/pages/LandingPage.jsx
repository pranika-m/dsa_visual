import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../api/client';
import './LandingPage.css';

function LandingPage() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        getCategories()
            .then((res) => {
                setCategories(res.data.results || res.data);
                setLoading(false);
            })
            .catch(() => {
                setError('Unable to load categories. Make sure the backend server is running.');
                setLoading(false);
            });
    }, []);

    return (
        <div className="landing">
            {/* ─── Hero Section ─── */}
            <section className="hero">
                <div className="hero__bg-orbs">
                    <div className="hero__orb hero__orb--1"></div>
                    <div className="hero__orb hero__orb--2"></div>
                    <div className="hero__orb hero__orb--3"></div>
                </div>
                <div className="container hero__content">
                    <div className="hero__badge">✨ Interactive Learning Platform</div>
                    <h1 className="hero__title">
                        Master <span className="hero__highlight">Data Structures</span> &{' '}
                        <span className="hero__highlight">Algorithms</span>
                    </h1>
                    <p className="hero__subtitle">
                        Learn DSA through interactive visualizations, guided editorials, and a
                        live coding sandbox. Watch algorithms come alive — step by step.
                    </p>
                    <div className="hero__actions">
                        <a href="#categories" className="btn btn--primary btn--lg">
                            🚀 Start Learning
                        </a>
                        <a href="#about" className="btn btn--secondary btn--lg">
                            Learn More
                        </a>
                    </div>
                    <div className="hero__stats">
                        <div className="hero__stat">
                            <span className="hero__stat-value">6+</span>
                            <span className="hero__stat-label">Categories</span>
                        </div>
                        <div className="hero__stat">
                            <span className="hero__stat-value">13+</span>
                            <span className="hero__stat-label">Topics</span>
                        </div>
                        <div className="hero__stat">
                            <span className="hero__stat-value">∞</span>
                            <span className="hero__stat-label">Visualizations</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── About Section ─── */}
            <section className="about" id="about">
                <div className="container">
                    <h2 className="section-title">How It Works</h2>
                    <p className="section-subtitle">
                        Three powerful tools to accelerate your DSA learning
                    </p>
                    <div className="about__cards">
                        <div className="about__card">
                            <div className="about__card-icon">📖</div>
                            <h3>Guided Editorial</h3>
                            <p>
                                Read through concepts from basics to advanced, with inline code
                                snippets and step-by-step explanations.
                            </p>
                        </div>
                        <div className="about__card">
                            <div className="about__card-icon">🎬</div>
                            <h3>Visual Animations</h3>
                            <p>
                                Watch data structures transform in real-time. Control the speed,
                                select actions, and see code highlighting sync with animations.
                            </p>
                        </div>
                        <div className="about__card">
                            <div className="about__card-icon">💻</div>
                            <h3>Code Sandbox</h3>
                            <p>
                                Write your own code and see how it executes step by step. The
                                visualization updates in real-time as your code runs.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── Categories Section ─── */}
            <section className="categories" id="categories">
                <div className="container">
                    <h2 className="section-title">Explore Topics</h2>
                    <p className="section-subtitle">
                        Choose a category to begin your learning journey
                    </p>

                    {loading ? (
                        <div className="loader">
                            <div className="spinner"></div>
                        </div>
                    ) : error ? (
                        <div className="cat-page__empty">
                            <p>{error}</p>
                        </div>
                    ) : categories.length === 0 ? (
                        <div className="cat-page__empty">
                            <p>No topics found. Seed backend data and refresh.</p>
                        </div>
                    ) : (
                        <div className="categories__grid">
                            {categories.map((category, idx) => (
                                <Link
                                    key={category.id}
                                    to={`/category/${category.slug}`}
                                    className="category-card animate-fade-in"
                                    style={{ animationDelay: `${idx * 0.1}s` }}
                                >
                                    <div className="category-card__header">
                                        <span className="category-card__icon">{category.icon}</span>
                                        <h3 className="category-card__name">{category.name}</h3>
                                    </div>
                                    <p className="category-card__desc">{category.description}</p>
                                    <div className="category-card__footer">
                                        <span className="category-card__count">{category.topics?.length || 0} topics</span>
                                        <span className="category-card__arrow">→</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* ─── Footer ─── */}
            <footer className="footer">
                <div className="container">
                    <p>
                        ⚡ DSA Visualizer — Built with Django, React, and D3.js
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default LandingPage;
