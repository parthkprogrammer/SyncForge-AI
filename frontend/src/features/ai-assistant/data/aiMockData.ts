import type { Conversation, SuggestedPrompt } from '../types/ai.types';

export const mockSuggestedPrompts: SuggestedPrompt[] = [
  { id: 'sp-001', label: 'Explain Code', prompt: 'Explain my latest Java solution' },
  { id: 'sp-002', label: 'Time Complexity', prompt: 'Analyze the time complexity of my solution' },
  { id: 'sp-003', label: 'Weak Topics', prompt: 'Suggest problems based on my weak topics' },
  { id: 'sp-004', label: 'Dynamic Programming', prompt: 'Help me understand Dynamic Programming' },
  { id: 'sp-005', label: 'Binary Search Notes', prompt: 'Generate revision notes for Binary Search' },
  { id: 'sp-006', label: 'Optimize Two Sum', prompt: 'How can I optimize my Two Sum solution?' },
];

export const initialMockConversations = (): Conversation[] => [
  {
    id: 'conv-001',
    title: 'Two Sum Optimization',
    createdAt: '2026-08-01T10:00:00.000Z',
    updatedAt: '2026-08-01T10:05:00.000Z',
    messages: [
      {
        id: 'msg-001',
        conversationId: 'conv-001',
        role: 'user',
        content: 'How can I optimize my Two Sum solution?',
        createdAt: '10:00 AM',
        status: 'complete',
      },
      {
        id: 'msg-002',
        conversationId: 'conv-001',
        role: 'assistant',
        content: `### Two Sum Optimization

To optimize the Two Sum problem from O(N^2) to O(N), you can employ a **Hash Map** lookup technique.

#### 1. Optimization Approach
By keeping track of each number's index as we iterate through the array, we can check if the complement (\`target - nums[i]\`) exists in our Hash Map in O(1) constant lookup time.

#### 2. Java Code Example
Here is the optimal implementation in Java:

\`\`\`java
class Solution {
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
}
\`\`\`

#### 3. Complexity Analysis
*   **Time Complexity:** O(N) since we perform a single pass traversal over the array.
*   **Space Complexity:** O(N) to store values and their indices inside the Hash Map.`,
        createdAt: '10:01 AM',
        status: 'complete',
      },
    ],
  },
  {
    id: 'conv-002',
    title: 'Dynamic Programming Help',
    createdAt: '2026-07-30T14:00:00.000Z',
    updatedAt: '2026-07-30T14:02:00.000Z',
    messages: [
      {
        id: 'msg-003',
        conversationId: 'conv-002',
        role: 'user',
        content: 'Help me understand Dynamic Programming principles.',
        createdAt: '2:00 PM',
        status: 'complete',
      },
      {
        id: 'msg-004',
        conversationId: 'conv-002',
        role: 'assistant',
        content: `### Dynamic Programming Principles

Dynamic Programming (DP) is a method for solving complex problems by breaking them down into simpler subproblems. It is used when subproblems overlap and have optimal substructures.

#### Two Main Approaches:
1.  **Top-Down (Memoization):** Resolve recursion parameters by caching subproblem values.
2.  **Bottom-Up (Tabulation):** Start resolving smaller subproblems and fill tabular grids.

#### Example: Fibonacci Series (Bottom-Up in Java)
\`\`\`java
public int fib(int n) {
    if (n <= 1) return n;
    int[] dp = new int[n + 1];
    dp[0] = 0;
    dp[1] = 1;
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}
\`\`\``,
        createdAt: '2:02 PM',
        status: 'complete',
      },
    ],
  },
];
