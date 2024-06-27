<script setup>
import { ref, watch } from 'vue';
import Editor from '@tinymce/tinymce-vue'

const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

const content = ref(props.modelValue);

watch(() => props.modelValue, (newValue) => {
  if (newValue !== content.value) {
    content.value = newValue;
  }
});

watch(content, (newValue) => {
  emit('update:modelValue', newValue);
});
</script>

<template>
  <main id="sample">
    <Editor v-model="content" api-key="4bqqsnxi8urdwzqnjhwj0cpwxfp5ee3e8d8jhxolubag3f4q" :init="{
      toolbar_mode: 'sliding',
      menubar: false,
      plugins: 'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons accordion',
      statusbar: false,
    }" />
  </main>
</template>

<style scoped>
@media (min-width: 1024px) {
  #sample {
    display: flex;
    flex-direction: column;
    place-items: center;
    width: 100%;
  }
}
</style>