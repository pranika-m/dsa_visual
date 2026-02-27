const singlyLinkedList = {
  slug: 'singly-linked-list',
  title: 'Singly Linked List',
  defaultArray: [10, 20, 30, 40, 50],
  code: {
    language: 'python',
    code: `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def append(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            return
        current = self.head
        while current.next:
            current = current.next
        current.next = new_node

    def display(self):
        elements = []
        current = self.head
        while current:
            elements.append(current.data)
            current = current.next
        print(" -> ".join(map(str, elements)))

ll = LinkedList()
for val in [10, 20, 30, 40, 50]:
    ll.append(val)
ll.display()`,
  },
  steps: [
    {
      id: 'intro',
      title: '1. What is a Singly Linked List?',
      icon: '📚',
      description: 'Introduction to the data structure',
      content: `A Singly Linked List is a linear data structure where each element (called a **node**) contains data and a pointer to the **next** node. Unlike arrays, elements are not stored in contiguous memory.

**Why learn Linked Lists?**
- Fundamental data structure in computer science
- Dynamic size — no need to pre-allocate memory
- Efficient insertions and deletions at any position
- Building block for stacks, queues, and more complex structures

**Real-world analogy:**
Think of a treasure hunt where each clue leads to the next location. You must follow the chain — you can't jump directly to clue #5 without going through clues #1-4.

**Structure:**
\`\`\`
[Data|Next] → [Data|Next] → [Data|Next] → null
   Head                                    Tail
\`\`\``,
      keyPoints: [
        'Each node has data and a next pointer',
        'Dynamic size — grows and shrinks as needed',
        'Sequential access only — no random indexing',
      ],
    },
    {
      id: 'intuition',
      title: '2. How Does It Work?',
      icon: '💡',
      description: 'Understanding the structure',
      content: `**The Core Idea:**
A linked list is a chain of nodes. The **head** points to the first node. Each node points to the next. The last node points to **null** (end of list).

**Key Operations:**
- **Traverse** — follow next pointers from head to end
- **Insert** — create a new node and adjust pointers
- **Delete** — adjust pointers to skip a node
- **Search** — walk through nodes until found

**Visual Example — Inserting 25 after 20:**
\`\`\`
Before: [10] → [20] → [30] → null

Step 1: Create node [25]
Step 2: Point [25].next to [30]
Step 3: Point [20].next to [25]

After:  [10] → [20] → [25] → [30] → null
\`\`\`

**Arrays vs Linked Lists:**
| Feature | Array | Linked List |
|---------|-------|-------------|
| Access | O(1) | O(n) |
| Insert at start | O(n) | O(1) |
| Insert at end | O(1)* | O(n) |
| Memory | Contiguous | Scattered |`,
      keyPoints: [
        'Head pointer tracks the first node',
        'Insertions/deletions just re-link pointers',
        'No random access — must traverse to reach a node',
      ],
    },
    {
      id: 'algorithm',
      title: '3. Core Operations',
      icon: '⚙️',
      description: 'Detailed breakdown of operations',
      content: `**Insert at Beginning (Prepend):**
\`\`\`
1. Create new node
2. Point new_node.next to current head
3. Update head to new_node
\`\`\`
Time: O(1)

**Insert at End (Append):**
\`\`\`
1. Create new node
2. If list is empty, set head to new node
3. Otherwise traverse to last node
4. Point last_node.next to new node
\`\`\`
Time: O(n)

**Delete a Node:**
\`\`\`
1. If deleting head, update head to head.next
2. Otherwise traverse to find previous node
3. Point prev.next to node_to_delete.next
\`\`\`
Time: O(n)

**Search:**
\`\`\`
1. Start at head
2. Compare each node's data with target
3. Return node if found, null if reached end
\`\`\`
Time: O(n)

**Reverse:**
\`\`\`
1. Initialize prev = null, current = head
2. While current is not null:
   a. Store next = current.next
   b. current.next = prev
   c. prev = current
   d. current = next
3. head = prev
\`\`\`
Time: O(n)`,
      keyPoints: [
        'Prepend is O(1), append is O(n)',
        'Deletion requires finding the previous node',
        'Reversal uses three pointers: prev, current, next',
      ],
    },
    {
      id: 'complexity',
      title: '4. Complexity Analysis',
      icon: '📊',
      description: 'Time & space complexity',
      content: `**Operation Complexities:**

| Operation | Time | Explanation |
|-----------|------|-------------|
| Access by index | O(n) | Must traverse from head |
| Search | O(n) | Must scan sequentially |
| Insert at head | O(1) | Just re-link pointers |
| Insert at tail | O(n) | Must traverse to end |
| Insert at position | O(n) | Traverse to position |
| Delete head | O(1) | Re-link head pointer |
| Delete by value | O(n) | Search then re-link |
| Reverse | O(n) | Visit every node once |

**Space Complexity:** O(n) — one node per element plus a next pointer each.

**Memory Comparison:**
- Array of 1000 ints: 1000 × 4 bytes = 4,000 bytes
- Linked List of 1000 ints: 1000 × (4 + 8) bytes = 12,000 bytes (data + pointer)

Linked lists use more memory per element but allow efficient insertion/deletion.`,
      keyPoints: [
        'Insert/delete at head is O(1)',
        'Access and search are O(n)',
        'Extra memory for pointers',
      ],
    },
    {
      id: 'code',
      title: '5. Implementation',
      icon: '💻',
      description: 'Complete code walkthrough',
      content: `**Python Implementation:**

\`\`\`python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def append(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            return
        current = self.head
        while current.next:
            current = current.next
        current.next = new_node

    def prepend(self, data):
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node

    def delete(self, data):
        if not self.head:
            return
        if self.head.data == data:
            self.head = self.head.next
            return
        current = self.head
        while current.next:
            if current.next.data == data:
                current.next = current.next.next
                return
            current = current.next
\`\`\`

**Key Points:**
- **Node class:** holds data and next pointer
- **append:** traverse to end, link new node
- **prepend:** new node becomes head
- **delete:** re-link previous node to skip deleted node`,
      keyPoints: [
        'Node class: data + next pointer',
        'LinkedList class: head pointer',
        'Always check if head is None (empty list)',
      ],
    },
    {
      id: 'practice',
      title: '6. Practice',
      icon: '✏️',
      description: 'Try it yourself',
      content: `**Your Turn!**

Open the **Sandbox** and implement a Singly Linked List.

**Checklist:**
- ☐ Implement the Node class
- ☐ Implement append (insert at end)
- ☐ Implement prepend (insert at beginning)
- ☐ Implement delete by value
- ☐ Implement search
- ☐ Implement display / print

**Test Cases:**
- Append 10, 20, 30 → display → \`10 -> 20 -> 30\`
- Prepend 5 → \`5 -> 10 -> 20 -> 30\`
- Delete 20 → \`5 -> 10 -> 30\`
- Search 10 → Found
- Search 99 → Not Found

**Challenges:**
1. Basic — implement append, prepend, display
2. Intermediate — implement delete and search
3. Advanced — reverse the linked list
4. Expert — detect a cycle (Floyd's Algorithm)`,
      keyPoints: [
        'Build Node class first, then LinkedList',
        'Test each operation individually',
        'Draw diagrams to visualize pointer changes',
      ],
    },
  ],
};

export default singlyLinkedList;
