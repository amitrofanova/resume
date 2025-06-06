import type { Ref } from 'vue';
import type { ApplicantData } from '../types/app';

interface UseFetchResult {
  data: Ref<ApplicantData | null>;
  error: Ref<Error | null>;
  loading: Ref<boolean>;
}

export function useFetch(url: string): UseFetchResult {
  const data = ref<ApplicantData | null>(null);
  const error = ref<Error | null>(null);
  const loading = ref(true);

  fetch(url)
    .then((res) => res.json())
    .then((json: ApplicantData) => {
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
