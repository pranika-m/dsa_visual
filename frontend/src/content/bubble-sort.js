const bubbleSort = {
  slug: 'bubble-sort',
  title: 'Bubble Sort',
  defaultArray: [5, 3, 8, 1, 2],
  code: {
    language: 'python',
    code: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr

array = [5, 3, 8, 1, 2]
print(bubble_sort(array))`,
  },
  steps: [
    {
      id: 'intro',
      title: '1. What is Bubble Sort?',
      icon: '📚',
      description: 'Introduction to the algorithm',
      content: `Bubble Sort is one of the simplest sorting algorithms. It gets its name because smaller elements "bubble" to the top (beginning) of the list while larger elements sink to the bottom (end).

**Why learn Bubble Sort?**
- It's easy to understand and implement
- Great for learning sorting fundamentals
- Introduces the concept of comparison-based sorting

**Real-world analogy:**
Imagine sorting a row of people by height. You start at one end and compare adjacent people. If two people are out of order (taller before shorter), you swap them. You keep doing this until everyone is in order.`,
      keyPoints: [
        'Simple comparison-based sorting algorithm',
        'Works by repeatedly swapping adjacent elements',
        'Named for the way smaller elements bubble to the top',
      ],
    },
    {
      id: 'intuition',
      title: '2. How Does It Work?',
      icon: '💡',
      description: 'Understanding the intuition',
      content: `**The Core Idea:**
Bubble Sort makes multiple passes through the array. In each pass it compares adjacent elements and swaps them if they are in the wrong order.

**Step-by-step intuition:**
1. Start at the beginning of the array
2. Compare the first two elements
3. If they are out of order (left > right), swap them
4. Move to the next pair and repeat
5. After one complete pass the largest element is in its final position
6. Repeat for the remaining unsorted portion

**Visual Example:**
\`[5, 3, 8, 1]\` → Compare 5 and 3 → Swap → \`[3, 5, 8, 1]\`
\`[3, 5, 8, 1]\` → Compare 5 and 8 → No swap → \`[3, 5, 8, 1]\`
\`[3, 5, 8, 1]\` → Compare 8 and 1 → Swap → \`[3, 5, 1, 8]\`

After first pass: 8 is in its correct position!`,
      keyPoints: [
        'Multiple passes through the array',
        'Each pass places the next largest element in position',
        'Early termination if no swaps occur',
      ],
    },
    {
      id: 'algorithm',
      title: '3. The Algorithm',
      icon: '⚙️',
      description: 'Detailed step-by-step breakdown',
      content: `**Pseudocode:**
\`\`\`
procedure bubbleSort(A)
    n = length(A)
    repeat
        swapped = false
        for i = 1 to n-1
            if A[i-1] > A[i] then
                swap(A[i-1], A[i])
                swapped = true
        n = n - 1
    until not swapped
\`\`\`

**Outer Loop:** Controls the number of passes. After each pass the largest unsorted element is in place so we can reduce our search space.

**Inner Loop:** Compares adjacent elements and swaps if needed. This "bubbles" the largest element to the end.

**Optimization — The swapped Flag:**
If we complete a pass without any swaps the array is already sorted. We stop early instead of continuing unnecessarily.

**Example Walkthrough:**
Array: \`[64, 34, 25, 12, 22, 11, 90]\`

Pass 1: 34↔64, 25↔34, 12↔25, 22↔25, 11↔22, 90 stays → **90 sorted**
Pass 2: 34↔64, 25↔34, 12↔25, 22↔25, 11↔22 → **64 sorted**
Pass 3: 25↔34, 12↔25, 22↔25, 11↔22 → **34 sorted**
…and so on until fully sorted.`,
      keyPoints: [
        'Two nested loops: outer for passes, inner for comparisons',
        'Each pass reduces the unsorted portion by 1',
        'Swapped flag enables early termination',
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
| **Best** | O(n) | Already sorted — one pass, no swaps |
| **Average** | O(n²) | Random arrangement |
| **Worst** | O(n²) | Reverse sorted — maximum swaps |

**Breakdown:**
- First pass: n-1 comparisons
- Second pass: n-2 comparisons
- Total: (n-1) + (n-2) + … + 1 = n(n-1)/2 ≈ O(n²)

**Space Complexity:** O(1) — sorts in place, only a temp variable for swapping.

**Comparison:**
| Algorithm | Best | Worst | Space | Stable |
|-----------|------|-------|-------|--------|
| Bubble Sort | O(n) | O(n²) | O(1) | Yes |
| Selection Sort | O(n²) | O(n²) | O(1) | No |
| Insertion Sort | O(n) | O(n²) | O(1) | Yes |
| Merge Sort | O(n log n) | O(n log n) | O(n) | Yes |`,
      keyPoints: [
        'Best case O(n) when already sorted',
        'Worst / Average case O(n²)',
        'Space O(1) — in-place algorithm',
      ],
    },
    {
      id: 'code',
      title: '5. Implementation',
      icon: '💻',
      description: 'Complete code walkthrough',
      content: `**Python Implementation:**

\`\`\`python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr
\`\`\`

**Line-by-line:**
- **Line 2:** Get the length of the array
- **Line 3:** Outer loop — iterate n times (one pass each)
- **Line 4:** Track whether any swaps happen this pass
- **Line 5:** Inner loop — compare adjacent pairs (skip already-sorted tail)
- **Lines 6-7:** If left > right, swap them
- **Lines 8-9:** If no swaps this pass, array is sorted — break early`,
      keyPoints: [
        'Two nested for-loops',
        'Inner loop shrinks each pass (n - i - 1)',
        'Early exit with the swapped flag',
      ],
    },
    {
      id: 'practice',
      title: '6. Practice',
      icon: '✏️',
      description: 'Try it yourself',
      content: `**Your Turn!**

Open the **Sandbox** (top-right button) and implement Bubble Sort yourself.

**Checklist:**
- ☐ Define a function that takes an array
- ☐ Use nested loops (outer for passes, inner for comparisons)
- ☐ Compare adjacent elements and swap if needed
- ☐ Add the swapped-flag optimization
- ☐ Return the sorted array

**Test Cases:**
\`[5, 2, 8, 1, 9]\` → \`[1, 2, 5, 8, 9]\`
\`[1, 2, 3, 4, 5]\` → \`[1, 2, 3, 4, 5]\` (already sorted)
\`[5, 4, 3, 2, 1]\` → \`[1, 2, 3, 4, 5]\` (reverse sorted)

**Challenges:**
1. Basic — implement standard Bubble Sort
2. Intermediate — add the swapped flag
3. Advanced — sort in descending order
4. Expert — count total comparisons and swaps`,
      keyPoints: [
        'Open sandbox to write your own code',
        'Start basic, then add optimizations',
        'Test with sorted, reverse, and random arrays',
      ],
    },
  ],
};

export default bubbleSort;
