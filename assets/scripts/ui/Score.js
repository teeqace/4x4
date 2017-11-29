import { messagePipeline } from '../core/MessagePipeline';

const Score = cc.Class({
  extends: cc.Component,

  properties: {
    scoreLabel: cc.Label,
    score: {
      visible: false,
      get: function() {
        return this._score;
      }
    }
  },
  
  statics: {
    instance: null,
  },

  // use this for initialization
  onLoad: function () {
    Score.instance = this;
    messagePipeline.on('onGameStartPressed', this._onGameStartPressed, this);
    messagePipeline.on('onAddScore', this._onAddScore, this);
  },

  _onGameStartPressed() {
    this._score = 0;
    this.scoreLabel.string = this._score;
  },

  _onAddScore(event) {
    let data = event.getUserData();

    this._score += data.score;
    this.scoreLabel.string = this._score;

    cc.log(`addScore:${data.score} event:${data.event} calc:${data.calc}`);
  }
  // called every frame, uncomment this function to activate update callback
  // update: function (dt) {

  // },
});

export default Score;
