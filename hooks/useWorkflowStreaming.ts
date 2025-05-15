import { useEffect, useRef, useState } from 'react';

import { fetchDifyStreamingApi } from '../service/dify/fetchStreamingApi';

type EventSourceType = {
  event: string;
  workflow_run_id: string;
  task_id: string;
  data: {
    text?: string;
    node_type?: string;
    outputs?: {
      result?: string;
      [key: string]: unknown;
    };
    [key: string]: unknown;
  };
  [key: string]: unknown;
};

export function useWorkflowStream() {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const eventSourceRef = useRef<EventSource | null>(null);
  const completeTextRef = useRef<string>('');

  const callDifyStreamingApi = async () => {
    if (!input.trim()) return;

    setOutput('処理を開始しています...');
    completeTextRef.current = '';

    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    try {
      const { eventSource } = fetchDifyStreamingApi(
        input,
        handleEventData,
        () => setOutput('エラーが発生しました')
      );

      eventSourceRef.current = eventSource;
    } catch (error) {
      console.error('API呼び出しエラー', error);
      setOutput('エラーが発生しました');
    }
  };

  const handleEventData = (eventData: EventSourceType) => {
    if (eventData.event === 'text_chunk') {
      appendText(eventData.data.text as string);
    }

    if (eventData.event === 'workflow_finished') {
      if (
        completeTextRef.current === '' ||
        completeTextRef.current === '処理を開始しています...'
      ) {
        appendText(eventData.data.outputs?.result as string);
      }
      if (eventSourceRef.current) eventSourceRef.current.close();
    }
  };

  const appendText = (text: string) => {
    if (!text.trim()) return;

    completeTextRef.current += text;
    setOutput(completeTextRef.current);
  };

  useEffect(() => {
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);

  return { input, output, setInput, callDifyStreamingApi };
}
