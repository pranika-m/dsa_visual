const binarySearch = {
  slug: 'binary-search',
  title: 'Binary Search',
  defaultArray: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
  code: {
    language: 'python',
    code: `def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1

array = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
target = 23
result = binary_search(array, target)
print(f"Found at index {result}" if result != -1 else "Not found")`,
  },
  steps: [
    {
      id: 'intro',
      title: '1. What is Binary Search?',
      icon: '📚',
      description: 'Introduction to the algorithm',
      content: `Binary Search is a highly efficient searching algorithm that works on **sorted arrays**. It repeatedly halves the search space, making it exponentially faster than Linear Search.

**Why learn Binary Search?**
- O(log n) — dramatically faster than O(n) for large datasets
- Fundamental CS algorithm used everywhere
- Basis for many advanced algorithms and data structures
- Common in coding interviews

**Real-world analogy:**
Looking up a word in a dictionary. You open to the middle — if your word comes before the page you're on, look in the first half; otherwise look in the second half. Repeat until found.

**Prerequisite:** The array **must be sorted!**`,
      keyPoints: [
        'Only works on sorted arrays',
        'O(log n) — halves the search space each step',
        'Fundamental algorithm for efficient searching',
      ],
    },
    {
      id: 'intuition',
      title: '2. How Does It Work?',
      icon: '💡',
      description: 'Understanding the intuition',
      content: `**The Core Idea:**
Maintain two pointers (low, high) defining the search range. Check the middle element — if it's the target, you're done. If the target is larger, search the right half. If smaller, search the left half.

**Step-by-step:**
1. Set low = 0, high = n - 1
2. Calculate mid = (low + high) / 2
3. If arr[mid] == target → found!
4. If arr[mid] < target → search right half (low = mid + 1)
5. If arr[mid] > target → search left half (high = mid - 1)
6. If low > high → target not in array

**Visual Example:**
Array: \`[2, 5, 8, 12, 16, 23, 38, 56, 72, 91]\`, Target: **23**

| Step | Low | High | Mid | arr[mid] | Action |
|------|-----|------|-----|----------|--------|
| 1 | 0 | 9 | 4 | 16 | 16 < 23 → go right |
| 2 | 5 | 9 | 7 | 56 | 56 > 23 → go left |
| 3 | 5 | 6 | 5 | **23** | Found at index 5! |

Only **3 steps** instead of 6 (linear scan)!`,
      keyPoints: [
        'Three pointers: low, high, mid',
        'Halves the search space each iteration',
        'Converges very quickly — log₂(n) steps max',
      ],
    },
    {
      id: 'algorithm',
      title: '3. The Algorithm',
      icon: '⚙️',
      description: 'Detailed step-by-step breakdown',
      content: `**Pseudocode — Iterative:**
\`\`\`
procedure binarySearch(A, target)
    low = 0
    high = length(A) - 1
    while low <= high
        mid = (low + high) / 2
        if A[mid] == target
            return mid
        else if A[mid] < target
            low = mid + 1
        else
            high = mid - 1
    return -1
\`\`\`

**Pseudocode — Recursive:**
\`\`\`
procedure binarySearch(A, target, low, high)
    if low > high
        return -1
    mid = (low + high) / 2
    if A[mid] == target
        return mid
    else if A[mid] < target
        return binarySearch(A, target, mid + 1, high)
    else
        return binarySearch(A, target, low, mid - 1)
\`\`\`

**Common Pitfall — Integer Overflow:**
\`mid = (low + high) / 2\` can overflow in languages with fixed-size integers. Safer: \`mid = low + (high - low) / 2\`

**Edge Cases:**
- Empty array → return -1
- Single element → one comparison
- Target smaller than all elements → low = 0, high = -1
- Target larger than all elements → low = n, high = n-1`,
      keyPoints: [
        'Both iterative and recursive versions exist',
        'Be careful with integer overflow for mid calculation',
        'Handle edge cases: empty array, single element',
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
| **Best** | O(1) | Target is the middle element |
| **Average** | O(log n) | Halving the search space |
| **Worst** | O(log n) | Target at the edge or not present |

**Why O(log n)?**
Each step halves the search space:
- n → n/2 → n/4 → n/8 → … → 1
- Number of halvings: log₂(n)

**Space Complexity:**
- Iterative: O(1)
- Recursive: O(log n) — due to call stack

**log n vs n:**
| n | Linear (n) | Binary (log n) |
|---|-----------|----------------|
| 100 | 100 | 7 |
| 10,000 | 10,000 | 14 |
| 1,000,000 | 1,000,000 | 20 |
| 1,000,000,000 | 1,000,000,000 | 30 |

Binary Search finds an item in a billion elements with just 30 comparisons!`,
      keyPoints: [
        'O(log n) — exponentially faster than linear',
        'Iterative version uses O(1) space',
        '30 comparisons for 1 billion elements!',
      ],
    },
    {
      id: 'code',
      title: '5. Implementation',
      icon: '💻',
      description: 'Complete code walkthrough',
      content: `**Python Implementation — Iterative:**

\`\`\`python
def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1
\`\`\`

**Line-by-line:**
- **Line 2:** Initialize low and high pointers
- **Line 3:** Loop while the search space is valid
- **Line 4:** Calculate the middle index
- **Lines 5-6:** Target found — return mid
- **Lines 7-8:** Target is in the right half
- **Lines 9-10:** Target is in the left half
- **Line 11:** Not found — return -1

**Recursive Version:**
\`\`\`python
def binary_search_recursive(arr, target, low=0, high=None):
    if high is None:
        high = len(arr) - 1
    if low > high:
        return -1
    mid = (low + high) // 2
    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        return binary_search_recursive(arr, target, mid + 1, high)
    else:
        return binary_search_recursive(arr, target, low, mid - 1)
\`\`\``,
      keyPoints: [
        'Iterative preferred for O(1) space',
        'Use (low + high) // 2 in Python (no overflow)',
        'Loop condition: low <= high (inclusive)',
      ],
    },
    {
      id: 'practice',
      title: '6. Practice',
      icon: '✏️',
      description: 'Try it yourself',
      content: `**Your Turn!**

Open the **Sandbox** and implement Binary Search yourself.

**Checklist:**
- ☐ Ensure the input array is sorted
- ☐ Set up low and high pointers
- ☐ Calculate mid correctly
- ☐ Handle all three cases (found, go left, go right)
- ☐ Return -1 if not found
- ☐ Implement both iterative and recursive versions

**Test Cases:**
\`[2, 5, 8, 12, 16, 23, 38, 56, 72, 91]\`, target 23 → \`5\`
\`[1, 3, 5, 7, 9]\`, target 4 → \`-1\` (not found)
\`[42]\`, target 42 → \`0\` (single element)
\`[]\`, target 1 → \`-1\` (empty array)

**Challenges:**
1. Basic — implement iterative Binary Search
2. Intermediate — implement recursive version
3. Advanced — find the first/last occurrence of a duplicate
4. Expert — implement lower_bound / upper_bound`,
      keyPoints: [
        'Start with iterative version',
        'Test edge cases (empty, single element)',
        'Try finding first/last occurrence of duplicates',
      ],
    },
  ],
};

export default binarySearch;
