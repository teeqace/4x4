import { messagePipeline } from '../core/MessagePipeline';

cc.Class({
  extends: cc.Component,

  properties: {
    timerLabel: cc.Label
  },

  // use this for initialization
  onLoad: function () {
    this._timer = 4;
    this._countdownStart = false;
    messagePipeline.on('onGameStartPressed', this._onGameStartPressed, this);
  },

  _onGameStartPressed() {
    this.node.x = 0;
    this._timer = 4;
    this._countdownStart = true;
  },

  // called every frame, uncomment this function to activate update callback
  update: function (dt) {
    if (!this._countdownStart) {
      return;
    }
    this._timer = Math.max(0, this._timer - dt);
    if (this._timer >= 1) {
      this.timerLabel.string = Math.floor(this._timer);
    } else if (this._timer > 0) {
      this.timerLabel.string = 'GO!!';
    } else {
      this.node.x = 1000;
      this._countdownStart = false;
      messagePipeline.sendMessage('onGameStart');
    }

  },
});
