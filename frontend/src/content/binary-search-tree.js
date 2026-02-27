const binarySearchTree = {
  slug: 'binary-search-tree',
  title: 'Binary Search Tree',
  defaultArray: [50, 30, 70, 20, 40, 60, 80],
  code: {
    language: 'python',
    code: `class Node:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None

class BST:
    def __init__(self):
        self.root = None

    def insert(self, key):
        self.root = self._insert(self.root, key)

    def _insert(self, node, key):
        if not node:
            return Node(key)
        if key < node.key:
            node.left = self._insert(node.left, key)
        elif key > node.key:
            node.right = self._insert(node.right, key)
        return node

    def inorder(self, node=None, first=True):
        if first:
            node = self.root
        result = []
        if node:
            result += self.inorder(node.left, False)
            result.append(node.key)
            result += self.inorder(node.right, False)
        return result

bst = BST()
for val in [50, 30, 70, 20, 40, 60, 80]:
    bst.insert(val)
print("Inorder:", bst.inorder())`,
  },
  steps: [
    {
      id: 'intro',
      title: '1. What is a BST?',
      icon: '📚',
      description: 'Introduction to the data structure',
      content: `A Binary Search Tree (BST) is a hierarchical data structure where each node has at most two children. For every node, **all left descendants are smaller** and **all right descendants are larger**.

**Why learn BSTs?**
- O(log n) search, insert, delete (on average)
- Keeps data sorted dynamically
- Foundation for balanced trees (AVL, Red-Black)
- Used in databases, file systems, autocomplete

**Real-world analogy:**
A decision tree — at each point you make a yes/no decision (go left or right) until you find what you're looking for.

**BST Property:**
\`\`\`
        50
       /  \\
      30   70
     / \\   / \\
    20 40 60 80

For node 50: left subtree (20,30,40) < 50 < right subtree (60,70,80) ✔
\`\`\``,
      keyPoints: [
        'Left child < parent < right child',
        'O(log n) average operations',
        'Foundation for balanced tree structures',
      ],
    },
    {
      id: 'intuition',
      title: '2. How Does It Work?',
      icon: '💡',
      description: 'Understanding the structure',
      content: `**The Core Idea:**
At every node, use the BST property to decide whether to go left or right. This eliminates half the tree at each step — just like Binary Search on arrays.

**Searching for 40:**
\`\`\`
        50      ← 40 < 50, go left
       /
      30       ← 40 > 30, go right
       \\
       40      ← Found! ✔
\`\`\`
Only 3 comparisons instead of scanning all 7 nodes.

**Inserting 45:**
\`\`\`
        50      ← 45 < 50, go left
       /  \\
      30   70   ← 45 > 30, go right
     / \\
    20  40      ← 45 > 40, go right
         \\
         45     ← Insert here (null position)
\`\`\`

**Inorder Traversal gives sorted order:**
Left → Root → Right
20, 30, 40, 45, 50, 60, 70, 80 ✔`,
      keyPoints: [
        'Compare and go left or right at each node',
        'Insert at the first null position found',
        'Inorder traversal produces sorted output',
      ],
    },
    {
      id: 'algorithm',
      title: '3. Core Operations',
      icon: '⚙️',
      description: 'Detailed breakdown of operations',
      content: `**Search:**
\`\`\`
procedure search(node, key)
    if node is null or node.key == key
        return node
    if key < node.key
        return search(node.left, key)
    else
        return search(node.right, key)
\`\`\`

**Insert:**
\`\`\`
procedure insert(node, key)
    if node is null
        return new Node(key)
    if key < node.key
        node.left = insert(node.left, key)
    else if key > node.key
        node.right = insert(node.right, key)
    return node
\`\`\`

**Delete (three cases):**
1. **No children (leaf):** Simply remove the node
2. **One child:** Replace node with its child
3. **Two children:** Find the **inorder successor** (smallest in right subtree), copy its value, delete the successor

**Traversals:**
- **Inorder** (Left, Root, Right) → sorted order
- **Preorder** (Root, Left, Right) → copy tree
- **Postorder** (Left, Right, Root) → delete tree`,
      keyPoints: [
        'Search: compare and recurse left or right',
        'Delete with two children uses inorder successor',
        'Three traversal orders for different use cases',
      ],
    },
    {
      id: 'complexity',
      title: '4. Complexity Analysis',
      icon: '📊',
      description: 'Time & space complexity',
      content: `**Operation Complexities:**

| Operation | Average | Worst |
|-----------|---------|-------|
| Search | O(log n) | O(n) |
| Insert | O(log n) | O(n) |
| Delete | O(log n) | O(n) |
| Traversal | O(n) | O(n) |

**Worst case O(n)?**
When the tree is **skewed** (degenerate) — like a linked list:
\`\`\`
Balanced:        Skewed:
    50            10
   /  \\             \\
  30   70           20
 / \\   / \\            \\
20 40 60 80           30
                        \\
Height: log n           40

                    Height: n
\`\`\`

**Space Complexity:** O(n) for storage, O(h) for recursion stack where h is the tree height.

**Solution for worst case:** Use self-balancing BSTs:
- **AVL Tree** — strictly balanced (height diff ≤ 1)
- **Red-Black Tree** — approximately balanced
- Both guarantee O(log n) for all operations`,
      keyPoints: [
        'O(log n) average, O(n) worst case',
        'Worst case happens with skewed insertion order',
        'Balanced variants guarantee O(log n)',
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
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None

class BST:
    def __init__(self):
        self.root = None

    def insert(self, key):
        self.root = self._insert(self.root, key)

    def _insert(self, node, key):
        if not node:
            return Node(key)
        if key < node.key:
            node.left = self._insert(node.left, key)
        elif key > node.key:
            node.right = self._insert(node.right, key)
        return node

    def search(self, key):
        return self._search(self.root, key)

    def _search(self, node, key):
        if not node or node.key == key:
            return node
        if key < node.key:
            return self._search(node.left, key)
        return self._search(node.right, key)

    def inorder(self):
        result = []
        self._inorder(self.root, result)
        return result

    def _inorder(self, node, result):
        if node:
            self._inorder(node.left, result)
            result.append(node.key)
            self._inorder(node.right, result)
\`\`\`

**Key Points:**
- Public methods wrap private recursive helpers
- Insert returns the (possibly new) node for re-linking
- Inorder collects values in sorted order`,
      keyPoints: [
        'Public/private method pattern for clean API',
        'Recursive insert returns updated subtree root',
        'Inorder traversal for sorted output',
      ],
    },
    {
      id: 'practice',
      title: '6. Practice',
      icon: '✏️',
      description: 'Try it yourself',
      content: `**Your Turn!**

Open the **Sandbox** and implement a Binary Search Tree.

**Checklist:**
- ☐ Implement Node class (key, left, right)
- ☐ Implement insert
- ☐ Implement search
- ☐ Implement inorder traversal
- ☐ Implement delete (all three cases)
- ☐ Implement preorder and postorder

**Test Cases:**
- Insert 50, 30, 70, 20, 40 → inorder → \`[20, 30, 40, 50, 70]\`
- Search 40 → Found
- Search 99 → Not Found
- Delete 30 (two children) → inorder → \`[20, 40, 50, 70]\`

**Challenges:**
1. Basic — insert and inorder traversal
2. Intermediate — search and delete
3. Advanced — find height, check if valid BST
4. Expert — find the Lowest Common Ancestor (LCA)`,
      keyPoints: [
        'Start with insert and inorder',
        'Delete is the hardest — handle all three cases',
        'Validate your tree with inorder traversal',
      ],
    },
  ],
};

export default binarySearchTree;
