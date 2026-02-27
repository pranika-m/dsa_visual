import './AnimationControls.css';

function AnimationControls({
    isPlaying,
    onSkipBack,
    onStepBack,
    onPause,
    onPlay,
    onStepForward,
    onSkipForward,
    speed,
    onSpeedChange,
    currentStep,
    totalSteps
}) {
    return (
        <div className="animation-controls">
            {/* Row 1: All controls in one line */}
            <div className="animation-controls__row">
                <div className="animation-controls__buttons">
                    <button className="anim-btn" onClick={onSkipBack} title="Skip to Start">⏮</button>
                    <button className="anim-btn" onClick={onStepBack} title="Step Back">⏴</button>
                    {isPlaying ? (
                        <button className="anim-btn anim-btn--main" onClick={onPause} title="Pause">⏸</button>
                    ) : (
                        <button className="anim-btn anim-btn--main" onClick={onPlay} title="Play">▶</button>
                    )}
                    <button className="anim-btn" onClick={onStepForward} title="Step Forward">⏵</button>
                    <button className="anim-btn" onClick={onSkipForward} title="Skip to End">⏭</button>
                </div>
                
                <div className="animation-controls__slider">
                    <span className="slider-label">Speed</span>
                    <input
                        type="range"
                        min="0.25"
                        max="3"
                        step="0.25"
                        value={speed}
                        onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
                        className="speed-slider"
                    />
                    <span className="speed-value">{speed}x</span>
                </div>

                <div className="animation-controls__progress">
                    <span className="progress-text">{currentStep + 1} / {totalSteps}</span>
                </div>
            </div>
        </div>
    );
}

export default AnimationControls;
