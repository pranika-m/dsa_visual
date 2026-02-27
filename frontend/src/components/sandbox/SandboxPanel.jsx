import { useState, useCallback } from 'react';
import Editor from '@monaco-editor/react';
import { executeCode } from '../../api/client';
import './SandboxPanel.css';

function SandboxPanel({ 
    initialCode = '', 
    onClose, 
    inputData = [],
    vizType = 'array',
    onExecutionResult
}) {
    const [language, setLanguage] = useState('python');

    // Generate skeleton code based on language
    const generateSkeleton = (lang) => {
        const arrStr = inputData.join(', ');
        
        switch (lang) {
            case 'python':
                return `def sort_array(arr):
    # TODO: Write your sorting algorithm here
    # Hint: Try bubble sort, selection sort, or insertion sort
    
    n = len(arr)
    
    # Your code here:
    
    
    
    
    
    
    
    return arr

# Test with this array:
result = sort_array([${arrStr}])
print(result)`;
            case 'cpp':
                return `#include <iostream>
#include <vector>
using namespace std;

// TODO: Write your sorting algorithm here
vector<int> sortArray(vector<int>& arr) {
    int n = arr.size();
    
    // Your code here:
    
    
    
    
    
    
    
    return arr;
}

int main() {
    vector<int> arr = {${arrStr}};
    vector<int> result = sortArray(arr);
    
    for(int num : result) {
        cout << num << " ";
    }
    cout << endl;
    
    return 0;
}`;
            case 'c':
                return `#include <stdio.h>

// TODO: Write your sorting algorithm here
void sortArray(int arr[], int n) {
    // Your code here:
    
    
    
    
    
    
    
}

int main() {
    int arr[] = {${arrStr}};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    sortArray(arr, n);
    
    for(int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
    
    return 0;
}`;
            case 'java':
                return `import java.util.Arrays;

public class Main {
    // TODO: Write your sorting algorithm here
    public static int[] sortArray(int[] arr) {
        int n = arr.length;
        
        // Your code here:
        
        
        
        
        
        
        
        return arr;
    }
    
    public static void main(String[] args) {
        int[] arr = {${arrStr}};
        int[] result = sortArray(arr);
        
        System.out.println(Arrays.toString(result));
    }
}`;
            default:
                return `# TODO: Write your algorithm here`;
        }
    };

    const [code, setCode] = useState(() => generateSkeleton('python'));
    const [output, setOutput] = useState('');
    const [executing, setExecuting] = useState(false);

    const handleLanguageChange = (newLang) => {
        setLanguage(newLang);
        setCode(generateSkeleton(newLang));
        setOutput('');
    };

    const handleRunCode = async () => {
        setExecuting(true);
        setOutput('Running...');
        try {
            const res = await executeCode({
                code: code,
                language: language,
                input_data: inputData,
                viz_type: vizType,
            });
            const data = res.data;
            if (data.success) {
                setOutput(data.output || 'Code executed successfully.');
                if (onExecutionResult && data.steps?.length > 0) {
                    onExecutionResult(data.steps);
                }
            } else {
                setOutput(`Error: ${data.error}`);
            }
        } catch (err) {
            setOutput('Execution failed. Make sure the Django server is running.');
        }
        setExecuting(false);
    };

    const handleReset = () => {
        setCode(generateSkeleton(language));
        setOutput('');
    };

    const languageOptions = [
        { value: 'python', label: 'Python' },
        { value: 'c', label: 'C' },
        { value: 'cpp', label: 'C++' },
        { value: 'java', label: 'Java' },
    ];

    return (
        <div className="sandbox-panel">
            <div className="sandbox__header">
                <h3>Code Sandbox</h3>
                <button className="sandbox__close" onClick={onClose}>×</button>
            </div>
            
            <div className="sandbox__language-selector">
                {languageOptions.map((opt) => (
                    <button
                        key={opt.value}
                        className={`lang-btn ${language === opt.value ? 'lang-btn--active' : ''}`}
                        onClick={() => handleLanguageChange(opt.value)}
                    >
                        {opt.label}
                    </button>
                ))}
            </div>
            
            <div className="sandbox__editor">
                <Editor
                    height="100%"
                    language={language}
                    value={code}
                    onChange={(value) => setCode(value || '')}
                    theme="vs-dark"
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        lineNumbers: 'on',
                        roundedSelection: false,
                        scrollBeyondLastLine: false,
                        readOnly: false,
                        automaticLayout: true,
                        tabSize: 4,
                        insertSpaces: true,
                        padding: { top: 16 },
                    }}
                />
            </div>
            
            <div className="sandbox__actions">
                <button
                    className="btn btn--success"
                    onClick={handleRunCode}
                    disabled={executing}
                >
                    {executing ? '⏳ Running...' : '▶ Run Code'}
                </button>
                <button
                    className="btn btn--secondary"
                    onClick={handleReset}
                >
                    ↺ Reset
                </button>
            </div>
            
            <div className="sandbox__output">
                <div className="sandbox__output-label">Output ({language})</div>
                <pre className="sandbox__output-content">
                    {output || 'Run your code to see output here.'}
                </pre>
            </div>
        </div>
    );
}

export default SandboxPanel;
