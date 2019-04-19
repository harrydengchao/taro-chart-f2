# taro-chart-f2
taro-chart-f2

*目前支持: 微信小程序*

根据 `taro-f2@1.2.1` 修改而来 https://www.npmjs.com/package/taro-f2/v/1.2.1

F2图表具体使用方法请参考: https://github.com/antvis/f2


## 安装

```bash
$ npm i -S taro-chart-f2
```

修改项目配置文件 config/index.js 
```json
{
  weapp: {
		compile: {
      exclude: [
        'src/wechat-native',
        'node_modules/lib/taro-chart-f2/src/components/f2-canvas/lib/f2.js'
      ]
		}
  }
}
```

## 用法

```javascript
import { F2Canvas } from '@src/lib/taro-plugin-f2'
```

## 示例

```javascript
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { F2Canvas } from 'taro-f2'

// 绘制实例
const draw = [
  {chart: null, data: []}
]

export default class Index extends Component {
  componentDidMount() {
    let chartData = [
      { name: '超大盘能力', value: 6.5 },
      { name: '抗跌能力', value: 9.5 },
      { name: '稳定能力', value: 9 },
      { name: '绝对收益能力', value: 6 },
      { name: '选证择时能力', value: 6 },
      { name: '风险回报能力', value: 8 }
    ]
    // 模拟异步请求
    setTimeout(() => {
      draw[group].chart.source(chartData)
      draw[group].chart.repaint()
    }, 600)
  }

  drawRadar(num, canvas, width, height, F2){
    let data = draw[num].data
    let chart = new F2.Chart({
      el: canvas,
      width,
      height
    });
    chart.source(data, {
      value: {
        min: 0,
        max: 10
      }
    });
    chart.coord('polar');
    chart.axis('value', {
      grid: {
        lineDash: null
      },
      label: null,
      line: null
    });
    chart.axis('name', {
      grid: {
        lineDash: null
      }
    });
    chart.area()
      .position('name*value')
      .color('#FE5C5B')
      .style({
        fillOpacity: 0.2
      })
      .animate({
        appear: {
          animation: 'groupWaveIn'
        }
      });
    chart.line()
      .position('name*value')
      .color('#FE5C5B')
      .size(1)
      .animate({
        appear: {
          animation: 'groupWaveIn'
        }
      });
    chart.point().position('name*value').color('#FE5C5B').animate({
      appear: {
        delay: 300
      }
    });
    chart.guide().text({
      position: ['50%', '50%'],
      content: '73',
      style: {
        fontSize: 32,
        fontWeight: 'bold',
        fill: '#FE5C5B'
      }
    });
    chart.render();
    draw[num].chart = chart
  }

  render () {
    return (
      <View className='index'>
        <View style='width:100%;height:500px'>
          <F2Canvas onInit={this.drawRadar.bind(this, 0)}></F2Canvas>
        </View>
      </View>
    )
  }
}
```


