
// echarts bmap拓展包
// eslint-disable-next-line
import bmap from './bmap'
// 城市坐标点
import { geocoord } from './geocoord'
// 地图样式设置
import { styleJSON } from './mapstyle'

// 地图坐标转换函数
const convertData = function (data) {
  var res = []
  for (var i = 0; i < data.length; i++) {
    var geoCoord = geocoord[data[i].name]
    if (geoCoord) {
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].value)
      })
    }
  }
  return res
}

const scatter = (map_data) => {
  return {
    title: {
      show: false,
      text: '梆梆安全移动威胁感知',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: function (props) {
        return props.data.name + ':' + props.data.value[2]
      }
    },
    bmap: {
      center: [108.95, 36.27],
      zoom: 5,
      roam: true,
      mapStyle: {
        styleJson: styleJSON
      }
      // ,
      // left: 0, top: 0, right: 0, bottom: 0,
      // boundingCoords: [
      //   // 定位左上角经纬度
      //   [-180, 90],
      //   // 定位右下角经纬度
      //   [180, -90]
      // ]
    },
    series: [
      {
        name: '',
        type: 'scatter',
        coordinateSystem: 'bmap',
        data: convertData(map_data).sort(function (a, b) {
          return b.value[2] - a.value[2]
        }).slice(5),
        symbolSize: 16,
        boundingCoords: [
          [-180, 90],
          [180, -90]
        ],
        label: {
          normal: {
            formatter: '{b}',
            position: 'right',
            show: false
          },
          emphasis: {
            show: false
          }
        },
        itemStyle: {
          normal: {
            color: '#2bdcdd',
            opacity: 1
          }
        }
      },
      {
        name: '',
        type: 'effectScatter',
        coordinateSystem: 'bmap',
        data: convertData(map_data).sort(function (a, b) {
          return b.value[2] - a.value[2]
        }).slice(0, 5),
        symbolSize: function (val) {
          return Math.min(val[2] / 16, 30)
        },
        showEffectOn: 'render',
        rippleEffect: {
          brushType: 'stroke'
        },
        hoverAnimation: true,
        label: {
          normal: {
            formatter: '{b}',
            position: 'right',
            show: true
          }
        },
        itemStyle: {
          normal: {
            color: '#ff6a83'
          }
        },
        zlevel: 1
      }
    ]
  }
}

export {
  scatter
}
