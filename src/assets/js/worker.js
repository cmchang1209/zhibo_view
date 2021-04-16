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
        onPlay: function(source) {
          self.postMessage({ type: 'hideLodaingIcon' })
        },
        ...config
      })
      var intervalID = setInterval(() => {
        if(this.player.source.socket.readyState !== 1) {
          this.player.destroy()
          clearInterval(intervalID)
          self.postMessage({ type: 'ws_erroe' })
        }
      },3000)
      break
  }
})
//self.postMessage({ type: 'ready', data: {} })
/* eslint-enable */
