import PrefabNodePool from '../core/PrefabNodePool';
import GameSetting from '../GameSetting';
import PieceMarker from './PieceMarker'
import Tiles from './Tiles'
import { messagePipeline } from '../core/MessagePipeline';

cc.Class({
  extends: cc.Component,

  properties: {
    piecePrefab: cc.Prefab,
    cues: {
      default: [],
      type: [cc.Node]
    },
    pieceTempNode: cc.Node,
    timerOverCover: cc.Node
  },

  // use this for initialization
  onLoad: function () {
    messagePipeline.on('onGameStartPressed', this._onGameStartPressed, this);
    messagePipeline.on('onTimeOver', this._onTimeOver, this);
    this._pieces = [];
    for (let i = 0; i < this.cues.length; i++) {
      let piece = cc.instantiate(this.piecePrefab);
      piece.on('onPieceTouch', this._onPieceTouch, this);
      piece.on('onPieceTouchEnd', this._onPieceTouchEnd, this);
      let pieceClass = piece.getComponent('Piece');
      pieceClass.init({
        cueNum: i
      });
      piece.parent = this.cues[i];
      this._pieces.push(pieceClass);
    }
  },
  
  _onGameStartPressed() {
    this.timerOverCover.active = false;
    for (let i = 0; i < this._pieces.length; i++) {
      this._pieces[i].shuffle();
    }
  },

  _onTimeOver() {
    this.timerOverCover.active = true;
  },

  _onPieceTouch(event) {
    let data = event.detail;
    let piece = data.piece;
    this.pieceCueNum = data.cueNum;
    piece.node.parent = this.pieceTempNode;
    piece.node.position = new cc.p(0, 0).sub(this.pieceTempNode.position).add(this.node.position).add(this.cues[this.pieceCueNum].position);
  },

  _onPieceTouchEnd(event) {
    let data = event.detail;
    let piece = data.piece;
    if (!data.isCancel) {
      if (PieceMarker.instance.piecePutX >= 0 && PieceMarker.instance.piecePutY >= 0) {
        Tiles.instance.putPiece(PieceMarker.instance.piecePutX, PieceMarker.instance.piecePutY, piece.types);
        piece.shuffle();
      }
    }
    piece.node.parent = this.cues[this.pieceCueNum];
    PieceMarker.instance.markerOff();
  } 

  // called every frame, uncomment this function to activate update callback
  // update: function (dt) {

  // },
});
