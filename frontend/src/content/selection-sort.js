const selectionSort = {
  slug: 'selection-sort',
  title: 'Selection Sort',
  defaultArray: [29, 10, 14, 37, 13],
  code: {
    language: 'python',
    code: `def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr

array = [29, 10, 14, 37, 13]
print(selection_sort(array))`,
  },
  steps: [
    {
      id: 'intro',
      title: '1. What is Selection Sort?',
      icon: '📚',
      description: 'Introduction to the algorithm',
      content: `Selection Sort is a straightforward comparison-based sorting algorithm. It divides the array into two parts: a **sorted** portion (left) and an **unsorted** portion (right).

**Why learn Selection Sort?**
- Simple and intuitive to understand
- Minimizes the number of swaps (at most n swaps)
- Foundation for understanding more advanced sorting

**Real-world analogy:**
Imagine picking the smallest card from a hand of cards and placing it at the front, then picking the next smallest from the remaining cards and placing it second, and so on.`,
      keyPoints: [
        'Divides array into sorted and unsorted portions',
        'Finds the minimum element each pass',
        'Makes at most n swaps total',
      ],
    },
    {
      id: 'intuition',
      title: '2. How Does It Work?',
      icon: '💡',
      description: 'Understanding the intuition',
      content: `**The Core Idea:**
Repeatedly find the **minimum** element from the unsorted portion and place it at the end of the sorted portion.

**Step-by-step intuition:**
1. Start with the entire array as unsorted
2. Find the smallest element in the unsorted portion
3. Swap it with the first element of the unsorted portion
4. The sorted portion grows by one
5. Repeat until the entire array is sorted

**Visual Example:**
\`[29, 10, 14, 37, 13]\`
Pass 1: Min is 10 → swap with 29 → \`[10, 29, 14, 37, 13]\`
Pass 2: Min is 13 → swap with 29 → \`[10, 13, 14, 37, 29]\`
Pass 3: Min is 14 → already in place → \`[10, 13, 14, 37, 29]\`
Pass 4: Min is 29 → swap with 37 → \`[10, 13, 14, 29, 37]\` ✔`,
      keyPoints: [
        'Find minimum element each pass',
        'Swap it into the correct position',
        'Sorted portion grows from left to right',
      ],
    },
    {
      id: 'algorithm',
      title: '3. The Algorithm',
      icon: '⚙️',
      description: 'Detailed step-by-step breakdown',
      content: `**Pseudocode:**
\`\`\`
procedure selectionSort(A)
    n = length(A)
    for i = 0 to n-2
        min_idx = i
        for j = i+1 to n-1
            if A[j] < A[min_idx]
                min_idx = j
        swap A[i] and A[min_idx]
\`\`\`

**Outer Loop:** Iterates through positions 0 to n-2. After each iteration element at position i is in its final sorted position.

**Inner Loop:** Scans the unsorted portion (i+1 to n-1) to find the index of the minimum element.

**Swap:** After finding the minimum, one swap places it in the correct sorted position.

**Key Insight:** Unlike Bubble Sort, Selection Sort performs exactly one swap per pass — making it efficient when write operations are costly.`,
      keyPoints: [
        'Outer loop iterates through each position',
        'Inner loop finds the minimum in unsorted portion',
        'Exactly one swap per pass',
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
| **Best** | O(n²) | Still must scan for minimum each pass |
| **Average** | O(n²) | Random arrangement |
| **Worst** | O(n²) | Always O(n²) regardless of input |

**Breakdown:**
- Pass 1: n-1 comparisons
- Pass 2: n-2 comparisons
- Total: (n-1) + (n-2) + … + 1 = n(n-1)/2 ≈ O(n²)

**Space Complexity:** O(1) — in-place, only a variable for min_idx and temp swap.

**Important Property:**
- **Not Stable:** Selection Sort may change the relative order of equal elements.
- **Maximum Swaps:** n-1 — much fewer than Bubble Sort's O(n²) swaps.`,
      keyPoints: [
        'Always O(n²) — no best-case optimization',
        'Space O(1) — in-place sorting',
        'Not a stable sort',
      ],
    },
    {
      id: 'code',
      title: '5. Implementation',
      icon: '💻',
      description: 'Complete code walkthrough',
      content: `**Python Implementation:**

\`\`\`python
def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr
\`\`\`

**Line-by-line:**
- **Line 2:** Get array length
- **Line 3:** Outer loop — one pass per position
- **Line 4:** Assume current position holds the minimum
- **Line 5:** Inner loop — scan rest of unsorted portion
- **Line 6-7:** Update min_idx if a smaller element is found
- **Line 8:** Swap the minimum into the correct position`,
      keyPoints: [
        'Track min_idx to avoid multiple swaps',
        'Inner loop starts at i + 1',
        'Single swap per outer iteration',
      ],
    },
    {
      id: 'practice',
      title: '6. Practice',
      icon: '✏️',
      description: 'Try it yourself',
      content: `**Your Turn!**

Open the **Sandbox** and implement Selection Sort yourself.

**Checklist:**
- ☐ Define a function that takes an array
- ☐ Use nested loops — outer for position, inner for finding min
- ☐ Track the index of the minimum element
- ☐ Swap the minimum into the correct position
- ☐ Return the sorted array

**Test Cases:**
\`[29, 10, 14, 37, 13]\` → \`[10, 13, 14, 29, 37]\`
\`[1, 2, 3]\` → \`[1, 2, 3]\` (already sorted)
\`[3, 2, 1]\` → \`[1, 2, 3]\` (reverse sorted)

**Challenges:**
1. Basic — implement standard Selection Sort
2. Intermediate — modify to sort descending (find max instead of min)
3. Advanced — count the number of comparisons
4. Expert — implement a stable version of Selection Sort`,
      keyPoints: [
        'Open sandbox to write your own code',
        'Focus on correctly tracking the minimum index',
        'Compare swap count with Bubble Sort',
      ],
    },
  ],
};

export default selectionSort;
