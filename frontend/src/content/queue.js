const queue = {
  slug: 'queue',
  title: 'Queue',
  defaultArray: [10, 20, 30, 40, 50],
  code: {
    language: 'python',
    code: `from collections import deque

class Queue:
    def __init__(self):
        self.items = deque()

    def enqueue(self, item):
        self.items.append(item)

    def dequeue(self):
        if self.is_empty():
            return None
        return self.items.popleft()

    def front(self):
        if self.is_empty():
            return None
        return self.items[0]

    def is_empty(self):
        return len(self.items) == 0

    def size(self):
        return len(self.items)

q = Queue()
for val in [10, 20, 30, 40, 50]:
    q.enqueue(val)
print("Front:", q.front())
print("Dequeue:", q.dequeue())
print("Size:", q.size())`,
  },
  steps: [
    {
      id: 'intro',
      title: '1. What is a Queue?',
      icon: '📚',
      description: 'Introduction to the data structure',
      content: `A Queue is a linear data structure that follows the **FIFO** principle — **First In, First Out**. The first element added is the first one removed.

**Why learn Queues?**
- Used in BFS, scheduling, buffering
- Operating system task scheduling
- Printer job queues, message queues
- Foundation for many real-world systems

**Real-world analogy:**
A line at a grocery store — the first person in line is the first to be served. New people join at the back.

**Core Operations:**
- **enqueue(item)** — add to the rear
- **dequeue()** — remove from the front
- **front() / peek()** — look at the front element
- **isEmpty()** — check if queue is empty`,
      keyPoints: [
        'FIFO — First In, First Out',
        'Add at rear, remove from front',
        'Used in BFS, scheduling, buffering',
      ],
    },
    {
      id: 'intuition',
      title: '2. How Does It Work?',
      icon: '💡',
      description: 'Understanding the structure',
      content: `**The Core Idea:**
Elements enter from the **rear** and leave from the **front**. Like a tunnel — first in, first out.

**Visual Example:**
\`\`\`
enqueue(10): Front → | 10 | ← Rear

enqueue(20): Front → | 10 | 20 | ← Rear

enqueue(30): Front → | 10 | 20 | 30 | ← Rear

dequeue() → 10: Front → | 20 | 30 | ← Rear

dequeue() → 20: Front → | 30 | ← Rear
\`\`\`

**Application — BFS (Level-order traversal):**
\`\`\`
        1
       / \\
      2   3
     / \\
    4   5

Queue: [1] → dequeue 1, enqueue 2,3
       [2, 3] → dequeue 2, enqueue 4,5
       [3, 4, 5] → dequeue 3
       [4, 5] → dequeue 4, 5

BFS order: 1, 2, 3, 4, 5 ✔
\`\`\``,
      keyPoints: [
        'Enqueue at rear, dequeue from front',
        'Perfect for level-order / BFS traversal',
        'Processes elements in arrival order',
      ],
    },
    {
      id: 'algorithm',
      title: '3. Core Operations',
      icon: '⚙️',
      description: 'Detailed breakdown of operations',
      content: `**Enqueue:**
\`\`\`
procedure enqueue(queue, item)
    queue[rear] = item
    rear = rear + 1
\`\`\`
Time: O(1)

**Dequeue:**
\`\`\`
procedure dequeue(queue)
    if queue is empty: error "underflow"
    item = queue[front]
    front = front + 1
    return item
\`\`\`
Time: O(1)

**Implementations:**

**Array-based (Circular Queue):**
- Use array with front and rear pointers
- Wrap around using modulo: \`rear = (rear + 1) % capacity\`
- Fixed size but efficient

**Linked List-based:**
- Enqueue: append at tail
- Dequeue: remove from head
- Dynamic size, no overflow

**Python's deque:**
- \`collections.deque\` is optimized for both ends
- \`append()\` = enqueue, \`popleft()\` = dequeue
- Both operations are O(1)

**Queue Variants:**
- **Circular Queue** — efficient array-based with wrap-around
- **Priority Queue** — dequeue highest priority element
- **Double-ended Queue (Deque)** — insert/remove from both ends`,
      keyPoints: [
        'All core operations are O(1)',
        'Circular queue avoids wasted array space',
        'Python deque is the recommended implementation',
      ],
    },
    {
      id: 'complexity',
      title: '4. Complexity Analysis',
      icon: '📊',
      description: 'Time & space complexity',
      content: `**Operation Complexities:**

| Operation | Time | Space |
|-----------|------|-------|
| enqueue | O(1) | O(1) |
| dequeue | O(1) | O(1) |
| front/peek | O(1) | O(1) |
| isEmpty | O(1) | O(1) |
| search | O(n) | O(1) |

**Space Complexity:** O(n) for storing n elements.

**Queue Applications:**

| Application | How Queue is Used |
|-------------|-------------------|
| BFS traversal | Track nodes to visit level by level |
| CPU scheduling | Round-robin process scheduling |
| Print queue | Jobs processed in order |
| Web server | Request queue for handling traffic |
| Message queues | Kafka, RabbitMQ for async processing |

**Stack vs Queue Comparison:**
| | Stack (LIFO) | Queue (FIFO) |
|--|-------------|--------------|
| Add | push (top) | enqueue (rear) |
| Remove | pop (top) | dequeue (front) |
| Graph | DFS | BFS |
| Analogy | Stack of plates | Line at store |`,
      keyPoints: [
        'All operations O(1)',
        'FIFO vs LIFO — each has its own use cases',
        'Foundation for BFS and scheduling',
      ],
    },
    {
      id: 'code',
      title: '5. Implementation',
      icon: '💻',
      description: 'Complete code walkthrough',
      content: `**Python Implementation (using deque):**

\`\`\`python
from collections import deque

class Queue:
    def __init__(self):
        self.items = deque()

    def enqueue(self, item):
        self.items.append(item)

    def dequeue(self):
        if self.is_empty():
            return None
        return self.items.popleft()

    def front(self):
        if self.is_empty():
            return None
        return self.items[0]

    def is_empty(self):
        return len(self.items) == 0

    def size(self):
        return len(self.items)
\`\`\`

**Why deque instead of list?**
- \`list.pop(0)\` is O(n) — shifts all elements
- \`deque.popleft()\` is O(1) — no shifting

**Circular Queue (Array-based):**
\`\`\`python
class CircularQueue:
    def __init__(self, capacity):
        self.queue = [None] * capacity
        self.capacity = capacity
        self.front = self.rear = -1

    def enqueue(self, item):
        if (self.rear + 1) % self.capacity == self.front:
            print("Queue is full")
            return
        if self.front == -1:
            self.front = 0
        self.rear = (self.rear + 1) % self.capacity
        self.queue[self.rear] = item
\`\`\``,
      keyPoints: [
        'Use deque for O(1) dequeue in Python',
        'list.pop(0) is O(n) — avoid it!',
        'Circular queue wraps using modulo',
      ],
    },
    {
      id: 'practice',
      title: '6. Practice',
      icon: '✏️',
      description: 'Try it yourself',
      content: `**Your Turn!**

Open the **Sandbox** and implement a Queue.

**Checklist:**
- ☐ Implement enqueue, dequeue, front, is_empty, size
- ☐ Handle edge case: dequeue from empty queue
- ☐ Use collections.deque for O(1) operations
- ☐ Implement a circular queue with fixed capacity

**Test Cases:**
- enqueue 10, 20, 30 → front → \`10\`
- dequeue → \`10\` → front → \`20\`
- size → \`2\`
- Circular queue (capacity 3): enqueue 1,2,3 → full → dequeue 1 → enqueue 4 → works

**Challenges:**
1. Basic — implement Queue with deque
2. Intermediate — implement Circular Queue
3. Advanced — implement Queue using two Stacks
4. Expert — implement a Priority Queue`,
      keyPoints: [
        'Start with deque-based implementation',
        'Then try circular queue',
        'Queue using two stacks is a classic interview question',
      ],
    },
  ],
};

export default queue;
