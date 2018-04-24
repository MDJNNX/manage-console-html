<template>
    <div class="acqBbsList">
        <div class="searchWrapper">
            <el-select class="itemSelect" v-model="selectItem" placeholder="请选择">
                <el-option
                        v-for="item in keywordInfoOPtions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-input class="itemInput" @keyup.enter.native="searchResult"  v-model="searchValue" placeholder="请输入内容"></el-input>
        </div>
        <el-table
                :data="keywordInfoDatas"
                border
                style="width: 100%;">
            <el-table-column
                    prop="word"
                    label="关键词"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="source"
                    label="来源"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="dateTime"
                    label="采集时间"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="search_count"
                    label="查询条数"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="insert_count"
                    label="插入条数"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="client_ip"
                    label="采集服务器"
                    width="150">
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
    export default {
        data() {
            return {
                searchFilters: [],
                selectItem: '',
                searchValue: '',
                keywordInfoOPtions: [
                    {"label": "关键词", "value": "keyword"},
                    {"label": "来源", "value": "source"}
                ],
                keywordInfoDatas: [],
                paginator: {
                    currentPage: 1,
                    pageSize: 20,
                    bbsInfoCount: 120
                }
            }
        },
        methods: {
            getData() {
                request.monitor.searchKeywordInfo(this.searchFilters, this.paginator.currentPage, this.paginator.pageSize, (res) => {
                    console.log(res.data);
                    this.keywordInfoDatas = res.data;
                }, (res) => {
                    console.log(res.value);
                });
                request.monitor.countKeywordInfo(this.searchFilters, (res) => {
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
    .acqBbsList {
        height: 100%;
    }
    .acqBbsList .el-table{
        height: calc(100% - 110px);
        overflow: auto;
    }
    .acqBbsList .tabWrapper {
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
        width: 120px;
        display: inline-block;
    }

    .itemInput {
        display: inline-block;
        width: calc(100% - 130px);
    }
</style>