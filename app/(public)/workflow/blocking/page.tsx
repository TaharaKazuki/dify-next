import WorkflowBlocking from '@/components/WorkflowBlocking';

export default function WorkflowBlockingPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-4xl">
        <h1 className="mb-8 text-center text-4xl font-bold">
          Dify workflow blocking API demo
        </h1>
        <WorkflowBlocking />
      </div>
    </main>
  );
}
