import { ref, onMounted } from 'vue';
import { Note } from '../App.vue';

export function useFetch(url: string) {
  const data = ref([] as Note[]);
  const error = ref<Error>();
  const loading = ref(true);

  const fetchData = async () => {
    loading.value = true;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      data.value = await response.json() as Note[];
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  onMounted(fetchData);

  const invalidate = () => {
    fetchData();
  };

  return { data, error, loading, invalidate };
}