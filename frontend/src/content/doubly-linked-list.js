const doublyLinkedList = {
  slug: 'doubly-linked-list',
  title: 'Doubly Linked List',
  defaultArray: [10, 20, 30, 40, 50],
  code: {
    language: 'python',
    code: `class Node:
    def __init__(self, data):
        self.data = data
        self.prev = None
        self.next = None

class DoublyLinkedList:
    def __init__(self):
        self.head = None
        self.tail = None

    def append(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = self.tail = new_node
            return
        new_node.prev = self.tail
        self.tail.next = new_node
        self.tail = new_node

    def display_forward(self):
        elements = []
        current = self.head
        while current:
            elements.append(current.data)
            current = current.next
        print(" <-> ".join(map(str, elements)))

dll = DoublyLinkedList()
for val in [10, 20, 30, 40, 50]:
    dll.append(val)
dll.display_forward()`,
  },
  steps: [
    {
      id: 'intro',
      title: '1. What is a Doubly Linked List?',
      icon: '📚',
      description: 'Introduction to the data structure',
      content: `A Doubly Linked List is a linked list where each node has pointers to **both** the next and the previous node. This allows traversal in both directions.

**Why learn Doubly Linked Lists?**
- Bi-directional traversal
- Efficient deletion when you have a reference to the node
- Foundation for LRU caches, browser history, undo/redo
- Used in real-world systems (OS process lists, text editors)

**Real-world analogy:**
A train where each car is connected to both the car in front and behind. You can walk forward or backward through the train.

**Structure:**
\`\`\`
null ← [Prev|Data|Next] ⇔ [Prev|Data|Next] ⇔ [Prev|Data|Next] → null
         Head                                      Tail
\`\`\``,
      keyPoints: [
        'Each node has prev and next pointers',
        'Supports forward and backward traversal',
        'More flexible but uses more memory than singly linked',
      ],
    },
    {
      id: 'intuition',
      title: '2. How Does It Work?',
      icon: '💡',
      description: 'Understanding the structure',
      content: `**The Core Idea:**
Like a singly linked list but each node also knows its **predecessor**. This makes many operations easier — especially deletion and backward traversal.

**Key Differences from Singly Linked List:**
| Feature | Singly | Doubly |
|---------|--------|--------|
| Traversal | Forward only | Both directions |
| Delete (with node ref) | O(n) — need prev | O(1) — have prev |
| Memory per node | data + 1 pointer | data + 2 pointers |
| Insert before node | O(n) | O(1) |

**Visual Example — Delete node 30:**
\`\`\`
Before: [10] ⇔ [20] ⇔ [30] ⇔ [40]

Step 1: [30].prev.next = [30].next  →  [20].next = [40]
Step 2: [30].next.prev = [30].prev  →  [40].prev = [20]

After:  [10] ⇔ [20] ⇔ [40]
\`\`\`

No need to traverse to find the previous node!`,
      keyPoints: [
        'Two pointers per node: prev and next',
        'Deletion is O(1) with a node reference',
        'Both head and tail pointers maintained',
      ],
    },
    {
      id: 'algorithm',
      title: '3. Core Operations',
      icon: '⚙️',
      description: 'Detailed breakdown of operations',
      content: `**Insert at End (Append):**
\`\`\`
1. Create new node
2. If empty: head = tail = new_node
3. Else: new_node.prev = tail
         tail.next = new_node
         tail = new_node
\`\`\`
Time: O(1) — we have a tail pointer!

**Insert at Beginning (Prepend):**
\`\`\`
1. Create new node
2. new_node.next = head
3. If head exists: head.prev = new_node
4. head = new_node
5. If tail is null: tail = new_node
\`\`\`
Time: O(1)

**Delete a Node (given reference):**
\`\`\`
1. If node.prev: node.prev.next = node.next
   Else: head = node.next
2. If node.next: node.next.prev = node.prev
   Else: tail = node.prev
\`\`\`
Time: O(1) — no traversal needed!

**Insert After a Node:**
\`\`\`
1. new_node.prev = node
2. new_node.next = node.next
3. If node.next: node.next.prev = new_node
4. node.next = new_node
5. If node == tail: tail = new_node
\`\`\`
Time: O(1)`,
      keyPoints: [
        'Append and prepend are both O(1)',
        'Delete with node reference is O(1)',
        'Must update both prev and next pointers',
      ],
    },
    {
      id: 'complexity',
      title: '4. Complexity Analysis',
      icon: '📊',
      description: 'Time & space complexity',
      content: `**Operation Complexities:**

| Operation | Time | Notes |
|-----------|------|-------|
| Access by index | O(n) | Must traverse (can start from either end) |
| Search | O(n) | Sequential scan |
| Insert at head | O(1) | Direct pointer update |
| Insert at tail | O(1) | Tail pointer available |
| Insert after node | O(1) | Re-link 4 pointers |
| Delete with ref | O(1) | Re-link neighbors |
| Delete by value | O(n) | Search first, then O(1) delete |
| Reverse traverse | O(n) | Follow prev pointers from tail |

**Space Complexity:** O(n) — each node stores data + 2 pointers.

**When to Choose Doubly over Singly:**
- Need backward traversal
- Frequent deletion of known nodes
- Implementing LRU cache or deque
- Browser forward/back navigation

**When Singly is Sufficient:**
- Memory constrained
- Only forward traversal needed
- Simple stack or queue`,
      keyPoints: [
        'O(1) insert/delete at both ends',
        'O(1) delete if you have the node reference',
        'Extra memory: 2 pointers per node instead of 1',
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
        self.prev = None
        self.next = None

class DoublyLinkedList:
    def __init__(self):
        self.head = None
        self.tail = None

    def append(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = self.tail = new_node
            return
        new_node.prev = self.tail
        self.tail.next = new_node
        self.tail = new_node

    def prepend(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = self.tail = new_node
            return
        new_node.next = self.head
        self.head.prev = new_node
        self.head = new_node

    def delete_node(self, node):
        if node.prev:
            node.prev.next = node.next
        else:
            self.head = node.next
        if node.next:
            node.next.prev = node.prev
        else:
            self.tail = node.prev
\`\`\`

**Key Points:**
- **Node:** data + prev + next pointers
- **append:** link at tail, update tail pointer
- **prepend:** link at head, update head pointer
- **delete_node:** re-link neighbors, no traversal needed`,
      keyPoints: [
        'Node has three fields: data, prev, next',
        'Maintain both head and tail pointers',
        'delete_node handles edge cases for head/tail',
      ],
    },
    {
      id: 'practice',
      title: '6. Practice',
      icon: '✏️',
      description: 'Try it yourself',
      content: `**Your Turn!**

Open the **Sandbox** and implement a Doubly Linked List.

**Checklist:**
- ☐ Implement the Node class (with prev and next)
- ☐ Implement append (insert at tail)
- ☐ Implement prepend (insert at head)
- ☐ Implement delete by node reference
- ☐ Implement forward and backward display
- ☐ Handle edge cases (empty list, single element)

**Test Cases:**
- Append 10, 20, 30 → forward → \`10 <-> 20 <-> 30\`
- Prepend 5 → forward → \`5 <-> 10 <-> 20 <-> 30\`
- Delete 20 → forward → \`5 <-> 10 <-> 30\`
- Backward → \`30 <-> 10 <-> 5\`

**Challenges:**
1. Basic — append, prepend, display
2. Intermediate — delete and insert_after
3. Advanced — implement an LRU Cache
4. Expert — flatten a multi-level doubly linked list`,
      keyPoints: [
        'Always update both prev and next pointers',
        'Handle head/tail updates in delete',
        'Test backward traversal too',
      ],
    },
  ],
};

export default doublyLinkedList;
