import { messagePipeline } from '../core/MessagePipeline';
import Tiles from './Tiles';

cc.Class({
  extends: cc.Component,

  properties: {
    lt: cc.Node,
    rt: cc.Node,
    lb: cc.Node,
    rb: cc.Node,
    types: {
      visible: false,
      get: function() {
        return [
          [this._lbType, this._rbType],
          [this._ltType, this._rtType]
        ];
      }
    }
  },

  // use this for initialization
  onLoad: function () {
    messagePipeline.on('onGameOver', this._onTouchCancel, this);
  },
  
  init(data) {
    this._cueNum = data.cueNum;
  },

  start() {
    this._registerEvent()
  },

  onDestroy() {
    this._unregisterEvent()
  },

  shuffle() {
    // if (Math.random() < 0.5) {
      let types = Tiles.instance.getShufflePiece();
      this._lbType = types[0][0] === 0 ? this.getRandomType() : types[0][0];
      this._rbType = types[0][1] === 0 ? this.getRandomType() : types[0][1];
      this._ltType = types[1][0] === 0 ? this.getRandomType() : types[1][0];
      this._rtType = types[1][1] === 0 ? this.getRandomType() : types[1][1];
    // } else {
    //   this._lbType = this.getRandomType();
    //   this._rbType = this.getRandomType();
    //   this._ltType = this.getRandomType();
    //   this._rtType = this.getRandomType();
    // }
    this.lt.color = Tiles.instance.getColor(this._ltType);
    this.rt.color = Tiles.instance.getColor(this._rtType);
    this.lb.color = Tiles.instance.getColor(this._lbType);
    this.rb.color = Tiles.instance.getColor(this._rbType);
  },

  getRandomType() {
    return Math.floor(Math.random() * 4 + 1);
  },

  _registerEvent() {
    this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this)
    this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this)
    this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this)
    this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
  },

  _unregisterEvent() {
    this.node.off(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this)
    this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this)
    this.node.off(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this)
    this.node.off(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
  },
  
  _onTouchBegan(event) {
    this.node.emit('onPieceTouch', {
      piece: this,
      cueNum: this._cueNum
    });
    this.node.opacity = 191;
    this.node.setScale(0.75);
    this._touchStart = true;
  },

  _onTouchMove(event) {
    if (!this._touchStart) {
      return;
    }
    let delta = event.getDelta();
    this.node.position = this.node.position.add(delta);
    messagePipeline.sendMessage('onPieceMove', this.node.position);
  },

  _finishTouch(event, isCancel) {
    if (!this._touchStart) {
      return;
    }
    messagePipeline.sendMessage('onPieceMove', this.node.position);
    this.node.emit('onPieceTouchEnd', {
      piece: this,
      cueNum: this._cueNum,
      isCancel: isCancel
    });
    this.node.position = cc.p(0, 0);
    this.node.opacity = 255;
    this.node.setScale(1);
    this._touchStart = false;
  },

  _onTouchEnded(event) {
    this._finishTouch(event, false)
  },

  _onTouchCancel(event) {
    this._finishTouch(event, true)
  },

});
