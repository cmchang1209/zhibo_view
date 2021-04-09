/* eslint-disable */
importScripts('./jsmpeg.min.js')
this.window = this
self.addEventListener('message', (evt) => {
  const data = evt.data
  switch (data.type) {
    case 'create':
      const { url, canvas, ...config } = data.data
      this.player = new JSMpeg.Player(url, {
        canvas,
        audio: false,
        pauseWhenHidden: false,
        videoBufferSize: 10 * 1024 * 1024,
        ...config,
      })
      break
  }
})
self.postMessage({ type: 'ready', data: {} })
/* eslint-enable */
