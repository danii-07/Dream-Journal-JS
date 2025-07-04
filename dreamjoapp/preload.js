const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  saveDream: (dreamData) => ipcRenderer.invoke('save-dream', dreamData),
  loadDreams: () => ipcRenderer.invoke('load-dreams'),
  analyzeDream: (dreamContext) => ipcRenderer.invoke('analyze-dream', dreamContext),
});