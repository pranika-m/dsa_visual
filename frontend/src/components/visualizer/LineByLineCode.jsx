import { useEffect, useRef } from 'react';
import './LineByLineCode.css';

function LineByLineCode({ code, currentLine, language = 'python' }) {
    const lines = code.split('\n');
    const currentLineRef = useRef(null);

    useEffect(() => {
        if (currentLineRef.current) {
            currentLineRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [currentLine]);

    return (
        <div className="line-by-line-code">
            <div className="line-by-line-code__header">
                <span className="line-by-line-code__lang">{language}</span>
                <span className="line-by-line-code__status">
                    Line {currentLine} of {lines.length}
                </span>
            </div>
            <div className="line-by-line-code__content">
                {lines.map((line, index) => {
                    const lineNum = index + 1;
                    const isActive = lineNum === currentLine;
                    const isPast = lineNum < currentLine;
                    
                    return (
                        <div
                            key={index}
                            ref={isActive ? currentLineRef : null}
                            className={`code-line ${isActive ? 'code-line--active' : ''} ${isPast ? 'code-line--past' : ''}`}
                        >
                            <span className="code-line__number">{lineNum}</span>
                            <span className="code-line__content">
                                {line || ' '}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default LineByLineCode;
