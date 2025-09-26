import { NextRequest, NextResponse } from 'next/server';

// Define the expected request payload type
interface AnalyzeRequestPayload {
  jd: string;
  resume: string;
}

// Type guard to validate the request payload
function isValidRequestPayload(payload: unknown): payload is AnalyzeRequestPayload {
  return (
    typeof payload === 'object' && 
    payload !== null &&
    'jd' in payload &&
    'resume' in payload &&
    typeof (payload as AnalyzeRequestPayload).jd === 'string' &&
    typeof (payload as AnalyzeRequestPayload).resume === 'string'
  );
}

export async function POST(request: NextRequest) {
  let body: unknown;
  
  try {
    // Parse the request body
    body = await request.json();
  } catch (error) {
    // Handle JSON parse errors specifically
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Bad request: Malformed JSON' },
        { status: 400 }
      );
    }
    // For other unexpected errors during parsing, rethrow
    throw error;
  }
  
  try {
    // Validate the request payload
    if (!isValidRequestPayload(body)) {
      return NextResponse.json(
        { error: 'Bad request: Invalid payload format. Expected {jd: string, resume: string}' },
        { status: 400 }
      );
    }
    
    // Now we can safely use the typed payload
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
