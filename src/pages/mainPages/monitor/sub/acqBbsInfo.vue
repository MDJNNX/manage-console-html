<template>
    <div class="acqBbsInfo">
        <div class="searchWrapper">
            <el-select class="itemSelect" v-model="selectItem" placeholder="请选择">
                <el-option
                        v-for="item in bbsInfoOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-input class="itemInput" @keyup.enter.native="searchResult" v-model="searchValue" placeholder="请输入内容"></el-input>

        </div>
        <el-table
                class="bbsInfoTable"
                :data="bbsInfoDatas"
                border
                style="width: 100%;">
            <el-table-column
                    prop="id"
                    label="板块id"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="hostName"
                    label="站点"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="name"
                    width="180"
                    label="板块名">
            </el-table-column>
            <el-table-column
                    prop="monitorInterval"
                    label="采集间隔"
                    width="80">
            </el-table-column>
            <el-table-column
                    prop="start"
                    width="180"
                    label="开始时间">
            </el-table-column>
            <el-table-column
                    prop="end"
                    width="180"
                    label="结束时间">
            </el-table-column>
            <el-table-column
                    prop="client_ip"
                    width="180"
                    label="采集服务器">
            </el-table-column>
            <el-table-column
                    prop="url"
                    label="链接">
            </el-table-column>
        </el-table>
        <div class="paginatorWrapper">
            <el-pagination
                    @current-change="handleCurrentChange"
                    :page-size="paginator.pageSize"
                    layout="total, prev, pager, next"
                    :total="paginator.bbsInfoCount">
            </el-pagination>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import request from '../../../../components/common/request'
    import filterFactory from '../../../../components/common/filterFactory'

    export default {
        data() {
            return {
                searchFilters: [],
                selectItem: '',
                searchValue: '',
                bbsInfoOptions: [
                    {"label": "站点名", "value": "hostName"},
                    {"label": "板块名", "value": "name"}
                ],
                bbsInfoDatas: [],
                paginator: {
                    currentPage: 1,
                    pageSize: 20,
                    bbsInfoCount: 120
                }
            }
        },
        methods: {
            getData() {
                request.monitor.searchBbsInfo(this.searchFilters, this.paginator.currentPage, this.paginator.pageSize, (res) => {
                    console.log(res.data);
                    this.bbsInfoDatas = res.data;
                }, (res) => {
                    console.log(res.value);
                });
                request.monitor.countBbsInfo(this.searchFilters, (res) => {
                    console.log(res.data);
                    this.paginator.bbsInfoCount = res.data;
                }, (res) => {
                    console.log(res.value);
                })
            },
            handleCurrentChange(val) {
                console.log("当前页", val);
                this.paginator.currentPage = val;
                this.getData();
            },
            searchResult() {
                this.searchFilters = [filterFactory.convertFilter(this.selectItem, this.searchValue)];
                this.getData();
            }
        },
        mounted() {
            this.getData();
        }
    }
</script>

<style>
    .acqBbsInfo {
        height: 100%;
    }
    .acqBbsInfo .el-table{
        height: calc(100% - 110px);
        overflow: auto;
    }
    .acqBbsInfo .tabWrapper {
        height: 100%;
        overflow: auto;
    }

    .tabWrapper .el-tabs__content {
        height: calc(100% - 70px);
        overflow: hidden;
    }

    .tabWrapper .el-tab-pane {
        height: 100%;
        overflow: auto;
    }

    .itemSelect {
        width: 100px;
        display: inline-block;
    }

    .itemInput {
        display: inline-block;
        width: calc(100% - 130px);
    }
</style>