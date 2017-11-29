import SEPlay from '../core/SEPlay';
import { messagePipeline } from '../core/MessagePipeline';

cc.Class({
  extends: cc.Component,

  properties: {
  },

  // use this for initialization
  onLoad: function () {
    this._anim = cc.scaleTo(0.2, 0);
    this._pressed = false;
    this.node.x = 0;
  },

  $pressStart(event, customEventData) {
    if (this._pressed) {
      return;
    }
    this.node.runAction(this._anim);
    this._pressed = true;
    SEPlay.instance.play('bgm');
    messagePipeline.sendMessage('onGameStartPressed', customEventData);
  }
});
