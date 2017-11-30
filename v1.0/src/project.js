require=function e(t,i,n){function s(a,c){if(!i[a]){if(!t[a]){var r="function"==typeof require&&require;if(!c&&r)return r(a,!0);if(o)return o(a,!0);var l=new Error("Cannot find module '"+a+"'");throw l.code="MODULE_NOT_FOUND",l}var u=i[a]={exports:{}};t[a][0].call(u.exports,function(e){var i=t[a][1][e];return s(i||e)},u,u.exports,e,t,i,n)}return i[a].exports}for(var o="function"==typeof require&&require,a=0;a<n.length;a++)s(n[a]);return s}({DisplayStats:[function(e,t,i){"use strict";cc._RF.push(t,"056dbIJqH9L35uJVmcYgT1a","DisplayStats"),cc.Class({extends:cc.Component,properties:{displayStats:!0},onLoad:function(){cc.director.setDisplayStats(this.displayStats)}}),cc._RF.pop()},{}],GameOver:[function(e,t,i){"use strict";cc._RF.push(t,"5d9745ofx1MB5F43K0nZnlm","GameOver");var n=e("../core/MessagePipeline"),s=function(e){return e&&e.__esModule?e:{default:e}}(e("./Score"));cc.Class({extends:cc.Component,properties:{scoreLabel:cc.Label},onLoad:function(){this._anim=cc.scaleTo(.2,0),this._pressed=!1,n.messagePipeline.on("onGameOver",this._onGameOver,this)},_onGameOver:function(e){e.getUserData();this.scoreLabel.string=s.default.instance.score,this._pressed=!1,this.node.x=0,this.node.setScale(1)},$pressStart:function(){this._pressed||(this.node.runAction(this._anim),this._pressed=!0,n.messagePipeline.sendMessage("onGameStartPressed"))}}),cc._RF.pop()},{"../core/MessagePipeline":"MessagePipeline","./Score":"Score"}],GameSetting:[function(e,t,i){"use strict";cc._RF.push(t,"317e2zQWBxMjqxKWLfAQXp0","GameSetting"),Object.defineProperty(i,"__esModule",{value:!0});var n=cc.Class({extends:cc.Component,properties:{tileSize:96,tileCountXY:4,tileType:{default:[],type:[cc.Color]}},statics:{instance:null},onLoad:function(){n.instance=this}});i.default=n,t.exports=i.default,cc._RF.pop()},{}],MessagePipeline:[function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}cc._RF.push(t,"c6bd7yC8F1GQauuFgAnipxX","MessagePipeline"),Object.defineProperty(i,"__esModule",{value:!0});var a=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),c=function(e){function t(){return n(this,t),s(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,cc.EventTarget),a(t,[{key:"sendMessage",value:function(e,t){this.emit(e,t)}}]),t}();i.messagePipeline=new c;cc._RF.pop()},{}],PieceMarker:[function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}cc._RF.push(t,"50b4fNFNkJCQpXNuFSgr+5O","PieceMarker"),Object.defineProperty(i,"__esModule",{value:!0});var s=e("../core/MessagePipeline"),o=n(e("./Tiles")),a=n(e("../GameSetting")),c=cc.Class({extends:cc.Component,properties:{pieceTempNode:cc.Node,piecePutX:{visible:!1,get:function(){return this._piecePutX}},piecePutY:{visible:!1,get:function(){return this._piecePutY}}},statics:{instance:null},onLoad:function(){c.instance=this,s.messagePipeline.on("onPieceMove",this._onPieceMove,this);var e=this.pieceTempNode.x-a.default.instance.tileSize/2*(a.default.instance.tileCountXY-2),t=this.pieceTempNode.y-a.default.instance.tileSize/2*(a.default.instance.tileCountXY-2);this._posX=[];for(var i=0;i<a.default.instance.tileCountXY-1;i++)this._posX.push(e+a.default.instance.tileSize*i);this._posY=[];for(var n=0;n<a.default.instance.tileCountXY-1;n++)this._posY.push(t+a.default.instance.tileSize*n);this._piecePutX=-1,this._piecePutY=-1},_onPieceMove:function(e){var t=e.getUserData(),i=this._getMarkerPos(t);this._piecePutX=i[0],this._piecePutY=i[1],i[0]>=0&&i[1]>=0?(this.node.opacity=96,this.node.position=new cc.p(this._posX[i[0]],this._posY[i[1]])):this.node.opacity=0},_getMarkerPos:function(e){var t=-1,i=-1;return e.addSelf(this.pieceTempNode.position),o.default.instance.tilesMinPos.x<=e.x&&e.x<=o.default.instance.tilesMaxPos.x&&o.default.instance.tilesMinPos.y<=e.y&&e.y<=o.default.instance.tilesMaxPos.y&&(t=Math.floor((e.x-o.default.instance.tilesMinPos.x)/a.default.instance.tileSize),i=Math.floor((e.y-o.default.instance.tilesMinPos.y)/a.default.instance.tileSize)),[t,i]},markerOff:function(){this.node.opacity=0}});i.default=c,t.exports=i.default,cc._RF.pop()},{"../GameSetting":"GameSetting","../core/MessagePipeline":"MessagePipeline","./Tiles":"Tiles"}],Pieces:[function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}cc._RF.push(t,"8565eq3HF1J2KMiq16g/+cj","Pieces");n(e("../core/PrefabNodePool")),n(e("../GameSetting"));var s=n(e("./PieceMarker")),o=n(e("./Tiles")),a=e("../core/MessagePipeline");cc.Class({extends:cc.Component,properties:{piecePrefab:cc.Prefab,cues:{default:[],type:[cc.Node]},pieceTempNode:cc.Node},onLoad:function(){a.messagePipeline.on("onGameStartPressed",this._onGameStartPressed,this),this._pieces=[];for(var e=0;e<this.cues.length;e++){var t=cc.instantiate(this.piecePrefab);t.on("onPieceTouch",this._onPieceTouch,this),t.on("onPieceTouchEnd",this._onPieceTouchEnd,this);var i=t.getComponent("Piece");i.init({cueNum:e}),t.parent=this.cues[e],this._pieces.push(i)}},_onGameStartPressed:function(){for(var e=0;e<this._pieces.length;e++)this._pieces[e].shuffle()},_onPieceTouch:function(e){var t=e.detail,i=t.piece;this.pieceCueNum=t.cueNum,i.node.parent=this.pieceTempNode,i.node.position=new cc.p(0,0).sub(this.pieceTempNode.position).add(this.node.position).add(this.cues[this.pieceCueNum].position)},_onPieceTouchEnd:function(e){var t=e.detail,i=t.piece;t.isCancel||s.default.instance.piecePutX>=0&&s.default.instance.piecePutY>=0&&(o.default.instance.putPiece(s.default.instance.piecePutX,s.default.instance.piecePutY,i.types),i.shuffle()),i.node.parent=this.cues[this.pieceCueNum],s.default.instance.markerOff()}}),cc._RF.pop()},{"../GameSetting":"GameSetting","../core/MessagePipeline":"MessagePipeline","../core/PrefabNodePool":"PrefabNodePool","./PieceMarker":"PieceMarker","./Tiles":"Tiles"}],Piece:[function(e,t,i){"use strict";cc._RF.push(t,"6a185iKr5REMoEcqFst4q5b","Piece");var n=e("../core/MessagePipeline"),s=function(e){return e&&e.__esModule?e:{default:e}}(e("./Tiles"));cc.Class({extends:cc.Component,properties:{lt:cc.Node,rt:cc.Node,lb:cc.Node,rb:cc.Node,types:{visible:!1,get:function(){return[[this._lbType,this._rbType],[this._ltType,this._rtType]]}}},onLoad:function(){n.messagePipeline.on("onGameOver",this._onTouchCancel,this)},init:function(e){this._cueNum=e.cueNum},start:function(){this._registerEvent()},onDestroy:function(){this._unregisterEvent()},shuffle:function(){var e=s.default.instance.getShufflePiece();this._lbType=0===e[0][0]?this.getRandomType():e[0][0],this._rbType=0===e[0][1]?this.getRandomType():e[0][1],this._ltType=0===e[1][0]?this.getRandomType():e[1][0],this._rtType=0===e[1][1]?this.getRandomType():e[1][1],this.lt.color=s.default.instance.getColor(this._ltType),this.rt.color=s.default.instance.getColor(this._rtType),this.lb.color=s.default.instance.getColor(this._lbType),this.rb.color=s.default.instance.getColor(this._rbType)},getRandomType:function(){return Math.floor(4*Math.random()+1)},_registerEvent:function(){this.node.on(cc.Node.EventType.TOUCH_START,this._onTouchBegan,this),this.node.on(cc.Node.EventType.TOUCH_END,this._onTouchEnded,this),this.node.on(cc.Node.EventType.TOUCH_CANCEL,this._onTouchCancel,this),this.node.on(cc.Node.EventType.TOUCH_MOVE,this._onTouchMove,this)},_unregisterEvent:function(){this.node.off(cc.Node.EventType.TOUCH_START,this._onTouchBegan,this),this.node.off(cc.Node.EventType.TOUCH_END,this._onTouchEnded,this),this.node.off(cc.Node.EventType.TOUCH_CANCEL,this._onTouchCancel,this),this.node.off(cc.Node.EventType.TOUCH_MOVE,this._onTouchMove,this)},_onTouchBegan:function(e){this.node.emit("onPieceTouch",{piece:this,cueNum:this._cueNum}),this.node.opacity=191,this.node.setScale(.75),this._touchStart=!0},_onTouchMove:function(e){if(this._touchStart){var t=e.getDelta();this.node.position=this.node.position.add(t),n.messagePipeline.sendMessage("onPieceMove",this.node.position)}},_finishTouch:function(e,t){this._touchStart&&(n.messagePipeline.sendMessage("onPieceMove",this.node.position),this.node.emit("onPieceTouchEnd",{piece:this,cueNum:this._cueNum,isCancel:t}),this.node.position=cc.p(0,0),this.node.opacity=255,this.node.setScale(1),this._touchStart=!1)},_onTouchEnded:function(e){this._finishTouch(e,!1)},_onTouchCancel:function(e){this._finishTouch(e,!0)}}),cc._RF.pop()},{"../core/MessagePipeline":"MessagePipeline","./Tiles":"Tiles"}],PrefabNodePool:[function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}cc._RF.push(t,"596195/AKlKVbSmx8ZaCIUX","PrefabNodePool"),Object.defineProperty(i,"__esModule",{value:!0});var a=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),c=function e(t,i,n){null===t&&(t=Function.prototype);var s=Object.getOwnPropertyDescriptor(t,i);if(void 0===s){var o=Object.getPrototypeOf(t);return null===o?void 0:e(o,i,n)}if("value"in s)return s.value;var a=s.get;if(void 0!==a)return a.call(n)},r=function(e){function t(e,i,o,a){n(this,t);var c=s(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,a));return c._handler=a,c._prefab=e,c._capacity=i,c._increase=o,c._peak=0,c._toBePutBackToPool=[],c}return o(t,cc.NodePool),a(t,[{key:"init",value:function(){for(var e=0;e<this._capacity;e++){var i=this._createNode();c(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"put",this).call(this,i)}}},{key:"_createNode",value:function(){var e=cc.instantiate(this._prefab);if(this._handler){var t=e.getComponent(this._handler);t&&t.setPool(this)}return e}},{key:"get",value:function(e){if(0===this.size()){for(var i=0;i<this._increase;i++){var n=this._createNode();c(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"put",this).call(this,n)}this._capacity+=this._increase}var s=c(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"get",this).call(this,e);return this._peak=Math.max(this.countInUse,this._peak),s}},{key:"put",value:function(e){c(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"put",this).call(this,e)}},{key:"update",value:function(){}},{key:"countInUse",get:function(){return this._capacity-this.size()}},{key:"countPeak",get:function(){return this._peak}}]),t}();i.default=r,t.exports=i.default,cc._RF.pop()},{}],SEPlay:[function(e,t,i){"use strict";cc._RF.push(t,"e2cdcu11DhKepmuX7jWvIiC","SEPlay"),Object.defineProperty(i,"__esModule",{value:!0});var n=cc.Class({extends:cc.Component,properties:{},statics:{instance:null},onLoad:function(){n.instance=this,this.audioSources=this.node.getComponents(cc.AudioSource),this.clipNames=[];for(var e=0;e<this.audioSources.length;e++){var t=this.audioSources[e].clip;this.clipNames.push(t.substring(t.lastIndexOf("/")+1,t.lastIndexOf(".")))}},play:function(e){var t=this.clipNames.indexOf(e);t>=0&&this.audioSources[t].play()}});i.default=n,t.exports=i.default,cc._RF.pop()},{}],Score:[function(e,t,i){"use strict";cc._RF.push(t,"70771quzlJJo7fzyO+NFFuy","Score"),Object.defineProperty(i,"__esModule",{value:!0});var n=e("../core/MessagePipeline"),s=cc.Class({extends:cc.Component,properties:{scoreLabel:cc.Label,score:{visible:!1,get:function(){return this._score}}},statics:{instance:null},onLoad:function(){s.instance=this,n.messagePipeline.on("onGameStartPressed",this._onGameStartPressed,this),n.messagePipeline.on("onAddScore",this._onAddScore,this)},_onGameStartPressed:function(){this._score=0,this.scoreLabel.string=this._score},_onAddScore:function(e){var t=e.getUserData();this._score+=t.score,this.scoreLabel.string=this._score}});i.default=s,t.exports=i.default,cc._RF.pop()},{"../core/MessagePipeline":"MessagePipeline"}],Splash:[function(e,t,i){"use strict";cc._RF.push(t,"6bafeedlbVIQ6SQJVzcJRGw","Splash");var n=function(e){return e&&e.__esModule?e:{default:e}}(e("../core/SEPlay")),s=e("../core/MessagePipeline");cc.Class({extends:cc.Component,properties:{},onLoad:function(){this._anim=cc.scaleTo(.2,0),this._pressed=!1,this.node.x=0},$pressStart:function(){this._pressed||(this.node.runAction(this._anim),this._pressed=!0,n.default.instance.play("bgm"),s.messagePipeline.sendMessage("onGameStartPressed"))}}),cc._RF.pop()},{"../core/MessagePipeline":"MessagePipeline","../core/SEPlay":"SEPlay"}],StartCountdown:[function(e,t,i){"use strict";cc._RF.push(t,"400b5pmMLZAEpywN9pF91pg","StartCountdown");var n=e("../core/MessagePipeline");cc.Class({extends:cc.Component,properties:{timerLabel:cc.Label},onLoad:function(){this._timer=4,this._countdownStart=!1,n.messagePipeline.on("onGameStartPressed",this._onGameStartPressed,this)},_onGameStartPressed:function(){this.node.x=0,this._timer=4,this._countdownStart=!0},update:function(e){this._countdownStart&&(this._timer=Math.max(0,this._timer-e),this._timer>=1?this.timerLabel.string=Math.floor(this._timer):this._timer>0?this.timerLabel.string="GO!!":(this.node.x=1e3,this._countdownStart=!1,n.messagePipeline.sendMessage("onGameStart")))}}),cc._RF.pop()},{"../core/MessagePipeline":"MessagePipeline"}],Tiles:[function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}cc._RF.push(t,"16024ZML79C/ZU5h0+BP7CR","Tiles"),Object.defineProperty(i,"__esModule",{value:!0});var s=n(e("../GameSetting")),o=e("../core/MessagePipeline"),a=n(e("../core/SEPlay")),c=cc.Class({extends:cc.Component,properties:{tilePrefab:cc.Prefab,tilesMinPos:{visible:!1,get:function(){return this._tilesMinPos}},tilesMaxPos:{visible:!1,get:function(){return this._tilesMaxPos}},tileColors:{default:[],type:[cc.Color]}},statics:{instance:null},onLoad:function(){c.instance=this,this._tiles=[],this._baseX=-s.default.instance.tileSize/2*(s.default.instance.tileCountXY-1),this._baseY=-s.default.instance.tileSize/2*(s.default.instance.tileCountXY-1),o.messagePipeline.on("onGameStartPressed",this._onGameStartPressed,this);for(var e=0;e<s.default.instance.tileCountXY;e++){for(var t=[],i=0;i<s.default.instance.tileCountXY;i++){var n=cc.instantiate(this.tilePrefab);n.parent=this.node,n.width=s.default.instance.tileSize,n.height=s.default.instance.tileSize,n.position=new cc.p(this._baseX+s.default.instance.tileSize*i,this._baseY+s.default.instance.tileSize*e);var a=n.getComponent("Tile"),r=i+"-"+e;a.init(r),t.push(a)}this._tiles.push(t)}var l=s.default.instance.tileSize*s.default.instance.tileCountXY,u=this.node.x-l/2+s.default.instance.tileSize/2,h=this.node.y-l/2+s.default.instance.tileSize/2,p=this.node.x+l/2-s.default.instance.tileSize/2,f=this.node.y+l/2-s.default.instance.tileSize/2;this._tilesMinPos=cc.p(u,h),this._tilesMaxPos=cc.p(p,f),this._isChaining=!1},_onGameStartPressed:function(){for(var e={},t=[],i=0;i<s.default.instance.tileCountXY;i++)for(var n=0;n<s.default.instance.tileCountXY;n++){t=[];for(var o=1;o<this.tileColors.length;o++)n>0&&e[n-1+"-"+i]===o||i>0&&e[n+"-"+(i-1)]===o||t.push(o);var a=t[Math.floor(Math.random()*t.length)];this._tiles[i][n].restart(a),e[n+"-"+i]=a}},getColor:function(e){return this.tileColors[e]},putPiece:function(e,t,i){for(var n=this,s=!1,o=0;o<i.length;o++)for(var c=0;c<i[o].length;c++)this._tiles[t+o][e+c].tileSet(i[o][c])&&(s=!0);a.default.instance.play("setpiece"),!this._isChaining&&s&&(this._isChaining=!0,setTimeout(function(){n.chains=1,n._bombCheck()},2e3))},_bombCheck:function(){var e=this;a.default.instance.play("decision9");for(var t=0;t<s.default.instance.tileCountXY;t++)for(var i=0;i<s.default.instance.tileCountXY;i++)this._tiles[t][i].layerCount>=4&&(this._tiles[t][i].bombClear(this.chains),i>0&&this._tiles[t][i-1].bombEffectTemp(),i<s.default.instance.tileCountXY-1&&this._tiles[t][i+1].bombEffectTemp(),t>0&&this._tiles[t-1][i].bombEffectTemp(),t<s.default.instance.tileCountXY-1&&this._tiles[t+1][i].bombEffectTemp());for(var n=!1,o=0;o<s.default.instance.tileCountXY;o++)for(var c=0;c<s.default.instance.tileCountXY;c++)this._tiles[o][c].bombEffect(),this._tiles[o][c].layerCount>=4&&(n=!0);n?(this.chains+=1,setTimeout(function(){e._bombCheck()},2e3)):this._isChaining=!1},getShufflePiece:function(){var e=Math.floor(Math.random()*(s.default.instance.tileCountXY-1)),t=Math.floor(Math.random()*(s.default.instance.tileCountXY-1));return[[this._tiles[t][e].type,this._tiles[t][e+1].type],[this._tiles[t+1][e].type,this._tiles[t+1][e+1].type]]}});i.default=c,t.exports=i.default,cc._RF.pop()},{"../GameSetting":"GameSetting","../core/MessagePipeline":"MessagePipeline","../core/SEPlay":"SEPlay"}],Tile:[function(e,t,i){"use strict";cc._RF.push(t,"8ce51GMI9FNxZmhGmZUxURJ","Tile");var n=function(e){return e&&e.__esModule?e:{default:e}}(e("./Tiles")),s=e("../core/MessagePipeline");cc.Class({extends:cc.Component,properties:{layerCountLabel:cc.Label,tileSpriteNode:cc.Node,flashAnimation:cc.Animation,tilesetAnimation:cc.Animation,bombAnimation:cc.Animation,bombReadyAnimation:cc.Animation,bombReadyNode:cc.Node,type:{get:function(){return this._type},visible:!1},id:{get:function(){return this._id},visible:!1},layerCount:{get:function(){return this._layerCount},visible:!1}},onLoad:function(){this._type=0,this._layerCount=0,this._id="",this._flashTimer=6*Math.random(),this._flashInterval=0,this._bombEffectTemp=0},init:function(e){this._id=e,this.bombReadyNode.opacity=0},restart:function(e){this._type=e,this._layerCount=1,this.layerCountLabel.string=this._layerCount,this.tileSpriteNode.color=n.default.instance.getColor(this._type),this._setRandomFlashTime(),this.bombReadyNode.opacity=0},update:function(e){this._flashTimer>0&&0!==this._type&&(this._flashTimer-=e,this._flashTimer<=0&&(this.flashAnimation.play(),this._setRandomFlashTime()))},_setRandomFlashTime:function(){this._flashInterval=6+6*Math.random(),this._flashTimer=this._flashInterval,this.layerCountLabel.string=this._layerCount},tileSet:function(e){this._type===e?(this._layerCount=Math.min(4,this._layerCount+1),this.tilesetAnimation.play(),this.layerCountLabel.string=this._layerCount,s.messagePipeline.sendMessage("onAddScore",{score:10})):0===this._type&&(this._type=e,this._layerCount=1,this.tileSpriteNode.color=n.default.instance.getColor(this._type),this.layerCountLabel.string=this._layerCount);var t=!1;return this._layerCount>=4&&(this.bombReadyAnimation.play(),t=!0),t},bombClear:function(e){this._type=0,this.tileSpriteNode.color=n.default.instance.getColor(this._type),this._layerCount=0,this.layerCountLabel.string="",this.bombReadyAnimation.stop(),this.bombReadyNode.opacity=0,s.messagePipeline.sendMessage("onAddScore",{score:50*e})},bombEffectTemp:function(){this._bombEffectTemp+=1},bombEffect:function(){this._bombEffectTemp>0&&0!==this._type&&(this.bombAnimation.play(),this._layerCount=Math.min(4,this._layerCount+this._bombEffectTemp),this.layerCountLabel.string=this._layerCount,s.messagePipeline.sendMessage("onAddScore",{score:10*this._bombEffectTemp})),this._layerCount>=4&&this.bombReadyAnimation.play(),this._bombEffectTemp=0}}),cc._RF.pop()},{"../core/MessagePipeline":"MessagePipeline","./Tiles":"Tiles"}],Timer:[function(e,t,i){"use strict";cc._RF.push(t,"37695p904lImpiImoDSDAab","Timer");var n=e("../core/MessagePipeline");cc.Class({extends:cc.Component,properties:{timerLabel:cc.Label,anim:cc.Animation},onLoad:function(){n.messagePipeline.on("onGameStart",this._onGameStart,this),n.messagePipeline.on("onGameStartPressed",this._onGameStartPressed,this),this.timer=60,this.timerStart=!1,this.isRed=!1,this.redAnimation=5},_onGameStartPressed:function(){this.timer=60,this.timerLabel.string=this.timer,this.node.color=cc.hexToColor("#FFFFFF"),this.isRed=!1,this.redAnimation=5},_onGameStart:function(){this.timerStart=!0},update:function(e){this.timerStart&&(this.timer=Math.max(0,this.timer-e),this.timerLabel.string=Math.ceil(this.timer),!this.isRed&&this.timer<=5&&(this.node.color=cc.hexToColor("#FF6600"),this.isRed=!0),this.timer<=this.redAnimation&&(this.redAnimation-=1,this.anim.play("Timer")),this.timer<=0&&(this.timerStart=!1,n.messagePipeline.sendMessage("onGameOver")))}}),cc._RF.pop()},{"../core/MessagePipeline":"MessagePipeline"}]},{},["GameSetting","Piece","PieceMarker","Pieces","Tile","Tiles","DisplayStats","MessagePipeline","PrefabNodePool","SEPlay","GameOver","Score","Splash","StartCountdown","Timer"]);