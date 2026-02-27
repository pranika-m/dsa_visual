import { useState } from 'react';
import './CustomInputControls.css';

function CustomInputControls({ 
    onRun, 
    onReset, 
    isPlaying, 
    speed, 
    onSpeedChange,
    defaultArray = [5, 3, 8, 1, 2]
}) {
    const [inputArray, setInputArray] = useState(defaultArray.join(', '));
    const [targetValue, setTargetValue] = useState('');

    const handleRun = () => {
        const arr = inputArray.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
        onRun(arr, targetValue ? parseInt(targetValue) : null);
    };

    const handleReset = () => {
        setInputArray(defaultArray.join(', '));
        setTargetValue('');
        onReset();
    };

    return (
        <div className="custom-input-controls">
            <div className="custom-input-controls__inputs">
                <div className="input-group">
                    <label>Array Values (comma-separated)</label>
                    <input
                        type="text"
                        value={inputArray}
                        onChange={(e) => setInputArray(e.target.value)}
                        placeholder="e.g., 5, 3, 8, 1, 2"
                        disabled={isPlaying}
                    />
                </div>
                <div className="input-group input-group--small">
                    <label>Target (optional)</label>
                    <input
                        type="number"
                        value={targetValue}
                        onChange={(e) => setTargetValue(e.target.value)}
                        placeholder="e.g., 5"
                        disabled={isPlaying}
                    />
                </div>
            </div>

            <div className="custom-input-controls__playback">
                <button 
                    className="btn btn--primary"
                    onClick={handleRun}
                    disabled={isPlaying}
                >
                    {isPlaying ? '⏳ Running...' : '▶ Run'}
                </button>
                
                <button 
                    className="btn btn--secondary"
                    onClick={handleReset}
                    disabled={isPlaying}
                >
                    ↺ Reset
                </button>

                <div className="speed-control">
                    <label>Speed: {speed}x</label>
                    <input
                        type="range"
                        min="0.5"
                        max="3"
                        step="0.5"
                        value={speed}
                        onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
                    />
                </div>
            </div>
        </div>
    );
}

export default CustomInputControls;
