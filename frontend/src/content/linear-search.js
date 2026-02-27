const linearSearch = {
  slug: 'linear-search',
  title: 'Linear Search',
  defaultArray: [34, 7, 23, 32, 5, 62],
  code: {
    language: 'python',
    code: `def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1

array = [34, 7, 23, 32, 5, 62]
target = 32
result = linear_search(array, target)
print(f"Found at index {result}" if result != -1 else "Not found")`,
  },
  steps: [
    {
      id: 'intro',
      title: '1. What is Linear Search?',
      icon: '📚',
      description: 'Introduction to the algorithm',
      content: `Linear Search (also called Sequential Search) is the simplest searching algorithm. It checks **every element** in the array one by one until it finds the target or reaches the end.

**Why learn Linear Search?**
- Simplest algorithm to understand and implement
- Works on **any** array — sorted or unsorted
- Foundation for understanding more efficient search algorithms
- Sometimes the best option for small or unsorted datasets

**Real-world analogy:**
Looking for a specific book on an unorganized shelf — you start at one end and check each book until you find the one you want.`,
      keyPoints: [
        'Checks every element sequentially',
        'Works on sorted and unsorted data',
        'Simplest search algorithm',
      ],
    },
    {
      id: 'intuition',
      title: '2. How Does It Work?',
      icon: '💡',
      description: 'Understanding the intuition',
      content: `**The Core Idea:**
Start at the first element. Check if it matches the target. If not, move to the next element. Repeat until you find the target or exhaust all elements.

**Step-by-step:**
1. Start at index 0
2. Compare current element with the target
3. If it matches — return the index (found!)
4. If it doesn't match — move to the next index
5. If you have checked all elements — return -1 (not found)

**Visual Example:**
Array: \`[34, 7, 23, 32, 5, 62]\`, Target: **32**

| Index | Element | Match? |
|-------|---------|--------|
| 0 | 34 | ✗ |
| 1 | 7 | ✗ |
| 2 | 23 | ✗ |
| 3 | **32** | ✔ Found! |

Return index **3**.`,
      keyPoints: [
        'Scan from left to right',
        'Return index on match, -1 on failure',
        'No preprocessing needed',
      ],
    },
    {
      id: 'algorithm',
      title: '3. The Algorithm',
      icon: '⚙️',
      description: 'Detailed step-by-step breakdown',
      content: `**Pseudocode:**
\`\`\`
procedure linearSearch(A, target)
    for i = 0 to length(A) - 1
        if A[i] == target
            return i
    return -1
\`\`\`

**Variants:**

**Sentinel Linear Search:**
Place the target at the end of the array (sentinel). This eliminates the bounds check inside the loop, making it slightly faster.
\`\`\`
procedure sentinelSearch(A, target)
    last = A[n-1]
    A[n-1] = target
    i = 0
    while A[i] != target
        i = i + 1
    A[n-1] = last
    if i < n-1 or A[n-1] == target
        return i
    return -1
\`\`\`

**Find All Occurrences:**
Instead of returning the first match, collect all indices where the target appears.

**Key Insight:** Linear Search is optimal for unsorted data — you cannot do better than O(n) without additional information about the data's structure.`,
      keyPoints: [
        'Single loop with comparison',
        'Sentinel variant eliminates bounds check',
        'Optimal for unsorted data',
      ],
    },
    {
      id: 'complexity',
      title: '4. Complexity Analysis',
      icon: '📊',
      description: 'Time & space complexity',
      content: `**Time Complexity:**

| Case | Complexity | Explanation |
|------|------------|-------------|
| **Best** | O(1) | Target is the first element |
| **Average** | O(n) | Target is somewhere in the middle |
| **Worst** | O(n) | Target is the last element or not present |

**Breakdown:**
- Best case: 1 comparison
- Average case: n/2 comparisons
- Worst case: n comparisons

**Space Complexity:** O(1) — only uses a loop variable.

**When to Use Linear Search:**
| Situation | Use Linear? |
|-----------|-------------|
| Small array (< 20 elements) | ✔ Yes |
| Unsorted data | ✔ Yes |
| Search once | ✔ Yes |
| Large sorted array | ✗ Use Binary Search |
| Frequent searches | ✗ Sort first, then Binary Search |`,
      keyPoints: [
        'Best O(1), Average/Worst O(n)',
        'Space O(1)',
        'Best choice for small or unsorted data',
      ],
    },
    {
      id: 'code',
      title: '5. Implementation',
      icon: '💻',
      description: 'Complete code walkthrough',
      content: `**Python Implementation:**

\`\`\`python
def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1
\`\`\`

**Line-by-line:**
- **Line 2:** Loop through every index in the array
- **Line 3:** Compare element at current index with target
- **Line 4:** Found! Return the index
- **Line 5:** Not found — return -1

**Find All Occurrences:**
\`\`\`python
def linear_search_all(arr, target):
    indices = []
    for i in range(len(arr)):
        if arr[i] == target:
            indices.append(i)
    return indices
\`\`\`

This variant returns a list of all matching indices.`,
      keyPoints: [
        'Single loop, single comparison per step',
        'Returns -1 for not found',
        'Easily extended to find all occurrences',
      ],
    },
    {
      id: 'practice',
      title: '6. Practice',
      icon: '✏️',
      description: 'Try it yourself',
      content: `**Your Turn!**

Open the **Sandbox** and implement Linear Search yourself.

**Checklist:**
- ☐ Define a function taking an array and a target
- ☐ Loop through each element
- ☐ Return the index if found
- ☐ Return -1 if not found
- ☐ Test with various inputs

**Test Cases:**
\`[34, 7, 23, 32, 5, 62]\`, target 32 → \`3\`
\`[1, 2, 3]\`, target 5 → \`-1\` (not found)
\`[5, 5, 5]\`, target 5 → \`0\` (first occurrence)

**Challenges:**
1. Basic — implement standard Linear Search
2. Intermediate — find **all** occurrences and return a list of indices
3. Advanced — implement sentinel Linear Search
4. Expert — search in a 2D array (matrix)`,
      keyPoints: [
        'Start with the basic version first',
        'Then try finding all occurrences',
        'Compare performance with Binary Search',
      ],
    },
  ],
};

export default linearSearch;
