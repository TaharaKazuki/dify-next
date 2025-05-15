const NEXT_API_ROUTE = '/api/workflow-block';

export const fetchDifyBlockingApi = async (
  input: string
): Promise<string | undefined> => {
  if (!input.trim()) return;

  try {
    const response = await fetch(NEXT_API_ROUTE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: input,
      }),
    });

    const result = (await response.json()) as string;
    return result;
  } catch (error) {
    console.error('API接続に失敗', error);
    return 'API接続に失敗しました';
  }
};
