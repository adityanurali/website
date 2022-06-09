new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: "zauji",
          artist: "-",
          cover: "https://user-images.githubusercontent.com/69146268/172761854-bef7752a-1af8-473d-91a6-80a19fd5a97f.jpg",
          source: "https://pomf2.lain.la/f/ns6g4q2c.mp3",
          url: "https://youtu.be/QzyniHBtkuo",
          favorited: false
        },
        {
          name: "zaujati",
          artist: "-",
          cover: "https://user-images.githubusercontent.com/69146268/172761854-bef7752a-1af8-473d-91a6-80a19fd5a97f.jpg",
          source: "https://pomf2.lain.la/f/sf1dvirl.mp3",
          url: "https://youtu.be/pNzyjnWfOOo",
          favorited: true
        },
        {
          name: "enta eih",
          artist: "nancy ajram",
          cover: "https://user-images.githubusercontent.com/69146268/172761854-bef7752a-1af8-473d-91a6-80a19fd5a97f.jpg",
          source: "https://pomf2.lain.la/f/8b195yo.mp3",
          url: "https://youtu.be/X4ICDHjGImA",
          favorited: false
        },
        {
          name: "aah w noss",
          artist: "nancy ajram",
          cover: "https://user-images.githubusercontent.com/69146268/172761854-bef7752a-1af8-473d-91a6-80a19fd5a97f.jpg",
          source: "https://pomf2.lain.la/f/6twe8pwz.mp3",
          url: "https://youtu.be/Zgz8ybG6l-U",
          favorited: false
        },
        {
          name: "waylo",
          artist: "najwa farouk",
          cover: "https://user-images.githubusercontent.com/69146268/172761854-bef7752a-1af8-473d-91a6-80a19fd5a97f.jpg",
          source: "https://pomf2.lain.la/f/u5btczpm.mp3",
          url: "https://youtu.be/Z0bgEFnl4ls",
          favorited: true
        },
        {
          name: "matet 9oulub nass",
          artist: "najwa farouk",
          cover: "https://user-images.githubusercontent.com/69146268/172761854-bef7752a-1af8-473d-91a6-80a19fd5a97f.jpg",
          source: "https://pomf2.lain.la/f/j0u6dany.mp3",
          url: "https://youtu.be/6KihtRllV0Y",
          favorited: false
        },
        {
          name: "khalouni n3ich",
          artist: "najwa farouk",
          cover: "https://user-images.githubusercontent.com/69146268/172761854-bef7752a-1af8-473d-91a6-80a19fd5a97f.jpg",
          source: "https://pomf2.lain.la/f/toiplb9.mp3",
          url: "https://youtu.be/mzXIJiW-pxU",
          favorited: true
        },
        {
          name: "tasmauni robbah",
          artist: "nada sikkah",
          cover: "https://user-images.githubusercontent.com/69146268/172761854-bef7752a-1af8-473d-91a6-80a19fd5a97f.jpg",
          source: "https://pomf2.lain.la/f/u6g1q72p.mp3",
          url: "https://youtu.be/JS3ool2qqeI",
          favorited: false
        },
        {
          name: "ghanili",
          artist: "nada sikkah",
          cover: "https://user-images.githubusercontent.com/69146268/172761854-bef7752a-1af8-473d-91a6-80a19fd5a97f.jpg",
          source: "https://pomf2.lain.la/f/xrt5daa0.mp3",
          url: "https://youtu.be/Hjv2EPjXz4E",
          favorited: false
        }
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});