const SEPlay = cc.Class({
  extends: cc.Component,

  properties: {},

  statics: {
    instance: null,
  },

  // use this for initialization
  onLoad: function () {
    SEPlay.instance = this;
    this.audioSources = this.node.getComponents(cc.AudioSource)
    this.clipNames = []
    for (let i = 0; i < this.audioSources.length; i++) {
      let clipName = this.audioSources[i].clip
      this.clipNames.push(clipName.substring(clipName.lastIndexOf('/') + 1, clipName.lastIndexOf('.')))
    }
  },

  play(soundName) {
    let index = this.clipNames.indexOf(soundName);
    if (index >= 0) {
      this.audioSources[index].play();
    }
  }
});

export default SEPlay;
