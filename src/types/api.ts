import type { ApplicantData } from './app';

export interface UseFetchResult {
  data: Ref<ApplicantData | null>;
  error: Ref<Error | null>;
  loading: Ref<boolean>;
}
