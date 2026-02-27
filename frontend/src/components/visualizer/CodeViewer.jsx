import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './CodeViewer.css';

function CodeViewer({ 
    code = '', 
    language = 'python',
    highlightLines = '',
    currentFrame = 0,
    totalFrames = 0,
    title = 'Code'
}) {
    // Parse highlight lines from comma-separated string
    const highlightLineNumbers = highlightLines
        ? highlightLines.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n))
        : [];

    return (
        <div className="code-viewer">
            <div className="code-viewer__header">
                <h4>{title}</h4>
                <span className="code-viewer__frame">
                    Frame {currentFrame + 1} / {totalFrames || 1}
                </span>
            </div>
            <div className="code-viewer__content">
                <SyntaxHighlighter
                    language={language}
                    style={vscDarkPlus}
                    showLineNumbers
                    wrapLines
                    lineProps={(lineNum) => {
                        const isHighlighted = highlightLineNumbers.includes(lineNum);
                        return {
                            style: {
                                backgroundColor: isHighlighted ? 'rgba(200, 169, 107, 0.2)' : 'transparent',
                                display: 'block',
                                width: '100%',
                                borderLeft: isHighlighted ? '3px solid #4ea6b1' : '3px solid transparent',
                                paddingLeft: isHighlighted ? '8px' : '11px',
                            }
                        };
                    }}
                    customStyle={{
                        margin: 0,
                        borderRadius: '0 0 10px 10px',
                        fontSize: '0.8rem',
                        maxHeight: '200px',
                        background: '#1e1e1e',
                    }}
                >
                    {code}
                </SyntaxHighlighter>
            </div>
        </div>
    );
}

export default CodeViewer;
