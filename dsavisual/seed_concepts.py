"""
Seed script to create concepts for all topics
Run with: python manage.py shell < seed_concepts.py
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'dsavisual.settings')
django.setup()

from core.models import Topic
from concepts.models import Concept, ConceptSection, CodeSnippet
from visualizer.models import VisualizationConfig

def create_selection_sort_concept():
    """Create Selection Sort concept with sections"""
    topic = Topic.objects.get(slug='selection-sort')
    
    # Create concept
    concept, created = Concept.objects.get_or_create(
        topic=topic,
        slug='basic-selection-sort',
        defaults={
            'title': 'Basic Selection Sort',
            'overview': 'Learn the selection sort algorithm - repeatedly finding the minimum element and placing it at the beginning.',
            'display_order': 1,
        }
    )
    
    if not created:
        print(f"Concept '{concept.title}' already exists")
        return concept
    
    # Section 1: Introduction
    section1 = ConceptSection.objects.create(
        concept=concept,
        title='What is Selection Sort?',
        section_type='explanation',
        display_order=1,
        content='''Selection Sort is a simple comparison-based sorting algorithm that divides the input list into two parts:
- A **sorted portion** at the beginning
- An **unsorted portion** at the end

The algorithm repeatedly selects the smallest (or largest) element from the unsorted portion and moves it to the end of the sorted portion.

**Key Characteristics:**
- **Simple** to understand and implement
- **In-place** sorting (requires O(1) extra space)
- **Not stable** (may change relative order of equal elements)
- **Always O(n²)** comparisons, regardless of input

**Why Learn Selection Sort?**
While not efficient for large datasets, Selection Sort is excellent for understanding fundamental sorting concepts and performs well when:
- The array is small
- Swapping elements is expensive (it makes minimum number of swaps: n-1)
- Memory is limited (in-place sorting)'''
    )
    
    # Section 2: How it works
    section2 = ConceptSection.objects.create(
        concept=concept,
        title='How Does It Work?',
        section_type='explanation',
        display_order=2,
        content='''**The Algorithm in Words:**

1. **Find the minimum** element in the unsorted portion
2. **Swap** it with the first element of the unsorted portion
3. **Move** the boundary between sorted and unsorted portions one position to the right
4. **Repeat** until the entire array is sorted

**Visual Example:**

```
Initial: [64, 25, 12, 22, 11]
         └─ unsorted ─────┘

Pass 1: Find min (11), swap with first
Result: [11, 25, 12, 22, 64]
         ▓   └─ unsorted ──┘
         
Pass 2: Find min (12), swap with 25
Result: [11, 12, 25, 22, 64]
         ▓   ▓   └ unsorted ┘
         
Pass 3: Find min (22), swap with 25
Result: [11, 12, 22, 25, 64]
         ▓   ▓   ▓  └unsort┘
         
Pass 4: Find min (25), already in place
Result: [11, 12, 22, 25, 64]
         └──── sorted ─────┘
```

**Key Insight:** After pass `i`, the first `i+1` elements are in their final sorted positions.'''
    )
    
    # Section 3: Implementation
    section3 = ConceptSection.objects.create(
        concept=concept,
        title='Implementation',
        section_type='code',
        display_order=3,
        content='''Let's implement Selection Sort step by step.

**Python Implementation:**'''
    )
    
    CodeSnippet.objects.create(
        section=section3,
        language='python',
        code='''def selection_sort(arr):
    n = len(arr)
    
    # Traverse through all array elements
    for i in range(n - 1):
        # Find the minimum element in remaining unsorted array
        min_idx = i
        
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        
        # Swap the found minimum element with the first element
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    
    return arr

# Test the function
array = [64, 25, 12, 22, 11]
result = selection_sort(array)
print(f"Sorted array: {result}")
# Output: Sorted array: [11, 12, 22, 25, 64]''',
        explanation='The main function that sorts an array using selection sort algorithm.',
        is_final_code=True,
        display_order=1
    )
    
    # Section 4: Complexity Analysis
    section4 = ConceptSection.objects.create(
        concept=concept,
        title='Complexity Analysis',
        section_type='explanation',
        display_order=4,
        content='''**Time Complexity:**

| Case | Complexity | Explanation |
|------|------------|-------------|
| Best | O(n²) | Even if array is sorted, algorithm checks all elements |
| Average | O(n²) | For random arrangements |
| Worst | O(n²) | Same as best case - algorithm always makes n²/2 comparisons |

**Why Always O(n²)?**
- Outer loop runs `n-1` times
- Inner loop runs `n-1`, `n-2`, `n-3`, ... `1` times
- Total comparisons: `(n-1) + (n-2) + ... + 1 = n(n-1)/2 = O(n²)`

**Space Complexity:** O(1)
- Only uses a constant amount of extra space (variables i, j, min_idx)
- Sorts in-place

**Number of Swaps:** At most `n-1`
- One swap per pass (in outer loop)
- This is the minimum possible for any comparison-based sort!

**Comparison with Bubble Sort:**
- Selection Sort: Always O(n²) time, but fewer swaps
- Bubble Sort: O(n²) worst/average, O(n) best case, more swaps'''
    )
    
    # Section 5: Variants
    section5 = ConceptSection.objects.create(
        concept=concept,
        title='Variants & Optimizations',
        section_type='explanation',
        display_order=5,
        content='''**Bidirectional Selection Sort:**
Select both minimum and maximum in each pass, placing them at both ends.

**Stable Selection Sort:**
Instead of swapping, insert the minimum element at the correct position by shifting elements.

**When to Use Selection Sort:**
✅ Small datasets (< 50 elements)
✅ Swapping is expensive (uses minimal swaps)
✅ Memory is constrained (in-place sorting)
✅ Simple implementation is needed

❌ Large datasets (use Quick Sort, Merge Sort, or Heap Sort)
❌ When stability is required
❌ When best-case performance matters'''
    )
    
    # Create visualization config
    viz_config, _ = VisualizationConfig.objects.get_or_create(
        concept=concept,
        defaults={
            'viz_type': 'array',
            'default_input': {'array': [64, 25, 12, 22, 11]},
            'action_options': ['sort', 'step', 'reset'],
        }
    )
    
    print(f"✅ Created concept: {concept.title}")
    return concept


def create_merge_sort_concept():
    """Create Merge Sort concept"""
    topic = Topic.objects.get(slug='merge-sort')
    
    concept, created = Concept.objects.get_or_create(
        topic=topic,
        slug='basic-merge-sort',
        defaults={
            'title': 'Basic Merge Sort',
            'overview': 'Master the divide-and-conquer sorting algorithm that splits arrays and merges them back in sorted order.',

            'display_order': 1,
        }
    )
    
    if not created:
        print(f"Concept '{concept.title}' already exists")
        return concept
    
    # Introduction Section
    section1 = ConceptSection.objects.create(
        concept=concept,
        title='What is Merge Sort?',
        section_type='explanation',
        display_order=1,
        content='''Merge Sort is a **divide-and-conquer** algorithm that:
1. **Divides** the array into two halves
2. **Recursively sorts** each half
3. **Merges** the sorted halves back together

**Key Characteristics:**
- **Stable**: Maintains relative order of equal elements
- **Predictable**: Always O(n log n) time complexity
- **Recursive**: Uses divide-and-conquer strategy
- **External**: Requires O(n) extra space

**Why Merge Sort?**
- Guaranteed O(n log n) performance (unlike Quick Sort)
- Stable sorting (unlike Heap Sort)
- Works well with linked lists
- Used in Java's Arrays.sort() for objects
- Parallelizable for large datasets'''
    )
    
    # How it works
    section2 = ConceptSection.objects.create(
        concept=concept,
        title='The Divide-and-Conquer Strategy',
        section_type='explanation',
        display_order=2,
        content='''**Visual Breakdown:**

```
[38, 27, 43, 3, 9, 82, 10]
         |
    [DIVIDE]
    /        \\
[38, 27, 43, 3]  [9, 82, 10]
    |                |
[DIVIDE]         [DIVIDE]
  /    \\            /    \\
[38,27] [43,3]   [9,82]  [10]
  |  |    |  |     |  |     |
[38][27][43][3]  [9][82]  [10]
    |  |    |  |     |  |     |
  [MERGE]  [MERGE]  [MERGE]
    |         |         |
[27,38]   [3,43]   [9,82,10]
     \\       /          |
      [MERGE]      [MERGE]
         \\          /
       [3,27,38,43,9,10,82]
              |
          [MERGE]
              |
     [3,9,10,27,38,43,82]
```

**The Merge Operation:**
The key is merging two sorted arrays into one:
- Compare first elements of both arrays
- Take the smaller one
- Repeat until one array is empty
- Copy remaining elements'''
    )
    
    # Implementation
    section3 = ConceptSection.objects.create(
        concept=concept,
        title='Implementation',
        section_type='code',
        display_order=3,
        content='Complete Merge Sort implementation:'
    )
    
    CodeSnippet.objects.create(
        section=section3,
        language='python',
        code='''def merge_sort(arr):
    # Base case: array of length 0 or 1 is already sorted
    if len(arr) <= 1:
        return arr
    
    # Divide: find the middle point
    mid = len(arr) // 2
    
    # Recursively sort both halves
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    # Conquer: merge the sorted halves
    return merge(left, right)


def merge(left, right):
    """Merge two sorted arrays into one sorted array"""
    result = []
    i = j = 0
    
    # Compare elements from left and right, add smaller to result
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    # Add remaining elements from left (if any)
    result.extend(left[i:])
    
    # Add remaining elements from right (if any)
    result.extend(right[j:])
    
    return result


# Test
array = [38, 27, 43, 3, 9, 82, 10]
sorted_array = merge_sort(array)
print(f"Sorted: {sorted_array}")
# Output: Sorted: [3, 9, 10, 27, 38, 43, 82]''',
        explanation='Complete merge sort with separate merge function.',
        is_final_code=True,
        display_order=1
    )
    
    # Complexity
    section4 = ConceptSection.objects.create(
        concept=concept,
        title='Complexity Analysis',
        section_type='explanation',
        display_order=4,
        content='''**Time Complexity: O(n log n) Always**
- **Divide**: O(log n) levels (halving array each time)
- **Merge**: O(n) work per level (visiting all elements)
- **Total**: O(n) × O(log n) = O(n log n)

**Space Complexity: O(n)**
- Creates new arrays at each merge step
- Maximum recursion depth: O(log n)
- Total extra space: O(n)

**Comparison Table:**

| Metric | Merge Sort | Quick Sort | Heap Sort |
|--------|------------|------------|-----------|
| Best Time | O(n log n) | O(n log n) | O(n log n) |
| Worst Time | O(n log n) | O(n²) | O(n log n) |
| Space | O(n) | O(log n) | O(1) |
| Stable | Yes | No | No |

**When to Use Merge Sort:**
✅ Need guaranteed O(n log n) performance
✅ Stability is required
✅ Sorting linked lists (no extra space needed!)
✅ External sorting (data doesn't fit in memory)'''
    )
    
    VisualizationConfig.objects.get_or_create(
        concept=concept,
        defaults={
            'viz_type': 'array',
            'default_input': {'array': [38, 27, 43, 3, 9, 82, 10]},
            'action_options': ['sort', 'step', 'reset'],
        }
    )
    
    print(f"✅ Created concept: {concept.title}")
    return concept


def create_quick_sort_concept():
    """Create Quick Sort concept"""
    topic = Topic.objects.get(slug='quick-sort')
    
    concept, created = Concept.objects.get_or_create(
        topic=topic,
        slug='basic-quick-sort',
        defaults={
            'title': 'Basic Quick Sort',
            'overview': 'Learn the fastest average-case sorting algorithm using partitioning and recursion.',

            'display_order': 1,
        }
    )
    
    if not created:
        print(f"Concept '{concept.title}' already exists")
        return concept
    
    section1 = ConceptSection.objects.create(
        concept=concept,
        title='What is Quick Sort?',
        section_type='explanation',
        display_order=1,
        content='''Quick Sort is a highly efficient **divide-and-conquer** algorithm that:
1. Picks a **pivot** element
2. **Partitions** array so smaller elements are left, larger are right
3. **Recursively** sorts the partitions

**Key Characteristics:**
- **Fast**: Usually fastest in practice (despite O(n²) worst case)
- **In-place**: Uses O(log n) extra space (recursion stack)
- **Not stable**: May change relative order
- **Cache-friendly**: Good locality of reference

**Why Quick Sort is Popular:**
- Used in C's qsort() and some C++ implementations
- Average O(n log n) with small constant factors
- Works well on modern CPUs (cache efficiency)
- Tail-recursive (can be optimized)'''
    )
    
    section2 = ConceptSection.objects.create(
        concept=concept,
        title='The Partitioning Process',
        section_type='explanation',
        display_order=2,
        content='''**The Key Operation: Partition**

Given array and pivot, rearrange so:
- All elements < pivot are on the left
- All elements > pivot are on the right
- Pivot ends up in its final sorted position

**Example:**
```
Array: [10, 80, 30, 90, 40, 50, 70]
Pivot: 50 (last element)

Step 1: i = -1 (index for smaller elements)
[10, 80, 30, 90, 40, 50, 70]
  ↑                      ↑
  i                    pivot

Step 2: 10 < 50, increment i, swap
[10, 80, 30, 90, 40, 50, 70]
  ↑                      ↑
  i                    pivot

Step 3: 30 < 50, increment i, swap
[10, 30, 80, 90, 40, 50, 70]
      ↑                 ↑
      i               pivot

Step 4: 40 < 50, increment i, swap
[10, 30, 40, 90, 80, 50, 70]
          ↑           ↑
          i         pivot

Step 5: Place pivot at i+1
[10, 30, 40, 50, 80, 90, 70]
             ↑
           pivot in final position
```

Now recursively sort left [10, 30, 40] and right [80, 90, 70]!'''
    )
    
    section3 = ConceptSection.objects.create(
        concept=concept,
        title='Implementation',
        section_type='code',
        display_order=3,
        content='Complete Quick Sort implementation with Lomuto partition scheme:'
    )
    
    CodeSnippet.objects.create(
        section=section3,
        language='python',
        code='''def quick_sort(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1
    
    if low < high:
        # Partition and get pivot index
        pivot_index = partition(arr, low, high)
        
        # Recursively sort elements before and after partition
        quick_sort(arr, low, pivot_index - 1)
        quick_sort(arr, pivot_index + 1, high)
    
    return arr


def partition(arr, low, high):
    """Lomuto partition scheme"""
    # Choose the rightmost element as pivot
    pivot = arr[high]
    
    # Index of smaller element
    i = low - 1
    
    for j in range(low, high):
        # If current element is smaller than or equal to pivot
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    
    # Place pivot in correct position
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    
    return i + 1


# Test
array = [10, 80, 30, 90, 40, 50, 70]
result = quick_sort(array.copy())
print(f"Sorted: {result}")
# Output: Sorted: [10, 30, 40, 50, 70, 80, 90]''',
        explanation='Quick sort using Lomuto partition scheme.',
        is_final_code=True,
        display_order=1
    )
    
    section4 = ConceptSection.objects.create(
        concept=concept,
        title='Complexity & Pivot Selection',
        section_type='explanation',
        display_order=4,
        content='''**Time Complexity:**
- **Best/Average**: O(n log n) - balanced partitions
- **Worst**: O(n²) - already sorted array with bad pivot choice

**Pivot Selection Strategies:**
1. **Last element** (simple, but worst if already sorted)
2. **Random element** (good in practice)
3. **Median-of-three** (first, middle, last)
4. **Median-of-medians** (guarantees O(n log n), but complex)

**Space**: O(log n) for recursion stack

**Optimizations:**
- Switch to Insertion Sort for small subarrays (< 10-20 elements)
- Use tail recursion elimination
- 3-way partitioning for many duplicates
- Introsort: switch to Heap Sort if recursion depth exceeds 2*log n'''
    )
    
    VisualizationConfig.objects.get_or_create(
        concept=concept,
        defaults={
            'viz_type': 'array',
            'default_input': {'array': [10, 80, 30, 90, 40, 50, 70]},
            'action_options': ['sort', 'step', 'reset'],
        }
    )
    
    print(f"✅ Created concept: {concept.title}")
    return concept


# Main execution
if __name__ == '__main__':
    print("Creating concepts...")
    print("-" * 50)
    
    try:
        create_selection_sort_concept()
        create_merge_sort_concept()
        create_quick_sort_concept()
        print("-" * 50)
        print("✅ All concepts created successfully!")
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
