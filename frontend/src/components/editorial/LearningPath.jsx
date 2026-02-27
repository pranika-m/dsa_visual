import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './LearningPath.css';

function LearningPath({ steps = [], currentStep, onStepClick, completedSteps = [], onMarkComplete }) {
    const [expandedStep, setExpandedStep] = useState(currentStep || 0);

    const learningSteps = steps;

    const handleStepClick = (index) => {
        // Toggle: if already expanded, close it; otherwise open it
        setExpandedStep(prev => prev === index ? -1 : index);
        if (onStepClick) {
            onStepClick(index);
        }
    };

    const handleMarkComplete = (index, e) => {
        e.stopPropagation();
        if (onMarkComplete) {
            onMarkComplete(index);
        }
    };

    return (
        <div className="learning-path">
            <div className="learning-path__header">
                <h3 className="learning-path__title">📖 Learning Path</h3>
                <div className="learning-path__progress">
                    <div className="progress-bar">
                        <div 
                            className="progress-bar__fill"
                            style={{ width: `${(completedSteps.length / learningSteps.length) * 100}%` }}
                        />
                    </div>
                    <span className="progress-text">
                        {completedSteps.length}/{learningSteps.length} completed
                    </span>
                </div>
            </div>

            <div className="learning-path__steps">
                {learningSteps.map((step, index) => {
                    const isActive = index === currentStep;
                    const isCompleted = completedSteps.includes(index);
                    const isExpanded = index === expandedStep;

                    return (
                        <div
                            key={step.id}
                            className={`learning-step ${isActive ? 'learning-step--active' : ''} ${isCompleted ? 'learning-step--completed' : ''} ${isExpanded ? 'learning-step--expanded' : ''}`}
                            onClick={() => handleStepClick(index)}
                        >
                            <div className="learning-step__header">
                                <span className="learning-step__icon">{step.icon}</span>
                                <div className="learning-step__info">
                                    <h4 className="learning-step__title">{step.title}</h4>
                                    <p className="learning-step__description">{step.description}</p>
                                </div>
                                <div className="learning-step__status">
                                    {isCompleted ? (
                                        <span className="status-badge status-badge--completed">✓</span>
                                    ) : isActive ? (
                                        <span className="status-badge status-badge--active">●</span>
                                    ) : (
                                        <span className="status-badge">○</span>
                                    )}
                                </div>
                            </div>

                            {isExpanded && (
                                <div className="learning-step__content">
                                    <div className="learning-step__body">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                            {step.content}
                                        </ReactMarkdown>
                                    </div>
                                    
                                    {step.keyPoints && step.keyPoints.length > 0 && (
                                        <div className="learning-step__keypoints">
                                            <h5>🔑 Key Points:</h5>
                                            <ul>
                                                {step.keyPoints.map((point, i) => (
                                                    <li key={i}>{point}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    <button 
                                        className="mark-complete-btn"
                                        onClick={(e) => handleMarkComplete(index, e)}
                                    >
                                        {isCompleted ? '✓ Completed' : 'Mark as Complete'}
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="learning-path__navigation">
                <button 
                    className="nav-btn nav-btn--prev"
                    disabled={currentStep === 0}
                    onClick={() => handleStepClick(Math.max(0, currentStep - 1))}
                >
                    ← Previous
                </button>
                <button 
                    className="nav-btn nav-btn--next"
                    disabled={currentStep >= learningSteps.length - 1}
                    onClick={() => handleStepClick(Math.min(learningSteps.length - 1, currentStep + 1))}
                >
                    Next →
                </button>
            </div>
        </div>
    );
}

export default LearningPath;
