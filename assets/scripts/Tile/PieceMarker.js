import { messagePipeline } from '../core/MessagePipeline';
import Tiles from './Tiles';
import GameSetting from '../GameSetting';

const PieceMarker = cc.Class({
  extends: cc.Component,

  properties: {
    pieceTempNode: cc.Node,
    piecePutX: {
      visible: false,
      get: function() {
        return this._piecePutX;
      }
    },
    piecePutY: {
      visible: false,
      get: function() {
        return this._piecePutY;
      }
    }
  },
  
  statics: {
    instance: null,
  },

  // use this for initialization
  onLoad: function () {
    PieceMarker.instance = this;
    messagePipeline.on('onPieceMove', this._onPieceMove, this);
    let baseX = this.pieceTempNode.x - GameSetting.instance.tileSize / 2 * (GameSetting.instance.tileCountXY - 2);
    let baseY = this.pieceTempNode.y - GameSetting.instance.tileSize / 2 * (GameSetting.instance.tileCountXY - 2);
    this._posX = [];
    for (let x = 0; x < GameSetting.instance.tileCountXY - 1; x++) {
      this._posX.push(baseX + GameSetting.instance.tileSize * x);
    }
    this._posY = [];
    for (let y = 0; y < GameSetting.instance.tileCountXY - 1; y++) {
      this._posY.push(baseY + GameSetting.instance.tileSize * y);
    }
    this._piecePutX = -1;
    this._piecePutY = -1;
  },

  _onPieceMove(event) {
    let pos = event.getUserData();

    let xy = this._getMarkerPos(pos);
    this._piecePutX = xy[0];
    this._piecePutY = xy[1];

    if (xy[0] >= 0 && xy[1] >= 0) {
      this.node.opacity = 96;
      this.node.position = new cc.p(this._posX[xy[0]], this._posY[xy[1]]);
    } else {
      this.node.opacity = 0;
    }
    
  },

  _getMarkerPos(position) {
    let x = -1;
    let y = -1;
    position.addSelf(this.pieceTempNode.position);
    if (Tiles.instance.tilesMinPos.x <= position.x &&
        position.x <= Tiles.instance.tilesMaxPos.x &&
        Tiles.instance.tilesMinPos.y <= position.y &&
        position.y <= Tiles.instance.tilesMaxPos.y) {
      x = Math.floor((position.x - Tiles.instance.tilesMinPos.x) / GameSetting.instance.tileSize);
      y = Math.floor((position.y - Tiles.instance.tilesMinPos.y) / GameSetting.instance.tileSize);
      // cc.log(`${x}-${y}`);
    }
    return [x, y];
  },

  markerOff() {
    this.node.opacity = 0;
  }
  // called every frame, uncomment this function to activate update callback
  // update: function (dt) {

  // },
});

export default PieceMarker;
