import echarts from 'echarts'

const linear_1 = new echarts.graphic.LinearGradient(
  0, 0, 0, 1, [
    {offset: 0, color: '#3988ff'},
    {offset: 0.2, color: '#3988ff'},
    {offset: 1, color: '#00ddd9'}
  ]
)

const c_opt_1 = (props) => {
  return {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)'
    },
    grid: {
      left: '15%',
      top: '10%',
      height: '74%',
      width: '70%'
    },
    // backgroundColor: 'rgba(37, 49, 92, 0.6)',
    series: [
      {
        name: '',
        type: 'pie',
        radius: ['0%', '40%'],
        color: ['#ff5f76', '#00ddd9', '#319aff', '#00dcd9', '#18a3b7', '#1e62c7'],
        label: {
          normal: {
            position: 'inner',
            color: '#fff'
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },

        data: props.pie_inner.map(e => {
          e.value = e.num
          e.name = e.type
          return e
        })
      },
      {
        name: '',
        type: 'pie',
        radius: ['55%', '70%'],
        color: ["#00ddd9", "#003e9a", "#0f5ed5", "#3988ff", "#04b0ff", "#05e0fd", "#87cefa", "#00b6b4"],
        data: props.pie_outer.map(e => {
          e.value = e.num
          e.name = e.type
          return e
        })
      }
    ]
  }
}

const c_opt_2 = (props) => {
  return {
    title: {
      text: '',
      show: false
    },
    tooltip: {
      trigger: 'item'
    },
    color: ['#00ddd9', '#e1855d', '#5f9ba4', '#1e455c', '#be2a20'],
    // backgroundColor: 'rgba(37, 49, 92, 0.6)',
    grid: {
      left: '18%',
      top: '10%',
      height: '60%',
      width: '70%'
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: props.timeList,
        axisLabel: {
          textStyle: {
            color: 'rgba(255,255,255,0.8)'
          },
          interval: 0,
          margin: '10',
          rotate: 30,
          show: true
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(255,255,255,0.5)'
          }
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: 'rgba(255,255,255,0.5)'
          }
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          textStyle: {
            color: 'rgba(255,255,255,0.8)'
          },
          margin: 10
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(255,255,255,0.5)'
          }
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: 'rgba(255,255,255,0.5)'
          }
        }
      }
    ],
    series: [
      {
        name: '',
        type: 'line',
        stack: '',
        areaStyle: {
          normal: {
            color: linear_1
          }
        },
        symbol: 'emptyCircle',
        symbolSize: 6,
        showAllSymbol: true,
        data: props.numList
      }
    ]
  }
}

const c_opt_3 = (props) => {
  return {
    // backgroundColor: 'rgba(37, 49, 92, 0.6)',
    tooltip: {},
    grid: {
      left: '19%',
      top: '10%',
      height: '74%',
      width: '66%'
    },

    yAxis: {
      data: props.locationList,
      boundaryGap: true,
      inverse: true,
      axisLabel: {
        textStyle: {
          color: '#eee'
        },
        margin: 10
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#999'
        }
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: '#999'
        }
      },
      axisTick: {
        show: true,
        alignWithLabel: true
      }
    },
    xAxis: {
      axisLabel: {
        textStyle: {
          color: '#eee'
        },
        margin: 10
      },
      axisLine: {

        lineStyle: {
          color: '#999'
        }
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: '#999'
        }
      },
      axisTick: {
        show: false,
        alignWithLabel: true
      }
    },

    series: [{
      name: '',
      itemStyle: {
        normal: {
          color: (ob) => [
            '#1e62c7',
            '#3988ff',
            '#1cb2ec',
            '#0fc5e4',
            '#00ddd9'
          ][ob.dataIndex]
        }
      },
      type: 'bar',
      barWidth: '60%',
      data: props.numList
    }]
  }
}

const c_opt_4 = (props) => {
  let config_native = [
    {
      name: '受攻击次数',
      formatter: '{b0}<br/>{a}:{c}',
      color: 'rgba(57, 136, 255,1)',
      data: props.datalist[0].value
    },
    {
      name: '受攻击设备数',
      formatter: '{b0}<br/>{a}:{c}',
      color: 'rgba(1, 203, 198,1)',
      data: props.datalist[1].value
    },
    {
      name: '受攻击设备率',
      formatter: '{b0}<br/>{a}:{c}%',
      color: 'rgba(112, 187, 105,1)',
      data: props.datalist[2].value
    }
  ]

  return {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      selectedMode: 'single',
      right: 70,
      data: config_native.map(e => e.name)
    },
    grid: {
      left: '2%',
      right: '5%',
      bottom: '4%',
      top: '13%',
      containLabel: true
    },
    xAxis: [{
      type: 'category',
      boundaryGap: false,
      data: props.xAxis
    }],
    yAxis: [{
      type: 'value'
    }],
    series: config_native.map(e => {
      return {
        name: e.name,
        type: 'line',
        stack: '总量',
        symbolSize: 6,
        tooltip: {
          show: true,
          formatter: e.formatter
        },
        itemStyle: {
          normal: {
            color: e.color
          }
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: e.color
              },
              {
                offset: 1,
                color: 'rgba(255, 255, 255, 0)'
              }
            ])
          }
        },
        data: e.data
      }
    })
  }
}


const c_opt_empty =  {
  title: {
    text:'暂无数据',
    x: 'center',
    y: 'center',
    textStyle: {
      color: '#3988ff',
      fontWeight: 'lighter',
      fontSize: 16,
    }
  },
  series: [
    {
      type: 'pie',
      radius: ['58%', '72%'],
      silent: true,
      label: {
        normal: {
          show: false,
        }
      },
      data: [{
        value: 1,
        itemStyle: {
          normal: {
            color: '#bcbccf',
            shadowBlur: 2,
            shadowColor: '#bcbccf',
          }
        }
      }],
      animation: false
    },
    {
      type: 'pie',
      radius: ['58%', '72%'],
      silent: true,
      label: {
        normal: {
          show: false,
        }
      },
      data: [{
        value: 1,
        itemStyle: {
          normal: {
            color: '#bcbccf',
            shadowBlur: 20,
            shadowColor: '#bcbccf'
          }
        }
      }],
      animation: false
    },
    {
      name: 'main',
      type: 'pie',
      radius: ['72%', '78%'],
      label: {
        normal: {
          show: false,
        }
      },
      data: [{
          value: 0.67,
          itemStyle: {
            normal: {
              color: '#3988ff',
              shadowBlur: 10,
              shadowColor: '#3988ff'
            }
          }
        }, {
          value: 0.5,
          itemStyle: {
            normal: {
            color: 'transparent'
          }
        }
      }],
      animationEasingUpdate: 'cubicInOut',
      animationDurationUpdate: 500
    }
  ]
}


export {
  // 事件分布趋势双扇形
  c_opt_1,
  // 每日启动趋势
  c_opt_2,
  // 地理分布
  c_opt_3,
  // 攻击统计echarts 图表
  c_opt_4,
  // 没有数据的时候的 echarts 图表的样式
  c_opt_empty
}
