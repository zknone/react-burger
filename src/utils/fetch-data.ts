type FetchData = {
  method?: 'GET' | 'POST' | 'DELETE' | 'PUT';
  headers?: Record<string, string>;
  body: unknown;
};

const fetchData = async <T>(url: string, options?: FetchData): Promise<T> => {
  try {
    const response = await fetch(url, {
      method: options?.method || 'GET',
      headers: {
        'Content-type': 'application/json',
        ...options?.headers,
      },
      body: options?.body ? JSON.stringify(options.body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`Http error. Status: ${response.status}`);
    }

    const data = (await response.json()) as T;
    return data;
  } catch (error) {
    throw new Error(`Problems with fetching data: ${error}`);
  }
};

export default fetchData;
