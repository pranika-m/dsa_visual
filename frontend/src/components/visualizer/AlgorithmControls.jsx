import { useState } from 'react';
import './AlgorithmControls.css';

function AlgorithmControls({ onRun, isPlaying }) {
    const [arrayInput, setArrayInput] = useState('5, 3, 8, 1, 2');

    const handleRun = () => {
        const arr = arrayInput.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
        if (arr.length > 0) {
            onRun(arr);
        }
    };

    return (
        <div className="algorithm-controls">
            <div className="algorithm-controls__row">
                <span className="algorithm-controls__label">Sort</span>
                <input
                    type="text"
                    className="algorithm-controls__input"
                    value={arrayInput}
                    onChange={(e) => setArrayInput(e.target.value)}
                    placeholder="5, 3, 8, 1, 2"
                    disabled={isPlaying}
                />
                <button
                    className="algorithm-controls__btn anim-btn anim-btn--main"
                    onClick={handleRun}
                    disabled={isPlaying}
                >
                    Run
                </button>
            </div>
        </div>
    );
}

export default AlgorithmControls;
