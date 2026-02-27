const bfs = {
  slug: 'bfs',
  title: 'Breadth-First Search',
  defaultArray: [1, 2, 3, 4, 5, 6, 7],
  code: {
    language: 'python',
    code: `from collections import deque

def bfs(graph, start):
    visited = set()
    queue = deque([start])
    visited.add(start)
    order = []

    while queue:
        node = queue.popleft()
        order.append(node)
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    return order

graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E']
}
print("BFS:", bfs(graph, 'A'))`,
  },
  steps: [
    {
      id: 'intro',
      title: '1. What is BFS?',
      icon: '📚',
      description: 'Introduction to the algorithm',
      content: `Breadth-First Search (BFS) is a graph traversal algorithm that explores nodes **level by level**. It visits all neighbors of the current node before moving to the next level of neighbors.

**Why learn BFS?**
- Finds the **shortest path** in unweighted graphs
- Level-order traversal of trees
- Used in social networks (degrees of separation)
- Foundation for Dijkstra's algorithm

**Real-world analogy:**
Ripples in a pond — when you drop a stone, waves spread outward in circles. BFS explores outward from the starting node in layers.

**BFS uses a Queue (FIFO):**
\`\`\`
Start at A → visit A's neighbors → visit their neighbors → ...
Level 0:  A
Level 1:  B, C
Level 2:  D, E, F
\`\`\``,
      keyPoints: [
        'Explores level by level (breadth-first)',
        'Uses a queue data structure',
        'Finds shortest path in unweighted graphs',
      ],
    },
    {
      id: 'intuition',
      title: '2. How Does It Work?',
      icon: '💡',
      description: 'Understanding the intuition',
      content: `**The Core Idea:**
1. Start at the source node, add it to the queue
2. Dequeue the front node, mark it visited
3. Enqueue all its unvisited neighbors
4. Repeat until the queue is empty

**Visual Example:**
\`\`\`
Graph:  A --- B --- D
        |     |
        C     E --- F
        |           |
        +-----------+

BFS from A:
Queue: [A]           → Visit A, enqueue B, C
Queue: [B, C]        → Visit B, enqueue D, E
Queue: [C, D, E]     → Visit C, enqueue F
Queue: [D, E, F]     → Visit D (no new neighbors)
Queue: [E, F]        → Visit E (F already queued)
Queue: [F]           → Visit F

Order: A → B → C → D → E → F ✔
\`\`\`

**Key Property:** BFS visits nodes in order of their **distance** from the start. All nodes at distance 1 are visited before distance 2, and so on.`,
      keyPoints: [
        'Queue ensures level-by-level exploration',
        'Mark visited before enqueuing to avoid duplicates',
        'Visits nodes in distance order from start',
      ],
    },
    {
      id: 'algorithm',
      title: '3. The Algorithm',
      icon: '⚙️',
      description: 'Detailed step-by-step breakdown',
      content: `**Pseudocode:**
\`\`\`
procedure BFS(graph, start)
    visited = empty set
    queue = empty queue
    enqueue start
    add start to visited

    while queue is not empty
        node = dequeue
        process(node)
        for each neighbor of node
            if neighbor not in visited
                add neighbor to visited
                enqueue neighbor
\`\`\`

**For Shortest Path:**
\`\`\`
procedure BFS_ShortestPath(graph, start, target)
    visited = {start}
    queue = [(start, [start])]

    while queue
        node, path = dequeue
        if node == target
            return path
        for neighbor of node
            if neighbor not in visited
                visited.add(neighbor)
                enqueue (neighbor, path + [neighbor])
    return None  // not reachable
\`\`\`

**BFS on a Tree (Level-order):**
\`\`\`
        1
       / \\
      2   3
     / \\   \\
    4   5   6

BFS: [1] → [2, 3] → [4, 5, 6]
Result: 1, 2, 3, 4, 5, 6
\`\`\``,
      keyPoints: [
        'Queue + visited set is the pattern',
        'Shortest path: track the path in the queue',
        'Level-order tree traversal is BFS',
      ],
    },
    {
      id: 'complexity',
      title: '4. Complexity Analysis',
      icon: '📊',
      description: 'Time & space complexity',
      content: `**Time Complexity:** O(V + E)
- V = number of vertices (nodes)
- E = number of edges
- Every vertex is enqueued/dequeued once: O(V)
- Every edge is examined once: O(E)

**Space Complexity:** O(V)
- Queue can hold up to V nodes
- Visited set stores V nodes

**BFS vs DFS Comparison:**

| Feature | BFS | DFS |
|---------|-----|-----|
| Data structure | Queue | Stack |
| Order | Level-by-level | Deep-first |
| Shortest path | Yes (unweighted) | No |
| Space | O(V) | O(V) |
| Time | O(V + E) | O(V + E) |
| Use case | Shortest path, levels | Topological sort, cycles |

**When to Use BFS:**
- Finding shortest path in unweighted graph
- Level-order traversal
- Finding all nodes within k distance
- Checking bipartiteness
- Social network connections`,
      keyPoints: [
        'Time O(V + E) — visits every vertex and edge once',
        'Space O(V) — queue and visited set',
        'BFS for shortest path, DFS for exhaustive search',
      ],
    },
    {
      id: 'code',
      title: '5. Implementation',
      icon: '💻',
      description: 'Complete code walkthrough',
      content: `**Python Implementation:**

\`\`\`python
from collections import deque

def bfs(graph, start):
    visited = set()
    queue = deque([start])
    visited.add(start)
    order = []

    while queue:
        node = queue.popleft()
        order.append(node)
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    return order
\`\`\`

**Line-by-line:**
- **Line 4:** Set to track visited nodes
- **Line 5:** Queue initialized with start node
- **Line 6:** Mark start as visited immediately
- **Line 9:** Process nodes while queue is not empty
- **Line 10:** Dequeue the front node
- **Lines 12-15:** Enqueue all unvisited neighbors

**Shortest Path Version:**
\`\`\`python
def bfs_shortest_path(graph, start, target):
    visited = {start}
    queue = deque([(start, [start])])
    while queue:
        node, path = queue.popleft()
        if node == target:
            return path
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, path + [neighbor]))
    return None
\`\`\``,
      keyPoints: [
        'deque for efficient O(1) popleft',
        'Mark visited BEFORE enqueuing (not after dequeuing)',
        'Shortest path tracks full path in queue tuples',
      ],
    },
    {
      id: 'practice',
      title: '6. Practice',
      icon: '✏️',
      description: 'Try it yourself',
      content: `**Your Turn!**

Open the **Sandbox** and implement BFS.

**Checklist:**
- ☐ Represent a graph as an adjacency list (dictionary)
- ☐ Implement basic BFS traversal
- ☐ Implement shortest path finder
- ☐ Handle disconnected graphs
- ☐ Implement level-order tree traversal

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
- BFS from A → \`['A', 'B', 'C', 'D', 'E', 'F']\`
- Shortest path A to F → \`['A', 'C', 'F']\` (length 2)
- BFS from D → \`['D', 'B', 'A', 'E', 'C', 'F']\`

**Challenges:**
1. Basic — BFS traversal
2. Intermediate — shortest path
3. Advanced — check if graph is bipartite
4. Expert — find all connected components`,
      keyPoints: [
        'Use adjacency list representation',
        'Test with different start nodes',
        'Try finding shortest paths between node pairs',
      ],
    },
  ],
};

export default bfs;
