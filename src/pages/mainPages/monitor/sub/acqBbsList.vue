<template>
    <div class="acqBbsList">
        <div class="searchWrapper">
            <el-select class="itemSelect" v-model="selectItem" placeholder="请选择">
                <el-option
                        v-for="item in bbsListOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-input class="itemInput" @keyup.enter.native="searchResult" v-model="searchValue" placeholder="请输入内容"></el-input>
        </div>
        <el-table
                class="bbsInfoTable"
                :data="bbsListDatas"
                border
                style="width: 100%;">
            <el-table-column
                    prop="bid"
                    label="板块id"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="list_url"
                    label="列表链接"
                    width="1000">
            </el-table-column>
            <el-table-column
                    prop="thread_count"
                    label="列表信息数"
                    width="100">
            </el-table-column>
            <el-table-column
                prop="request"
                label="请求详情"
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
                bbsListOptions: [
                    {"label": "板块id", "value": "bid"},
                ],
                bbsListDatas: [],
                paginator: {
                    currentPage: 1,
                    pageSize: 20,
                    bbsInfoCount: 120
                }
            }
        },
        methods: {
            getData() {
                request.monitor.searchBbsList(this.searchFilters, this.paginator.currentPage, this.paginator.pageSize, (res) => {
                    console.log(res.data);
                    this.bbsListDatas = res.data;
                }, (res) => {
                    console.log(res.value);
                });
                request.monitor.countBbsList(this.searchFilters, (res) => {
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