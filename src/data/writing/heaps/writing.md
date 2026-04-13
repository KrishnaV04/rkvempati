---
title: "Heaps: From Fundamentals to LeetCode Mastery"
summary: "A deep dive into the heap data structure — how it works, why it's efficient, and how to wield it to solve classic competitive programming problems."
date: "2026-04-13"
---

Heaps show up constantly in algorithms: priority queues, scheduling, graph algorithms like Dijkstra's, and a whole genre of "top-K" interview problems. This post builds the concept from scratch and then applies it to a set of canonical problems that demonstrate the full range of heap techniques.

## What Is a Heap?

A **heap** is a complete binary tree that satisfies the *heap property*:

- **Min-heap:** every node is ≤ its children. The smallest element is always at the root.
- **Max-heap:** every node is ≥ its children. The largest element is always at the root.

"Complete binary tree" means every level is fully filled except possibly the last, which is filled left-to-right. This shape guarantee lets us store the entire tree in a flat array with zero pointers.

### Array Representation

For a node at index `i` (0-indexed):

```
left child  → 2i + 1
right child → 2i + 2
parent      → (i - 1) // 2
```

Example min-heap stored in an array:

```
Array:  [1, 3, 2, 7, 5, 9, 4]

          1          ← index 0
        /   \
       3     2       ← indices 1, 2
      / \   / \
     7   5 9   4     ← indices 3, 4, 5, 6
```

Every parent is smaller than its children — heap property holds.

## Core Operations

### Push — O(log n)

Insert the new value at the end of the array, then *sift up*: swap with parent while the heap property is violated.

```python
def push(heap, val):
    heap.append(val)
    i = len(heap) - 1
    while i > 0:
        parent = (i - 1) // 2
        if heap[parent] > heap[i]:          # min-heap violation
            heap[parent], heap[i] = heap[i], heap[parent]
            i = parent
        else:
            break
```

### Pop — O(log n)

Swap the root with the last element, remove the last element, then *sift down*: swap with the smaller child while the heap property is violated.

```python
def pop(heap):
    heap[0], heap[-1] = heap[-1], heap[0]
    val = heap.pop()
    i = 0
    n = len(heap)
    while True:
        left, right = 2*i + 1, 2*i + 2
        smallest = i
        if left < n and heap[left] < heap[smallest]:
            smallest = left
        if right < n and heap[right] < heap[smallest]:
            smallest = right
        if smallest == i:
            break
        heap[i], heap[smallest] = heap[smallest], heap[i]
        i = smallest
    return val
```

### Heapify — O(n)

Given an arbitrary array, rearrange it into a valid heap in linear time by sifting down from the last non-leaf node to the root. This is more efficient than pushing each element one by one (which costs O(n log n)).

```python
import heapq
data = [5, 3, 8, 1, 9, 2]
heapq.heapify(data)   # in-place, O(n)
```

### Python's `heapq` Module

Python only gives you a min-heap. To simulate a max-heap, negate the values on entry and negate again on exit.

```python
import heapq

# Min-heap
h = []
heapq.heappush(h, 3)
heapq.heappush(h, 1)
heapq.heappush(h, 2)
print(heapq.heappop(h))   # 1

# Max-heap trick: negate values
h = []
for v in [3, 1, 2]:
    heapq.heappush(h, -v)
print(-heapq.heappop(h))  # 3
```

## Complexity Summary

| Operation | Time | Space |
|-----------|------|-------|
| Push | O(log n) | O(1) |
| Pop | O(log n) | O(1) |
| Peek min/max | O(1) | O(1) |
| Heapify | O(n) | O(1) |
| Search | O(n) | O(1) |

---

## Problem 1 — Kth Largest Element in an Array

**Problem:** Given an integer array `nums` and an integer `k`, return the kth largest element.

**Insight:** We don't need to sort the whole array. Maintain a min-heap of size `k`. After processing every element, the root of the heap is the kth largest.

**Why it works:** The heap always holds the `k` largest elements seen so far. The smallest of those k elements (the root) is the kth largest globally.

```python
import heapq

def findKthLargest(nums, k):
    heap = []
    for num in nums:
        heapq.heappush(heap, num)
        if len(heap) > k:
            heapq.heappop(heap)   # evict the smallest
    return heap[0]
```

**Complexity:** O(n log k) time, O(k) space — much better than O(n log n) sorting when k is small.

---

## Problem 2 — K Closest Points to Origin

**Problem:** Given a list of points and an integer `k`, return the `k` closest points to the origin `(0, 0)`.

**Insight:** The same fixed-size max-heap trick, but the "priority" is squared Euclidean distance. We keep a max-heap of size `k`; when a new point is closer than the current farthest, evict the farthest.

```python
import heapq

def kClosest(points, k):
    # Max-heap: store (-distance, x, y)
    heap = []
    for x, y in points:
        dist = x*x + y*y
        heapq.heappush(heap, (-dist, x, y))
        if len(heap) > k:
            heapq.heappop(heap)   # remove the farthest
    return [[x, y] for _, x, y in heap]
```

**Complexity:** O(n log k) time, O(k) space.

---

## Problem 3 — Merge K Sorted Lists

**Problem:** Given `k` sorted linked lists, merge them into one sorted list.

**Insight:** This is a classic multi-way merge. Use a min-heap seeded with the head of each list. Repeatedly extract the minimum node, append it to the result, and push its successor back onto the heap.

```python
import heapq
from typing import Optional, List

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def mergeKLists(lists: List[Optional[ListNode]]) -> Optional[ListNode]:
    heap = []
    for i, node in enumerate(lists):
        if node:
            heapq.heappush(heap, (node.val, i, node))

    dummy = ListNode(0)
    curr = dummy
    while heap:
        val, i, node = heapq.heappop(heap)
        curr.next = node
        curr = curr.next
        if node.next:
            heapq.heappush(heap, (node.next.val, i, node.next))

    return dummy.next
```

> **Note:** We store the list index `i` as a tiebreaker because Python will try to compare `ListNode` objects if two values are equal, which would raise a `TypeError`. The tiebreaker ensures we never reach the node comparison.

**Complexity:** O(n log k) time where `n` is the total number of nodes — each node is pushed and popped exactly once, and each heap operation is O(log k).

---

## Problem 4 — Task Scheduler

**Problem:** Given a list of CPU tasks and a cooldown period `n`, return the minimum number of intervals needed to complete all tasks. Identical tasks must be at least `n` intervals apart.

**Insight:** Greedy + max-heap. At each time step, run the most frequent available task. If no task is available (all are in cooldown), idle. Use a max-heap for frequency and a queue to track when tasks come out of cooldown.

```python
import heapq
from collections import Counter, deque

def leastInterval(tasks, n):
    freq = Counter(tasks)
    max_heap = [-f for f in freq.values()]
    heapq.heapify(max_heap)

    time = 0
    cooldown = deque()   # (available_at_time, neg_freq)

    while max_heap or cooldown:
        time += 1

        if max_heap:
            remaining = heapq.heappop(max_heap) + 1   # increment (negated)
            if remaining < 0:
                cooldown.append((time + n, remaining))
        
        if cooldown and cooldown[0][0] == time:
            heapq.heappush(max_heap, cooldown.popleft()[1])

    return time
```

**Complexity:** O(m log m) where `m` is the number of distinct tasks, since the heap size is bounded by `m`.

---

## Problem 5 — Find Median from Data Stream

**Problem:** Design a data structure that supports inserting numbers and querying the median at any time.

**Insight:** Split the stream into two halves using:
- A **max-heap** for the lower half (gives you the largest of the small numbers instantly).
- A **min-heap** for the upper half (gives you the smallest of the large numbers instantly).

Keep them balanced: their sizes differ by at most 1. The median is either the root of the larger heap, or the average of both roots.

```python
import heapq

class MedianFinder:
    def __init__(self):
        self.lo = []   # max-heap (negated): lower half
        self.hi = []   # min-heap: upper half

    def addNum(self, num: int) -> None:
        # Push to max-heap (lower half), then balance
        heapq.heappush(self.lo, -num)

        # Ensure every element in lo ≤ every element in hi
        if self.hi and -self.lo[0] > self.hi[0]:
            heapq.heappush(self.hi, -heapq.heappop(self.lo))

        # Balance sizes: lo can have at most 1 extra element
        if len(self.lo) > len(self.hi) + 1:
            heapq.heappush(self.hi, -heapq.heappop(self.lo))
        elif len(self.hi) > len(self.lo):
            heapq.heappush(self.lo, -heapq.heappop(self.hi))

    def findMedian(self) -> float:
        if len(self.lo) > len(self.hi):
            return -self.lo[0]
        return (-self.lo[0] + self.hi[0]) / 2.0
```

**Complexity:** O(log n) per insert, O(1) per median query.

---

## Problem 6 — Reorganize String

**Problem:** Given a string `s`, rearrange its characters so that no two adjacent characters are the same. Return any valid rearrangement, or `""` if impossible.

**Insight:** Greedy — always place the most frequent remaining character, as long as it isn't the same as the previous one. A max-heap gives access to the most frequent character in O(log k) time.

```python
import heapq
from collections import Counter

def reorganizeString(s: str) -> str:
    freq = Counter(s)
    max_heap = [(-f, ch) for ch, f in freq.items()]
    heapq.heapify(max_heap)

    result = []
    prev_freq, prev_ch = 0, ''

    while max_heap:
        freq, ch = heapq.heappop(max_heap)
        result.append(ch)

        # Re-add the previous character now that it's no longer adjacent
        if prev_freq < 0:
            heapq.heappush(max_heap, (prev_freq, prev_ch))

        prev_freq, prev_ch = freq + 1, ch   # +1 because negated

    result_str = ''.join(result)
    return result_str if len(result_str) == len(s) else ''
```

**Complexity:** O(n log k) where `k` is the number of distinct characters (at most 26 for lowercase English, so the heap operations are effectively O(log 26) = O(1), making this O(n) in practice).

---

## Recognizing Heap Problems

Not every problem screams "heap" immediately. Here are the patterns to watch for:

| Pattern | Heap use |
|---------|----------|
| "Find the kth largest/smallest" | Fixed-size heap of size k |
| "Repeatedly extract the minimum/maximum" | Standard min/max-heap |
| "Merge k sorted sequences" | Min-heap seeded with heads |
| "Running median / percentile" | Two-heap split (lo/hi) |
| "Schedule tasks with constraints" | Max-heap + cooldown queue |
| "Greedy: always pick the best option" | Max-heap as priority queue |
| Dijkstra / Prim / A\* | Min-heap on (cost, node) |

## Common Pitfalls

**1. Forgetting Python only has min-heaps.** Always negate values when you need max-heap behavior, and remember to negate back when reading.

**2. Comparing non-comparable objects.** When heap elements are tuples, Python compares lexicographically. If values can tie, include a unique tiebreaker (like a counter or an index) to prevent it from trying to compare the payload.

```python
# Safe pattern
counter = 0
heapq.heappush(heap, (priority, counter, item))
counter += 1
```

**3. Assuming heapq.nlargest / nsmallest are always efficient.** `heapq.nlargest(k, iterable)` is O(n log k) — good when `k << n`. But for `k` close to `n`, sorting is faster.

**4. Mutating heap elements.** Heaps don't automatically re-sort when you modify a stored value. Use a *lazy deletion* pattern: mark entries as invalid and skip them when popping.

```python
# Lazy deletion pattern
removed = set()

def lazy_pop(heap):
    while heap and heap[0][1] in removed:
        heapq.heappop(heap)
    return heapq.heappop(heap)
```

---

Heaps are one of those data structures where understanding the *why* — the sift-up and sift-down mechanics, the O(n) heapify trick, the two-heap median split — makes every pattern feel inevitable rather than memorized. Once the structure clicks, problems that look unrelated start sharing the same skeleton.
