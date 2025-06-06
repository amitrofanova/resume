import type { Ref } from 'vue';

interface UseFetchResult<T> {
  data: Ref<T | null>;
  error: Ref<Error | null>;
  loading: Ref<boolean>;
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
