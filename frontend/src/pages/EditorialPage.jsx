import { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getConceptBySlug, getVisualizationConfig } from '../api/client';
import { getContentBySlug } from '../content';
import CompactArrayViz from '../components/visualizer/CompactArrayViz';
import CompleteCodeView from '../components/visualizer/CompleteCodeView';
import CurrentLineExplanation from '../components/visualizer/CurrentLineExplanation';
import AlgorithmControls from '../components/visualizer/AlgorithmControls';
import AnimationControls from '../components/visualizer/AnimationControls';
import SandboxPanel from '../components/sandbox/SandboxPanel';
import LearningPath from '../components/editorial/LearningPath';
import ResizablePanel from '../components/common/ResizablePanel';
import './EditorialPage.css';

function EditorialPage({ sandboxOpen = false, onCloseSandbox }) {
    const { slug } = useParams();
    const topicContent = useMemo(() => getContentBySlug(slug), [slug]);
    const [concept, setConcept] = useState(null);
    const [vizConfig, setVizConfig] = useState(null);
    const [loading, setLoading] = useState(true);

    // Animation state
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(1);
    const [currentArray, setCurrentArray] = useState([5, 3, 8, 1, 2]);
    const [currentLine, setCurrentLine] = useState(1);
    const [animationSteps, setAnimationSteps] = useState([]);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const intervalRef = useRef(null);

    // Learning path state
    const [currentLearningStep, setCurrentLearningStep] = useState(0);
    const [completedSteps, setCompletedSteps] = useState([]);

    const handleMarkComplete = (stepIndex) => {
        setCompletedSteps(prev => {
            if (prev.includes(stepIndex)) {
                return prev.filter(s => s !== stepIndex);
            }
            return [...prev, stepIndex];
        });
    };

    // Extract final code from concept sections
    const finalCodeData = useMemo(() => {
        if (!concept?.sections) return null;

        // Search through all sections for code snippets marked as final
        for (const section of concept.sections) {
            if (section.code_snippets?.length > 0) {
                const finalSnippet = section.code_snippets.find(snippet => snippet.is_final_code);
                if (finalSnippet) {
                    return {
                        code: finalSnippet.code,
                        language: finalSnippet.language,
                        explanation: finalSnippet.explanation
                    };
                }
            }
        }

        // Fallback: use any code snippet from code-type sections
        const codeSection = concept.sections.find(s => s.section_type === 'code');
        if (codeSection?.code_snippets?.length > 0) {
            const snippet = codeSection.code_snippets[0];
            return {
                code: snippet.code,
                language: snippet.language,
                explanation: snippet.explanation
            };
        }

        return null;
    }, [concept]);

    useEffect(() => {
        setLoading(true);
        Promise.all([
            getConceptBySlug(slug).catch(() => ({ data: null })),
            getVisualizationConfig(slug).catch(() => ({ data: null })),
        ]).then(([conceptRes, vizRes]) => {
            setConcept(conceptRes.data);
            const defaultArr = vizRes.data?.default_input?.array || topicContent?.defaultArray || [5, 3, 8, 1, 2];
            setCurrentArray(defaultArr);
            // Generate animation steps immediately on load
            const steps = generateAnimationSteps(defaultArr, slug, conceptRes.data);
            setAnimationSteps(steps);
            setCurrentStepIndex(0);
            setCurrentLine(1);
            setVizConfig(vizRes.data);
            setLoading(false);
        });
    }, [slug]);

    // Generate animation steps based on array
    const generateAnimationSteps = (arr, cSlug, cData) => {
        const slugToUse = cSlug || slug;
        const conceptToUse = cData || concept;
        const steps = [];
        const n = arr.length;
        let arrCopy = [...arr];

        const isSelectionSort = slugToUse === 'selection-sort' || slugToUse === 'basic-selection-sort' || (conceptToUse?.title || '').toLowerCase().includes('selection');

        if (isSelectionSort) {
            steps.push({
                array: [...arrCopy],
                line: 1,
                comparing: [],
                swapped: [],
                description: `Starting with array: [${arrCopy.join(', ')}]`
            });
            for (let i = 0; i < n; i++) {
                let minIdx = i;
                steps.push({
                    array: [...arrCopy],
                    line: 3,
                    comparing: [i],
                    swapped: [],
                    description: `Iteration ${i + 1}: Assume min is at index ${i} (value ${arrCopy[i]})`
                });
                for (let j = i + 1; j < n; j++) {
                    steps.push({
                        array: [...arrCopy],
                        line: 5,
                        comparing: [minIdx, j],
                        swapped: [],
                        description: `Comparing assumed min ${arrCopy[minIdx]} with ${arrCopy[j]}`
                    });
                    if (arrCopy[j] < arrCopy[minIdx]) {
                        minIdx = j;
                        steps.push({
                            array: [...arrCopy],
                            line: 6,
                            comparing: [minIdx],
                            swapped: [],
                            description: `Found new min at index ${minIdx} (value ${arrCopy[minIdx]})`
                        });
                    }
                }
                if (minIdx !== i) {
                    steps.push({
                        array: [...arrCopy],
                        line: 8,
                        comparing: [],
                        swapped: [i, minIdx],
                        description: `Swapping element at index ${i} and minimum element at index ${minIdx}`
                    });
                    [arrCopy[i], arrCopy[minIdx]] = [arrCopy[minIdx], arrCopy[i]];
                    steps.push({
                        array: [...arrCopy],
                        line: 8,
                        comparing: [],
                        swapped: [],
                        description: `After swap: [${arrCopy.join(', ')}]`
                    });
                } else {
                    steps.push({
                        array: [...arrCopy],
                        line: 8,
                        comparing: [],
                        swapped: [],
                        description: `Element at index ${i} is already the minimum`
                    });
                }
            }
            steps.push({
                array: [...arrCopy],
                line: 10,
                comparing: [],
                swapped: [],
                sorted: true,
                description: `Sorted array: [${arrCopy.join(', ')}]`
            });
            return steps;
        }

        // Bubble Sort (Default)
        steps.push({
            array: [...arrCopy],
            line: 1,
            comparing: [],
            swapped: [],
            description: `Starting with array: [${arrCopy.join(', ')}]`
        });

        for (let i = 0; i < n; i++) {
            steps.push({
                array: [...arrCopy],
                line: 3,
                comparing: [],
                swapped: [],
                description: `Outer loop iteration ${i + 1}`
            });

            let swapped = false;

            for (let j = 0; j < n - i - 1; j++) {
                steps.push({
                    array: [...arrCopy],
                    line: 5,
                    comparing: [j, j + 1],
                    swapped: [],
                    description: `Comparing elements at indices ${j} and ${j + 1}: ${arrCopy[j]} vs ${arrCopy[j + 1]}`
                });

                steps.push({
                    array: [...arrCopy],
                    line: 6,
                    comparing: [j, j + 1],
                    swapped: [],
                    description: `Checking if ${arrCopy[j]} > ${arrCopy[j + 1]}`
                });

                if (arrCopy[j] > arrCopy[j + 1]) {
                    steps.push({
                        array: [...arrCopy],
                        line: 7,
                        comparing: [],
                        swapped: [j, j + 1],
                        description: `Swapping ${arrCopy[j]} and ${arrCopy[j + 1]}`
                    });

                    // Perform swap
                    [arrCopy[j], arrCopy[j + 1]] = [arrCopy[j + 1], arrCopy[j]];
                    swapped = true;

                    steps.push({
                        array: [...arrCopy],
                        line: 7,
                        comparing: [],
                        swapped: [],
                        description: `After swap: [${arrCopy.join(', ')}]`
                    });
                }
            }

            steps.push({
                array: [...arrCopy],
                line: 8,
                comparing: [],
                swapped: [],
                description: swapped ? 'Swap occurred, continue sorting' : 'No swaps, array is sorted!'
            });

            if (!swapped) {
                steps.push({
                    array: [...arrCopy],
                    line: 9,
                    comparing: [],
                    swapped: [],
                    description: 'Breaking early - array is already sorted'
                });
                break;
            }
        }

        steps.push({
            array: [...arrCopy],
            line: 10,
            comparing: [],
            swapped: [],
            sorted: true,
            description: `Sorted array: [${arrCopy.join(', ')}]`
        });

        return steps;
    };

    // Handle run with custom array
    const handleRun = (arr) => {
        setCurrentArray(arr);
        const steps = generateAnimationSteps(arr);
        setAnimationSteps(steps);
        setCurrentStepIndex(0);
        setCurrentLine(steps[0]?.line || 1);
        setIsPlaying(true);
    };

    // USFCA-style animation controls
    const handleSkipBack = () => {
        setIsPlaying(false);
        setCurrentStepIndex(0);
        setCurrentLine(animationSteps[0]?.line || 1);
    };

    const handleStepBack = () => {
        setIsPlaying(false);
        setCurrentStepIndex(prev => {
            const newIndex = Math.max(0, prev - 1);
            setCurrentLine(animationSteps[newIndex]?.line || 1);
            return newIndex;
        });
    };

    const handlePlay = () => {
        if (currentStepIndex >= animationSteps.length - 1) {
            setCurrentStepIndex(0);
            setCurrentLine(animationSteps[0]?.line || 1);
        }
        setIsPlaying(true);
    };

    const handlePause = () => {
        setIsPlaying(false);
    };

    const handleStepForward = () => {
        setIsPlaying(false);
        setCurrentStepIndex(prev => {
            const newIndex = Math.min(prev + 1, animationSteps.length - 1);
            setCurrentLine(animationSteps[newIndex]?.line || 1);
            return newIndex;
        });
    };

    const handleSkipForward = () => {
        setIsPlaying(false);
        const lastIndex = animationSteps.length - 1;
        setCurrentStepIndex(lastIndex);
        setCurrentLine(animationSteps[lastIndex]?.line || 1);
    };

    // Animation playback
    useEffect(() => {
        if (isPlaying && animationSteps.length > 0) {
            intervalRef.current = setInterval(() => {
                setCurrentStepIndex(prev => {
                    if (prev >= animationSteps.length - 1) {
                        setIsPlaying(false);
                        return prev;
                    }
                    const nextIndex = prev + 1;
                    setCurrentLine(animationSteps[nextIndex]?.line || 1);
                    return nextIndex;
                });
            }, 1000 / speed);
        }
        return () => clearInterval(intervalRef.current);
    }, [isPlaying, speed, animationSteps]);

    const handleExecutionResult = (steps) => {
        // Convert execution steps to animation frames
        if (steps?.length > 0) {
            const newSteps = steps.map((s) => ({
                array: Object.values(s.locals || {}).find(v => Array.isArray(v) && v.every(n => typeof n === 'number')) || currentArray,
                line: s.line,
                comparing: [],
                swapped: [],
                description: `Line ${s.line}: ${Object.entries(s.locals || {}).map(([k, v]) => `${k}=${v}`).join(', ')}`,
            }));
            setAnimationSteps(newSteps);
            setCurrentStepIndex(0);
            setCurrentLine(newSteps[0]?.line || 1);
            setIsPlaying(true);
        }
    };

    if (loading) {
        return (
            <div className="loader">
                <div className="spinner"></div>
            </div>
        );
    }

    if (!concept && !topicContent) {
        return (
            <div className="container" style={{ paddingTop: '4rem', textAlign: 'center' }}>
                <h2>Concept not found</h2>
                <Link to="/" className="btn btn--primary" style={{ marginTop: '1rem' }}>
                    ← Back Home
                </Link>
            </div>
        );
    }

    const currentStep = animationSteps[currentStepIndex] || { array: currentArray, line: 1, comparing: [], swapped: [] };
    const codeToShow = finalCodeData?.code || topicContent?.code?.code || `# Code not available for this concept yet.\n# Please check the learning path for explanations.`;
    const codeLanguage = finalCodeData?.language || topicContent?.code?.language || 'python';

    // Check if this is a supported algorithm (only bubble-sort for now)
    const isSupportedAlgorithm = ['bubble-sort', 'selection-sort', 'basic-selection-sort', 'merge-sort', 'basic-merge-sort', 'quick-sort', 'basic-quick-sort'].includes(slug) ||
        concept?.title?.toLowerCase().includes('bubble') ||
        concept?.title?.toLowerCase().includes('selection') ||
        concept?.title?.toLowerCase().includes('merge') ||
        concept?.title?.toLowerCase().includes('quick');

    return (
        <div className={`editorial ${sandboxOpen ? 'editorial--sandbox-open' : ''}`}>
            {/* ─── Left Panel: Learning Path (Resizable) ─── */}
            <ResizablePanel
                direction="horizontal"
                defaultSize={350}
                minSize={280}
                maxSize={500}
            >
                <aside className="editorial__left">
                    <div className="editorial__left-header">
                        <Link to="/" className="editorial__back">← Back</Link>
                        <h1 className="editorial__title">{concept?.title || topicContent?.title || 'Learning'}</h1>
                    </div>

                    {/* Interactive Learning Path */}
                    <LearningPath
                        steps={topicContent?.steps || []}
                        currentStep={currentLearningStep}
                        onStepClick={setCurrentLearningStep}
                        completedSteps={completedSteps}
                        onMarkComplete={handleMarkComplete}
                    />
                </aside>
            </ResizablePanel>

            {/* ─── Middle Panel: Visualization & Code ─── */}
            <section className="editorial__middle">
                {isSupportedAlgorithm ? (
                    <>
                        {/* Side-by-side Visualization and Code */}
                        <div className="editorial__viz-code-row">
                            <div className="editorial__viz-col">
                                {/* Compact Visualization */}
                                <div className="viz-container">
                                    <CompactArrayViz
                                        data={currentStep.array}
                                        comparing={currentStep.comparing}
                                        swapped={currentStep.swapped}
                                        sorted={currentStep.sorted}
                                    />
                                </div>

                                {/* Step Description */}
                                {currentStep.description && (
                                    <div className="editorial__step-description">
                                        {currentStep.description}
                                    </div>
                                )}

                                {/* Inner Row for Explanation and Sort Button */}
                                <div className="editorial__inner-controls">
                                    <div className="editorial__explanation-box">
                                        <CurrentLineExplanation
                                            code={codeToShow}
                                            currentLine={currentLine}
                                        />
                                    </div>
                                    <div className="editorial__run-box">
                                        <AlgorithmControls
                                            onRun={handleRun}
                                            isPlaying={isPlaying}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="editorial__code-col">
                                {sandboxOpen ? (
                                    <SandboxPanel
                                        onClose={onCloseSandbox}
                                        inputData={currentArray}
                                        vizType={vizConfig?.viz_type || 'array'}
                                        onExecutionResult={handleExecutionResult}
                                    />
                                ) : (
                                    <CompleteCodeView
                                        code={codeToShow}
                                        currentLine={currentLine}
                                        language={codeLanguage}
                                    />
                                )}
                            </div>
                        </div>

                        {/* USFCA-style Animation Controls */}
                        <AnimationControls
                            isPlaying={isPlaying}
                            onSkipBack={handleSkipBack}
                            onStepBack={handleStepBack}
                            onPause={handlePause}
                            onPlay={handlePlay}
                            onStepForward={handleStepForward}
                            onSkipForward={handleSkipForward}
                            speed={speed}
                            onSpeedChange={setSpeed}
                            currentStep={currentStepIndex}
                            totalSteps={animationSteps.length}
                        />
                    </>
                ) : (
                    <div className="unsupported-concept">
                        <div className="unsupported-concept__icon">🚧</div>
                        <h2>Visualization Coming Soon</h2>
                        <p>The interactive visualization for <strong>{concept?.title || topicContent?.title || 'this concept'}</strong> is currently under development.</p>
                        <p>Currently supported: <strong>Bubble Sort</strong></p>
                        <Link to="/topics/bubble-sort" className="btn btn--primary" style={{ marginTop: '1rem' }}>
                            Try Bubble Sort Instead
                        </Link>
                    </div>
                )}
            </section>

        </div>
    );
}

export default EditorialPage;
