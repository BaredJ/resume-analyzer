import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { jd, resume } = body;

    // Validate input
    if (!jd || !resume) {
      return NextResponse.json(
        { error: 'Job description and resume are required' },
        { status: 400 }
      );
    }

    // Mock analysis result
    const mockResult = {
      score: 78,
      coverage: [
        { item: "Python", covered: true },
        { item: "Kubernetes", covered: false },
        { item: "JavaScript", covered: true },
        { item: "Docker", covered: true },
        { item: "AWS", covered: false },
        { item: "CI/CD", covered: false }
      ],
      missing: ["Kubernetes", "CI/CD", "AWS"],
      bullets: [
        "Improved backend API performance by 35% using Python optimizations",
        "Deployed microservices on Kubernetes to improve scalability",
        "Add more specific AWS experience to your resume",
        "Highlight any CI/CD pipeline experience you may have"
      ]
    };

    // Add a small delay to simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json(mockResult);
  } catch (error) {
    console.error('Error processing resume analysis:', error);
    return NextResponse.json(
      { error: 'Failed to analyze resume' },
      { status: 500 }
    );
  }
}
