import ResumeAnalyzer from '../components/ResumeAnalyzer';

export default function Home() {
  return (
    <div className="min-h-screen p-6 max-w-5xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Resume Match Analyzer</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Compare your resume against a job description to see how well you match
        </p>
      </header>

      <main>
        <ResumeAnalyzer />
      </main>
    </div>
  );
}
