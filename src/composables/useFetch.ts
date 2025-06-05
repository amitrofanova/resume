import type { ShallowRef } from 'vue';

interface UseFetchResult<T> {
  data: ShallowRef<T | null>;
  error: ShallowRef<Error | null>;
  loading: ShallowRef<boolean>;
}

export function useFetch<T>(url: string): UseFetchResult<T> {
  const data = shallowRef<T | null>(null);
  const error = shallowRef<Error | null>(null);
  const loading = shallowRef(true);

  fetch(url)
    .then((res) => res.json())
    .then((json: T) => {
      data.value = json;
    })
    .catch((err: Error) => {
      error.value = err;
    })
    .finally(() => {
      loading.value = false;
    });

  return {
    data,
    error,
    loading,
  };
}
