import type { Problem } from '../types/problem.types';

export const mockProblems: Problem[] = [
  {
    id: 'prob-001',
    platformProblemId: '1',
    title: 'Two Sum',
    slug: 'two-sum',
    platform: 'LeetCode',
    difficulty: 'Easy',
    topics: ['Arrays', 'Hash Table'],
    language: 'Java',
    status: 'Accepted',
    syncStatus: 'Synced',
    solvedAt: '2026-07-28',
    runtime: '1 ms',
    memory: '42.8 MB',
    repository: 'syncforge-solutions',
    solutionPath: 'leetcode/TwoSum.java',
    solutionCode: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        throw new IllegalArgumentException("No two sum solution");
    }
}`,
    aiExplanation: 'The optimal solution utilizes a Hash Map to find the complement in O(n) time complexity and O(n) space complexity. A single pass loop checks if the target complement is already present in the map.',
    personalNotes: 'Remember to handle duplicate entries in the array. Map inserts should map value to index.',
  },
  {
    id: 'prob-002',
    platformProblemId: '3',
    title: 'Longest Substring Without Repeating Characters',
    slug: 'longest-substring-without-repeating-characters',
    platform: 'LeetCode',
    difficulty: 'Medium',
    topics: ['Hash Table', 'String', 'Sliding Window'],
    language: 'TypeScript',
    status: 'Accepted',
    syncStatus: 'Synced',
    solvedAt: '2026-07-29',
    runtime: '68 ms',
    memory: '47.5 MB',
    repository: 'syncforge-solutions',
    solutionPath: 'leetcode/LongestSubstring.ts',
    solutionCode: `function lengthOfLongestSubstring(s: string): number {
    const charMap = new Map<string, number>();
    let maxLength = 0;
    let left = 0;
    
    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        if (charMap.has(char)) {
            left = Math.max(charMap.get(char)! + 1, left);
        }
        charMap.set(char, right);
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}`,
    aiExplanation: 'Utilizes a Sliding Window pattern with two pointers (left and right). A map stores character index frequencies. Time complexity is O(n), and space complexity is O(min(m, n)) where m is size of the alphabet.',
    personalNotes: 'Be careful with left pointer updates. Use Math.max to prevent left pointer from skipping backward.',
  },
  {
    id: 'prob-003',
    platformProblemId: '146',
    title: 'LRU Cache',
    slug: 'lru-cache',
    platform: 'LeetCode',
    difficulty: 'Hard',
    topics: ['Hash Table', 'Linked List', 'Design'],
    language: 'C++',
    status: 'Accepted',
    syncStatus: 'Synced',
    solvedAt: '2026-07-30',
    runtime: '84 ms',
    memory: '165.2 MB',
    repository: 'syncforge-solutions',
    solutionPath: 'leetcode/LRUCache.cpp',
    solutionCode: `#include <unordered_map>
using namespace std;

class LRUCache {
private:
    struct Node {
        int key;
        int val;
        Node* prev;
        Node* next;
        Node(int k, int v) : key(k), val(v), prev(nullptr), next(nullptr) {}
    };
    
    int capacity;
    unordered_map<int, Node*> map;
    Node* head = new Node(-1, -1);
    Node* tail = new Node(-1, -1);
    
    void addNode(Node* node) {
        node->next = head->next;
        node->prev = head;
        head->next->prev = node;
        head->next = node;
    }
    
    void removeNode(Node* node) {
        node->prev->next = node->next;
        node->next->prev = node->prev;
    }
    
public:
    LRUCache(int cap) : capacity(cap) {
        head->next = tail;
        tail->prev = head;
    }
    
    int get(int key) {
        if (map.find(key) == map.end()) return -1;
        Node* node = map[key];
        removeNode(node);
        addNode(node);
        return node->val;
    }
    
    void put(int key, int value) {
        if (map.find(key) != map.end()) {
            Node* node = map[key];
            node->val = value;
            removeNode(node);
            addNode(node);
        } else {
            if (map.size() == capacity) {
                Node* lru = tail->prev;
                map.erase(lru->key);
                removeNode(lru);
                delete lru;
            }
            Node* node = new Node(key, value);
            map[key] = node;
            addNode(node);
        }
    }
};`,
    aiExplanation: 'The LRU Cache is designed using a Doubly Linked List and a Hash Map. DLL maintains usage order, while Map offers O(1) lookup. Both get and put are executed in O(1) constant time.',
    personalNotes: 'Watch for head and tail dummy node reference updates. Keep capacity constraints in check.',
  },
  {
    id: 'prob-004',
    platformProblemId: '23',
    title: 'Merge k Sorted Lists',
    slug: 'merge-k-sorted-lists',
    platform: 'LeetCode',
    difficulty: 'Hard',
    topics: ['Linked List', 'Divide and Conquer', 'Heap'],
    language: 'Python',
    status: 'Accepted',
    syncStatus: 'Pending',
    solvedAt: '2026-07-31',
    runtime: '98 ms',
    memory: '18.4 MB',
    repository: 'syncforge-solutions',
    solutionPath: 'leetcode/MergeKSortedLists.py',
    solutionCode: `import heapq

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
        heap = []
        for i, lst in enumerate(lists):
            if lst:
                heapq.heappush(heap, (lst.val, i, lst))
                
        dummy = ListNode(0)
        curr = dummy
        
        while heap:
            val, idx, node = heapq.heappop(heap)
            curr.next = ListNode(val)
            curr = curr.next
            if node.next:
                heapq.heappush(heap, (node.next.val, idx, node.next))
                
        return dummy.next`,
    aiExplanation: 'Employs a Min-Heap (priority queue) of size k. Nodes are retrieved from heap, sorted, and replacement nodes added. Time complexity is O(N log k) where N is total node count and k is number of lists.',
    personalNotes: 'Use index parameter in heap tuple values to prevent list node object comparison errors in Python 3.',
  },
  {
    id: 'prob-005',
    platformProblemId: '206',
    title: 'Reverse Linked List',
    slug: 'reverse-linked-list',
    platform: 'LeetCode',
    difficulty: 'Easy',
    topics: ['Linked List', 'Recursion'],
    language: 'Go',
    status: 'Accepted',
    syncStatus: 'Failed',
    solvedAt: '2026-08-01',
    runtime: '0 ms',
    memory: '2.5 MB',
    repository: 'syncforge-solutions',
    solutionPath: 'leetcode/ReverseList.go',
    solutionCode: `package main

type ListNode struct {
    Val  int
    Next *ListNode
}

func reverseList(head *ListNode) *ListNode {
    var prev *ListNode
    curr := head
    for curr != nil {
        nextTemp := curr.Next
        curr.Next = prev
        prev = curr
        curr = nextTemp
    }
    return prev
}`,
    aiExplanation: 'An iterative reversal of list pointers. Traverses nodes sequentially, mapping each next element to its predecessor. Executes in O(n) runtime and O(1) space.',
    personalNotes: 'Classic pointer swap problem. Keep temp node pointer clean.',
  },
  {
    id: 'prob-006',
    platformProblemId: '704',
    title: 'Binary Search',
    slug: 'binary-search',
    platform: 'LeetCode',
    difficulty: 'Easy',
    topics: ['Arrays', 'Binary Search'],
    language: 'Rust',
    status: 'Accepted',
    syncStatus: 'Synced',
    solvedAt: '2026-07-20',
    runtime: '4 ms',
    memory: '2.8 MB',
    repository: 'syncforge-solutions',
    solutionPath: 'leetcode/BinarySearch.rs',
    solutionCode: `impl Solution {
    pub fn search(nums: Vec<i32>, target: i32) -> i32 {
        let mut left = 0;
        let mut right = nums.len() as i32 - 1;
        
        while left <= right {
            let mid = left + (right - left) / 2;
            if nums[mid as usize] == target {
                return mid;
            } else if nums[mid as usize] < target {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        -1
    }
}`,
    aiExplanation: 'Applies binary search logic over sorted arrays. Shrinks search space by half in each iteration, resulting in O(log n) time complexity.',
    personalNotes: 'Use left + (right-left)/2 to prevent integer overflow bounds.',
  },
  {
    id: 'prob-007',
    platformProblemId: 'cf-158a',
    title: 'Next Round',
    slug: 'next-round',
    platform: 'Codeforces',
    difficulty: 'Easy',
    topics: ['Arrays', 'Implementation'],
    language: 'C++',
    status: 'Accepted',
    syncStatus: 'Synced',
    solvedAt: '2026-07-15',
    runtime: '30 ms',
    memory: '1.2 MB',
    repository: 'syncforge-solutions',
    solutionPath: 'codeforces/NextRound.cpp',
    solutionCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, k;
    if (cin >> n >> k) {
        vector<int> a(n);
        for (int i = 0; i < n; ++i) {
            cin >> a[i];
        }
        int threshold = a[k - 1];
        int count = 0;
        for (int i = 0; i < n; ++i) {
            if (a[i] >= threshold && a[i] > 0) {
                count++;
            }
        }
        cout << count << endl;
    }
    return 0;
}`,
    aiExplanation: 'Iterates through array elements and compares each index score to the index threshold k. Increments outputs if conditions hold.',
    personalNotes: 'Threshold index is 0-indexed, so compare element scores against index k-1.',
  },
  {
    id: 'prob-008',
    platformProblemId: 'hr-sock-merchant',
    title: 'Sales by Match',
    slug: 'sales-by-match',
    platform: 'HackerRank',
    difficulty: 'Easy',
    topics: ['Arrays', 'Hash Table'],
    language: 'Python',
    status: 'Accepted',
    syncStatus: 'Synced',
    solvedAt: '2026-07-18',
    runtime: '22 ms',
    memory: '7.8 MB',
    repository: 'syncforge-solutions',
    solutionPath: 'hackerrank/SockMerchant.py',
    solutionCode: `def sockMerchant(n, ar):
    socks = {}
    pairs = 0
    for sock in ar:
        if sock in socks:
            socks[sock] += 1
        else:
            socks[sock] = 1
            
        if socks[sock] % 2 == 0:
            pairs += 1
            
    return pairs`,
    aiExplanation: 'Applies frequency counts mapping. Divides element occurrences by 2 to compute matching pairs.',
    personalNotes: 'A set can also be used: insert if not present, pop and increment counter if present.',
  },
  {
    id: 'prob-009',
    platformProblemId: '15',
    title: '3Sum',
    slug: '3sum',
    platform: 'LeetCode',
    difficulty: 'Medium',
    topics: ['Arrays', 'Two Pointers', 'Sorting'],
    language: 'Go',
    status: 'Accepted',
    syncStatus: 'Synced',
    solvedAt: '2026-07-22',
    runtime: '42 ms',
    memory: '7.4 MB',
    repository: 'syncforge-solutions',
    solutionPath: 'leetcode/ThreeSum.go',
    solutionCode: `package main
import "sort"

func threeSum(nums []int) [][]int {
    sort.Ints(nums)
    res := [][]int{}
    
    for i := 0; i < len(nums)-2; i++ {
        if i > 0 && nums[i] == nums[i-1] {
            continue
        }
        l, r := i+1, len(nums)-1
        for l < r {
            sum := nums[i] + nums[l] + nums[r]
            if sum == 0 {
                res = append(res, []int{nums[i], nums[l], nums[r]})
                for l < r && nums[l] == nums[l+1] {
                    l++
                }
                for l < r && nums[r] == nums[r-1] {
                    r--
                }
                l++
                r--
            } else if sum < 0 {
                l++
            } else {
                r--
            }
        }
    }
    return res
}`,
    aiExplanation: 'Sorts the array and applies a Two-Pointer technique. Avoids duplicates by skipping identical elements inside nested loops.',
    personalNotes: 'Remember to check sorted constraints. Skip identical elements to avoid duplicates.',
  },
  {
    id: 'prob-010',
    platformProblemId: '53',
    title: 'Maximum Subarray',
    slug: 'maximum-subarray',
    platform: 'LeetCode',
    difficulty: 'Medium',
    topics: ['Arrays', 'Divide and Conquer', 'Dynamic Programming'],
    language: 'Java',
    status: 'Accepted',
    syncStatus: 'Synced',
    solvedAt: '2026-07-25',
    runtime: '1 ms',
    memory: '51.3 MB',
    repository: 'syncforge-solutions',
    solutionPath: 'leetcode/MaxSubarray.java',
    solutionCode: `class Solution {
    public int maxSubArray(int[] nums) {
        int maxSoFar = nums[0];
        int currMax = nums[0];
        for (int i = 1; i < nums.length; i++) {
            currMax = Math.max(nums[i], currMax + nums[i]);
            maxSoFar = Math.max(maxSoFar, currMax);
        }
        return maxSoFar;
    }
}`,
    aiExplanation: "Kadane's Algorithm. Computes local maximum score at current index position dynamically, running in O(n) runtime and O(1) space.",
    personalNotes: 'Initialize max trackers to first array element index, not 0, to handle arrays with only negative values.',
  },
  {
    id: 'prob-011',
    platformProblemId: 'hr-compare-triplets',
    title: 'Compare the Triplets',
    slug: 'compare-the-triplets',
    platform: 'HackerRank',
    difficulty: 'Easy',
    topics: ['Implementation'],
    language: 'Java',
    status: 'Accepted',
    syncStatus: 'Synced',
    solvedAt: '2026-06-15',
    runtime: '0 ms',
    memory: '40.2 MB',
    repository: 'syncforge-solutions',
    solutionPath: 'hackerrank/CompareTriplets.java',
    solutionCode: `public static List<Integer> compareTriplets(List<Integer> a, List<Integer> b) {
    int alice = 0;
    int bob = 0;
    for(int i = 0; i < 3; i++) {
        if(a.get(i) > b.get(i)) alice++;
        else if(a.get(i) < b.get(i)) bob++;
    }
    return Arrays.asList(alice, bob);
}`,
    aiExplanation: 'Element comparison. Loops through points lists and increments scores for the matching index winners.',
    personalNotes: 'Strict comparison: don\'t distribute points for draws.',
  },
  {
    id: 'prob-012',
    platformProblemId: 'cf-71a',
    title: 'Way Too Long Words',
    slug: 'way-too-long-words',
    platform: 'Codeforces',
    difficulty: 'Easy',
    topics: ['String'],
    language: 'Python',
    status: 'Accepted',
    syncStatus: 'Synced',
    solvedAt: '2026-06-18',
    runtime: '46 ms',
    memory: '7.5 MB',
    repository: 'syncforge-solutions',
    solutionPath: 'codeforces/WayTooLongWords.py',
    solutionCode: `n = int(input())
for _ in range(n):
    word = input()
    if len(word) > 10:
        print(f"{word[0]}{len(word)-2}{word[-1]}")
    else:
        print(word)`,
    aiExplanation: 'Replaces words exceeding 10 characters with their first character, character length count minus 2, and ending character.',
    personalNotes: 'Handle 0-indexed bounds. Make sure to apply truncation only for words with lengths strictly greater than 10.',
  },
  {
    id: 'prob-013',
    platformProblemId: 'cf-4a',
    title: 'Watermelon',
    slug: 'watermelon',
    platform: 'Codeforces',
    difficulty: 'Easy',
    topics: ['Implementation'],
    language: 'C++',
    status: 'Accepted',
    syncStatus: 'Synced',
    solvedAt: '2026-06-10',
    runtime: '30 ms',
    memory: '0.8 MB',
    repository: 'syncforge-solutions',
    solutionPath: 'codeforces/Watermelon.cpp',
    solutionCode: `#include <iostream>
using namespace std;

int main() {
    int w;
    if (cin >> w) {
        if (w > 2 && w % 2 == 0) {
            cout << "YES" << endl;
        } else {
            cout << "NO" << endl;
        }
    }
    return 0;
}`,
    aiExplanation: 'Simplistic check for even division of watermelon weight. Requires an even value greater than 2 to allow dividing into positive even portions.',
    personalNotes: 'Watch for edge case w = 2. You cannot divide 2 into two positive even integers.',
  },
  {
    id: 'prob-014',
    platformProblemId: '198',
    title: 'House Robber',
    slug: 'house-robber',
    platform: 'LeetCode',
    difficulty: 'Medium',
    topics: ['Dynamic Programming'],
    language: 'Rust',
    status: 'Accepted',
    syncStatus: 'Synced',
    solvedAt: '2026-07-10',
    runtime: '0 ms',
    memory: '2.1 MB',
    repository: 'syncforge-solutions',
    solutionPath: 'leetcode/HouseRobber.rs',
    solutionCode: `impl Solution {
    pub fn rob(nums: Vec<i32>) -> i32 {
        if nums.is_empty() { return 0; }
        if nums.len() == 1 { return nums[0]; }
        
        let mut prev2 = 0;
        let mut prev1 = 0;
        
        for num in nums {
            let temp = prev1;
            prev1 = std::cmp::max(prev2 + num, prev1);
            prev2 = temp;
        }
        prev1
    }
}`,
    aiExplanation: 'Dynamic Programming with state space reduction. Recomputes optimal robbery value at index i based on step i-1 and i-2, reducing space from O(n) to O(1).',
    personalNotes: 'Verify index bounds check. Dynamic variables track optimal sums.',
  },
  {
    id: 'prob-015',
    platformProblemId: '200',
    title: 'Number of Islands',
    slug: 'number-of-islands',
    platform: 'LeetCode',
    difficulty: 'Medium',
    topics: ['Arrays', 'Depth-First Search', 'Breadth-First Search', 'Graphs'],
    language: 'C++',
    status: 'Accepted',
    syncStatus: 'Synced',
    solvedAt: '2026-07-12',
    runtime: '24 ms',
    memory: '21.5 MB',
    repository: 'syncforge-solutions',
    solutionPath: 'leetcode/NumIslands.cpp',
    solutionCode: `class Solution {
private:
    void dfs(vector<vector<char>>& grid, int r, int c) {
        int nr = grid.size();
        int nc = grid[0].size();
        
        if (r < 0 || c < 0 || r >= nr || c >= nc || grid[r][c] == '0') return;
        
        grid[r][c] = '0'; // mark as visited
        dfs(grid, r - 1, c);
        dfs(grid, r + 1, c);
        dfs(grid, r, c - 1);
        dfs(grid, r, c + 1);
    }
public:
    int numIslands(vector<vector<char>>& grid) {
        if (grid.empty()) return 0;
        int num_islands = 0;
        for (int r = 0; r < grid.size(); ++r) {
            for (int c = 0; c < grid[0].size(); ++c) {
                if (grid[r][c] == '1') {
                    ++num_islands;
                    dfs(grid, r, c);
                }
            }
        }
        return num_islands;
    }
};`,
    aiExplanation: 'Grid traversal using Depth-First Search. Visited land blocks are marked as water to prevent duplicate counts, achieving O(M * N) complexity.',
    personalNotes: 'Mark cells as visited immediately on entry to prevent infinite recursion.',
  },
  {
    id: 'prob-016',
    platformProblemId: 'cc-chef-prime',
    title: 'Prime Intervals',
    slug: 'prime-intervals',
    platform: 'CodeChef',
    difficulty: 'Medium',
    topics: ['Math', 'Algorithms'],
    language: 'Python',
    status: 'Accepted',
    syncStatus: 'Synced',
    solvedAt: '2026-06-25',
    runtime: '120 ms',
    memory: '14.2 MB',
    repository: 'syncforge-solutions',
    solutionPath: 'codechef/PrimeIntervals.py',
    solutionCode: `def count_primes(l, r):
    primes = [True] * (r + 1)
    primes[0] = primes[1] = False
    for i in range(2, int(r**0.5) + 1):
        if primes[i]:
            for j in range(i*i, r + 1, i):
                primes[j] = False
    return sum(1 for i in range(l, r + 1) if primes[i])`,
    aiExplanation: 'Implements the Sieve of Eratosthenes to determine prime numbers inside intervals. Achieves O(N log log N) execution time.',
    personalNotes: 'Use square root limits for nested loops optimizations.',
  },
  {
    id: 'prob-017',
    platformProblemId: 'gfg-subarraysum',
    title: 'Subarray with Given Sum',
    slug: 'subarray-with-given-sum',
    platform: 'GeeksforGeeks',
    difficulty: 'Medium',
    topics: ['Arrays', 'Sliding Window'],
    language: 'Java',
    status: 'Accepted',
    syncStatus: 'Synced',
    solvedAt: '2026-06-20',
    runtime: '320 ms',
    memory: '64.8 MB',
    repository: 'syncforge-solutions',
    solutionPath: 'gfg/SubarraySum.java',
    solutionCode: `static ArrayList<Integer> subarraySum(int[] arr, int n, int s) {
    int start = 0;
    int curr_sum = 0;
    ArrayList<Integer> res = new ArrayList<>();
    
    for (int i = 0; i < n; i++) {
        curr_sum += arr[i];
        while (curr_sum > s && start < i) {
            curr_sum -= arr[start];
            start++;
        }
        if (curr_sum == s) {
            res.add(start + 1); // 1-based indexing
            res.add(i + 1);
            return res;
        }
    }
    res.add(-1);
    return res;
}`,
    aiExplanation: 'Sliding window technique using a variable-width array buffer. Slides right boundary and adjusts left bound to maintain targets sum.',
    personalNotes: 'Watch for 1-based indexing constraints in GeeksforGeeks solutions.',
  },
  {
    id: 'prob-018',
    platformProblemId: '121',
    title: 'Best Time to Buy and Sell Stock',
    slug: 'best-time-to-buy-and-sell-stock',
    platform: 'LeetCode',
    difficulty: 'Easy',
    topics: ['Arrays', 'Dynamic Programming'],
    language: 'TypeScript',
    status: 'Accepted',
    syncStatus: 'Synced',
    solvedAt: '2026-07-16',
    runtime: '72 ms',
    memory: '52.1 MB',
    repository: 'syncforge-solutions',
    solutionPath: 'leetcode/BuySellStock.ts',
    solutionCode: `function maxProfit(prices: number[]): number {
    let minPrice = Infinity;
    let maxProfit = 0;
    
    for (let i = 0; i < prices.length; i++) {
        if (prices[i] < minPrice) {
            minPrice = prices[i];
        } else if (prices[i] - minPrice > maxProfit) {
            maxProfit = prices[i] - minPrice;
        }
    }
    
    return maxProfit;
}`,
    aiExplanation: 'One-pass dynamic check. Tracks historical lowest price values and computes margins margins on-the-fly.',
    personalNotes: 'Single loop O(n) solution is optimal. Nested loops cause O(n^2) timeouts.',
  },
  {
    id: 'prob-019',
    platformProblemId: 'cf-231a',
    title: 'Team',
    slug: 'team',
    platform: 'Codeforces',
    difficulty: 'Easy',
    topics: ['Implementation'],
    language: 'C++',
    status: 'Accepted',
    syncStatus: 'Synced',
    solvedAt: '2026-05-15',
    runtime: '30 ms',
    memory: '1.1 MB',
    repository: 'syncforge-solutions',
    solutionPath: 'codeforces/Team.cpp',
    solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    if (cin >> n) {
        int count = 0;
        for (int i = 0; i < n; ++i) {
            int p, v, to;
            cin >> p >> v >> to;
            if (p + v + to >= 2) {
                count++;
            }
        }
        cout << count << endl;
    }
    return 0;
}`,
    aiExplanation: 'Loops through list parameters. Counts problems where at least two out of three team members are confident in solving the problem.',
    personalNotes: 'Simple summation check inside loop.',
  },
  {
    id: 'prob-020',
    platformProblemId: 'cf-263a',
    title: 'Beautiful Matrix',
    slug: 'beautiful-matrix',
    platform: 'Codeforces',
    difficulty: 'Easy',
    topics: ['Implementation'],
    language: 'Go',
    status: 'Accepted',
    syncStatus: 'Synced',
    solvedAt: '2026-05-20',
    runtime: '12 ms',
    memory: '0.9 MB',
    repository: 'syncforge-solutions',
    solutionPath: 'codeforces/BeautifulMatrix.go',
    solutionCode: `package main
import (
    "fmt"
    "math"
)

func main() {
    var val int
    for i := 1; i <= 5; i++ {
        for j := 1; j <= 5; j++ {
            fmt.Scan(&val)
            if val == 1 {
                moves := math.Abs(float64(i-3)) + math.Abs(float64(j-3))
                fmt.Println(int(moves))
                return
            }
        }
    }
}`,
    aiExplanation: 'Manhattan distance calculation from cell (i, j) to center coordinate (3, 3) in a 5x5 matrix.',
    personalNotes: 'Remember 1-based indexing for matrix rows and columns.',
  },
];
