<template>
  <div class="main">
    <div class="left">
      <div style="height:272px" class="content">
        <CardTitle title="人员统计" style="position:absolute"></CardTitle>
        <div style="width:300px;height:100%;padding-left:24px;color:#fff;line-height:14px">
          <div style="height:72px"></div>
          <div class="person-list" v-for="i in 5" :key="i">
            <div style="width:120px">
              <div class="person-list-cell">
                <div class="person-list-icon" :style="`background:${themeColor[(i*2-2)%6]}`"></div>
                {{pie.legend.data[i*2-2]}}
              </div>
            </div>
            <div style="width:120px">
              <div class="person-list-cell">
                <div class="person-list-icon" :style="`background:${themeColor[(i*2-1)%6]}`"></div>
                {{pie.legend.data[i*2-1]}}
              </div>
            </div>
          </div>
        </div>
        <div ref="pie" style="width:340px;height:242px"></div>
      </div>
      <div style="height:328px" class="content">
        <CardTitle title="人员表彰" style="position:absolute"></CardTitle>
        <div ref="TwoHistogram" style="width:616px;height:286px;margin-top:24px"></div>
      </div>
      <div style="height:352px;flex-direction:column" class="content">
        <CardTitle title="人员统计" style="position:absolute"></CardTitle>
        <div class="event-title">
          <div style="margin-left:24px">
            <div>
              <span style="color:#189fff">
                <strong>|&nbsp;&nbsp;</strong>
              </span>公文流转（结办/在办）
            </div>
            <div style="font-size:20px">&nbsp;&nbsp;590 / 1294</div>
          </div>
          <div style="margin-left:24px">
            <div>
              <span style="color:#189fff">
                <strong>|&nbsp;&nbsp;</strong>
              </span>财务报销（结办/在办）
            </div>
            <div style="font-size:20px">&nbsp;&nbsp;448 / 1025</div>
          </div>
          <div style="margin-left:24px">
            <div>
              <span style="color:#189fff">
                <strong>|&nbsp;&nbsp;</strong>
              </span>其他事务
            </div>
            <div style="font-size:20px">&nbsp;&nbsp;243</div>
          </div>
        </div>
        <div ref="Line" style="width:616px;height:200px;margin-top:24px"></div>
      </div>
    </div>
    <div class="right">
      <div style="height:80px;display:flex;width:100%;color:#fff;justify-content: space-between;">
        <div style="width:448px;padding:24px;background:#ffffff11;display:flex">
            <div>
              <span style="color:#189fff;line-height:0">
                <strong>|&nbsp;&nbsp;</strong>
              </span>人员总数
            </div>
            <span style="font-size:36px;line-height:36px">&nbsp;857</span>
            <div style="margin-left:36px">
              <span style="color:#189fff">
                <strong>|&nbsp;&nbsp;</strong>
              </span>事件总数
            </div>
            <span style="font-size:36px;line-height:36px">&nbsp;2475</span>
        </div>
        <div style="width:500px;display:flex">
            <span style="font-size:40px;line-height:80px">在线政工系统</span>
            <div style="width:208px;background:#ffffff11;text-align:center;margin-left:12px;padding:12px 0">
                <div>南湖区公安分局</div>
                <div style="margin-top:8px">{{time}}</div>
            </div>
        </div>
      </div>
      <div style="height:440px" class="content">
        <CardTitle title="KPI指标展示" style="position:absolute"></CardTitle>
        <div ref="KPI" style="width:100%;height:416px"></div>
      </div>
      <div style="height:432px" class="content">
        <CardTitle title="人员到岗情况" style="position:absolute"></CardTitle>
        <div ref="zhuzhuang" style="width:100%;height:408px"></div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment"
import * as echarts from "echarts";
import selectTheme from "./theme";
import CardTitle from "@/components/CardTitle.vue";
import "echarts/src/chart/pie";
import { randomBytes } from "crypto";
echarts.registerTheme("walden", selectTheme.theme);
const theme = selectTheme;

export default {
  components: {
    CardTitle
  },
  data() {
    return {
        time:'',
      themeColor: [
        "#3fb1e3",
        "#6be6c1",
        "#326c91",
        "#a0a7e6",
        "#c4ebad",
        "#96dee8"
      ],
      pie: {
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c} ({d}%)"
        },
        legend: {
          show: false,
          orient: "vertical",
          x: "left",
          data: [
            "男性人员",
            "女性人员",
            "党员",
            "预备党员",
            "发展对象",
            "入党积极分子",
            "年龄≤25",
            "年龄26-30",
            "年龄31-35",
            "年龄≥36"
          ]
        },
        series: [
          {
            type: "pie",
            selectedMode: "single",
            radius: [0, "25%"],
            label: {
              normal: {
                position: "inner"
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 55, name: "男性人员" },
              { value: 25, name: "女性人员" }
            ]
          },
          {
            type: "pie",
            radius: ["32%", "47%"],
            data: [
              { value: 35, name: "党员" },
              { value: 20, name: "预备党员" },
              { value: 20, name: "发展对象" },
              { value: 15, name: "入党积极分子" }
            ]
          },
          {
            type: "pie",
            radius: ["55%", "70%"],
            data: [
              { value: 335, name: "年龄≤25" },
              { value: 310, name: "年龄26-30" },
              { value: 234, name: "年龄31-35" },
              { value: 135, name: "年龄≥36" }
            ]
          }
        ]
      },
      T2: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          icon: "rect",
          x: "24",
          y: "bottom",
          data: ["本月绩效", "上月绩效"],
          textStyle: {
            //图例文字的样式
            color: "#fff",
          }
        },
        grid: {
          left: "24px",
          right: "0%",
          bottom: "24px",
          containLabel: true
        },
        yAxis: {
          show: true,
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          },
          splitLine: {
            show: false, //  改变轴线颜色
            lineStyle: {
              // 使用深浅的间隔色
              color: ["#555"]
            }
          }
        },
        xAxis: {
          show: true,
          type: "category",
          data: [
            "戴金明     办公室",
            "金郁       政治处",
            "王海平     计划财务科",
            "王玮       指挥中心",
            "王叶峰     法制科",
            "莫剑卫     户政科",
            "王燕萍     公共信息网络安全监察科",
            "黄燕婷     警务督察大队"
          ],
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          },
          axisLabel: {
            formatter: function(value) {
              var ret = ""; //拼接加\n返回的类目项
              var maxLength = 4; //每项显示文字个数
              var valLength = value.length; //X轴类目项的文字个数
              var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
              if (rowN > 1) {
                //如果类目项的文字大于3,
                for (var i = 0; i < rowN; i++) {
                  var temp = ""; //每次截取的字符串
                  var start = i * maxLength; //开始截取的位置
                  var end = start + maxLength; //结束截取的位置
                  //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
                  temp = value.substring(start, end) + "\n";
                  ret += temp; //凭借最终的字符串
                }
                return ret;
              } else {
                return value;
              }
            }
          }
        },
        series: [
          {
            name: "本月绩效",
            type: "bar",
            stack: "本月绩效",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            barWidth: 15,
            data: [220, 170, 300, 276, 168, 215, 305, 270]
          },
          {
            name: "上月绩效",
            type: "bar",
            stack: "上月绩效",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            barWidth: 15,
            data: [389, 369, 302, 298, 279, 265, 255, 224]
          }
        ]
      },
      T3: {
        legend: {
          x: "24",
          y: "bottom",
          icon: "rect",
          data: ["邮件营销", "联盟广告"],
          textStyle: {
            //图例文字的样式
            color: "#fff",
          }
        },
        grid: {
          left: "24",
          right: "0",
          bottom: "36",
          top: "12",
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: [
            "2019 02",
            "2019 03",
            "2019 04",
            "2019 05",
            "2019 06",
            "2019 07",
            "2019 08"
          ],
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          }
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          }
        },
        series: [
          {
            name: "邮件营销",
            type: "line",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            data: [220, 228, 178, 159, 216, 295, 374, 352]
          },
          {
            name: "联盟广告",
            type: "line",
            label: {
              normal: {
                show: true,
                position: "bottom"
              }
            },
            data: [240, 200, 158, 139, 206, 310, 394, 378]
          }
        ]
      },
      T4: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          icon: "rect",
          x: "24",
          y: "bottom",
          data: ["2019年3月", "2019年4月", "2019年5月", "2019年6月"],
          textStyle: {
            color: "#fff",
          }
        },
        grid: {
          left: "24px",
          right: "24px",
          bottom: "36px",
          containLabel: true
        },
        yAxis: {
          show: true,
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ["#555"]
            }
          }
        },
        xAxis: {
          show: true,
          type: "category",
          data: [
            "办公室",
            "政治处",
            "计划财务科",
            "指挥中心",
            "法制科",
            "户政科",
            "公共信息网络安全监察科",
            "警务督察大队",
            "刑事警察大队",
            "国内安全保卫大队",
            "巡警防暴大队",
            "治安警察大队",
            "看守所",
            "派出所"
          ],
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          },
          axisLabel: {
            formatter: function(value) {
              var ret = ""; //拼接加\n返回的类目项
              var maxLength = 4; //每项显示文字个数
              var valLength = value.length; //X轴类目项的文字个数
              var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
              if (rowN > 1) {
                //如果类目项的文字大于3,
                for (var i = 0; i < rowN; i++) {
                  var temp = ""; //每次截取的字符串
                  var start = i * maxLength; //开始截取的位置
                  var end = start + maxLength; //结束截取的位置
                  //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
                  temp = value.substring(start, end) + "\n";
                  ret += temp; //凭借最终的字符串
                }
                return ret;
              } else {
                return value;
              }
            }
          }
        },
        series: [
          {
            name: "2019年3月",
            type: "line",
            label: {
              normal: {
                show: false
              }
            },
            barWidth: 30,
            data: [
              5840,
              5610,
              3820,
              5640,
              5600,
              6180,
              6250,
              5630,
              5380,
              4860,
              5150,
              6140,
              5790,
              6380
            ]
          },
          {
            name: "2019年4月",
            type: "line",
            label: {
              normal: {
                show: false
              }
            },
            data: [
              5900,
              3920,
              2200,
              6000,
              5896,
              5813,
              7148,
              6354,
              5789,
              5120,
              2468,
              6248,
              4834,
              5284
            ]
          },
          {
            name: "2019年5月",
            type: "line",
            label: {
              normal: {
                show: false
              }
            },
            data: [
              2594,
              3556,
              7824,
              3438,
              4025,
              2948,
              3295,
              5640,
              4887,
              6480,
              6379,
              1661,
              5710,
              4947,
              5748,
              7306
            ]
          },
          {
            name: "2019年6月",
            type: "line",
            label: {
              normal: {
                show: false
              }
            },
            data: [
              7912,
              4742,
              2601,
              2220,
              3670,
              7671,
              3184,
              1910,
              7202,
              3488,
              4779,
              2742,
              3991,
              4664,
              1737,
              5688,
              3725,
              3232
            ]
          }
        ]
      },
      zhuzhuang: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          icon: "rect",
          x: "24",
          y: "bottom",
          data: ["在编人员", "到岗人员", "请假人员", "出差人员"],
          textStyle: {
            //图例文字的样式
            color: "#fff",
          }
        },
        grid: {
          left: "24px",
          right: "24px",
          bottom: "36px",
          containLabel: true
        },
        yAxis: {
          show: true,
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          },
          splitLine: {
            show: true, //  改变轴线颜色
            lineStyle: {
              // 使用深浅的间隔色
              color: ["#555"]
            }
          }
        },
        xAxis: {
          show: true,
          type: "category",
          data: [
            "办公室",
            "政治处",
            "计划财务科",
            "指挥中心",
            "法制科",
            "户政科",
            "公共信息网络安全监察科",
            "警务督察大队",
            "刑事警察大队",
            "国内安全保卫大队",
            "巡警防暴大队",
            "治安警察大队",
            "看守所",
            "派出所"
          ],
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          },
          axisLabel: {
            formatter: function(value) {
              var ret = ""; //拼接加\n返回的类目项
              var maxLength = 4; //每项显示文字个数
              var valLength = value.length; //X轴类目项的文字个数
              var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
              if (rowN > 1) {
                //如果类目项的文字大于3,
                for (var i = 0; i < rowN; i++) {
                  var temp = ""; //每次截取的字符串
                  var start = i * maxLength; //开始截取的位置
                  var end = start + maxLength; //结束截取的位置
                  //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
                  temp = value.substring(start, end) + "\n";
                  ret += temp; //凭借最终的字符串
                }
                return ret;
              } else {
                return value;
              }
            }
          }
        },
        series: [
          {
            name: "在编人员",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "left"
              }
            },
            barWidth: 30,
            data: [20, 24, 17, 37, 20, 24, 20, 24, 17, 37, 20, 24, 20, 24]
          },
          {
            name: "到岗人员",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "left"
              }
            },
            data: [44, 26, 26, 54, 30, 47, 44, 26, 26, 54, 30, 47, 44, 26]
          },
          {
            name: "请假人员",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "left"
              }
            },
            data: [8, null, 5, 7, 8, 4, 8, null, 5, 7, 8, 4, 8, null]
          },
          {
            name: "出差人员",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "left"
              }
            },
            data: [
              15,
              null,
              null,
              22,
              null,
              null,
              15,
              null,
              null,
              22,
              null,
              null,
              15,
              null
            ]
          }
        ]
      }
    };
  },
  methods:{
    setTime() {
      this.time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
      setTimeout(() => {
        this.setTime()
      }, 1000);
    },
  },
  mounted() {
    echarts.init(this.$refs.pie, "walden").setOption(this.pie);
    echarts.init(this.$refs.zhuzhuang, "walden").setOption(this.zhuzhuang);
    echarts.init(this.$refs.TwoHistogram, "walden").setOption(this.T2);
    echarts.init(this.$refs.Line, "walden").setOption(this.T3);
    echarts.init(this.$refs.KPI, "walden").setOption(this.T4);
    this.setTime()
    // let temp={
    //   [
    //     {tableName:'table',data:[
    //       {filed:'string',value:'Key'},
    //       {filed:'string2',value:'Key2'},
    //       {filed:'string3',value:'Key3'},
    //     ]},
    //     {tableName:'table2',data:[
    //       {filed:'string',value:'Key'},
    //       {filed:'string2',value:'Key2'},
    //       {filed:'string3',value:'Key3'},
    //     ]}
    //   ]
    // }
  }
};
</script>

<style lang="less" scoped>
.main {
  background: no-repeat, url("/img/backimg.jpg");
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  padding: 40px;
  align-items: center;
}
.left {
  width: 664px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.right {
  width: 1136px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.content {
  width: 100%;
  background: #ffffff11;
  clip-path: polygon(0 0, calc(100% - 48px) 0, 100% 48px, 100% 100%, 0 100%);
  display: flex;
}
.person-list {
  display: flex;
  justify-content: start;
  width: 300px;
  margin-top: 8px;
}
.person-list-cell {
  display: flex;
}
.person-list-icon {
  width: 14px;
  height: 14px;
  margin-right: 8px;
}
.person-list:nth-child(odd) {
  margin-top: 32px;
}
.event-title {
  display: flex;
  margin-top: 60px;
  color: #fff;
}
</style>