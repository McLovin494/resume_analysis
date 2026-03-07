import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { extractText } from "unpdf";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GEMINI_API_KEY,
});
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;
    const jobTitle = formData.get("jobTitle") as string;
    const jobDescription = formData.get("jobDescription") as string;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json({ error: "Only PDFs allowed" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const { text } = await extractText(new Uint8Array(buffer), {
      mergePages: true,
    });
    console.log(text);

    const SYSTEM_PROMPT = `
You are an expert technical recruiter and ATS specialist.You given job title by JOB_TITLE and job description by JOB_DESCRIPTION.
JOB_TITLE=${jobTitle}
JOB_DESCRIPTION=${jobDescription}
Analyze the following resume and provide:

1. Resume Score (0-100)
2. Strengths
3. Weaknesses
4. Missing Skills
5. Suggestions for Improvement


Follow the response format provided. Make sure to respond to according to the format give by RESPONSE_FORMAT.
RESPONSE_FORMAT={
  "score": 72,
  "detectedSkills": ["React", "Node.js", "Docker", "AWS"],
  "missingKeywords": ["Kubernetes", "GraphQL", "CI/CD"],
  "atsScore": 65,
  "atsFriendly": false,
  "atsSummary": "Your resume lacks proper section headers and uses tables which most ATS systems cannot parse correctly. Consider using a single-column layout with standard headings.",
  "strengths": [
    "Strong frontend experience with React and TypeScript",
    "Demonstrated impact with quantified achievements",
    "Relevant project experience matching the role"
  ],
  "suggestions": [
    "Add Kubernetes to your skills section",
    "Use more keywords from the job description verbatim",
    "Replace table-based layout with plain text formatting"
  ]
}
Resume:
${text}
`;
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite-preview",
      contents: SYSTEM_PROMPT,
    });
    const raw = response.text;
    if (!raw) throw new Error("No response from Gemini");
    const clean = raw.replace(/```json|```/g, "").trim();
    const analysis = JSON.parse(clean);
    console.log(response.text);
    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Upload route error:", error);
    return NextResponse.json(
      { error: "Analysis failed. Please try again." },
      { status: 500 },
    );
  }
}
