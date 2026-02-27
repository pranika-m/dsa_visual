import './CurrentLineExplanation.css';

function CurrentLineExplanation({ code, currentLine }) {
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
    const explanation = explanations[currentLine] || "Execute this line of code.";

    return (
        <div className="current-line-explanation">
            <div className="current-line-explanation__header">
                <span className="line-badge">Line {currentLine}</span>
            </div>
            <code className="current-line-explanation__code">{currentLineContent || ' '}</code>
            <p className="current-line-explanation__text">{explanation}</p>
        </div>
    );
}

export default CurrentLineExplanation;
