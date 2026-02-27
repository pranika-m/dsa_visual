import './CompleteCodeView.css';

function CompleteCodeView({ code, currentLine, language = 'python' }) {
    const lines = code.split('\n');

    return (
        <div className="complete-code-view">
            <div className="complete-code-view__header">
                <span className="complete-code-view__lang">{language}</span>
                <span className="complete-code-view__status">
                    Line {currentLine} of {lines.length}
                </span>
            </div>
            <div className="complete-code-view__content">
                {lines.map((line, index) => {
                    const lineNum = index + 1;
                    const isActive = lineNum === currentLine;
                    
                    return (
                        <div
                            key={index}
                            className={`code-view-line ${isActive ? 'code-view-line--active' : ''}`}
                        >
                            <span className="code-view-line__number">{lineNum}</span>
                            <span className="code-view-line__content">
                                {line || ' '}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default CompleteCodeView;
