'use client';

import { useState, useTransition } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { callDifyApi } from '@/service/dify/callDifyApi';

import { Textarea } from './ui/textarea';

export default function WorkflowBlocking() {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    startTransition(async () => {
      try {
        const result = await callDifyApi(input);
        setOutput(result);
      } catch (error) {
        setOutput(
          `エラーが発生しました: ${error instanceof Error ? error.message : String(error)}`
        );
      }
    });
  };

  return (
    <Card className="mx-auto w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Dify workflow API</CardTitle>
        <CardDescription>シンプルなワークフロー</CardDescription>
      </CardHeader>
      <CardContent>
        {/* 入力エリア */}
        <Textarea
          placeholder="質問を入力してください"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={4}
          className="mb-8 w-full text-base md:text-base"
          disabled={isPending}
        />
        {/* 出力エリア */}
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
        <Button
          onClick={handleSubmit}
          className="w-full"
          disabled={isPending || !input.trim()}
        >
          {isPending ? '送信中...' : '送信'}
        </Button>
      </CardFooter>
    </Card>
  );
}
