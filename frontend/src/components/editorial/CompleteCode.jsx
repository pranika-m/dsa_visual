import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './CompleteCode.css';

function CompleteCode({ code, language = 'python' }) {
    return (
        <div className="complete-code">
            <div className="complete-code__header">
                <h3 className="complete-code__title">Sample Implementation</h3>
                <span className="complete-code__badge">Reference</span>
            </div>
            <div className="complete-code__content">
                <SyntaxHighlighter
                    language={language}
                    style={vscDarkPlus}
                    showLineNumbers
                    customStyle={{
                        margin: 0,
                        borderRadius: '0 0 10px 10px',
                        fontSize: '0.8rem',
                        maxHeight: '400px',
                    }}
                >
                    {code}
                </SyntaxHighlighter>
            </div>
            <p className="complete-code__note">
                This is a sample implementation. Study this code to understand how the algorithm works before trying the sandbox.
            </p>
        </div>
    );
}

export default CompleteCode;
