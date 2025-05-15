import WorkflowStreaming from '@/components/WorkflowStreaming';

export default function WorkflowStreamingPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-4xl">
        <h1 className="mb-8 text-center text-4xl font-bold">
          Dify workflow streaming API demo
        </h1>
        <WorkflowStreaming />
      </div>
    </main>
  );
}
