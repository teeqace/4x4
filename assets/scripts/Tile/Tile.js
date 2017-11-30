import Tiles from './Tiles';
import { messagePipeline } from '../core/MessagePipeline';

const BOMB_TIME = 2;
const BOMB_TIME_TIMEROVER = 0.5;
const BOMB_TIME_EXTEND = 1;

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
    layerCount: {
      get: function () {
        return this._layerCount;
      },
      visible: false
    },
    isBomb: {
      get: function () {
        return this._isBomb;
      },
      visible: false
    },
    bombTimerNode: cc.Node,
    bombTimerFill: cc.Sprite
  },

  // use this for initialization
  onLoad: function () {
    messagePipeline.on('onTimeOver', this._onTimeOver, this);
    this._type = 0;
    this._layerCount = 0;
    this._flashTimer = Math.random() * 6;
    this._flashInterval = 0;
    // this._bombEffectTemp = 0;
    this._bombTimer = 0;
  },

  init(x, y) {
    this._x = x;
    this._y = y;
    this.bombReadyNode.opacity = 0;
    this.bombTimerNode.active = false;
  },

  restart(type) {
    this._type = type;
    this._layerCount = 1;
    this.layerCountLabel.string = this._layerCount;
    this.tileSpriteNode.color = Tiles.instance.getColor(this._type);
    this._setRandomFlashTime();
    this.bombReadyNode.opacity = 0;
    this.bombTimerNode.active = false;
    this._bombTimer = 0;
    this._bombTimerMax = BOMB_TIME;
  },

  _onTimeOver() {
    this._bombTimerMax = BOMB_TIME_TIMEROVER;
    if (this._isBomb && this._bombTimer > this._bombTimerMax) {
      this._bombTimer = this._bombTimerMax;
    }
  },

  update(dt) {
    if (this._flashTimer > 0 && this._type !== 0) {
      this._flashTimer -= dt;
      if (this._flashTimer <= 0) {
        this.flashAnimation.play();
        this._setRandomFlashTime();
      }
    }
    if (this._layerCount >= 4 && this.bombTimerNode.active) {
      this.bombTimerFill.fillRange = Tiles.instance.bombTimerRate;
    }
  },

  _setRandomFlashTime() {
    this._flashInterval = 6 + Math.random() * 6;
    this._flashTimer = this._flashInterval;
    this.layerCountLabel.string = this._layerCount;
  },

  tileSet(type) {
    if (this._type === type) {
      // this._layerCount = Math.min(4, this._layerCount + 1);
      this._layerCount += 1;
      this.tilesetAnimation.play();
      this.layerCountLabel.string = this._layerCount;
      messagePipeline.sendMessage('onAddScore', {
        event: 'tileSet',
        calc: `10`,
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
    // let isBombing = false;
    if (this._layerCount >= 4) {
      this.bomblize();
      // this.bombReadyAnimation.play();
      // this.bombTimerNode.active = true;
      // this._bombTimer = BOMB_TIME;
      // this.bombTimerFill.fillRange = this._bombTimer / BOMB_TIME;
      // isBombing = true;
    }
    // return isBombing;
    // this.layerCountLabel.string = this._layerCount;
  },

  bombClear(chains) {
    this._type = 0;
    this.tileSpriteNode.color = Tiles.instance.getColor(this._type);
    this.layerCountLabel.string = '';
    this.bombReadyAnimation.stop();
    this.bombReadyNode.opacity = 0;
    this.bombTimerNode.active = false;
    messagePipeline.sendMessage('onAddScore', {
      event: 'bombExplode',
      calc: `10 * ${this._layerCount} * ${chains}`,
      score: 10 * this._layerCount * chains
    });
    this._layerCount = 0;
    this._isBomb = false;
  },

  // bombEffectTemp() {
  //   this._bombEffectTemp += 1;
  // },

  // bombEffect() {
  //   if (this._bombEffectTemp > 0 && this._type !== 0) {
  //     this.bombAnimation.play();
  //     this._layerCount = Math.min(4, this._layerCount + this._bombEffectTemp);
  //     this.layerCountLabel.string = this._layerCount;
  //     messagePipeline.sendMessage('onAddScore', {
  //       score: 10 * this._bombEffectTemp
  //     });
  //   }
  //   if (this._layerCount >= 4) {
  //     this.bombReadyAnimation.play();
  //     this.bombTimerNode.active = true;
  //     this.bombTimerFill.fillRange = 1;
  //   }
  //   this._bombEffectTemp = 0;
  // },
  
  bombExplosionEffect() {
    if (this._type !== 0) {
      this.bombAnimation.play();
      // this._layerCount = Math.min(4, this._layerCount + 1);
      this._layerCount += 1;
      this.layerCountLabel.string = this._layerCount;
      messagePipeline.sendMessage('onAddScore', {
        event: 'bombExplodeEffect',
        calc: `10`,
        score: 10
      });
    }
    if (this._layerCount >= 4) {
      // this.bombReadyAnimation.play();
      // this.bombTimerNode.active = true;
      // this.bombTimerFill.fillRange = 1;
      this.bomblize();
    }
    // this._bombEffectTemp = 0;
  },

  bomblize() {
    if (!this._isBomb) {
      this._isBomb = true;
      this.bombReadyAnimation.play();
      this.bombTimerNode.active = true;
      this._bombTimer = this._bombTimerMax;
      this.bombTimerFill.fillRange = this._bombTimer / this._bombTimerMax;
    } else if (Tiles.instance.isNoBomb) {
      this._bombTimer += BOMB_TIME_EXTEND;
      this.bombTimerFill.fillRange = this._bombTimer / this._bombTimerMax;
    }
  },

  update(dt) {
    if (!this._isBomb) {
      return;
    }
    this._bombTimer -= dt;
    this.bombTimerFill.fillRange = Math.max(0, this._bombTimer / this._bombTimerMax);
    if (this._bombTimer <= 0) {
      this.node.emit('onBombExplode', {x: this._x, y: this._y});
    }
  }
});
