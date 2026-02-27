const stack = {
  slug: 'stack',
  title: 'Stack',
  defaultArray: [10, 20, 30, 40, 50],
  code: {
    language: 'python',
    code: `class Stack:
    def __init__(self):
        self.items = []

    def push(self, item):
        self.items.append(item)

    def pop(self):
        if self.is_empty():
            return None
        return self.items.pop()

    def peek(self):
        if self.is_empty():
            return None
        return self.items[-1]

    def is_empty(self):
        return len(self.items) == 0

    def size(self):
        return len(self.items)

stack = Stack()
for val in [10, 20, 30, 40, 50]:
    stack.push(val)
print("Top:", stack.peek())
print("Pop:", stack.pop())
print("Size:", stack.size())`,
  },
  steps: [
    {
      id: 'intro',
      title: '1. What is a Stack?',
      icon: '📚',
      description: 'Introduction to the data structure',
      content: `A Stack is a linear data structure that follows the **LIFO** principle — **Last In, First Out**. The last element added is the first one removed.

**Why learn Stacks?**
- Used everywhere: function call stacks, undo/redo, expression evaluation
- Foundation for DFS, backtracking algorithms
- Browser back button, compiler syntax checking
- Simple yet powerful — one of the most important data structures

**Real-world analogy:**
A stack of plates — you can only add or remove from the **top**. The last plate you put on is the first one you take off.

**Core Operations:**
- **push(item)** — add to the top
- **pop()** — remove from the top
- **peek()** — look at the top without removing
- **isEmpty()** — check if stack is empty`,
      keyPoints: [
        'LIFO — Last In, First Out',
        'Only the top element is accessible',
        'Four core operations: push, pop, peek, isEmpty',
      ],
    },
    {
      id: 'intuition',
      title: '2. How Does It Work?',
      icon: '💡',
      description: 'Understanding the structure',
      content: `**The Core Idea:**
Think of a vertical stack. You can only interact with the **top**. Push adds on top, pop removes from top.

**Visual Example:**
\`\`\`
push(10): | 10 |     push(20): | 20 |     push(30): | 30 |
          +----+               | 10 |               | 20 |
                               +----+               | 10 |
                                                    +----+

pop() → 30:  | 20 |     pop() → 20:  | 10 |
             | 10 |                   +----+
             +----+
\`\`\`

**Application — Balanced Parentheses:**
Check if \`({[]})\` is balanced:
1. \`(\` → push → stack: \`[\`(\`]\`
2. \`{\` → push → stack: \`[\`(\`, \`{\`]\`
3. \`[\` → push → stack: \`[\`(\`, \`{\`, \`[\`]\`
4. \`]\` → pop \`[\` → matches ✓
5. \`}\` → pop \`{\` → matches ✓
6. \`)\` → pop \`(\` → matches ✓
7. Stack empty → **Balanced!** ✔`,
      keyPoints: [
        'Push adds to top, pop removes from top',
        'Stack grows and shrinks from one end only',
        'Perfect for matching and nesting problems',
      ],
    },
    {
      id: 'algorithm',
      title: '3. Core Operations',
      icon: '⚙️',
      description: 'Detailed breakdown of operations',
      content: `**Push:**
\`\`\`
procedure push(stack, item)
    stack.top = stack.top + 1
    stack[top] = item
\`\`\`
Time: O(1)

**Pop:**
\`\`\`
procedure pop(stack)
    if stack is empty: error "underflow"
    item = stack[top]
    stack.top = stack.top - 1
    return item
\`\`\`
Time: O(1)

**Peek:**
\`\`\`
procedure peek(stack)
    if stack is empty: return null
    return stack[top]
\`\`\`
Time: O(1)

**Implementations:**

**Array-based:**
- Use an array and a top index
- Push: increment top, set value
- Pop: get value, decrement top
- Fixed size (unless dynamic array)

**Linked List-based:**
- Push: prepend to head
- Pop: remove head
- Dynamic size, no overflow`,
      keyPoints: [
        'All core operations are O(1)',
        'Array-based or linked-list-based implementations',
        'Handle underflow (pop from empty stack)',
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
| push | O(1) | O(1) |
| pop | O(1) | O(1) |
| peek | O(1) | O(1) |
| isEmpty | O(1) | O(1) |
| search | O(n) | O(1) |

**Space Complexity:** O(n) for storing n elements.

**Common Stack Applications:**

| Application | How Stack is Used |
|-------------|-------------------|
| Function calls | System call stack tracks return addresses |
| Undo/Redo | Push actions, pop to undo |
| Browser back | Push visited pages, pop to go back |
| Expression evaluation | Postfix/prefix evaluation |
| Parenthesis matching | Push opening, pop on closing |
| DFS traversal | Track nodes to visit |
| Backtracking | Track decisions to undo |

**Stack vs Queue:**
| | Stack | Queue |
|--|-------|-------|
| Order | LIFO | FIFO |
| Insert | push (top) | enqueue (rear) |
| Remove | pop (top) | dequeue (front) |
| Use case | DFS, undo | BFS, scheduling |`,
      keyPoints: [
        'All operations O(1) — extremely efficient',
        'Space O(n) for n elements',
        'Used in function calls, DFS, expression evaluation',
      ],
    },
    {
      id: 'code',
      title: '5. Implementation',
      icon: '💻',
      description: 'Complete code walkthrough',
      content: `**Python Implementation (using list):**

\`\`\`python
class Stack:
    def __init__(self):
        self.items = []

    def push(self, item):
        self.items.append(item)

    def pop(self):
        if self.is_empty():
            return None
        return self.items.pop()

    def peek(self):
        if self.is_empty():
            return None
        return self.items[-1]

    def is_empty(self):
        return len(self.items) == 0

    def size(self):
        return len(self.items)
\`\`\`

**Line-by-line:**
- **Line 3:** Internal list stores elements
- **Line 6:** append adds to end (top of stack)
- **Line 9-11:** pop removes and returns last element
- **Line 14-16:** peek returns last element without removing
- **Line 18-19:** Check if internal list is empty

**Application — Balanced Parentheses:**
\`\`\`python
def is_balanced(expression):
    stack = Stack()
    pairs = {')': '(', '}': '{', ']': '['}
    for char in expression:
        if char in '({[':
            stack.push(char)
        elif char in ')}]':
            if stack.is_empty() or stack.pop() != pairs[char]:
                return False
    return stack.is_empty()
\`\`\``,
      keyPoints: [
        'Python list makes a perfect stack',
        'append = push, pop = pop',
        'Always check is_empty before pop/peek',
      ],
    },
    {
      id: 'practice',
      title: '6. Practice',
      icon: '✏️',
      description: 'Try it yourself',
      content: `**Your Turn!**

Open the **Sandbox** and implement a Stack.

**Checklist:**
- ☐ Implement push, pop, peek, is_empty, size
- ☐ Handle edge case: pop from empty stack
- ☐ Write a balanced parentheses checker using your stack
- ☐ Implement reverse string using a stack

**Test Cases:**
- push 10, 20, 30 → peek → \`30\`
- pop → \`30\` → peek → \`20\`
- size → \`2\`
- is_balanced("({[]})") → \`True\`
- is_balanced("({[})") → \`False\`

**Challenges:**
1. Basic — implement Stack class
2. Intermediate — balanced parentheses checker
3. Advanced — evaluate postfix expressions
4. Expert — implement Min Stack (O(1) getMin)`,
      keyPoints: [
        'Implement the basic class first',
        'Then build applications on top',
        'Min Stack is a popular interview question',
      ],
    },
  ],
};

export default stack;
