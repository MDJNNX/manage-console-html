<template>
    <div class="chartTopWrapper">
        <div class="chartDetail">
            <div class="chartDetailHeader">
                <span class="detailHeaderNav">Acq-01 (192.168.1.1, 1.1.1.1)</span>
                <el-button @click="goback" type="primary" size="small"><i class="el-icon-arrow-left"></i> 返回</el-button>
            </div>
            <div class="chartDetailTable">
                <span class="detailHeaderName">实例详情</span>
                <table>
                    <tr>
                        <td>实例名称:<span>Acq-01</span></td>
                        <td>创建时间:<span>2018-12-12 10:10:10</span></td>
                        <td>内网ip:<span>1.1.1.1</span></td>
                    </tr>
                    <tr>
                        <td>公网ip:<span>2.2.2.2</span></td>
                        <td>创建时间:<span>2018-12-12 10:10:10</span></td>
                        <td>内网ip:<span>1.1.1.1</span></td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="chartList">
            <div class="chartTimeSelect">
                <ul>
                    <!--<li @click="selectTime(0)"
                        :class="{selectedLi: timeBooleanVals.isOneHour, unselectedLi: !timeBooleanVals.isOneHour}">
                        <a :class="{selectedTime: isOneHour, unselectedTime: !isOneHour}">1小时</a>
                    </li>-->
                    <li @click="selectTime(index)" :class="{selectedLi: val, unselectedLi: !val}" v-for="(val, index) in timeBooleanVals">
                        <a :class="{selectedTime: val, unselectedTime: !val}">{{ timeLabels[index] }}</a>
                    </li>
                </ul>
            </div>
            <div class="chartWrapper">
                <div class="chartDiv">
                    <div class="chartTitle">CPU空闲百分比(%)</div>
                    <div id="chartCpu" class="pichart"></div>
                </div>
                <div class="chartDiv">
                    <div class="chartTitle">磁盘使用率(%)</div>
                    <div id="chartDisk" class="pichart"></div>
                </div>
                <div class="chartDiv">
                    <div class="chartTitle">IO使用率(%)</div>
                    <div id="chartIo" class="pichart"></div>
                </div>
                <div class="chartDiv">
                    <div class="chartTitle">内存使用率(%)</div>
                    <div id="chartMemory" class="pichart"></div>
                </div>
                <div class="chartDiv">
                    <div class="chartTitle">mysql活跃线程数(个)</div>
                    <div id="chartMcnt" class="pichart"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import Vue from 'vue'
    import request  from '../../../../components/common/request'
    import util     from '../../../../components/common/util'
    import _ from 'lodash'
    import echarts from 'echarts'

    export default {
        data() {
            return {
                serverId: '',
                searchTime: '',
                timeBooleanVals: [true, false, false, false, false, false],
                timeLabels: ["1小时", "6小时", "12小时", "1天", "3天", "7天"],
                series: {
                    cpu: {xAxis: [], yAxis: []},
                    disk: {xAxis: [], yAxis: []},
                    io: {xAxis: [], yAxis: []},
                    mcnt: {xAxis: [], yAxis: []},
                    memory: {xAxis: [], yAxis: []}
                },
                kpi: {
                    cpu: "busy",
                    disk: "usage",
                    io: "iowait",
                    mcnt: "count",
                    memory: "usage"
                },
                items: ["cpu", "disk", "io", "mcnt", "memory"]
            }
        },
        methods: {
            initServer() {
                this.serverId = this.$route.params["serverId"];
//            this.searchTime = util.getToHour(new Date() , -6);
                this.searchTime = util.getToHour(new Date("2018-03-26 10:00:00"), -6);
                request.server.getById(this.serverId, (res) => {
                    console.log(res.value);
                }, (res) => {
                    console.log(res.value);
                });
                this.getChartDatas();
            },
            initChart() {
                let constant = {
                    cpu: {containerId: "chartCpu", legendName: "CPU空闲百分比", yformatter: '{value} %'},
                    disk: {containerId: "chartDisk", legendName: "磁盘使用率", yformatter: '{value} %'},
                    io: {containerId: "chartIo", legendName: "IO使用率", yformatter: '{value} %'},
                    memory: {containerId: "chartMemory", legendName: "内存使用率", yformatter: '{value} %'},
                    mcnt: {containerId: "chartMcnt", legendName: "mysql活跃线程数", yformatter: '{value}'}
                };
                for(let index = 0; index < this.items.length; index++) {
                    echarts.init(document.getElementById('chart' + _.capitalize(this.items[index]))).setOption({
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            data: [{name: constant[this.items[index]]["legendName"], icon: 'circle'}],
                            bottom: 0
                        },
                        xAxis: {
                            type: 'category',
                            boundaryGap: false,
                            data: this.series[this.items[index]].xAxis,
                            axisLabel: {
                                interval: 50
                            }
                        },
                        yAxis: {
                            type: 'value',
                            axisLabel: {
                                formatter: constant[this.items[index]]["yformatter"]
                            }
                        },
                        series: [
                            {
                                name: constant[this.items[index]]["legendName"],
                                type: 'line',
                                data: this.series[this.items[index]].yAxis
                            }
                        ]
                    })
                }
            },
            getChartDatas() {
                request.server.chart(this.serverId, this.searchTime, (res) => {
                    console.log("chart success", res.value);
                    for(let key of Object.keys(res.value)) {
                        for(let item of res.value[key]) {
                            this.series[key].xAxis.push(item["insert_time"]);
                            this.series[key].yAxis.push(item[this.kpi[key]]);
                        }
                    }
                    this.initChart();
                    console.log(this.series);
                    console.log("hello world");
                }, (res) => {
                    console.log("chart error", res.value);
                })
            },
            selectTime(index) {
                switch(index) {
                    case 0: this.searchTime = util.getToHour(new Date(), -1); break;
                    case 1: this.searchTime = util.getToHour(new Date() , -6); break;
                    case 2: this.searchTime = util.getToHour(new Date() , -12); break;
                    case 3: this.searchTime = util.getToDate(new Date() , -1); break;
                    case 4: this.searchTime = util.getToDate(new Date() , -3); break;
                    case 5: this.searchTime = util.getToDate(new Date() , -7); break;
                    default:
                        console.log("no such index,", index);
                }
                for(let i = 0; i < 6; i++) {
                    Vue.set(this.timeBooleanVals, i, false);
                }
                Vue.set(this.timeBooleanVals, index, true);
                console.log("searchTime:", this.searchTime);
                this.getChartDatas();
            },
            goback() {
                console.log("go back");
                this.$emit("onGoBack");
                this.$router.push({path: '/main/monitor'});
            }
        },
        mounted() {
            this.initServer();
            this.getChartDatas();
        }
    }
</script>

<style>
    .chartTopWrapper {
        width: calc(100% - 240px);
        float: left;
        padding: 5px 10px;
        height: calc(100% - 20px);
        overflow: auto;
    }
    .chartDetailHeader {
        height: 40px;
        line-height: 40px;
        border-left: 2px solid #6d7781;
        margin: 15px 0px;
        text-align: left;
    }
    .chartDetailTable {
        font-size: 12px;
        font-weight: 200;
        text-align: left;
    }
    .detailHeaderNav {
        font-size: 16px;
        font-weight: 600;
        margin: 0px 15px;
        color: #333333;
        display: inline-block;
    }
    .detailHeaderName {
        font-size: 14px;
        font-weight: 200;
        border-left: 4px solid #6d7781;
        padding-left: 15px;
        height: 40px;
        line-height: 40px;
        display: block;
        background: #F5f6FA;
    }
    .chartWrapper {
        text-align: left;
    }
    .chartDetailTable table {
        width: 100%;
        border-collapse: collapse;
    }
    .chartDetailTable table td {
        height: 40px;
        line-height: 40px;
        text-align: left;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-size: 12px;
        color: #999;
        border: 1px solid #ddd;
        padding: 5px 15px;
    }
    .chartList {
        display: block;
    }
    .chartList ul {
        display: block;
        height: 30px;
        padding-left: 0px !important;
        margin-top: 10px;
    }
    .chartList ul li {
        display: block;
        float: left;
        width: 50px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        vertical-align: middle;
        margin-right: 10px;
        cursor: pointer;
    }
    .chartList ul li a {
        text-decoration: none;
        color: white;
    }
    .selectedLi {
        background: #546478;
    }
    .unselectedLi {
        background: #D9DEE4;
    }
    .selectedTime {
        color: white;
    }
    .unselectedTime {
        color: gray;
    }
    .chartDiv {
        width: 33%;
        height: 300px;
        display: inline-block;
        border: 1px solid #d8d8d8;
        margin-bottom: 10px;
    }
    .pichart {
        height: calc(100% - 35px);
    }
    .chartTitle {
        height: 35px;
        line-height: 35px;
        background: #f6f6f6;
        padding-left: 10px;
        text-align: left;
    }
    #chartCpu {
        /*width: 200px !important;*/
        /*height: 250px !important;*/
    }

</style>