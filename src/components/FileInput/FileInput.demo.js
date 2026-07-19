import { registerDemo } from '../demoCommon.js'

registerDemo({
  id: 'tot-file-input',
  title: 'File Input',
  render: (container, { logEvent }) => {
    const wrapper = document.createElement('div')
    wrapper.className = 'stack'
    wrapper.innerHTML = `
      <div class="stack demo-group">
        <div class="demo-label">Single file dropzone</div>
        <tot-file-input label="Upload one file" help-text="Drag a file onto the dashed area or click to choose one.">
          <span slot="icon" aria-hidden="true">↥</span>
        </tot-file-input>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Multiple files</div>
        <tot-file-input label="Upload many files" help-text="Accepts several files at once." multiple></tot-file-input>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Directory-capable picker and dropzone</div>
        <tot-file-input label="Upload a folder" help-text="Directory picking uses browser directory support; folder drag and drop is handled recursively when available." multiple directory button-label="Choose folder"></tot-file-input>
      </div>
    `

    const fileInputs = wrapper.querySelectorAll('tot-file-input')
    for (let i = 0; i < fileInputs.length; i++) {
      const fileInput = fileInputs[i]
      fileInput.addEventListener('change', () => {
        logEvent(fileInput, 'change', {
          count: fileInput.files.length,
          entries: fileInput.entries,
        })
      })
      fileInput.addEventListener('clear', () => {
        logEvent(fileInput, 'clear', {
          count: fileInput.files.length,
        })
      })
    }

    container.appendChild(wrapper)
  },
})
