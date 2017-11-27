const GameSetting = cc.Class({
  extends: cc.Component,

  properties: {
    tileSize: 96,
    tileCountXY: 4,
    tileType: {
      default: [],
      type: [cc.Color]
    }
  },
  
  statics: {
    instance: null,
  },

  // use this for initialization
  onLoad: function () {
    GameSetting.instance = this;
  },

  // called every frame, uncomment this function to activate update callback
  // update: function (dt) {

  // },
});

export default GameSetting;
