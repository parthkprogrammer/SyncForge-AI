import type { Note } from '../types/note.types';

export const mockLinkedProblems = [
  { id: 'prob-001', title: 'Two Sum' },
  { id: 'prob-002', title: 'Binary Search' },
  { id: 'prob-003', title: 'Valid Parentheses' },
  { id: 'prob-004', title: 'Merge Two Sorted Lists' },
  { id: 'prob-005', title: 'Course Schedule' },
  { id: 'prob-006', title: 'Kth Largest Element' },
  { id: 'prob-007', title: 'Maximum Subarray' },
  { id: 'prob-008', title: 'Linked List Cycle' },
  { id: 'prob-009', title: 'LRU Cache' },
];

export const initialMockNotes = (): Note[] => [
  {
    id: 'note-001',
    title: 'Two Sum - HashMap Approach',
    content: `### Two Sum Optimal Design

To solve Two Sum in O(N) runtime instead of O(N^2) double loops, use a HashMap to store value-to-index pairs:

1. Calculate complement: \`target - nums[i]\`
2. Check if map contains complement:
   * **Yes:** return indices.
   * **No:** insert current element with its index.

This is the standard entry-level array optimization template.`,
    problemId: 'prob-001',
    problemTitle: 'Two Sum',
    tags: ['Arrays', 'HashMap', 'Easy'],
    isFavorite: true,
    revisionStatus: 'mastered',
    createdAt: '2026-07-28T09:00:00.000Z',
    updatedAt: '2026-07-29T10:15:00.000Z',
  },
  {
    id: 'note-002',
    title: 'Binary Search Template',
    content: `### Standard Binary Search Template

Avoid index out of bound issues and infinite loops using this template:

\`\`\`java
int left = 0;
int right = nums.length - 1;
while (left <= right) {
    int mid = left + (right - left) / 2; // Prevents overflow
    if (nums[mid] == target) return mid;
    else if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
}
return -1;
\`\`\`

Always test with single-element arrays.`,
    problemId: 'prob-002',
    problemTitle: 'Binary Search',
    tags: ['Binary Search', 'Algorithms', 'Important'],
    isFavorite: true,
    revisionStatus: 'review',
    createdAt: '2026-07-25T11:00:00.000Z',
    updatedAt: '2026-07-25T11:30:00.000Z',
  },
  {
    id: 'note-003',
    title: 'Sliding Window Pattern',
    content: `### Sliding Window Framework

Commonly used to solve subarray/substring search queries:

1. Maintain two pointers: \`left\` and \`right\` expanding the window.
2. If window state violates requirements, shrink \`left\` until valid again.
3. Keep track of maximum/minimum lengths.

*Time Complexity:* O(N) linear scan.`,
    tags: ['Sliding Window', 'Arrays', 'Review'],
    isFavorite: false,
    revisionStatus: 'learning',
    createdAt: '2026-07-27T14:00:00.000Z',
    updatedAt: '2026-07-27T14:10:00.000Z',
  },
  {
    id: 'note-004',
    title: 'Dynamic Programming Basics',
    content: `### Dynamic Programming Guidelines

When starting with DP, map your subproblems recursively:

* **Overlapping Subproblems:** Subproblems are calculated repeatedly.
* **Optimal Substructure:** Optimal solution contains optimal sub-solutions.

Always write out the state transition formula first (e.g. \`dp[i] = dp[i-1] + dp[i-2]\`).`,
    tags: ['Dynamic Programming', 'Concepts'],
    isFavorite: false,
    revisionStatus: 'new',
    createdAt: '2026-07-29T16:00:00.000Z',
    updatedAt: '2026-07-29T16:00:00.000Z',
  },
  {
    id: 'note-005',
    title: 'BFS vs DFS traversal guide',
    content: `### BFS and DFS Quick Reminders

* **Breadth-First Search (BFS):** Uses a Queue (FIFO). Best for shortest path on unweighted graphs.
* **Depth-First Search (DFS):** Uses recursion or a Stack (LIFO). Best for search traversals and connectivity checking.

*Time Complexity:* O(V + E) where V is vertices, E is edges.`,
    tags: ['Graphs', 'Algorithms', 'BFS', 'DFS'],
    isFavorite: true,
    revisionStatus: 'mastered',
    createdAt: '2026-07-22T08:30:00.000Z',
    updatedAt: '2026-07-24T12:00:00.000Z',
  },
  {
    id: 'note-006',
    title: 'Java PriorityQueue Notes',
    content: `### Java Heap / PriorityQueue Reminders

By default, Java's \`PriorityQueue\` behaves as a **Min-Heap**:

\`\`\`java
// Min-Heap (default)
PriorityQueue<Integer> minHeap = new PriorityQueue<>();

// Max-Heap override
PriorityQueue<Integer> maxHeap = new PriorityQueue<>((a, b) -> b - a);
\`\`\`

Add takes O(log N). Peek takes O(1) constant time.`,
    problemId: 'prob-006',
    problemTitle: 'Kth Largest Element',
    tags: ['Heaps', 'Java', 'Data Structures'],
    isFavorite: false,
    revisionStatus: 'review',
    createdAt: '2026-07-30T10:00:00.000Z',
    updatedAt: '2026-07-30T10:15:00.000Z',
  },
  {
    id: 'note-007',
    title: 'Linked List Fast & Slow Pointer',
    content: `### Tortoise and Hare Cycle Detection

To find loops inside a Linked List:
1. Declare slow pointer (moves 1 node) and fast pointer (moves 2 nodes).
2. If fast pointer hits null, there is no loop.
3. If fast pointer meets slow pointer, a loop is detected.

To find cycle start: reset slow pointer to head, then move both pointers 1 node at a time until they meet.`,
    problemId: 'prob-008',
    problemTitle: 'Linked List Cycle',
    tags: ['Linked List', 'Two Pointers'],
    isFavorite: false,
    revisionStatus: 'learning',
    createdAt: '2026-07-26T11:00:00.000Z',
    updatedAt: '2026-07-26T11:15:00.000Z',
  },
  {
    id: 'note-008',
    title: "Kadane's Algorithm maximum subarray",
    content: `### Kadane's Local Subarray Maximizer

Find the contiguous subarray with the largest sum in O(N) linear scan:

\`\`\`java
int maxSoFar = nums[0];
int currMax = nums[0];
for (int i = 1; i < nums.length; i++) {
    currMax = Math.max(nums[i], currMax + nums[i]);
    maxSoFar = Math.max(maxSoFar, currMax);
}
return maxSoFar;
\`\`\`

Very useful for array sum templates.`,
    problemId: 'prob-007',
    problemTitle: 'Maximum Subarray',
    tags: ['Arrays', 'Dynamic Programming'],
    isFavorite: true,
    revisionStatus: 'mastered',
    createdAt: '2026-07-28T15:00:00.000Z',
    updatedAt: '2026-07-28T15:10:00.000Z',
  },
  {
    id: 'note-009',
    title: 'Tree Traversal Patterns',
    content: `### DFS Tree Traversals

Three standard recursive patterns to visit nodes in Binary Trees:

* **Pre-order:** Root -> Left -> Right
* **In-order:** Left -> Root -> Right (outputs sorted elements on BSTs)
* **Post-order:** Left -> Right -> Root`,
    tags: ['Trees', 'Binary Tree', 'DFS'],
    isFavorite: false,
    revisionStatus: 'review',
    createdAt: '2026-07-24T09:00:00.000Z',
    updatedAt: '2026-07-24T09:00:00.000Z',
  },
  {
    id: 'note-010',
    title: 'Graph Cycle Detection',
    content: `### Cycle Detection in Directed Graphs

Use DFS with a recursion stack tracker array:

1. Maintain standard \`visited\` state.
2. Maintain \`inStack\` recursion state.
3. If node is already \`inStack\`, cycle exists.
4. Backtrack: remove from \`inStack\` when exiting.`,
    problemId: 'prob-005',
    problemTitle: 'Course Schedule',
    tags: ['Graphs', 'DFS', 'Algorithms'],
    isFavorite: false,
    revisionStatus: 'learning',
    createdAt: '2026-07-28T11:00:00.000Z',
    updatedAt: '2026-07-29T10:00:00.000Z',
  },
  {
    id: 'note-011',
    title: 'LRU Cache Design and Structure',
    content: `### Least Recently Used Cache

Optimal O(1) operations require two combined structures:

1. **HashMap:** Maps keys to Double-Linked List nodes (gives O(1) lookup).
2. **Double-Linked List:** Nodes arranged in order of access (gives O(1) updates).

Move accessed nodes to head. Evict tail nodes on capacity overrun.`,
    problemId: 'prob-009',
    problemTitle: 'LRU Cache',
    tags: ['Data Structures', 'HashMap', 'Design'],
    isFavorite: true,
    revisionStatus: 'review',
    createdAt: '2026-07-31T09:00:00.000Z',
    updatedAt: '2026-07-31T09:30:00.000Z',
  },
  {
    id: 'note-012',
    title: "Dijkstra's Algorithm shortest path",
    content: `### Dijkstra's Shortest Path Framework

Resolves single-source shortest path problems on weighted graphs:

* Uses a Min-Heap (PriorityQueue) sorting nodes by distance.
* Maintain a \`dist\` array filled with infinity.
* Update neighbors: if \`dist[curr] + weight < dist[next]\`, update and add to PriorityQueue.

*Constraint:* Weights must be non-negative.`,
    tags: ['Graphs', 'Shortest Path', 'Algorithms'],
    isFavorite: false,
    revisionStatus: 'new',
    createdAt: '2026-07-31T14:00:00.000Z',
    updatedAt: '2026-08-01T10:00:00.000Z',
  },
];
