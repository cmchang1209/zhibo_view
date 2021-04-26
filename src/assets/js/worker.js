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
        disableGl: true,
        disableWebAssembly: true,
        pauseWhenHidden: false,
        videoBufferSize: 10 * 1024 * 1024,
        onPlay: function(source) {
          self.postMessage({ type: 'play' })
        },
        ...config
      })
      var intervalID = setInterval(() => {
        if (this.player.source.socket.readyState !== 1) {
          this.player.destroy()
          clearInterval(intervalID)
          self.postMessage({ type: 'destroy' })
        }
      }, 3000)
      break
    case 'destroy':
      this.player.destroy()
      self.postMessage({ type: 'destroy' })
      break
  }
})
//self.postMessage({ type: 'ready', data: {} })
/* eslint-enable */
