const mergeSort = {
  slug: 'merge-sort',
  title: 'Merge Sort',
  defaultArray: [38, 27, 43, 3, 9, 82, 10],
  code: {
    language: 'python',
    code: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result

array = [38, 27, 43, 3, 9, 82, 10]
print(merge_sort(array))`,
  },
  steps: [
    {
      id: 'intro',
      title: '1. What is Merge Sort?',
      icon: '📚',
      description: 'Introduction to the algorithm',
      content: `Merge Sort is an efficient, **divide-and-conquer** sorting algorithm. It splits the array in half, recursively sorts each half, and then merges the sorted halves back together.

**Why learn Merge Sort?**
- Guaranteed O(n log n) performance in **all** cases
- Stable sorting algorithm
- Introduces the divide-and-conquer paradigm
- Used in real-world systems (Python's Timsort is partly based on it)

**Real-world analogy:**
Imagine sorting a deck of cards. You split the deck in half, sort each half separately, then merge them by comparing the top card of each pile and placing the smaller one first.`,
      keyPoints: [
        'Divide-and-conquer algorithm',
        'Always O(n log n) — no worst-case degradation',
        'Stable sort preserving relative order of equal elements',
      ],
    },
    {
      id: 'intuition',
      title: '2. How Does It Work?',
      icon: '💡',
      description: 'Understanding the intuition',
      content: `**The Core Idea:**
1. **Divide** — split the array into two halves
2. **Conquer** — recursively sort each half
3. **Combine** — merge the two sorted halves into one

**Visual Example:**
\`\`\`
[38, 27, 43, 3, 9, 82, 10]
        /               \\
  [38, 27, 43]      [3, 9, 82, 10]
   /       \\          /        \\
[38]   [27, 43]   [3, 9]   [82, 10]
        /   \\      /  \\      /   \\
      [27] [43]  [3]  [9]  [82] [10]

Now merge back up:
[27, 43] → [3, 9] → [10, 82]
[27, 38, 43] → [3, 9, 10, 82]
[3, 9, 10, 27, 38, 43, 82] ✔
\`\`\`

**Key Insight:** Single-element arrays are already sorted! The real work happens in the **merge** step.`,
      keyPoints: [
        'Split → Sort → Merge',
        'Base case: arrays of size 0 or 1',
        'The merge step does the heavy lifting',
      ],
    },
    {
      id: 'algorithm',
      title: '3. The Algorithm',
      icon: '⚙️',
      description: 'Detailed step-by-step breakdown',
      content: `**Pseudocode — Merge Sort:**
\`\`\`
procedure mergeSort(A)
    if length(A) <= 1 then return A
    mid = length(A) / 2
    left  = mergeSort(A[0..mid])
    right = mergeSort(A[mid..end])
    return merge(left, right)
\`\`\`

**Pseudocode — Merge:**
\`\`\`
procedure merge(left, right)
    result = []
    while left and right are not empty
        if left[0] <= right[0]
            append left[0] to result; advance left
        else
            append right[0] to result; advance right
    append remaining left to result
    append remaining right to result
    return result
\`\`\`

**The Merge Step in Detail:**
- Use two pointers (i for left, j for right)
- Compare elements at both pointers
- Append the smaller one and advance that pointer
- When one side is exhausted, copy the remainder

**Recursion Tree Depth:** log₂(n) levels, each level processes n elements → O(n log n).`,
      keyPoints: [
        'Recursive splitting until base case',
        'Merge uses two-pointer technique',
        'log₂(n) levels of recursion',
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
| **Best** | O(n log n) | Always divides and merges |
| **Average** | O(n log n) | Consistent performance |
| **Worst** | O(n log n) | No degradation |

**Why O(n log n)?**
- **Divide:** log₂(n) levels of recursion (halving each time)
- **Merge:** O(n) work at each level (every element compared once)
- Total: n × log₂(n) = O(n log n)

**Space Complexity:** O(n) — requires additional arrays for merging.

**Comparison with O(n²) algorithms:**
| n | n² | n log n |
|---|----|---------|
| 100 | 10,000 | 664 |
| 1,000 | 1,000,000 | 9,966 |
| 10,000 | 100,000,000 | 132,877 |

Merge Sort is dramatically faster for large inputs!`,
      keyPoints: [
        'Always O(n log n) — best, average, and worst',
        'Space O(n) — not in-place',
        'Far better than O(n²) sorts for large data',
      ],
    },
    {
      id: 'code',
      title: '5. Implementation',
      icon: '💻',
      description: 'Complete code walkthrough',
      content: `**Python Implementation:**

\`\`\`python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result
\`\`\`

**Line-by-line:**
- **Lines 2-3:** Base case — return if single element or empty
- **Line 4:** Find the middle index
- **Lines 5-6:** Recursively sort left and right halves
- **Line 7:** Merge the two sorted halves
- **Lines 12-18:** Two-pointer merge — compare and append smaller
- **Lines 19-20:** Append any remaining elements`,
      keyPoints: [
        'Two functions: merge_sort (recursive) and merge (combine)',
        'Base case handles arrays of size 0 or 1',
        'Merge uses two pointers and extends remaining',
      ],
    },
    {
      id: 'practice',
      title: '6. Practice',
      icon: '✏️',
      description: 'Try it yourself',
      content: `**Your Turn!**

Open the **Sandbox** and implement Merge Sort yourself.

**Checklist:**
- ☐ Write the recursive merge_sort function
- ☐ Handle the base case (len ≤ 1)
- ☐ Split the array at the midpoint
- ☐ Write the merge function with two pointers
- ☐ Handle remaining elements after the main loop
- ☐ Return the merged result

**Test Cases:**
\`[38, 27, 43, 3, 9, 82, 10]\` → \`[3, 9, 10, 27, 38, 43, 82]\`
\`[5, 4, 3, 2, 1]\` → \`[1, 2, 3, 4, 5]\`
\`[1]\` → \`[1]\` (edge case)

**Challenges:**
1. Basic — implement Merge Sort with a helper merge function
2. Intermediate — implement it iteratively (bottom-up)
3. Advanced — count inversions using merge sort
4. Expert — implement in-place merge sort`,
      keyPoints: [
        'Start with the base case',
        'Get the merge function right first',
        'Test with small arrays to verify correctness',
      ],
    },
  ],
};

export default mergeSort;
