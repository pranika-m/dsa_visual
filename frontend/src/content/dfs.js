const dfs = {
  slug: 'dfs',
  title: 'Depth-First Search',
  defaultArray: [1, 2, 3, 4, 5, 6, 7],
  code: {
    language: 'python',
    code: `def dfs(graph, start, visited=None):
    if visited is None:
        visited = set()
    visited.add(start)
    order = [start]
    for neighbor in graph[start]:
        if neighbor not in visited:
            order += dfs(graph, neighbor, visited)
    return order

# Iterative version
def dfs_iterative(graph, start):
    visited = set()
    stack = [start]
    order = []
    while stack:
        node = stack.pop()
        if node not in visited:
            visited.add(node)
            order.append(node)
            for neighbor in reversed(graph[node]):
                if neighbor not in visited:
                    stack.append(neighbor)
    return order

graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E']
}
print("DFS:", dfs(graph, 'A'))`,
  },
  steps: [
    {
      id: 'intro',
      title: '1. What is DFS?',
      icon: '📚',
      description: 'Introduction to the algorithm',
      content: `Depth-First Search (DFS) is a graph traversal algorithm that explores as **deep** as possible along each branch before backtracking. It goes all the way down one path before trying another.

**Why learn DFS?**
- Topological sorting of directed graphs
- Cycle detection in graphs
- Solving mazes and puzzles
- Connected components, strongly connected components
- Path finding and backtracking

**Real-world analogy:**
Exploring a maze — you go down one corridor as far as possible. When you hit a dead end, you backtrack to the last intersection and try a different path.

**DFS uses a Stack (LIFO) or Recursion:**
\`\`\`
Start at A → go deep into A's first neighbor → 
continue deep → backtrack → try next branch
\`\`\``,
      keyPoints: [
        'Explores as deep as possible before backtracking',
        'Uses stack (explicit or recursion call stack)',
        'Useful for topological sort, cycle detection',
      ],
    },
    {
      id: 'intuition',
      title: '2. How Does It Work?',
      icon: '💡',
      description: 'Understanding the intuition',
      content: `**The Core Idea:**
1. Start at the source node, mark it visited
2. Visit the first unvisited neighbor
3. Repeat step 2 recursively — go deep
4. When stuck (all neighbors visited), backtrack
5. Repeat until all reachable nodes are visited

**Visual Example:**
\`\`\`
Graph:  A --- B --- D
        |     |
        C     E --- F
        |           |
        +-----------+

DFS from A (exploring first neighbor each time):
Visit A → go to B (first neighbor)
  Visit B → go to D (first unvisited neighbor)
    Visit D → dead end, backtrack to B
  Back at B → go to E
    Visit E → go to F
      Visit F → go to C (unvisited neighbor)
        Visit C → all neighbors visited, backtrack

Order: A → B → D → E → F → C ✔
\`\`\`

**DFS vs BFS:** BFS goes wide (level by level), DFS goes deep (branch by branch).`,
      keyPoints: [
        'Goes deep first, backtracks when stuck',
        'Natural recursion maps to the call stack',
        'Different from BFS — explores depth, not breadth',
      ],
    },
    {
      id: 'algorithm',
      title: '3. The Algorithm',
      icon: '⚙️',
      description: 'Detailed step-by-step breakdown',
      content: `**Pseudocode — Recursive:**
\`\`\`
procedure DFS(graph, node, visited)
    add node to visited
    process(node)
    for each neighbor of node
        if neighbor not in visited
            DFS(graph, neighbor, visited)
\`\`\`

**Pseudocode — Iterative (with stack):**
\`\`\`
procedure DFS_Iterative(graph, start)
    stack = [start]
    visited = empty set
    while stack is not empty
        node = stack.pop()
        if node not in visited
            add node to visited
            process(node)
            push all unvisited neighbors onto stack
\`\`\`

**DFS Applications:**

**Cycle Detection:**
If during DFS we visit a node that is already in the current path (not just visited), a cycle exists.

**Topological Sort:**
For DAGs (Directed Acyclic Graphs), DFS can produce a linear ordering where every node appears before all nodes it points to.

**Connected Components:**
Run DFS from each unvisited node — each DFS call discovers one connected component.`,
      keyPoints: [
        'Recursive version uses the call stack naturally',
        'Iterative version uses an explicit stack',
        'Applications: cycles, topological sort, components',
      ],
    },
    {
      id: 'complexity',
      title: '4. Complexity Analysis',
      icon: '📊',
      description: 'Time & space complexity',
      content: `**Time Complexity:** O(V + E)
- V = number of vertices
- E = number of edges
- Each vertex visited once, each edge examined once

**Space Complexity:**
- Recursive: O(V) — call stack depth
- Iterative: O(V) — explicit stack

**BFS vs DFS — When to Use Which:**

| Problem | BFS | DFS |
|---------|-----|-----|
| Shortest path (unweighted) | ✔ Best | ✗ Not optimal |
| All paths between two nodes | ✗ Inefficient | ✔ Natural |
| Topological sorting | ✗ | ✔ Best |
| Cycle detection | ✔ | ✔ |
| Connected components | ✔ | ✔ |
| Maze solving | ✔ Shortest | ✔ Any path |
| Memory (wide graph) | ✗ High | ✔ Lower |
| Memory (deep graph) | ✔ Lower | ✗ High |

**Key Insight:** For very wide graphs (many neighbors), DFS uses less memory. For very deep graphs, BFS uses less memory.`,
      keyPoints: [
        'Time O(V + E) — same as BFS',
        'Space O(V) — for recursion/stack',
        'Choose DFS for topological sort and path finding',
      ],
    },
    {
      id: 'code',
      title: '5. Implementation',
      icon: '💻',
      description: 'Complete code walkthrough',
      content: `**Python — Recursive:**

\`\`\`python
def dfs(graph, start, visited=None):
    if visited is None:
        visited = set()
    visited.add(start)
    order = [start]
    for neighbor in graph[start]:
        if neighbor not in visited:
            order += dfs(graph, neighbor, visited)
    return order
\`\`\`

**Python — Iterative:**

\`\`\`python
def dfs_iterative(graph, start):
    visited = set()
    stack = [start]
    order = []
    while stack:
        node = stack.pop()
        if node not in visited:
            visited.add(node)
            order.append(node)
            for neighbor in reversed(graph[node]):
                if neighbor not in visited:
                    stack.append(neighbor)
    return order
\`\`\`

**Line-by-line (recursive):**
- **Line 3:** Initialize visited set on first call
- **Line 4:** Mark current node as visited
- **Line 6-8:** Recurse into each unvisited neighbor

**Why reversed() in iterative?**
Stack is LIFO — pushing neighbors in reverse order ensures we visit them in the same order as the recursive version.`,
      keyPoints: [
        'Recursive: clean and natural',
        'Iterative: uses explicit stack + reversed neighbors',
        'Both produce valid DFS orderings',
      ],
    },
    {
      id: 'practice',
      title: '6. Practice',
      icon: '✏️',
      description: 'Try it yourself',
      content: `**Your Turn!**

Open the **Sandbox** and implement DFS.

**Checklist:**
- ☐ Represent a graph as an adjacency list
- ☐ Implement recursive DFS
- ☐ Implement iterative DFS with a stack
- ☐ Implement cycle detection
- ☐ Find all connected components

**Test Graph:**
\`\`\`python
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E']
}
\`\`\`

**Test Cases:**
- DFS from A → \`['A', 'B', 'D', 'E', 'F', 'C']\`
- Has cycle? → \`True\` (A-B-E-F-C-A)
- DFS from D → \`['D', 'B', 'A', 'C', 'F', 'E']\`

**Challenges:**
1. Basic — recursive DFS
2. Intermediate — iterative DFS
3. Advanced — detect cycles in directed graph
4. Expert — topological sort using DFS`,
      keyPoints: [
        'Start with recursive — it is simpler',
        'Then implement iterative as a challenge',
        'Compare your traversal order with BFS',
      ],
    },
  ],
};

export default dfs;
