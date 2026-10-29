import { PrismaClient } from '@prisma/client'
import { popularProblems } from '../lib/popular-problems'
import { completeProblems } from '../lib/complete-problems'

const prisma = new PrismaClient()

// Real descriptions for common problems
const descriptions: Record<string, string> = {
  '35': `Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

You must write an algorithm with O(log n) runtime complexity.`,
  '49': `Given an array of strings strs, group the anagrams together. You can return the answer in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.`,
  '66': `You are given a large integer represented as an integer array digits, where each digits[i] is the ith digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading 0's.

Increment the large integer by one and return the resulting array of digits.`,
  '88': `You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively.

Merge nums1 and nums2 into a single array sorted in non-decreasing order.`,
  '94': `Given the root of a binary tree, return the inorder traversal of its nodes' values.`,
  '98': `Given the root of a binary tree, determine if it is a valid binary search tree (BST).

A valid BST is defined as follows:
- The left subtree of a node contains only nodes with keys less than the node's key.
- The right subtree of a node contains only nodes with keys greater than the node's key.
- Both the left and right subtrees must also be binary search trees.`,
  '100': `Given the roots of two binary trees p and q, write a function to check if they are the same or not.

Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.`,
  '101': `Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).`,
  '102': `Given the root of a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level).`,
  '104': `Given the root of a binary tree, return its maximum depth.

A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.`,
  '110': `Given a binary tree, determine if it is height-balanced.

A height-balanced binary tree is a binary tree in which the depth of the two subtrees of every node never differs by more than one.`,
  '111': `Given a binary tree, find its minimum depth.

The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.`,
  '112': `Given the root of a binary tree and an integer targetSum, return true if the tree has a root-to-leaf path such that adding up all the values along the path equals targetSum.`,
  '141': `Given head, the head of a linked list, determine if the linked list has a cycle in it.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer.`,
  '155': `Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

Implement the MinStack class with push, pop, top, and getMin operations all in O(1) time.`,
  '160': `Given the heads of two singly linked-lists headA and headB, return the node at which the two lists intersect. If the two linked lists have no intersection at all, return null.`,
  '169': `Given an array nums of size n, return the majority element.

The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.`,
  '191': `Write a function that takes the binary representation of an unsigned integer and returns the number of '1' bits it has (also known as the Hamming weight).`,
  '198': `You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.

Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.`,
  '200': `Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.`,
  '206': `Given the head of a singly linked list, reverse the list, and return the reversed list.`,
  '217': `Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.`,
  '226': `Given the root of a binary tree, invert the tree, and return its root.`,
  '234': `Given the head of a singly linked list, return true if it is a palindrome or false otherwise.`,
  '235': `Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.

The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).`,
  '238': `Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].

The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

You must write an algorithm that runs in O(n) time and without using the division operation.`,
  '242': `Given two strings s and t, return true if t is an anagram of s, and false otherwise.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.`,
  '268': `Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.`,
  '283': `Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.

Note that you must do this in-place without making a copy of the array.`,
  '300': `Given an integer array nums, return the length of the longest strictly increasing subsequence.`,
  '322': `You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.`,
  '338': `Given an integer n, return an array ans of length n + 1 such that for each i (0 <= i <= n), ans[i] is the number of 1's in the binary representation of i.`,
  '344': `Write a function that reverses a string. The input string is given as an array of characters s.

You must do this by modifying the input array in-place with O(1) extra memory.`,
  '347': `Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.`,
  '509': `The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1.

Given n, calculate F(n).`,
  '543': `Given the root of a binary tree, return the length of the diameter of the tree.

The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.`,
  '572': `Given the roots of two binary trees root and subRoot, return true if there is a subtree of root with the same structure and node values of subRoot and false otherwise.`,
  '617': `You are given two binary trees root1 and root2.

Imagine that when you put one of them to cover the other, some nodes of the two trees are overlapped while the others are not. You need to merge the two trees into a new binary tree. The merge rule is that if two nodes overlap, then sum node values up as the new value of the merged node. Otherwise, the non-null node will be used as the node of the new tree.

Return the merged tree.`,
  '700': `You are given the root of a binary search tree (BST) and an integer val.

Find the node in the BST that the node's value equals val and return the subtree rooted with that node. If such a node does not exist, return null.`,
  '703': `Design a class to find the kth largest element in a stream. Note that it is the kth largest element in the sorted order, not the kth distinct element.

Implement KthLargest class with constructor and add method.`,
  '724': `Given an array of integers nums, calculate the pivot index of this array.

The pivot index is the index where the sum of all the numbers strictly to the left of the index is equal to the sum of all the numbers strictly to the index's right.`,
  '746': `You are given an integer array cost where cost[i] is the cost of ith step on a staircase. Once you pay the cost, you can either climb one or two steps.

You can either start from the step with index 0, or the step with index 1.

Return the minimum cost to reach the top of the floor.`,
  '876': `Given the head of a singly linked list, return the middle node of the linked list.

If there are two middle nodes, return the second middle node.`,
  '977': `Given an integer array nums sorted in non-decreasing order, return an array of the squares of each number sorted in non-decreasing order.`,
  '1046': `You are given an array of integers stones where stones[i] is the weight of the ith stone.

We are playing a game with the stones. On each turn, we choose the heaviest two stones and smash them together. Suppose the heaviest two stones have weights x and y with x <= y. The result of this smash is: if x == y, both stones are destroyed; if x != y, the stone of weight x is destroyed, and the stone of weight y has new weight y - x.

At the end of the game, there is at most one stone left. Return the weight of the last remaining stone. If there are no stones left, return 0.`,
  '1137': `The Tribonacci sequence Tn is defined as follows: T0 = 0, T1 = 1, T2 = 1, and Tn+3 = Tn + Tn+1 + Tn+2 for n >= 0.

Given n, return the value of Tn.`,
}

// Templates for common function signatures
function buildTemplates(id: string, title: string, difficulty: string, category: string) {
  const fnName = title
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .split(' ')
    .map((w, i) => i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1))
    .join('')

  // Use completeProblems templates if available
  if (completeProblems[id]?.templates) return completeProblems[id].templates

  return {
    javascript: `/**\n * @param {*} input\n * @return {*}\n */\nfunction ${fnName}() {\n    // Write your solution here\n    \n}`,
    python: `class Solution:\n    def ${fnName}(self) -> None:\n        # Write your solution here\n        pass`,
    java: `class Solution {\n    public void ${fnName}() {\n        // Write your solution here\n        \n    }\n}`,
    cpp: `class Solution {\npublic:\n    void ${fnName}() {\n        // Write your solution here\n        \n    }\n};`,
  }
}

async function main() {
  console.log('Seeding all problems...')

  // Deduplicate popularProblems by id (keep first occurrence)
  const seen = new Set<string>()
  const unique = (popularProblems as any[]).filter(p => {
    if (seen.has(p.id)) return false
    seen.add(p.id)
    return true
  })

  let created = 0, updated = 0, skipped = 0

  for (const p of unique) {
    const complete = completeProblems[p.id]

    // Skip if it's a generic stub
    const isStub = complete && complete.title.startsWith('Problem ')

    const examples = complete && !isStub
      ? complete.examples
      : (p.testCases || [])
          .filter((tc: any) => !tc.isHidden)
          .map((tc: any) => ({ input: tc.input, output: tc.expectedOutput }))

    if (examples.length === 0) {
      examples.push({ input: 'See problem statement', output: 'See problem statement' })
    }

    const testCases = p.testCases
      ? p.testCases.map((tc: any) => ({ input: tc.input, expectedOutput: tc.expectedOutput, isHidden: tc.isHidden }))
      : examples.map((e: any) => ({ input: e.input, expectedOutput: e.output, isHidden: false }))

    const description = (complete && !isStub)
      ? complete.description
      : (descriptions[p.id] || `Given the problem constraints, implement an efficient solution for "${p.title}".\n\nDifficulty: ${p.difficulty} | Category: ${p.category} | Acceptance: ${p.acceptance}`)

    const constraints = (complete && !isStub && complete.constraints?.length)
      ? complete.constraints
      : [`Difficulty: ${p.difficulty}`, `Category: ${p.category}`, 'Optimize for time and space complexity']

    try {
      const existing = await prisma.problem.findUnique({ where: { id: p.id } })

      if (existing) {
        // Only update if it has a generic description
        if (existing.description.startsWith('Given the problem constraints') || existing.description === '') {
          await prisma.problem.update({
            where: { id: p.id },
            data: { title: p.title, description, difficulty: p.difficulty, category: p.category, examples, constraints, templates: buildTemplates(p.id, p.title, p.difficulty, p.category), testCases },
          })
          updated++
        } else {
          skipped++
        }
      } else {
        await prisma.problem.create({
          data: {
            id: p.id,
            title: p.title,
            description,
            difficulty: p.difficulty,
            category: p.category,
            examples,
            constraints,
            templates: buildTemplates(p.id, p.title, p.difficulty, p.category),
            testCases,
          },
        })
        created++
      }
    } catch (e: any) {
      console.error(`Failed ${p.id} ${p.title}:`, e.message)
    }
  }

  console.log(`Done. Created: ${created}, Updated: ${updated}, Skipped: ${skipped}`)
  await prisma.$disconnect()
}

main()
