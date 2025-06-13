import EditorClient from "./EditorClient";

// Define problem and testCases here or fetch them dynamically based on params.id
export default function EditorPage({ params }: { params: { id: string } }) {
  const problem = {
    id: params.id,
    title: "Two Sum",
    difficulty: "Easy",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
      },
    ],
    constraints: [
      "2 <= nums.length <= 10⁴",
      "-10⁹ <= nums[i] <= 10⁹",
      "-10⁹ <= target <= 10⁹",
      "Only one valid answer exists.",
    ],
  };

  const testCases = [
    {
      input: "nums = [2,7,11,15], target = 9",
      expected: "[0,1]",
    },
    {
      input: "nums = [3,2,4], target = 6",
      expected: "[1,2]",
    },
    {
      input: "nums = [3,3], target = 6",
      expected: "[0,1]",
    },
  ];

  return (
    <EditorClient params={params} problem={problem} testCases={testCases} />
  );
}

export async function generateStaticParams() {
  // Replace with your actual logic to fetch problem IDs (e.g., from a database, API, or static file)
  const problemIds = ["1", "2", "3"]; // Placeholder: List of problem IDs

  return problemIds.map((id) => ({
    id, // Maps each ID to the `id` parameter in the dynamic route
  }));
}
