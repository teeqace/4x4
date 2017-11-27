import { messagePipeline } from '../core/MessagePipeline';

const TIME = 60;

cc.Class({
  extends: cc.Component,

  properties: {
    timerLabel: cc.Label,
    anim: cc.Animation
  },

  // use this for initialization
  onLoad: function () {
    messagePipeline.on('onGameStart', this._onGameStart, this);
    messagePipeline.on('onGameStartPressed', this._onGameStartPressed, this);
    this.timer = TIME;
    this.timerStart = false;
    this.isRed = false;
    this.redAnimation = 5;
  },

  _onGameStartPressed() {
    this.timer = TIME;
    this.timerLabel.string = this.timer;
    this.node.color = cc.hexToColor('#FFFFFF');
    this.isRed = false;
    this.redAnimation = 5;
  },

  _onGameStart() {
    this.timerStart = true;
  },

  update(dt) {
    if (!this.timerStart) {
      return;
    }
    this.timer = Math.max(0, this.timer - dt);
    this.timerLabel.string = Math.ceil(this.timer);
    if (!this.isRed && this.timer <= 5) {
      this.node.color = cc.hexToColor('#FF6600');
      this.isRed = true;
    }
    if (this.timer <= this.redAnimation) {
      this.redAnimation -= 1;
      this.anim.play('Timer');
    }
    if (this.timer <= 0) {
      this.timerStart = false;
      messagePipeline.sendMessage('onGameOver');
    }
  }
});
