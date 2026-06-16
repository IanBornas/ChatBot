<script setup>
import { ref } from 'vue'
const emit = defineEmits(['files-selected'])

const maxFileSize = 25 * 1024 * 1024 // 25 MB
const inputRef = ref(null)
const previews = ref([])
const error = ref('')

function onTrigger() {
  inputRef.value && inputRef.value.click()
}

function onFiles(e) {
  const files = Array.from(e.target.files || [])
  handleFiles(files)
  // clear input so same file can be selected again
  if (e.target) e.target.value = ''
}

function handleFiles(files) {
  previews.value = []
  error.value = ''

  const accepted = []
  for (const file of files) {
    if (file.size > maxFileSize) {
      error.value = `File "${file.name}" exceeds 25MB limit.`
      continue
    }
    // push placeholder preview immediately
    const slot = { name: file.name, size: formatBytes(file.size), dataUrl: null, file }
    previews.value.push(slot)
    accepted.push(file)

    // read data for preview asynchronously
    const reader = new FileReader()
    reader.onload = (ev) => {
      const idx = previews.value.findIndex(p => p.file === file)
      if (idx !== -1) previews.value[idx].dataUrl = ev.target.result
    }
    reader.readAsDataURL(file)
  }

  // emit actual File objects immediately so parent can handle uploads
  if (accepted.length) {
    emit('files-selected', accepted)
  }
}

function remove(index) {
  previews.value.splice(index,1)
}

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 B'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['B','KB','MB','GB','TB']
  const i = Math.floor(Math.log(bytes)/Math.log(k))
  return parseFloat((bytes/Math.pow(k,i)).toFixed(dm)) + ' ' + sizes[i]
}
</script>

<template>
  <div id="file-upload-limit" data-file-upload class="w-full">
    <input ref="inputRef" type="file" class="hidden" @change="onFiles" multiple />

    <div class="bg-base-200/60 rounded-box flex flex-col justify-center border-2 border-base-content/20 border-dashed">
      <div class="text-center cursor-pointer p-6" @click="onTrigger" role="button" tabindex="0">
        <p class="text-base-content/50 mb-2 text-sm">Choose a file no larger than 25MB.</p>
        <button class="btn btn-soft btn-sm btn-primary text-nowrap"> <span class="icon-[tabler--file-upload] size-4.5 shrink-0"></span> Upload files </button>
        <p class="text-base-content/50 my-2 text-xs">or drag & drop here</p>
        <p class="link link-animated link-primary font-medium text-sm">Browse</p>
      </div>
      <div class="mx-6 mb-4 space-y-2">
        <div v-if="error" class="text-error text-sm">{{ error }}</div>
        <div v-for="(p, idx) in previews" :key="p.name" class="rounded-box bg-base-100 shadow-base-300/20 p-3 shadow-lg">
          <div class="mb-1 flex items-center justify-between">
            <div class="flex items-center gap-x-3">
              <span class="text-base-content/80 border-base-content/20 flex size-8 items-center justify-center rounded-lg border p-0.5">
                <img v-if="p.dataUrl && p.file.type.startsWith('image/')" :src="p.dataUrl" class="w-8 h-8 object-cover rounded-md" />
                <span v-else class="icon-[tabler--file-text] size-5"></span>
              </span>
              <div>
                <p class="text-base-content text-sm font-medium">
                  <span class="inline-block truncate align-bottom">{{ p.name }}</span>
                </p>
                <p class="text-base-content/50 text-xs">{{ p.size }}</p>
              </div>
            </div>
            <div class="flex items-center">
              <button type="button" class="btn btn-sm btn-circle btn-text" @click="remove(idx)">
                <span class="icon-[tabler--trash] size-4 shrink-0"></span>
              </button>
            </div>
          </div>
          <div class="flex items-center gap-x-3 whitespace-nowrap">
            <div class="progress h-2 w-full" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
              <div class="progress-bar progress-primary file-upload-complete:progress-success transition-all duration-500" style="width: 100%"></div>
            </div>
            <span class="text-base-content mb-0.5 text-sm">100%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
