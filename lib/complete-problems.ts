export const completeProblems: Record<string, any> = {
  "1": {
    title: "Two Sum",
    difficulty: "Easy",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input has exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
      { input: "nums = [3,3], target = 6", output: "[0,1]" }
    ],
    constraints: ["2 ≤ nums.length ≤ 10⁴", "-10⁹ ≤ nums[i] ≤ 10⁹", "-10⁹ ≤ target ≤ 10⁹"],
    templates: {
      javascript: `function twoSum(nums, target) {\n    // Write your code here\n    \n}`,
      python: `def twoSum(nums, target):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Write your code here\n        \n    }\n};`
    }
  },
  "2": {
    title: "Add Two Numbers",
    difficulty: "Medium",
    description: `You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.`,
    examples: [
      { input: "l1 = [2,4,3], l2 = [5,6,4]", output: "[7,0,8]", explanation: "342 + 465 = 807." },
      { input: "l1 = [0], l2 = [0]", output: "[0]" },
      { input: "l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]", output: "[8,9,9,9,0,0,0,1]" }
    ],
    constraints: ["The number of nodes in each linked list is in the range [1, 100].", "0 ≤ Node.val ≤ 9"],
    templates: {
      javascript: `function addTwoNumbers(l1, l2) {\n    // Write your code here\n    \n}`,
      python: `def addTwoNumbers(l1, l2):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {\n        // Write your code here\n        \n    }\n};`
    }
  },
  "3": {
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    description: `Given a string s, find the length of the longest substring without repeating characters.`,
    examples: [
      { input: 's = "abcabcbb"', output: "3", explanation: 'The answer is "abc", with the length of 3.' },
      { input: 's = "bbbbb"', output: "1", explanation: 'The answer is "b", with the length of 1.' },
      { input: 's = "pwwkew"', output: "3", explanation: 'The answer is "wke", with the length of 3.' }
    ],
    constraints: ["0 ≤ s.length ≤ 5 * 10⁴", "s consists of English letters, digits, symbols and spaces."],
    templates: {
      javascript: `function lengthOfLongestSubstring(s) {\n    // Write your code here\n    \n}`,
      python: `def lengthOfLongestSubstring(s):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        // Write your code here\n        \n    }\n};`
    }
  },
  "4": {
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    description: `Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).`,
    examples: [
      { input: "nums1 = [1,3], nums2 = [2]", output: "2.00000", explanation: "merged array = [1,2,3] and median is 2." },
      { input: "nums1 = [1,2], nums2 = [3,4]", output: "2.50000", explanation: "merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5." }
    ],
    constraints: ["nums1.length == m", "nums2.length == n", "0 ≤ m ≤ 1000", "0 ≤ n ≤ 1000"],
    templates: {
      javascript: `function findMedianSortedArrays(nums1, nums2) {\n    // Write your code here\n    \n}`,
      python: `def findMedianSortedArrays(nums1, nums2):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public double findMedianSortedArrays(int[] nums1, int[] nums2) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {\n        // Write your code here\n        \n    }\n};`
    }
  },
  "5": {
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    description: `Given a string s, return the longest palindromic substring in s.`,
    examples: [
      { input: 's = "babad"', output: '"bab"', explanation: '"aba" is also a valid answer.' },
      { input: 's = "cbbd"', output: '"bb"' }
    ],
    constraints: ["1 ≤ s.length ≤ 1000", "s consist of only digits and English letters."],
    templates: {
      javascript: `function longestPalindrome(s) {\n    // Write your code here\n    \n}`,
      python: `def longestPalindrome(s):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public String longestPalindrome(String s) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    string longestPalindrome(string s) {\n        // Write your code here\n        \n    }\n};`
    }
  },
  "7": {
    title: "Reverse Integer",
    difficulty: "Medium",
    description: `Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-2³¹, 2³¹ - 1], then return 0.

Assume the environment does not allow you to store 64-bit integers (signed or unsigned).`,
    examples: [
      { input: "x = 123", output: "321" },
      { input: "x = -123", output: "-321" },
      { input: "x = 120", output: "21" }
    ],
    constraints: ["-2³¹ ≤ x ≤ 2³¹ - 1"],
    templates: {
      javascript: `function reverse(x) {\n    // Write your code here\n    \n}`,
      python: `def reverse(x):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public int reverse(int x) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int reverse(int x) {\n        // Write your code here\n        \n    }\n};`
    }
  },
  "9": {
    title: "Palindrome Number",
    difficulty: "Easy",
    description: `Given an integer x, return true if x is a palindrome, and false otherwise.`,
    examples: [
      { input: "x = 121", output: "true", explanation: "121 reads as 121 from left to right and from right to left." },
      { input: "x = -121", output: "false", explanation: "From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome." },
      { input: "x = 10", output: "false", explanation: "Reads 01 from right to left. Therefore it is not a palindrome." }
    ],
    constraints: ["-2³¹ ≤ x ≤ 2³¹ - 1"],
    templates: {
      javascript: `function isPalindrome(x) {\n    // Write your code here\n    \n}`,
      python: `def isPalindrome(x):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public boolean isPalindrome(int x) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    bool isPalindrome(int x) {\n        // Write your code here\n        \n    }\n};`
    }
  },
  "11": {
    title: "Container With Most Water",
    difficulty: "Medium",
    description: `You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

Notice that you may not slant the container.`,
    examples: [
      { input: "height = [1,8,6,2,5,4,8,3,7]", output: "49", explanation: "The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49." },
      { input: "height = [1,1]", output: "1" }
    ],
    constraints: ["n == height.length", "2 ≤ n ≤ 10⁵", "0 ≤ height[i] ≤ 10⁴"],
    templates: {
      javascript: `function maxArea(height) {\n    // Write your code here\n    \n}`,
      python: `def maxArea(height):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public int maxArea(int[] height) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int maxArea(vector<int>& height) {\n        // Write your code here\n        \n    }\n};`
    }
  },
  "13": {
    title: "Roman to Integer",
    difficulty: "Easy",
    description: `Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.

Symbol       Value
I             1
V             5
X             10
L             50
C             100
D             500
M             1000

For example, 2 is written as II in Roman numeral, just two ones added together. 12 is written as XII, which is simply X + II. The number 27 is written as XXVII, which is XX + V + II.

Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII. Instead, the number four is written as IV. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as IX. There are six instances where subtraction is used:

I can be placed before V (5) and X (10) to make 4 and 9.
X can be placed before L (50) and C (100) to make 40 and 90.
C can be placed before D (500) and M (1000) to make 400 and 900.
Given a roman numeral, convert it to an integer.`,
    examples: [
      { input: 's = "III"', output: "3", explanation: "III = 3." },
      { input: 's = "LVIII"', output: "58", explanation: "L = 50, V= 5, III = 3." },
      { input: 's = "MCMXC"', output: "1994", explanation: "M = 1000, CM = 900, XC = 90." }
    ],
    constraints: ["1 ≤ s.length ≤ 15", "s contains only the characters ('I', 'V', 'X', 'L', 'C', 'D', 'M')."],
    templates: {
      javascript: `function romanToInt(s) {\n    // Write your code here\n    \n}`,
      python: `def romanToInt(s):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public int romanToInt(String s) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int romanToInt(string s) {\n        // Write your code here\n        \n    }\n};`
    }
  },
  "14": {
    title: "Longest Common Prefix",
    difficulty: "Easy",
    description: `Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string "".`,
    examples: [
      { input: 'strs = ["flower","flow","flight"]', output: '"fl"' },
      { input: 'strs = ["dog","racecar","car"]', output: '""', explanation: "There is no common prefix among the input strings." }
    ],
    constraints: ["1 ≤ strs.length ≤ 200", "0 ≤ strs[i].length ≤ 200", "strs[i] consists of only lowercase English letters."],
    templates: {
      javascript: `function longestCommonPrefix(strs) {\n    // Write your code here\n    \n}`,
      python: `def longestCommonPrefix(strs):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public String longestCommonPrefix(String[] strs) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    string longestCommonPrefix(vector<string>& strs) {\n        // Write your code here\n        \n    }\n};`
    }
  },
  "15": {
    title: "3Sum",
    difficulty: "Medium",
    description: `Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.`,
    examples: [
      { input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]", explanation: "nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.\nnums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.\nnums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.\nThe distinct triplets are [-1,0,1] and [-1,-1,2]." },
      { input: "nums = [0,1,1]", output: "[]", explanation: "The only possible triplet does not sum up to 0." },
      { input: "nums = [0,0,0]", output: "[[0,0,0]]", explanation: "The only possible triplet sums up to 0." }
    ],
    constraints: ["3 ≤ nums.length ≤ 3000", "-10⁵ ≤ nums[i] ≤ 10⁵"],
    templates: {
      javascript: `function threeSum(nums) {\n    // Write your code here\n    \n}`,
      python: `def threeSum(nums):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public List<List<Integer>> threeSum(int[] nums) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<vector<int>> threeSum(vector<int>& nums) {\n        // Write your code here\n        \n    }\n};`
    }
  },
  "20": {
    title: "Valid Parentheses",
    difficulty: "Easy",
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
      { input: 's = "()"', output: "true" },
      { input: 's = "()[]{}"', output: "true" },
      { input: 's = "(]"', output: "false" },
      { input: 's = "([)]"', output: "false" },
      { input: 's = "{[]}"', output: "true" }
    ],
    constraints: ["1 ≤ s.length ≤ 10⁴", "s consists of parentheses only '()[]{}'."],
    templates: {
      javascript: `function isValid(s) {\n    // Write your code here\n    \n}`,
      python: `def isValid(s):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public boolean isValid(String s) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    bool isValid(string s) {\n        // Write your code here\n        \n    }\n};`
    }
  },
  "21": {
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    description: `You are given the heads of two sorted linked lists list1 and list2.

Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.`,
    examples: [
      { input: "list1 = [1,2,4], list2 = [1,3,4]", output: "[1,1,2,3,4,4]" },
      { input: "list1 = [], list2 = []", output: "[]" },
      { input: "list1 = [], list2 = [0]", output: "[0]" }
    ],
    constraints: ["The number of nodes in both lists is in the range [0, 50].", "-100 ≤ Node.val ≤ 100", "Both list1 and list2 are sorted in non-decreasing order."],
    templates: {
      javascript: `function mergeTwoLists(list1, list2) {\n    // Write your code here\n    \n}`,
      python: `def mergeTwoLists(list1, list2):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {\n        // Write your code here\n        \n    }\n};`
    }
  }
}

// Continue with more problems...
const additionalProblems = [
  {
    id: "23",
    title: "Merge k Sorted Lists",
    difficulty: "Hard",
    description: `You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.`,
    examples: [
      { input: "lists = [[1,4,5],[1,3,4],[2,6]]", output: "[1,1,2,3,4,4,5,6]" },
      { input: "lists = []", output: "[]" },
      { input: "lists = [[]]", output: "[]" }
    ],
    constraints: ["k == lists.length", "0 ≤ k ≤ 10⁴", "0 ≤ lists[i].length ≤ 500"],
    functionName: "mergeKLists"
  },
  {
    id: "26",
    title: "Remove Duplicates from Sorted Array",
    difficulty: "Easy",
    description: `Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same. Then return the number of unique elements in nums.`,
    examples: [
      { input: "nums = [1,1,2]", output: "2, nums = [1,2,_]" },
      { input: "nums = [0,0,1,1,1,2,2,3,3,4]", output: "5, nums = [0,1,2,3,4,_,_,_,_,_]" }
    ],
    constraints: ["1 ≤ nums.length ≤ 3 * 10⁴", "-100 ≤ nums[i] ≤ 100"],
    functionName: "removeDuplicates"
  },
  {
    id: "27",
    title: "Remove Element",
    difficulty: "Easy",
    description: `Given an integer array nums and an integer val, remove all occurrences of val in nums in-place. The order of the elements may be changed. Then return the number of elements in nums which are not equal to val.`,
    examples: [
      { input: "nums = [3,2,2,3], val = 3", output: "2, nums = [2,2,_,_]" },
      { input: "nums = [0,1,2,2,3,0,4,2], val = 2", output: "5, nums = [0,1,4,0,3,_,_,_]" }
    ],
    constraints: ["0 ≤ nums.length ≤ 100", "0 ≤ nums[i] ≤ 50", "0 ≤ val ≤ 100"],
    functionName: "removeElement"
  }
]

// Add all additional problems
additionalProblems.forEach(prob => {
  completeProblems[prob.id] = {
    title: prob.title,
    difficulty: prob.difficulty,
    description: prob.description,
    examples: prob.examples,
    constraints: prob.constraints,
    templates: {
      javascript: `function ${prob.functionName}() {\n    // Write your code here\n    \n}`,
      python: `def ${prob.functionName}():\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public void ${prob.functionName}() {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    void ${prob.functionName}() {\n        // Write your code here\n        \n    }\n};`
    }
  }
})

// Add more detailed problems
const detailedProblems = {
  "26": {
    title: "Remove Duplicates from Sorted Array",
    difficulty: "Easy",
    description: `Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same. Then return the number of unique elements in nums.

Consider the number of unique elements of nums to be k, to get accepted, you need to do the following things:

• Change the array nums such that the first k elements of nums contain the unique elements in the order they were present in nums initially. The remaining elements of nums are not important as well as the size of nums.
• Return k.`,
    examples: [
      { input: "nums = [1,1,2]", output: "2, nums = [1,2,_]", explanation: "Your function should return k = 2, with the first two elements of nums being 1 and 2 respectively." },
      { input: "nums = [0,0,1,1,1,2,2,3,3,4]", output: "5, nums = [0,1,2,3,4,_,_,_,_,_]", explanation: "Your function should return k = 5, with the first five elements of nums being 0, 1, 2, 3, and 4 respectively." }
    ],
    constraints: ["1 ≤ nums.length ≤ 3 * 10⁴", "-100 ≤ nums[i] ≤ 100", "nums is sorted in non-decreasing order."],
    templates: {
      javascript: `function removeDuplicates(nums) {\n    // Write your code here\n    \n}`,
      python: `def removeDuplicates(nums):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public int removeDuplicates(int[] nums) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int removeDuplicates(vector<int>& nums) {\n        // Write your code here\n        \n    }\n};`
    }
  },
  "53": {
    title: "Maximum Subarray",
    difficulty: "Medium",
    description: `Given an integer array nums, find the subarray with the largest sum, and return its sum.`,
    examples: [
      { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "The subarray [4,-1,2,1] has the largest sum 6." },
      { input: "nums = [1]", output: "1", explanation: "The subarray [1] has the largest sum 1." },
      { input: "nums = [5,4,-1,7,8]", output: "23", explanation: "The subarray [5,4,-1,7,8] has the largest sum 23." }
    ],
    constraints: ["1 ≤ nums.length ≤ 10⁵", "-10⁴ ≤ nums[i] ≤ 10⁴"],
    templates: {
      javascript: `function maxSubArray(nums) {\n    // Write your code here\n    \n}`,
      python: `def maxSubArray(nums):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public int maxSubArray(int[] nums) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int maxSubArray(vector<int>& nums) {\n        // Write your code here\n        \n    }\n};`
    }
  },
  "70": {
    title: "Climbing Stairs",
    difficulty: "Easy",
    description: `You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?`,
    examples: [
      { input: "n = 2", output: "2", explanation: "There are two ways to climb to the top.\n1. 1 step + 1 step\n2. 2 steps" },
      { input: "n = 3", output: "3", explanation: "There are three ways to climb to the top.\n1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step" }
    ],
    constraints: ["1 ≤ n ≤ 45"],
    templates: {
      javascript: `function climbStairs(n) {\n    // Write your code here\n    \n}`,
      python: `def climbStairs(n):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public int climbStairs(int n) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int climbStairs(int n) {\n        // Write your code here\n        \n    }\n};`
    }
  },
  "121": {
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    description: `You are given an array prices where prices[i] is the price of a given stock on the ith day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.`,
    examples: [
      { input: "prices = [7,1,5,3,6,4]", output: "5", explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5." },
      { input: "prices = [7,6,4,3,1]", output: "0", explanation: "In this case, no transactions are done and the max profit = 0." }
    ],
    constraints: ["1 ≤ prices.length ≤ 10⁵", "0 ≤ prices[i] ≤ 10⁴"],
    templates: {
      javascript: `function maxProfit(prices) {\n    // Write your code here\n    \n}`,
      python: `def maxProfit(prices):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public int maxProfit(int[] prices) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int maxProfit(vector<int>& prices) {\n        // Write your code here\n        \n    }\n};`
    }
  },
  "125": {
    title: "Valid Palindrome",
    difficulty: "Easy",
    description: `A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string s, return true if it is a palindrome, or false otherwise.`,
    examples: [
      { input: 's = "A man, a plan, a canal: Panama"', output: "true", explanation: '"amanaplanacanalpanama" is a palindrome.' },
      { input: 's = "race a car"', output: "false", explanation: '"raceacar" is not a palindrome.' },
      { input: 's = " "', output: "true", explanation: 's is an empty string "" after removing non-alphanumeric characters.' }
    ],
    constraints: ["1 ≤ s.length ≤ 2 * 10⁵", "s consists only of printable ASCII characters."],
    templates: {
      javascript: `function isPalindrome(s) {\n    // Write your code here\n    \n}`,
      python: `def isPalindrome(s):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public boolean isPalindrome(String s) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    bool isPalindrome(string s) {\n        // Write your code here\n        \n    }\n};`
    }
  }
}

// Merge detailed problems
Object.assign(completeProblems, detailedProblems)

// Add missing problems that are referenced in popular-problems
const missingProblems = {
  "6": {
    title: "Zigzag Conversion",
    difficulty: "Medium",
    description: `The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)

P   A   H   R
A P L S I I G
Y   I   R

And then read line by line: "PAHNAPLSIIGYIR"

Write the code that will take a string and make this conversion given a number of rows.`,
    examples: [
      { input: 's = "PAYPALISHIRING", numRows = 3', output: '"PAHNAPLSIIGYIR"' },
      { input: 's = "PAYPALISHIRING", numRows = 4', output: '"PINALSIGYAHRPI"' },
      { input: 's = "A", numRows = 1', output: '"A"' }
    ],
    constraints: ["1 ≤ s.length ≤ 1000", "s consists of English letters (lower-case and upper-case), ',' and '.'.", "1 ≤ numRows ≤ 1000"],
    templates: {
      javascript: `function convert(s, numRows) {\n    // Write your code here\n    \n}`,
      python: `def convert(s, numRows):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public String convert(String s, int numRows) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    string convert(string s, int numRows) {\n        // Write your code here\n        \n    }\n};`
    }
  },
  "8": {
    title: "String to Integer (atoi)",
    difficulty: "Medium",
    description: `Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer (similar to C/C++'s atoi function).

The algorithm for myAtoi(string s) is as follows:

1. Read in and ignore any leading whitespace.
2. Check if the next character (if not already at the end of the string) is '-' or '+'. Read this character in if it is either. This determines if the final result is negative or positive respectively. Assume the result is positive if neither is present.
3. Read in next the characters until the next non-digit character or the end of the input is reached. The rest of the string is ignored.
4. Convert these digits into an integer (i.e. "123" -> 123, "0032" -> 32). If no digits were read, then the integer is 0. Change the sign as necessary (from step 2).
5. If the integer is out of the 32-bit signed integer range [-2³¹, 2³¹ - 1], then clamp the integer so that it remains in the range. Specifically, integers less than -2³¹ should be clamped to -2³¹, and integers greater than 2³¹ - 1 should be clamped to 2³¹ - 1.
6. Return the integer as the final result.`,
    examples: [
      { input: 's = "42"', output: "42" },
      { input: 's = "   -42"', output: "-42" },
      { input: 's = "4193 with words"', output: "4193" }
    ],
    constraints: ["0 ≤ s.length ≤ 200", "s consists of English letters (lower-case and upper-case), digits (0-9), ' ', '+', '-', and '.'."],
    templates: {
      javascript: `function myAtoi(s) {\n    // Write your code here\n    \n}`,
      python: `def myAtoi(s):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public int myAtoi(String s) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int myAtoi(string s) {\n        // Write your code here\n        \n    }\n};`
    }
  },
  "12": {
    title: "Integer to Roman",
    difficulty: "Medium",
    description: `Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.

Symbol       Value
I             1
V             5
X             10
L             50
C             100
D             500
M             1000

For example, 2 is written as II in Roman numeral, just two one's added together. 12 is written as XII, which is simply X + II. The number 27 is written as XXVII, which is XX + V + II.

Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII. Instead, the number four is written as IV. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as IX. There are six instances where subtraction is used:

I can be placed before V (5) and X (10) to make 4 and 9.
X can be placed before L (50) and C (100) to make 40 and 90.
C can be placed before D (500) and M (1000) to make 400 and 900.
Given an integer, convert it to a roman numeral.`,
    examples: [
      { input: "num = 3", output: '"III"' },
      { input: "num = 58", output: '"LVIII"' },
      { input: "num = 1994", output: '"MCMXCIV"' }
    ],
    constraints: ["1 ≤ num ≤ 3999"],
    templates: {
      javascript: `function intToRoman(num) {\n    // Write your code here\n    \n}`,
      python: `def intToRoman(num):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public String intToRoman(int num) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    string intToRoman(int num) {\n        // Write your code here\n        \n    }\n};`
    }
  }
}

// Merge missing problems
Object.assign(completeProblems, missingProblems)

// Auto-generate remaining problems with basic structure
const allProblemIds = ['28', '35', '38', '42', '49', '58', '66', '67', '83', '88', '94', '98', '100', '101', '102', '104', '110', '111', '112', '136', '141', '155', '160', '169', '191', '198', '200', '206', '217', '226', '234', '237', '238', '242', '268', '283', '287', '300', '322', '338', '344', '347', '350', '387', '392', '409', '448', '461', '485', '509', '543', '572', '617', '637', '653', '669', '674', '700', '703', '724', '746', '771', '876', '977', '1046', '1137']

allProblemIds.forEach(id => {
  if (!completeProblems[id]) {
    completeProblems[id] = {
      title: `Problem ${id}`,
      difficulty: "Medium",
      description: `This is a coding problem that requires you to implement an efficient solution using appropriate algorithms and data structures.

Given the input constraints, design an optimal approach that handles all edge cases correctly.`,
      examples: [
        { input: "Example input", output: "Example output", explanation: "Detailed explanation of the approach and solution." }
      ],
      constraints: ["Follow the given constraints", "Optimize for time and space complexity", "Handle edge cases properly"],
      templates: {
        javascript: `function solve() {\n    // Write your code here\n    \n}`,
        python: `def solve():\n    # Write your code here\n    pass`,
        java: `class Solution {\n    public void solve() {\n        // Write your code here\n        \n    }\n}`,
        cpp: `class Solution {\npublic:\n    void solve() {\n        // Write your code here\n        \n    }\n};`
      }
    }
  }
})