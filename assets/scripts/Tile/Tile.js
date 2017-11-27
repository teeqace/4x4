import Tiles from './Tiles';
import { messagePipeline } from '../core/MessagePipeline';

cc.Class({
  extends: cc.Component,

  properties: {
    layerCountLabel: cc.Label,
    tileSpriteNode: cc.Node,
    flashAnimation: cc.Animation,
    tilesetAnimation: cc.Animation,
    bombAnimation: cc.Animation,
    bombReadyAnimation: cc.Animation,
    bombReadyNode: cc.Node,
    type: {
      get: function () {
        return this._type;
      },
      visible: false
    },
    id: {
      get: function () {
        return this._id;
      },
      visible: false
    },
    layerCount: {
      get: function () {
        return this._layerCount;
      },
      visible: false
    }
  },

  // use this for initialization
  onLoad: function () {
    this._type = 0;
    this._layerCount = 0;
    this._id = '';
    this._flashTimer = Math.random() * 6;
    this._flashInterval = 0;
    this._bombEffectTemp = 0;
  },

  init(id) {
    this._id = id;
    this.bombReadyNode.opacity = 0;
  },

  restart(type) {
    this._type = type;
    this._layerCount = 1;
    this.layerCountLabel.string = this._layerCount;
    this.tileSpriteNode.color = Tiles.instance.getColor(this._type);
    this._setRandomFlashTime();
    this.bombReadyNode.opacity = 0;
  },

  update(dt) {
    if (this._flashTimer > 0 && this._type !== 0) {
      this._flashTimer -= dt;
      if (this._flashTimer <= 0) {
        this.flashAnimation.play();
        this._setRandomFlashTime();
      }
    }
  },

  _setRandomFlashTime() {
    this._flashInterval = 6 + Math.random() * 6;
    this._flashTimer = this._flashInterval;
    this.layerCountLabel.string = this._layerCount;
  },

  tileSet(type) {
    if (this._type === type) {
      this._layerCount = Math.min(4, this._layerCount + 1);
      this.tilesetAnimation.play();
      this.layerCountLabel.string = this._layerCount;
      messagePipeline.sendMessage('onAddScore', {
        score: 10
      });
    } else if (this._type === 0) {
      this._type = type;
      this._layerCount = 1;
      this.tileSpriteNode.color = Tiles.instance.getColor(this._type);
      this.layerCountLabel.string = this._layerCount;
    } else {
      // this._type = type;
      // this._layerCount = 1;
      // this.tileSpriteNode.color = Tiles.instance.getColor(this._type);
      // this.layerCountLabel.string = this._layerCount;
    }
    let isBombing = false;
    if (this._layerCount >= 4) {
      this.bombReadyAnimation.play();
      isBombing = true;
    }
    return isBombing;
    // this.layerCountLabel.string = this._layerCount;
  },

  bombClear(chains) {
    this._type = 0;
    this.tileSpriteNode.color = Tiles.instance.getColor(this._type);
    this._layerCount = 0;
    this.layerCountLabel.string = '';
    this.bombReadyAnimation.stop();
    this.bombReadyNode.opacity = 0;
    messagePipeline.sendMessage('onAddScore', {
      score: 50 * chains
    });
  },

  bombEffectTemp() {
    this._bombEffectTemp += 1;
  },

  bombEffect() {
    if (this._bombEffectTemp > 0 && this._type !== 0) {
      this.bombAnimation.play();
      this._layerCount = Math.min(4, this._layerCount + this._bombEffectTemp);
      this.layerCountLabel.string = this._layerCount;
      messagePipeline.sendMessage('onAddScore', {
        score: 10 * this._bombEffectTemp
      });
    }
    if (this._layerCount >= 4) {
      this.bombReadyAnimation.play();
    }
    this._bombEffectTemp = 0;
  }

  // called every frame, uncomment this function to activate update callback
  // update: function (dt) {

  // },
});
