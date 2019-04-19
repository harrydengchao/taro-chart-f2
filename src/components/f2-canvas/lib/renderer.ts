import EventEmitter from 'wolfy87-eventemitter'

const CAPITALIZED_ATTRS_MAP_WX = {
  fontSize: 'FontSize',
  opacity: 'GlobalAlpha',
  lineDash: 'LineDash',
  textAlign: 'TextAlign',
};

/**
 * wxapp textAlign align 可选值为 left|center|right
 * 标准canvas textAlign align 可选值为 left|center|right|start|end
 */
const TEXT_ALIGN_MAP = {
  'start': 'left',
  'end': 'right',
};

var CAPITALIZED_ATTRS_MAP_ALI = {
  fillStyle: 'FillStyle',
  fontSize: 'FontSize',
  globalAlpha: 'GlobalAlpha',
  opacity: 'GlobalAlpha',
  lineCap: 'LineCap',
  lineJoin: 'LineJoin',
  lineWidth: 'LineWidth',
  miterLimit: 'MiterLimit',
  strokeStyle: 'StrokeStyle',
  textAlign: 'TextAlign',
  textBaseline: 'TextBaseline'
};

export default class Renderer extends EventEmitter {
  
  ctx: CanvasRenderingContext2D
  style = {}; // just mock
  TARO_ENV = '';
  CAPITALIZED_ATTRS_MAP: any;

  constructor(wxCtx, type:'weapp'|'alipay' = 'weapp') {
    super();
    this.ctx = wxCtx;
    this.CAPITALIZED_ATTRS_MAP = {weapp: CAPITALIZED_ATTRS_MAP_WX, alipay: CAPITALIZED_ATTRS_MAP_ALI}[type];
    this.TARO_ENV = type;
    this._initContext(wxCtx);
  }

  getContext(type) {
    if (type === '2d') {
      return this.ctx;
    }
  }

  _initContext(wxCtx) {
    Object.keys(this.CAPITALIZED_ATTRS_MAP).map(style => {
      Object.defineProperty(wxCtx, style, {
        set: value => {
          if(this.TARO_ENV == 'weapp') {
            if (style == "textAlign") {
              value = TEXT_ALIGN_MAP[value] ? TEXT_ALIGN_MAP[value] : value;
            }
          }
          const name = 'set' + this.CAPITALIZED_ATTRS_MAP[style];
          wxCtx[name](value);
        }
      });
    });
  }
}
