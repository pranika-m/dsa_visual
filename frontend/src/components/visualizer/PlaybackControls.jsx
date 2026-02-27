import './PlaybackControls.css';

function PlaybackControls({
    actions = [],
    selectedActionIndex = 0,
    onSelectAction,
    isPlaying = false,
    onPlay,
    onPause,
    onStepForward,
    onStepBack,
    onReset,
    speed = 1,
    onSpeedChange,
    currentFrame = 0,
    totalFrames = 0
}) {
    return (
        <div className="playback-controls">
            {/* Action Selection */}
            <div className="playback-controls__actions">
                {actions.map((action, idx) => (
                    <button
                        key={idx}
                        className={`btn ${selectedActionIndex === idx ? 'btn--primary' : 'btn--secondary'}`}
                        onClick={() => onSelectAction(idx)}
                    >
                        {action.action_name || `Action ${idx + 1}`}
                    </button>
                ))}
            </div>

            {/* Playback Controls */}
            <div className="playback-controls__main">
                <div className="playback-controls__buttons">
                    <button 
                        className="viz-btn" 
                        onClick={onStepBack} 
                        title="Step Back"
                        disabled={currentFrame <= 0}
                    >
                        ⏮
                    </button>
                    
                    {isPlaying ? (
                        <button 
                            className="viz-btn viz-btn--main" 
                            onClick={onPause} 
                            title="Pause"
                        >
                            ⏸
                        </button>
                    ) : (
                        <button 
                            className="viz-btn viz-btn--main" 
                            onClick={onPlay} 
                            title="Play"
                        >
                            ▶
                        </button>
                    )}
                    
                    <button 
                        className="viz-btn" 
                        onClick={onStepForward} 
                        title="Step Forward"
                        disabled={currentFrame >= totalFrames - 1}
                    >
                        ⏭
                    </button>
                    
                    <button 
                        className="viz-btn" 
                        onClick={onReset} 
                        title="Reset"
                    >
                        ↺
                    </button>
                </div>

                {/* Frame Counter */}
                <div className="playback-controls__frame-info">
                    Frame {currentFrame + 1} / {totalFrames || 1}
                </div>
            </div>

            {/* Speed Control */}
            <div className="playback-controls__speed">
                <label>Speed: {speed}x</label>
                <input
                    type="range"
                    min="0.5"
                    max="4"
                    step="0.5"
                    value={speed}
                    onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
                />
            </div>
        </div>
    );
}

export default PlaybackControls;
