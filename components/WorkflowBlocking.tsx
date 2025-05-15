'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useWorkflowBlocking } from '@/hooks/useWorkflowBlocking';

import { Textarea } from './ui/textarea';

export default function WorkflowBlocking() {
  const { input, output, setInput, callDifyBlockingApi } =
    useWorkflowBlocking();

  return (
    <Card className="mx-auto w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Dify workflow API</CardTitle>
        <CardDescription>シンプルなワークフロー</CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="質問を入力してください"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={4}
          className="mb-8 w-full text-base md:text-base"
        />
        {output && (
          <div className="rounded-md bg-gray-100 p-4">
            <h3 className="mb-2 text-sm font-medium">回答:</h3>
            <p className="text-base whitespace-pre-wrap md:text-base">
              {output}
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={callDifyBlockingApi} className="w-full">
          送信
        </Button>
      </CardFooter>
    </Card>
  );
}
