'use client';

import { useState } from 'react';

interface AnalysisResult {
  score: number;
  coverage: { item: string; covered: boolean }[];
  missing: string[];
  bullets: string[];
}

export default function ResumeAnalyzer() {
  const [jobDescription, setJobDescription] = useState('');
  const [resume, setResume] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jd: jobDescription, resume }),
      });
      
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error analyzing resume:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="jobDescription" className="block mb-2 font-medium">
            Job Description
          </label>
          <textarea
            id="jobDescription"
            className="w-full h-64 p-3 border rounded-md bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
            placeholder="Paste the job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="resume" className="block mb-2 font-medium">
            Your Resume
          </label>
          <textarea
            id="resume"
            className="w-full h-64 p-3 border rounded-md bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
            placeholder="Paste your resume here..."
            value={resume}
            onChange={(e) => setResume(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-center mb-8">
        <button
          onClick={handleAnalyze}
          disabled={loading || !jobDescription.trim() || !resume.trim()}
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Analyzing...' : 'Analyze Match'}
        </button>
      </div>

      {result && (
        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Match Score: <span className="text-blue-600">{result.score}</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">Skills Coverage</h3>
              <ul className="space-y-2">
                {result.coverage.map((item, index) => (
                  <li key={index} className="flex items-center">
                    <span className={`mr-2 ${item.covered ? 'text-green-500' : 'text-red-500'}`}>
                      {item.covered ? '✓' : '✗'}
                    </span>
                    {item.item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3">Missing Skills</h3>
              <ul className="list-disc list-inside space-y-1">
                {result.missing.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Suggested Improvements</h3>
              <ul className="list-disc list-inside space-y-2">
                {result.bullets.map((bullet, index) => (
                  <li key={index}>{bullet}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
