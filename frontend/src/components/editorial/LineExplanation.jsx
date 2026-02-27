import './LineExplanation.css';

function LineExplanation({ code, currentLine }) {
    const explanations = {
        1: "Define the bubble_sort function that takes an array as input.",
        2: "Get the length of the array to know how many elements we need to sort.",
        3: "Outer loop: Iterate through the array n times to ensure all elements are sorted.",
        4: "Initialize a swapped flag to track if any swaps occurred in this pass.",
        5: "Inner loop: Compare adjacent elements. We subtract i because the last i elements are already sorted.",
        6: "Check if the current element is greater than the next element (wrong order).",
        7: "Swap the two elements using Python's tuple unpacking syntax.",
        8: "Set swapped flag to True to indicate a swap occurred.",
        9: "Check if no swaps occurred in this pass (array is already sorted).",
        10: "If no swaps, break out of the loop early for optimization.",
        11: "Return the sorted array.",
    };

    const lines = code.split('\n');
    const currentLineContent = lines[currentLine - 1]?.trim();

    return (
        <div className="line-explanation">
            <h3 className="line-explanation__title">Line-by-Line Explanation</h3>
            
            <div className="line-explanation__current">
                <div className="line-explanation__line-num">Line {currentLine}</div>
                <code className="line-explanation__code">{currentLineContent || ' '}</code>
                <p className="line-explanation__text">
                    {explanations[currentLine] || "Execute this line of code."}
                </p>
            </div>

            <div className="line-explanation__progress">
                <div className="progress-bar">
                    <div 
                        className="progress-bar__fill" 
                        style={{ width: `${(currentLine / lines.length) * 100}%` }}
                    />
                </div>
                <span className="progress-text">{currentLine} / {lines.length} lines</span>
            </div>
        </div>
    );
}

export default LineExplanation;
