import { messagePipeline } from '../core/MessagePipeline';
import Score from './Score';

cc.Class({
  extends: cc.Component,

  properties: {
    scoreLabel: cc.Label
  },

  // use this for initialization
  onLoad: function () {
    this._anim = cc.scaleTo(0.2, 0);
    this._pressed = false;
    messagePipeline.on('onGameOver', this._onGameOver, this);
  },

  _onGameOver(event) {
    let data = event.getUserData();
    this.scoreLabel.string = Score.instance.score;
    this._pressed = false;
    this.node.x = 0;
    this.node.setScale(1);
  },

  $pressStart() {
    if (this._pressed) {
      return;
    }
    this.node.runAction(this._anim);
    this._pressed = true;
    messagePipeline.sendMessage('onGameStartPressed');
  }
});
