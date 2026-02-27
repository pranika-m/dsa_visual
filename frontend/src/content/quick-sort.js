const quickSort = {
  slug: 'quick-sort',
  title: 'Quick Sort',
  defaultArray: [10, 80, 30, 90, 40, 50, 70],
  code: {
    language: 'python',
    code: `def quick_sort(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)
    return arr

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1

array = [10, 80, 30, 90, 40, 50, 70]
print(quick_sort(array))`,
  },
  steps: [
    {
      id: 'intro',
      title: '1. What is Quick Sort?',
      icon: '📚',
      description: 'Introduction to the algorithm',
      content: `Quick Sort is one of the most efficient and widely used sorting algorithms. Like Merge Sort, it uses the **divide-and-conquer** strategy, but with a twist — it partitions the array around a **pivot** element.

**Why learn Quick Sort?**
- Average-case O(n log n) — fastest in practice for most inputs
- In-place sorting — O(log n) extra space (stack frames only)
- Used in many standard library implementations (C's qsort)
- Excellent cache performance

**Real-world analogy:**
Imagine organizing students by height. Pick one student as the "pivot." Everyone shorter goes to the left side, everyone taller goes to the right. Now repeat this process on each side independently.`,
      keyPoints: [
        'Divide-and-conquer using a pivot element',
        'In-place with O(log n) stack space',
        'Fastest general-purpose sort in practice',
      ],
    },
    {
      id: 'intuition',
      title: '2. How Does It Work?',
      icon: '💡',
      description: 'Understanding the intuition',
      content: `**The Core Idea:**
1. **Choose a pivot** — pick an element from the array
2. **Partition** — rearrange so elements ≤ pivot are on the left, elements > pivot are on the right
3. **Recurse** — apply Quick Sort to the left and right sub-arrays

**Visual Example:**
\`\`\`
Array: [10, 80, 30, 90, 40, 50, 70]
Pivot: 70

Partition:
  ≤ 70: [10, 30, 40, 50]
  Pivot: [70]
  > 70: [80, 90]

Result: [10, 30, 40, 50, 70, 80, 90]
         ↓ recurse left   ↓ recurse right
\`\`\`

**Key Insight:** After partitioning, the pivot is in its **final sorted position**. The left and right sub-arrays can be sorted independently.`,
      keyPoints: [
        'Pivot selection is crucial for performance',
        'Partitioning places pivot in final position',
        'Sub-arrays sorted independently',
      ],
    },
    {
      id: 'algorithm',
      title: '3. The Algorithm',
      icon: '⚙️',
      description: 'Detailed step-by-step breakdown',
      content: `**Pseudocode — Quick Sort:**
\`\`\`
procedure quickSort(A, low, high)
    if low < high
        pivotIndex = partition(A, low, high)
        quickSort(A, low, pivotIndex - 1)
        quickSort(A, pivotIndex + 1, high)
\`\`\`

**Pseudocode — Lomuto Partition:**
\`\`\`
procedure partition(A, low, high)
    pivot = A[high]
    i = low - 1
    for j = low to high - 1
        if A[j] <= pivot
            i = i + 1
            swap A[i] and A[j]
    swap A[i + 1] and A[high]
    return i + 1
\`\`\`

**Partition Step by Step:**
For \`[10, 80, 30, 90, 40, 50, 70]\` with pivot = 70:
- j=0: 10 ≤ 70 → swap → \`[10, 80, 30, 90, 40, 50, 70]\`, i=0
- j=1: 80 > 70 → skip
- j=2: 30 ≤ 70 → swap → \`[10, 30, 80, 90, 40, 50, 70]\`, i=1
- j=3: 90 > 70 → skip
- j=4: 40 ≤ 70 → swap → \`[10, 30, 40, 90, 80, 50, 70]\`, i=2
- j=5: 50 ≤ 70 → swap → \`[10, 30, 40, 50, 80, 90, 70]\`, i=3
- Final: swap A[4] and A[6] → \`[10, 30, 40, 50, 70, 90, 80]\`, pivot at index 4

**Pivot Strategies:** Last element (Lomuto), first element, middle element, median-of-three, random.`,
      keyPoints: [
        'Lomuto partition uses last element as pivot',
        'Pointer i tracks the boundary of ≤ pivot elements',
        'Pivot strategies affect worst-case behavior',
      ],
    },
    {
      id: 'complexity',
      title: '4. Complexity Analysis',
      icon: '📊',
      description: 'Time & space complexity',
      content: `**Time Complexity:**

| Case | Complexity | When |
|------|------------|------|
| **Best** | O(n log n) | Pivot always splits evenly |
| **Average** | O(n log n) | Random pivot positions |
| **Worst** | O(n²) | Already sorted + bad pivot (first/last) |

**Why worst case O(n²)?**
If the pivot is always the smallest or largest element, one partition has n-1 elements and the other has 0. This gives n levels of recursion instead of log n.

**Space Complexity:** O(log n) average for the recursion stack, O(n) worst case.

**Quick Sort vs Merge Sort:**
| | Quick Sort | Merge Sort |
|--|-----------|------------|
| Average | O(n log n) | O(n log n) |
| Worst | O(n²) | O(n log n) |
| Space | O(log n) | O(n) |
| In-place | Yes | No |
| Stable | No | Yes |
| Practical speed | Faster | Slower |

Quick Sort wins in practice due to better cache locality and lower constant factors.`,
      keyPoints: [
        'O(n log n) average, O(n²) worst case',
        'Space O(log n) — in-place sort',
        'Faster than Merge Sort in practice',
      ],
    },
    {
      id: 'code',
      title: '5. Implementation',
      icon: '💻',
      description: 'Complete code walkthrough',
      content: `**Python Implementation:**

\`\`\`python
def quick_sort(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)
    return arr

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1
\`\`\`

**Line-by-line:**
- **Lines 2-3:** Default high to last index on first call
- **Line 4:** Base condition — only sort if sub-array has 2+ elements
- **Line 5:** Partition and get pivot's final index
- **Lines 6-7:** Recursively sort left and right of pivot
- **Line 11:** Choose last element as pivot
- **Line 12:** i tracks the boundary of elements ≤ pivot
- **Lines 13-16:** Scan and swap smaller elements to the left
- **Lines 17-18:** Place pivot in its final position`,
      keyPoints: [
        'Two functions: quick_sort (recursive) and partition',
        'Partition returns the final index of the pivot',
        'Modifies the array in-place',
      ],
    },
    {
      id: 'practice',
      title: '6. Practice',
      icon: '✏️',
      description: 'Try it yourself',
      content: `**Your Turn!**

Open the **Sandbox** and implement Quick Sort yourself.

**Checklist:**
- ☐ Write the partition function (Lomuto scheme)
- ☐ Choose pivot as the last element
- ☐ Rearrange elements around the pivot
- ☐ Write the recursive quick_sort function
- ☐ Handle the base case (low < high)
- ☐ Test with various inputs

**Test Cases:**
\`[10, 80, 30, 90, 40, 50, 70]\` → \`[10, 30, 40, 50, 70, 80, 90]\`
\`[5, 5, 5, 5]\` → \`[5, 5, 5, 5]\` (duplicates)
\`[1, 2, 3, 4, 5]\` → \`[1, 2, 3, 4, 5]\` (worst case for Lomuto)

**Challenges:**
1. Basic — implement Quick Sort with Lomuto partition
2. Intermediate — implement Hoare partition scheme
3. Advanced — implement random pivot selection
4. Expert — implement 3-way partitioning (Dutch National Flag)`,
      keyPoints: [
        'Get partition correct first — it is the heart of Quick Sort',
        'Test with duplicates and sorted arrays',
        'Try different pivot strategies',
      ],
    },
  ],
};

export default quickSort;
