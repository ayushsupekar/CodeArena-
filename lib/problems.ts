import { Problem } from './types'

// amazonq-ignore-next-line
export const sampleProblems: Problem[] = [
  {
    id: '1',
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'Array',
    acceptance: '49.1%',
    likes: 25847,
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      }
    ],
    constraints: [
      '2 ≤ nums.length ≤ 10⁴',
      '-10⁹ ≤ nums[i] ≤ 10⁹',
      '-10⁹ ≤ target ≤ 10⁹'
    ],
    // amazonq-ignore-next-line
    starterCode: {
      javascript: 'function twoSum(nums, target) {\n    // Your code here\n}',
      python: 'def two_sum(nums, target):\n    # Your code here\n    pass',
      java: 'public int[] twoSum(int[] nums, int target) {\n    // Your code here\n}',
      cpp: 'vector<int> twoSum(vector<int>& nums, int target) {\n    // Your code here\n}'
    },
    testCases: [
      { input: '[2,7,11,15], 9', expectedOutput: '[0,1]', isHidden: false },
      { input: '[3,2,4], 6', expectedOutput: '[1,2]', isHidden: false },
      { input: '[3,3], 6', expectedOutput: '[0,1]', isHidden: true }
    ],
    isPremium: false,
    companies: ['Amazon', 'Google', 'Microsoft']
  },
  {
    id: '2',
    title: 'Median of Two Sorted Arrays',
    difficulty: 'Hard',
    category: 'Array',
    acceptance: '35.2%',
    likes: 20456,
    description: 'Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.',
    examples: [
      {
        input: 'nums1 = [1,3], nums2 = [2]',
        output: '2.00000',
        explanation: 'merged array = [1,2,3] and median is 2.'
      }
    ],
    constraints: [
      'nums1.length == m',
      'nums2.length == n',
      '0 ≤ m ≤ 1000',
      '0 ≤ n ≤ 1000'
    ],
    starterCode: {
      javascript: 'function findMedianSortedArrays(nums1, nums2) {\n    // Your code here\n}',
      python: 'def findMedianSortedArrays(nums1, nums2):\n    # Your code here\n    pass',
      java: 'public double findMedianSortedArrays(int[] nums1, int[] nums2) {\n    // Your code here\n}',
      cpp: 'double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {\n    // Your code here\n}'
    },
    testCases: [
      { input: '[1,3], [2]', expectedOutput: '2.0', isHidden: false },
      { input: '[1,2], [3,4]', expectedOutput: '2.5', isHidden: false }
    ],
    isPremium: true,
    companies: ['Google', 'Apple', 'Meta']
  }
]