
const API_URL = 'http://192.168.1.6:8080/api/v1';

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown
): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      Accept: 'application/json',
      ...(body !== undefined && {
        'Content-Type': 'application/json',
      }),
    },
    ...(body !== undefined && {
      body: JSON.stringify(body),
    }),
  });

  const responseText = await response.text();

  if (!response.ok) {
    let message = responseText || 'Erro ao comunicar com a API';

    try {
      const errorData = JSON.parse(responseText);
      message = errorData.message || message;
    } catch {
      // Mantém a mensagem original.
    }

    throw new ApiError(response.status, message);
  }

  if (!responseText) {
    return undefined as T;
  }

  return JSON.parse(responseText) as T;
}

export function get<T>(path: string): Promise<T> {
  return request<T>('GET', path);
}

export function post<T>(path: string, data: unknown): Promise<T> {
  return request<T>('POST', path, data);
}

export function put<T>(path: string, data: unknown): Promise<T> {
  return request<T>('PUT', path, data);
}

export function del<T = void>(path: string): Promise<T> {
  return request<T>('DELETE', path);
}
