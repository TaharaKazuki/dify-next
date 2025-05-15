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
import { useWorkflowStream } from '@/hooks/useWorkflowStreaming';

import { Textarea } from './ui/textarea';

export default function WorkflowStreaming() {
  const { input, setInput, output, callDifyStreamingApi } = useWorkflowStream();

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
        <Button onClick={callDifyStreamingApi} className="w-full">
          送信
        </Button>
      </CardFooter>
    </Card>
  );
}
