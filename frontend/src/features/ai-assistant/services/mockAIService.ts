import type { AIMode } from '../types/ai.types';

export const generateMockResponse = (prompt: string, mode: AIMode): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const q = prompt.toLowerCase();
      
      if (q.includes('two sum')) {
        resolve(`### Two Sum Analysis & Optimization

Here is an analysis matching your query regarding **Two Sum** under **${mode.toUpperCase()}** mode:

#### 1. Optimal Solution
Use a single-pass hash lookup to resolve search elements in linear O(N) runtime.

\`\`\`java
public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (map.containsKey(complement)) {
            return new int[] { map.get(complement), i };
        }
        map.put(nums[i], i);
    }
    return new int[] {};
}
\`\`\`

#### 2. Complexity Details
*   **Time Complexity:** O(N)
*   **Space Complexity:** O(N)`);
      } else if (q.includes('dynamic programming') || q.includes('dp')) {
        resolve(`### Dynamic Programming Synthesis

Here is a summary on **Dynamic Programming** for **${mode.toUpperCase()}** mode:

Dynamic Programming solves problems with overlapping subproblems.

#### Memoization vs Tabulation
1.  **Memoization (Top-down):** Cache recursive calls dynamically.
2.  **Tabulation (Bottom-up):** Iterate through table boundaries.

\`\`\`java
// Tabulation grid logic for Fibonacci
public int fib(int n) {
    if (n <= 1) return n;
    int[] dp = new int[n + 1];
    dp[0] = 0; dp[1] = 1;
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    return dp[n];
}
\`\`\``);
      } else if (q.includes('complexity') || q.includes('time') || q.includes('space')) {
        resolve(`### Complexity Insights

Under **${mode.toUpperCase()}** mode, here is a quick guide on complexity evaluation:

*   **O(1) Constant:** Hash map lookups, math formulas.
*   **O(log N) Logarithmic:** Binary searches, tree divisions.
*   **O(N) Linear:** Single passes through arrays, traversals.
*   **O(N log N):** Optimal sorts (merge sort, heap sort).
*   **O(N^2) Quadratic:** Double nested loops, brute-force algorithms.

\`\`\`typescript
// Binary Search O(log N) example
function binarySearch(arr: number[], val: number): number {
    let l = 0, r = arr.length - 1;
    while (l <= r) {
        let mid = Math.floor((l + r) / 2);
        if (arr[mid] === val) return mid;
        if (arr[mid] < val) l = mid + 1;
        else r = mid - 1;
    }
    return -1;
}
\`\`\``);
      } else {
        resolve(`### SyncForge AI Response

Under **${mode.toUpperCase()}** mode, I received your query:
> "${prompt}"

This is a simulated AI response. Once connected to the Spring Boot REST API, SyncForge AI will use RAG (Retrieval-Augmented Generation) index matching on your synced coding history to provide custom optimization analysis.

#### Quick Coding Tips:
*   Use hash maps for fast lookups.
*   Always check boundary indices.
*   Optimize O(N^2) brute-force loops using sliding windows or two pointers.

\`\`\`typescript
// Hello from SyncForge AI companion!
console.log("SyncForge AI ready to optimize your code!");
\`\`\``);
      }
    }, 1800); // Simulate API latency
  });
};
