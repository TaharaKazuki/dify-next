import { useState } from 'react';

import { fetchDifyBlockingApi } from '../service/dify/fetchBlockingApi';

export const useWorkflowBlocking = () => {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');

  const callDifyBlockingApi = async () => {
    if (!input.trim()) return;

    setOutput('処理を開始しています...');

    try {
      const result = await fetchDifyBlockingApi(input);
      setOutput(result.result || '');
    } catch (error) {
      console.error('API呼び出しエラー', error);
      setOutput('エラーが発生しました');
    }
  };

  return { input, output, setInput, callDifyBlockingApi };
};
