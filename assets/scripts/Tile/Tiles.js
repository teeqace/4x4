import GameSetting from '../GameSetting';
import { messagePipeline } from '../core/MessagePipeline';
import SEPlay from '../core/SEPlay';

const CHAIN_TIME = 2000;

const Tiles = cc.Class({
  extends: cc.Component,

  properties: {
    tilePrefab: cc.Prefab,
    tilesMinPos: {
      visible: false,
      get: function() {
        return this._tilesMinPos;
      }
    },
    tilesMaxPos: {
      visible: false,
      get: function() {
        return this._tilesMaxPos;
      }
    },
    tileColors: {
      default: [],
      type: [cc.Color]
    }
  },

  statics: {
    instance: null,
  },

  // use this for initialization
  onLoad: function () {
    Tiles.instance = this;

    this._tiles = [];
    this._baseX = -(GameSetting.instance.tileSize / 2) * (GameSetting.instance.tileCountXY - 1);
    this._baseY = -(GameSetting.instance.tileSize / 2) * (GameSetting.instance.tileCountXY - 1);
    
    messagePipeline.on('onGameStartPressed', this._onGameStartPressed, this);

    for (let y = 0; y < GameSetting.instance.tileCountXY; y++) {
      let tilesRow = [];
      for (let x = 0; x < GameSetting.instance.tileCountXY; x++) {
        let tile = cc.instantiate(this.tilePrefab);
        tile.parent = this.node;
        tile.width = GameSetting.instance.tileSize;
        tile.height = GameSetting.instance.tileSize;
        tile.position = new cc.p(this._baseX + GameSetting.instance.tileSize * x, this._baseY + GameSetting.instance.tileSize * y);

        let tileClass = tile.getComponent('Tile');
        let id = `${x}-${y}`;
        tileClass.init(id);
        tilesRow.push(tileClass);
      }
      this._tiles.push(tilesRow);
    }
    let tilesSize = GameSetting.instance.tileSize * GameSetting.instance.tileCountXY;
    let minX = this.node.x - tilesSize / 2 + GameSetting.instance.tileSize / 2;
    let minY = this.node.y - tilesSize / 2 + GameSetting.instance.tileSize / 2;
    let maxX = this.node.x + tilesSize / 2 - GameSetting.instance.tileSize / 2;
    let maxY = this.node.y + tilesSize / 2 - GameSetting.instance.tileSize / 2;
    
    this._tilesMinPos = cc.p(minX, minY);
    this._tilesMaxPos = cc.p(maxX, maxY);

    this._isChaining = false;
  },

  _onGameStartPressed() {
    let initColors = {};
    let colorTable = [];
    for (let y = 0; y < GameSetting.instance.tileCountXY; y++) {
      for (let x = 0; x < GameSetting.instance.tileCountXY; x++) {
        colorTable = [];
        for (let c = 1; c < this.tileColors.length; c++) {
          if (x > 0 && initColors[`${x-1}-${y}`] === c ||
              y > 0 && initColors[`${x}-${y-1}`] === c) {
            continue;
          }
          colorTable.push(c);
        }
        let type = colorTable[Math.floor(Math.random() * colorTable.length)];
        this._tiles[y][x].restart(type);
        initColors[`${x}-${y}`] = type;
      }
    }
  },

  getColor(type) {
    return this.tileColors[type];
  },

  putPiece(baseX, baseY, types) {
    let bombExists = false;
    for (let y = 0; y < types.length; y++) {
      for (let x = 0; x < types[y].length; x++) {
        if (this._tiles[baseY + y][baseX + x].tileSet(types[y][x])) {
          bombExists = true;
        }
      }
    }
    SEPlay.instance.play('setpiece');
    if (!this._isChaining && bombExists) {
      this._isChaining = true;
      setTimeout(() => {
      this.chains = 1;
        this._bombCheck();
      }, CHAIN_TIME);
    }
  },

  _bombCheck() {
    SEPlay.instance.play('decision9');
    // cc.log('!!!BOMB_CHECK!!!');
    for (let y = 0; y < GameSetting.instance.tileCountXY; y++) {
      for (let x = 0; x < GameSetting.instance.tileCountXY; x++) {
        if (this._tiles[y][x].layerCount >= 4) {
          this._tiles[y][x].bombClear(this.chains);
          if (x > 0) {
            this._tiles[y][x-1].bombEffectTemp();
          }
          if (x < GameSetting.instance.tileCountXY - 1) {
            this._tiles[y][x+1].bombEffectTemp();
          }
          if (y > 0) {
            this._tiles[y-1][x].bombEffectTemp();
          }
          if (y < GameSetting.instance.tileCountXY - 1) {
            this._tiles[y+1][x].bombEffectTemp();
          }
        }
      }
    }
    let bombExist = false;
    for (let y = 0; y < GameSetting.instance.tileCountXY; y++) {
      for (let x = 0; x < GameSetting.instance.tileCountXY; x++) {
        this._tiles[y][x].bombEffect();
        if (this._tiles[y][x].layerCount >= 4) {
          bombExist = true;
        }
      }
    }
    if (bombExist) {
      this.chains += 1;
      setTimeout(() => {
        this._bombCheck();
      }, CHAIN_TIME);
    } else {
      this._isChaining = false;
    }
  },

  getShufflePiece() {
    let baseX = Math.floor(Math.random() * (GameSetting.instance.tileCountXY - 1));
    let baseY = Math.floor(Math.random() * (GameSetting.instance.tileCountXY - 1));
    return [
      [this._tiles[baseY][baseX].type, this._tiles[baseY][baseX + 1].type],
      [this._tiles[baseY + 1][baseX].type, this._tiles[baseY + 1][baseX + 1].type]
    ];
  }
  // called every frame, uncomment this function to activate update callback
  // update: function (dt) {

  // },
});

export default Tiles;
