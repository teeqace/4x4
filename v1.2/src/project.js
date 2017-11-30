require=function e(t,i,s){function n(a,r){if(!i[a]){if(!t[a]){var c="function"==typeof require&&require;if(!r&&c)return c(a,!0);if(o)return o(a,!0);var l=new Error("Cannot find module '"+a+"'");throw l.code="MODULE_NOT_FOUND",l}var h=i[a]={exports:{}};t[a][0].call(h.exports,function(e){var i=t[a][1][e];return n(i||e)},h,h.exports,e,t,i,s)}return i[a].exports}for(var o="function"==typeof require&&require,a=0;a<s.length;a++)n(s[a]);return n}({DisplayStats:[function(e,t,i){"use strict";cc._RF.push(t,"056dbIJqH9L35uJVmcYgT1a","DisplayStats"),cc.Class({extends:cc.Component,properties:{displayStats:!0},onLoad:function(){cc.director.setDisplayStats(this.displayStats)}}),cc._RF.pop()},{}],GameOver:[function(e,t,i){"use strict";cc._RF.push(t,"5d9745ofx1MB5F43K0nZnlm","GameOver");var s=e("../core/MessagePipeline"),n=function(e){return e&&e.__esModule?e:{default:e}}(e("./Score"));cc.Class({extends:cc.Component,properties:{scoreLabel:cc.Label},onLoad:function(){this._anim=cc.scaleTo(.2,0),this._pressed=!1,s.messagePipeline.on("onGameOver",this._onGameOver,this)},_onGameOver:function(e){e.getUserData();this.scoreLabel.string=n.default.instance.score,this._pressed=!1,this.node.x=0,this.node.setScale(1)},$pressStart:function(e,t){this._pressed||(this.node.runAction(this._anim),this._pressed=!0,s.messagePipeline.sendMessage("onGameStartPressed",t))}}),cc._RF.pop()},{"../core/MessagePipeline":"MessagePipeline","./Score":"Score"}],GameSetting:[function(e,t,i){"use strict";cc._RF.push(t,"317e2zQWBxMjqxKWLfAQXp0","GameSetting"),Object.defineProperty(i,"__esModule",{value:!0});var s=cc.Class({extends:cc.Component,properties:{tileSize:96,tileCountXY:4,tileType:{default:[],type:[cc.Color]}},statics:{instance:null},onLoad:function(){s.instance=this}});i.default=s,t.exports=i.default,cc._RF.pop()},{}],MessagePipeline:[function(e,t,i){"use strict";function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}cc._RF.push(t,"c6bd7yC8F1GQauuFgAnipxX","MessagePipeline"),Object.defineProperty(i,"__esModule",{value:!0});var a=function(){function e(e,t){for(var i=0;i<t.length;i++){var s=t[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}return function(t,i,s){return i&&e(t.prototype,i),s&&e(t,s),t}}(),r=function(e){function t(){return s(this,t),n(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,cc.EventTarget),a(t,[{key:"sendMessage",value:function(e,t){this.emit(e,t)}}]),t}();i.messagePipeline=new r;cc._RF.pop()},{}],PieceMarker:[function(e,t,i){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}cc._RF.push(t,"50b4fNFNkJCQpXNuFSgr+5O","PieceMarker"),Object.defineProperty(i,"__esModule",{value:!0});var n=e("../core/MessagePipeline"),o=s(e("./Tiles")),a=s(e("../GameSetting")),r=cc.Class({extends:cc.Component,properties:{pieceTempNode:cc.Node,piecePutX:{visible:!1,get:function(){return this._piecePutX}},piecePutY:{visible:!1,get:function(){return this._piecePutY}}},statics:{instance:null},onLoad:function(){r.instance=this,n.messagePipeline.on("onPieceMove",this._onPieceMove,this);var e=this.pieceTempNode.x-a.default.instance.tileSize/2*(a.default.instance.tileCountXY-2),t=this.pieceTempNode.y-a.default.instance.tileSize/2*(a.default.instance.tileCountXY-2);this._posX=[];for(var i=0;i<a.default.instance.tileCountXY-1;i++)this._posX.push(e+a.default.instance.tileSize*i);this._posY=[];for(var s=0;s<a.default.instance.tileCountXY-1;s++)this._posY.push(t+a.default.instance.tileSize*s);this._piecePutX=-1,this._piecePutY=-1},_onPieceMove:function(e){var t=e.getUserData(),i=this._getMarkerPos(t);this._piecePutX=i[0],this._piecePutY=i[1],i[0]>=0&&i[1]>=0?(this.node.opacity=96,this.node.position=new cc.p(this._posX[i[0]],this._posY[i[1]])):this.node.opacity=0},_getMarkerPos:function(e){var t=-1,i=-1;return e.addSelf(this.pieceTempNode.position),o.default.instance.tilesMinPos.x<=e.x&&e.x<=o.default.instance.tilesMaxPos.x&&o.default.instance.tilesMinPos.y<=e.y&&e.y<=o.default.instance.tilesMaxPos.y&&(t=Math.floor((e.x-o.default.instance.tilesMinPos.x)/a.default.instance.tileSize),i=Math.floor((e.y-o.default.instance.tilesMinPos.y)/a.default.instance.tileSize)),[t,i]},markerOff:function(){this.node.opacity=0}});i.default=r,t.exports=i.default,cc._RF.pop()},{"../GameSetting":"GameSetting","../core/MessagePipeline":"MessagePipeline","./Tiles":"Tiles"}],Pieces:[function(e,t,i){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}cc._RF.push(t,"8565eq3HF1J2KMiq16g/+cj","Pieces");s(e("../core/PrefabNodePool")),s(e("../GameSetting"));var n=s(e("./PieceMarker")),o=s(e("./Tiles")),a=e("../core/MessagePipeline");cc.Class({extends:cc.Component,properties:{piecePrefab:cc.Prefab,cues:{default:[],type:[cc.Node]},pieceTempNode:cc.Node,timerOverCover:cc.Node},onLoad:function(){a.messagePipeline.on("onGameStartPressed",this._onGameStartPressed,this),a.messagePipeline.on("onTimeOver",this._onTimeOver,this),this._pieces=[];for(var e=0;e<this.cues.length;e++){var t=cc.instantiate(this.piecePrefab);t.on("onPieceTouch",this._onPieceTouch,this),t.on("onPieceTouchEnd",this._onPieceTouchEnd,this);var i=t.getComponent("Piece");i.init({cueNum:e}),t.parent=this.cues[e],this._pieces.push(i)}},_onGameStartPressed:function(){this.timerOverCover.active=!1;for(var e=0;e<this._pieces.length;e++)this._pieces[e].shuffle()},_onTimeOver:function(){this.timerOverCover.active=!0},_onPieceTouch:function(e){var t=e.detail,i=t.piece;this.pieceCueNum=t.cueNum,i.node.parent=this.pieceTempNode,i.node.position=new cc.p(0,0).sub(this.pieceTempNode.position).add(this.node.position).add(this.cues[this.pieceCueNum].position)},_onPieceTouchEnd:function(e){var t=e.detail,i=t.piece;t.isCancel||n.default.instance.piecePutX>=0&&n.default.instance.piecePutY>=0&&(o.default.instance.putPiece(n.default.instance.piecePutX,n.default.instance.piecePutY,i.types),i.shuffle()),i.node.parent=this.cues[this.pieceCueNum],n.default.instance.markerOff()}}),cc._RF.pop()},{"../GameSetting":"GameSetting","../core/MessagePipeline":"MessagePipeline","../core/PrefabNodePool":"PrefabNodePool","./PieceMarker":"PieceMarker","./Tiles":"Tiles"}],Piece:[function(e,t,i){"use strict";cc._RF.push(t,"6a185iKr5REMoEcqFst4q5b","Piece");var s=e("../core/MessagePipeline"),n=function(e){return e&&e.__esModule?e:{default:e}}(e("./Tiles"));cc.Class({extends:cc.Component,properties:{lt:cc.Node,rt:cc.Node,lb:cc.Node,rb:cc.Node,types:{visible:!1,get:function(){return[[this._lbType,this._rbType],[this._ltType,this._rtType]]}}},onLoad:function(){s.messagePipeline.on("onTimeOver",this._onTouchCancel,this)},init:function(e){this._cueNum=e.cueNum},start:function(){this._registerEvent()},onDestroy:function(){this._unregisterEvent()},shuffle:function(){var e=n.default.instance.getShufflePiece();this._lbType=0===e[0][0]?this.getRandomType():e[0][0],this._rbType=0===e[0][1]?this.getRandomType():e[0][1],this._ltType=0===e[1][0]?this.getRandomType():e[1][0],this._rtType=0===e[1][1]?this.getRandomType():e[1][1],this.lt.color=n.default.instance.getColor(this._ltType),this.rt.color=n.default.instance.getColor(this._rtType),this.lb.color=n.default.instance.getColor(this._lbType),this.rb.color=n.default.instance.getColor(this._rbType)},getRandomType:function(){return Math.floor(4*Math.random()+1)},_registerEvent:function(){this.node.on(cc.Node.EventType.TOUCH_START,this._onTouchBegan,this),this.node.on(cc.Node.EventType.TOUCH_END,this._onTouchEnded,this),this.node.on(cc.Node.EventType.TOUCH_CANCEL,this._onTouchCancel,this),this.node.on(cc.Node.EventType.TOUCH_MOVE,this._onTouchMove,this)},_unregisterEvent:function(){this.node.off(cc.Node.EventType.TOUCH_START,this._onTouchBegan,this),this.node.off(cc.Node.EventType.TOUCH_END,this._onTouchEnded,this),this.node.off(cc.Node.EventType.TOUCH_CANCEL,this._onTouchCancel,this),this.node.off(cc.Node.EventType.TOUCH_MOVE,this._onTouchMove,this)},_onTouchBegan:function(e){n.default.instance.isTimeOver||(this.node.emit("onPieceTouch",{piece:this,cueNum:this._cueNum}),this.node.opacity=191,this.node.setScale(.75),this._touchStart=!0)},_onTouchMove:function(e){if(this._touchStart){var t=e.getDelta();this.node.position=this.node.position.add(t),s.messagePipeline.sendMessage("onPieceMove",this.node.position)}},_finishTouch:function(e,t){if(this._touchStart){var i=e.getDelta();this.node.position=this.node.position.add(i),s.messagePipeline.sendMessage("onPieceMove",this.node.position),this.node.emit("onPieceTouchEnd",{piece:this,cueNum:this._cueNum,isCancel:t}),this.node.position=cc.p(0,0),this.node.opacity=255,this.node.setScale(1),this._touchStart=!1}},_onTouchEnded:function(e){this._finishTouch(e,!1)},_onTouchCancel:function(e){this._finishTouch(e,!0)}}),cc._RF.pop()},{"../core/MessagePipeline":"MessagePipeline","./Tiles":"Tiles"}],PrefabNodePool:[function(e,t,i){"use strict";function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}cc._RF.push(t,"596195/AKlKVbSmx8ZaCIUX","PrefabNodePool"),Object.defineProperty(i,"__esModule",{value:!0});var a=function(){function e(e,t){for(var i=0;i<t.length;i++){var s=t[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}return function(t,i,s){return i&&e(t.prototype,i),s&&e(t,s),t}}(),r=function e(t,i,s){null===t&&(t=Function.prototype);var n=Object.getOwnPropertyDescriptor(t,i);if(void 0===n){var o=Object.getPrototypeOf(t);return null===o?void 0:e(o,i,s)}if("value"in n)return n.value;var a=n.get;if(void 0!==a)return a.call(s)},c=function(e){function t(e,i,o,a){s(this,t);var r=n(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,a));return r._handler=a,r._prefab=e,r._capacity=i,r._increase=o,r._peak=0,r._toBePutBackToPool=[],r}return o(t,cc.NodePool),a(t,[{key:"init",value:function(){for(var e=0;e<this._capacity;e++){var i=this._createNode();r(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"put",this).call(this,i)}}},{key:"_createNode",value:function(){var e=cc.instantiate(this._prefab);if(this._handler){var t=e.getComponent(this._handler);t&&t.setPool(this)}return e}},{key:"get",value:function(e){if(0===this.size()){for(var i=0;i<this._increase;i++){var s=this._createNode();r(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"put",this).call(this,s)}this._capacity+=this._increase}var n=r(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"get",this).call(this,e);return this._peak=Math.max(this.countInUse,this._peak),n}},{key:"put",value:function(e){r(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"put",this).call(this,e)}},{key:"update",value:function(){}},{key:"countInUse",get:function(){return this._capacity-this.size()}},{key:"countPeak",get:function(){return this._peak}}]),t}();i.default=c,t.exports=i.default,cc._RF.pop()},{}],SEPlay:[function(e,t,i){"use strict";cc._RF.push(t,"e2cdcu11DhKepmuX7jWvIiC","SEPlay"),Object.defineProperty(i,"__esModule",{value:!0});var s=cc.Class({extends:cc.Component,properties:{},statics:{instance:null},onLoad:function(){s.instance=this,this.audioSources=this.node.getComponents(cc.AudioSource),this.clipNames=[];for(var e=0;e<this.audioSources.length;e++){var t=this.audioSources[e].clip;this.clipNames.push(t.substring(t.lastIndexOf("/")+1,t.lastIndexOf(".")))}},play:function(e){var t=this.clipNames.indexOf(e);t>=0&&this.audioSources[t].play()},stop:function(e){var t=this.clipNames.indexOf(e);t>=0&&this.audioSources[t].stop()}});i.default=s,t.exports=i.default,cc._RF.pop()},{}],Score:[function(e,t,i){"use strict";cc._RF.push(t,"70771quzlJJo7fzyO+NFFuy","Score"),Object.defineProperty(i,"__esModule",{value:!0});var s=e("../core/MessagePipeline"),n=cc.Class({extends:cc.Component,properties:{scoreLabel:cc.Label,score:{visible:!1,get:function(){return this._score}}},statics:{instance:null},onLoad:function(){n.instance=this,s.messagePipeline.on("onGameStartPressed",this._onGameStartPressed,this),s.messagePipeline.on("onAddScore",this._onAddScore,this)},_onGameStartPressed:function(){this._score=0,this.scoreLabel.string=this._score},_onAddScore:function(e){var t=e.getUserData();this._score+=t.score,this.scoreLabel.string=this._score,cc.log("addScore:"+t.score+" event:"+t.event+" calc:"+t.calc)}});i.default=n,t.exports=i.default,cc._RF.pop()},{"../core/MessagePipeline":"MessagePipeline"}],Splash:[function(e,t,i){"use strict";cc._RF.push(t,"6bafeedlbVIQ6SQJVzcJRGw","Splash");var s=e("../core/MessagePipeline");cc.Class({extends:cc.Component,properties:{},onLoad:function(){this._anim=cc.scaleTo(.2,0),this._pressed=!1,this.node.x=0},$pressStart:function(e,t){this._pressed||(this.node.runAction(this._anim),this._pressed=!0,s.messagePipeline.sendMessage("onGameStartPressed",t))}}),cc._RF.pop()},{"../core/MessagePipeline":"MessagePipeline"}],StartCountdown:[function(e,t,i){"use strict";cc._RF.push(t,"400b5pmMLZAEpywN9pF91pg","StartCountdown");var s=e("../core/MessagePipeline");cc.Class({extends:cc.Component,properties:{timerLabel:cc.Label},onLoad:function(){this._timer=4,this._countdownStart=!1,s.messagePipeline.on("onGameStartPressed",this._onGameStartPressed,this)},_onGameStartPressed:function(){this.node.x=0,this._timer=4,this._countdownStart=!0},update:function(e){this._countdownStart&&(this._timer=Math.max(0,this._timer-e),this._timer>=1?this.timerLabel.string=Math.floor(this._timer):this._timer>0?this.timerLabel.string="GO!!":(this.node.x=1e3,this._countdownStart=!1,s.messagePipeline.sendMessage("onGameStart")))}}),cc._RF.pop()},{"../core/MessagePipeline":"MessagePipeline"}],Tiles:[function(e,t,i){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}cc._RF.push(t,"16024ZML79C/ZU5h0+BP7CR","Tiles"),Object.defineProperty(i,"__esModule",{value:!0});var n=s(e("../GameSetting")),o=e("../core/MessagePipeline"),a=s(e("../core/SEPlay")),r=cc.Class({extends:cc.Component,properties:{tilePrefab:cc.Prefab,tilesMinPos:{visible:!1,get:function(){return this._tilesMinPos}},tilesMaxPos:{visible:!1,get:function(){return this._tilesMaxPos}},tileColors:{default:[],type:[cc.Color]},bombTimerRate:{visible:!1,get:function(){return this._chainTimer/2}},isNoBomb:{visible:!1,get:function(){return this._isNoBomb}},isTimeOver:{visible:!1,get:function(){return this._isTimeOver}},chainLabel:cc.Label},statics:{instance:null},onLoad:function(){r.instance=this,this._tiles=[],this._baseX=-n.default.instance.tileSize/2*(n.default.instance.tileCountXY-1),this._baseY=-n.default.instance.tileSize/2*(n.default.instance.tileCountXY-1),o.messagePipeline.on("onGameStartPressed",this._onGameStartPressed,this),o.messagePipeline.on("onTimeOver",this._onTimeOver,this);for(var e=0;e<n.default.instance.tileCountXY;e++){for(var t=[],i=0;i<n.default.instance.tileCountXY;i++){var s=cc.instantiate(this.tilePrefab);s.parent=this.node,s.width=n.default.instance.tileSize,s.height=n.default.instance.tileSize,s.position=new cc.p(this._baseX+n.default.instance.tileSize*i,this._baseY+n.default.instance.tileSize*e),s.on("onBombExplode",this._onBombExplode,this);var a=s.getComponent("Tile");a.init(i,e),t.push(a)}this._tiles.push(t)}var c=n.default.instance.tileSize*n.default.instance.tileCountXY,l=this.node.x-c/2+n.default.instance.tileSize/2,h=this.node.y-c/2+n.default.instance.tileSize/2,u=this.node.x+c/2-n.default.instance.tileSize/2,p=this.node.y+c/2-n.default.instance.tileSize/2;this._tilesMinPos=cc.p(l,h),this._tilesMaxPos=cc.p(u,p),this._isChaining=!1,this._chainTimer=0},_onGameStartPressed:function(e){var t=e.getUserData();this._isNoBomb="nobomb"===t,this._isTimeOver=!1;var i={},s=[];this.chainLabel.string="";for(var o=0;o<n.default.instance.tileCountXY;o++)for(var r=0;r<n.default.instance.tileCountXY;r++){s=[];for(var c=1;c<this.tileColors.length;c++)r>0&&i[r-1+"-"+o]===c||o>0&&i[r+"-"+(o-1)]===c||s.push(c);var l=s[Math.floor(Math.random()*s.length)];this._tiles[o][r].restart(l),i[r+"-"+o]=l}a.default.instance.play("bgm")},_onTimeOver:function(){this._isTimeOver=!0,this._bombExists()||o.messagePipeline.sendMessage("onGameOver"),a.default.instance.play("whistle"),a.default.instance.stop("bgm")},_bombExists:function(){for(var e=!1,t=0;t<n.default.instance.tileCountXY;t++){for(var i=0;i<n.default.instance.tileCountXY;i++)if(this._tiles[t][i].isBomb){e=!0;break}if(e)break}return e},getColor:function(e){return this.tileColors[e]},putPiece:function(e,t,i){for(var s=!1,n=0;n<i.length;n++)for(var o=0;o<i[n].length;o++)this._tiles[t+n][e+o].tileSet(i[n][o]),this._tiles[t+n][e+o].isBomb&&(s=!0);a.default.instance.play("setpiece"),!this._isChaining&&s&&(this._isChaining=!0,this._chainTimer=2,this.chains=1,this.chainLabel.string=this.chains)},_onBombExplode:function(e){a.default.instance.play("decision9");var t=e.detail;this._tiles[t.y][t.x].bombClear(this.chains),this._isNoBomb||(t.x>0&&this._tiles[t.y][t.x-1].bombExplosionEffect(),t.x<n.default.instance.tileCountXY-1&&this._tiles[t.y][t.x+1].bombExplosionEffect(),t.y>0&&this._tiles[t.y-1][t.x].bombExplosionEffect(),t.y<n.default.instance.tileCountXY-1&&this._tiles[t.y+1][t.x].bombExplosionEffect()),this._bombExists()?(this.chains+=1,this.chainLabel.string=this.chains):(this.chains=0,this.chainLabel.string="",this._isTimeOver&&o.messagePipeline.sendMessage("onGameOver"))},getShufflePiece:function(){var e=Math.floor(Math.random()*(n.default.instance.tileCountXY-1)),t=Math.floor(Math.random()*(n.default.instance.tileCountXY-1));return[[this._tiles[t][e].type,this._tiles[t][e+1].type],[this._tiles[t+1][e].type,this._tiles[t+1][e+1].type]]}});i.default=r,t.exports=i.default,cc._RF.pop()},{"../GameSetting":"GameSetting","../core/MessagePipeline":"MessagePipeline","../core/SEPlay":"SEPlay"}],Tile:[function(e,t,i){"use strict";cc._RF.push(t,"8ce51GMI9FNxZmhGmZUxURJ","Tile");var s=function(e){return e&&e.__esModule?e:{default:e}}(e("./Tiles")),n=e("../core/MessagePipeline");cc.Class(function(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}({extends:cc.Component,properties:{layerCountLabel:cc.Label,tileSpriteNode:cc.Node,flashAnimation:cc.Animation,tilesetAnimation:cc.Animation,bombAnimation:cc.Animation,bombReadyAnimation:cc.Animation,bombReadyNode:cc.Node,type:{get:function(){return this._type},visible:!1},layerCount:{get:function(){return this._layerCount},visible:!1},isBomb:{get:function(){return this._isBomb},visible:!1},bombTimerNode:cc.Node,bombTimerFill:cc.Sprite},onLoad:function(){n.messagePipeline.on("onTimeOver",this._onTimeOver,this),this._type=0,this._layerCount=0,this._flashTimer=6*Math.random(),this._flashInterval=0,this._bombTimer=0},init:function(e,t){this._x=e,this._y=t,this.bombReadyNode.opacity=0,this.bombTimerNode.active=!1},restart:function(e){this._type=e,this._layerCount=1,this.layerCountLabel.string=this._layerCount,this.tileSpriteNode.color=s.default.instance.getColor(this._type),this._setRandomFlashTime(),this.bombReadyNode.opacity=0,this.bombTimerNode.active=!1,this._bombTimer=0,this._bombTimerMax=2},_onTimeOver:function(){this._bombTimerMax=.5,this._isBomb&&this._bombTimer>this._bombTimerMax&&(this._bombTimer=this._bombTimerMax)},update:function(e){this._flashTimer>0&&0!==this._type&&(this._flashTimer-=e,this._flashTimer<=0&&(this.flashAnimation.play(),this._setRandomFlashTime())),this._layerCount>=4&&this.bombTimerNode.active&&(this.bombTimerFill.fillRange=s.default.instance.bombTimerRate)},_setRandomFlashTime:function(){this._flashInterval=6+6*Math.random(),this._flashTimer=this._flashInterval,this.layerCountLabel.string=this._layerCount},tileSet:function(e){this._type===e?(this._layerCount+=1,this.tilesetAnimation.play(),this.layerCountLabel.string=this._layerCount,n.messagePipeline.sendMessage("onAddScore",{event:"tileSet",calc:"10",score:10})):0===this._type&&(this._type=e,this._layerCount=1,this.tileSpriteNode.color=s.default.instance.getColor(this._type),this.layerCountLabel.string=this._layerCount),this._layerCount>=4&&this.bomblize()},bombClear:function(e){this._type=0,this.tileSpriteNode.color=s.default.instance.getColor(this._type),this.layerCountLabel.string="",this.bombReadyAnimation.stop(),this.bombReadyNode.opacity=0,this.bombTimerNode.active=!1,n.messagePipeline.sendMessage("onAddScore",{event:"bombExplode",calc:"10 * "+this._layerCount+" * "+e,score:10*this._layerCount*e}),this._layerCount=0,this._isBomb=!1},bombExplosionEffect:function(){0!==this._type&&(this.bombAnimation.play(),this._layerCount+=1,this.layerCountLabel.string=this._layerCount,n.messagePipeline.sendMessage("onAddScore",{event:"bombExplodeEffect",calc:"10",score:10})),this._layerCount>=4&&this.bomblize()},bomblize:function(){this._isBomb?s.default.instance.isNoBomb&&(this._bombTimer+=1,this.bombTimerFill.fillRange=this._bombTimer/this._bombTimerMax):(this._isBomb=!0,this.bombReadyAnimation.play(),this.bombTimerNode.active=!0,this._bombTimer=this._bombTimerMax,this.bombTimerFill.fillRange=this._bombTimer/this._bombTimerMax)}},"update",function(e){this._isBomb&&(this._bombTimer-=e,this.bombTimerFill.fillRange=Math.max(0,this._bombTimer/this._bombTimerMax),this._bombTimer<=0&&this.node.emit("onBombExplode",{x:this._x,y:this._y}))})),cc._RF.pop()},{"../core/MessagePipeline":"MessagePipeline","./Tiles":"Tiles"}],Timer:[function(e,t,i){"use strict";cc._RF.push(t,"37695p904lImpiImoDSDAab","Timer");var s=e("../core/MessagePipeline");cc.Class({extends:cc.Component,properties:{timerLabel:cc.Label,anim:cc.Animation,timerFill:cc.Sprite},onLoad:function(){s.messagePipeline.on("onGameStart",this._onGameStart,this),s.messagePipeline.on("onGameStartPressed",this._onGameStartPressed,this),this.timer=45,this.timerStart=!1,this.isRed=!1,this.redAnimation=5},_onGameStartPressed:function(){this.timer=45,this.timerLabel.string=this.timer,this.node.color=cc.hexToColor("#FFFFFF"),this.isRed=!1,this.redAnimation=5,this.timerFill.fillRange=1},_onGameStart:function(){this.timerStart=!0},update:function(e){this.timerStart&&(this.timer=Math.max(0,this.timer-e),this.timerLabel.string=Math.ceil(this.timer),this.timerFill.fillRange=this.timer/45,!this.isRed&&this.timer<=5&&(this.node.color=cc.hexToColor("#FF6600"),this.isRed=!0),this.timer<=this.redAnimation&&(this.redAnimation-=1,this.anim.play("Timer")),this.timer<=0&&(this.timerStart=!1,s.messagePipeline.sendMessage("onTimeOver")))}}),cc._RF.pop()},{"../core/MessagePipeline":"MessagePipeline"}]},{},["GameSetting","Piece","PieceMarker","Pieces","Tile","Tiles","DisplayStats","MessagePipeline","PrefabNodePool","SEPlay","GameOver","Score","Splash","StartCountdown","Timer"]);