export const problemTestCases = {
  "1": { // Two Sum
    testCases: [
      { input: "[2,7,11,15]\n9", expected: "[0,1]" },
      { input: "[3,2,4]\n6", expected: "[1,2]" },
      { input: "[3,3]\n6", expected: "[0,1]" }
    ],
    timeLimit: 2000, // 2 seconds
    memoryLimit: 256 // 256 MB
  },
  "2": { // Add Two Numbers
    testCases: [
      { input: "[2,4,3]\n[5,6,4]", expected: "[7,0,8]" },
      { input: "[0]\n[0]", expected: "[0]" }
    ],
    timeLimit: 2000,
    memoryLimit: 256
  }
}