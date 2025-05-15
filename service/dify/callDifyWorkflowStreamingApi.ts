type EventHandler = (eventData: EventSourceType) => void;

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

/**
 * Difyワークフロー実行のストリーミングAPIを呼び出す
 */
export const callDifyWorkflowStreamingApi = (
  input: string,
  onMessage: EventHandler,
  onClose?: () => void
): { eventSource: EventSource; close: () => void } => {
  if (!input.trim()) {
    throw new Error('入力が空です');
  }

  const url = `/api/workflow-stream?query=${input}&user=user-123`;
  const eventSource = new EventSource(url);

  eventSource.onmessage = (event) => {
    try {
      const eventData = JSON.parse(event.data);
      onMessage(eventData);
    } catch (error) {
      console.error('イベント処理エラー', error);
      eventSource.close();
      if (onClose) onClose();
    }
  };

  return {
    eventSource,
    close: () => eventSource.close(),
  };
};
