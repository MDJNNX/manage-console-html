<template>
    <div class="acqBbsList">
        <div class="searchWrapper">
            <el-select class="itemSelect" v-model="selectItem" placeholder="请选择">
                <el-option
                        v-for="item in bbsThreadOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-input class="itemInput" @keyup.enter.native="searchResult"  v-model="searchValue" placeholder="请输入内容"></el-input>
        </div>
        <el-table
                class="bbsInfoTable"
                :data="bbsThreadDatas"
                border
                style="width: 100%;">
            <el-table-column
                    prop="bid"
                    label="板块id"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="thread_url"
                    label="链接"
                    width="300">
            </el-table-column>
            <el-table-column
                    prop="request"
                    label="请求异常"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="pubtime"
                    label="发布时间异常"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="author"
                    label="发帖人异常"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="author"
                    label="标题异常"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="author"
                    label="内容异常"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="author"
                    label="回帖异常"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="start"
                    label="采集时间">
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
                bbsThreadOptions: [
                    {"label": "板块id", "value": "bid"}
                ],
                bbsThreadDatas: [],
                paginator: {
                    currentPage: 1,
                    pageSize: 20,
                    bbsInfoCount: 120
                }
            }
        },
        methods: {
            getData() {
                request.monitor.searchThread(this.searchFilters, this.paginator.currentPage, this.paginator.pageSize, (res) => {
                    console.log(res.data);
                    this.bbsThreadDatas = res.data;
                }, (res) => {
                    console.log(res.value);
                });
                request.monitor.countThread(this.searchFilters, (res) => {
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