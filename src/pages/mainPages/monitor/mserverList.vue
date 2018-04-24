<template>
    <div class="mserverList">
        <div v-if="showMonitorList" class="rightContent">
            <div class="toolbar">
                <div class="operatorWrapper">
                    <el-button-group>
                        <el-button type="primary" icon="el-icon-plus" @click="addServer">添加</el-button>
                        <el-button type="primary" icon="el-icon-delete" @click="deleteServer">删除</el-button>
                    </el-button-group>
                </div>
                <div class="searchWrapper">
                    <el-select class="searchTag" v-model="selectValue" placeholder="Select">
                        <el-option name="monitor"
                                   v-for="item in selectOptions"
                                   :key="item.value"
                                   :label="item.label"
                                   :value="item.value">
                        </el-option>
                    </el-select>
                    <el-input class="searchInput" v-model="searchValue" placeholder="请输入内容"></el-input>
                    <el-button type="primary" @click="searchBtn">查询</el-button>
                </div>
            </div>
            <div class="datagridWrapper">
                <server-grid :datagridOptions="datagridOptions" :paginator="paginator"
                             @dblclick="openServerDialog"
                             @onShowChart="showChart"
                             @onChangePage="reSearchData"
                             @onChangeSelect="changeSelect"
                             @onCheckedAllChanged="checkedAllChanged"></server-grid>
            </div>
            <el-dialog :title="serverDialog.serverDialogTitle" width="30%"
                       :visible.sync="serverDialog.serverDialogFormVisible">
                <el-form :model="serverDialog.form">
                    <el-form-item label="实例名称" :label-width="serverDialog.formLabelWidth">
                        <el-input v-model="serverDialog.form.nickname" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="内网ip" :label-width="serverDialog.formLabelWidth">
                        <el-input v-model="serverDialog.form.internal_ip" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="serverDialog.serverDialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="confimBtn">确 定</el-button>
                </div>
            </el-dialog>
        </div>
        <!--
         此处其实简单的用v-if切换显示即可, 不需要用router-view来引入mchart.vue
        -->
        <div v-if="!showMonitorList" class="chartContent">
            <router-view @onGoBack="showList"></router-view>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import request  from '../../../components/common/request'
    import filterFactory from '../../../components/common/filterFactory'
    import serverGrid from './sub/serverGrid.vue'

    export default{
        components: {
            serverGrid
        },
        data() {
            return {
                selectValue: '',
                searchValue: '',
                filters: [],
                selectOptions: [{
                    value: 'internal_ip',
                    label: '内网ip'
                }, {
                    value: 'nickname',
                    label: '实例名称'
                }],
                showMonitorList: true,
                datagridOptions: {
                    canSelectAll: {
                        enable: true,
                        checkedStatus: false,
                        checkedIds: []
                    },
                    columns: [
                        {"header": "id", "column": "id", width: "5%", position: {head: "center", table: "center"}},
                        {
                            header: "实例名称",
                            column: "nickname",
                            width: "15%",
                            position: {head: "center", table: "center"}
                        },
                        {
                            header: "IP地址",
                            column: "internal_ip",
                            width: "55%",
                            position: {head: "center", table: "center"}
                        },
                        {
                            header: "添加时间",
                            column: "add_time",
                            width: "15%",
                            position: {head: "center", table: "center"}
                        },
                        /*{
                         header: '监控',
                         column: 'monitor',
                         width: "10%",
                         position: {head: "center", table: "center"}
                         }*/
                    ],
                    datas: []
                },
                paginator: {
                    pageSize: 20,
                    totalCount: 0
                },
                serverDialog: {
                    serverDialogTitle: "详情",
                    serverDialogFormVisible: false,
                    formLabelWidth: "120px",
                    form: {
                        id: '',
                        nickname: '',
                        internal_ip: ''
                    }
                },
                serverAddDialog: true
            }
        },
        methods: {
            getServers(fs, start) {
                request.server.search(fs, start, this.paginator.pageSize, (res) => {
//                    if(this.datagridOptions.)
                    this.datagridOptions.datas = res.value;
                }, (res) => {
                    console.log("server search error");
                });
                request.server.count(fs, (res) => {
                    this.paginator.totalCount = res.value;
                }, (res) => {
                    console.log("server count error");
                })
            },
            searchBtn() {
                let searchParam = filterFactory.convertFilter(this.selectValue, this.searchValue);
                this.filters = [searchParam];
                this.getServers(this.filters, 0);
            },
            reSearchData: function (pageIndex) {
                console.log("father", pageIndex);
                this.getServers(this.filters, this.paginator.pageSize * (pageIndex - 1));
            },
            changeSelect(idArr) {
                this.datagridOptions.checkedIds = idArr;
            },
            checkedAllChanged(checkedResult) {
                console.log(checkedResult);
                this.datagridOptions.canSelectAll.checkedStatus = checkedResult;
            },
            openServerDialog(data) {
                this.serverDialog.serverDialogFormVisible = true;
                if (data) {
                    this.serverAddDialog = false;
                    this.serverDialog.form.id = data["id"];
                    this.serverDialog.form.nickname = data["nickname"];
                    this.serverDialog.form.internal_ip = data["internal_ip"];
                } else {
                    this.serverAddDialog = true;
                    this.serverDialog.form.nickname = '';
                    this.serverDialog.form.internal_ip = '';
                }
            },
            deleteServer() {
                if (this.datagridOptions.canSelectAll.checkedStatus) {
                    request.server.del(this.filters, true, 1, (res) => {
                        this.$message('删除成功!');
                        this.getServers([], 0);
                    }, (res) => {
                        this.$message('删除失败!');
                        console.log("del fail", res.value);
                    });
                } else {
                    if (this.datagridOptions.canSelectAll.checkedIds.length == 0) {
                        return;
                    }
                    request.server.del(this.filters, false, this.datagridOptions.checkedIds.join(','), (res) => {
                        console.log("del success", res.value);
                    }, (res) => {
                        console.log("del fail", res.value);
                    })
                }
            },
            addServer() {
                this.openServerDialog();
            },
            confimBtn() {
                if (this.serverAddDialog) {  //add server
                    console.log("click ed");
                    let server = {
                        nickname: this.serverDialog.form.nickname,
                        internal_ip: this.serverDialog.form.internal_ip
                    };
                    request.server.add(server, (res) => {
                        if (res.value) {
                            this.$message('添加成功!');
                            this.getServers([], 0);
                        } else {
                            this.$message('添加失败!');
                        }
                        this.serverDialog.serverDialogFormVisible = false;
                    }, (res) => {
                        console.log("add server error", res.value);
                        this.serverDialog.serverDialogFormVisible = false;
                    });
                } else {                    //edit server
                    let server = {
                        id: this.serverDialog.form.id,
                        nickname: this.serverDialog.form.nickname,
                        internal_ip: this.serverDialog.form.internal_ip
                    };
                    request.server.update(server, (res) => {
                        if (res.value) {
                            this.$message('编辑成功!');
                            this.getServers([], 0);
                        } else {
                            this.$message('编辑失败!');
                        }
                        this.serverDialog.serverDialogFormVisible = false;
                    })
                }
//                this.serverDialog.serverDialogFormVisible = false;
            },
            showChart() {
                this.showMonitorList = false;
            },
            showList() {
                this.showMonitorList = true;
            }
        },
        mounted() {
            this.getServers([], 0);
        }
    }
</script>

<style>
    .mserverList {
        float: left;
        height: 100%;
        width: calc(100% - 220px);
    }
    .rightContent {
        height: 100%;
        padding: 0px 5px;
    }
    .chartContent {
        display: inline-block;
        overflow: auto;
    }
    .toolbar {
        padding: 0px 5px;
        border-top: 1px solid #E1E6EB;
        height: 50px;
        line-height: 50px;
    }

    .operatorWrapper {
        display: inline-block;
        float: left;
    }

    .searchWrapper {
        float: right;
        text-align: left;
        margin-bottom: 5px;
    }

    .searchWrapper .searchTag {
        display: inline-block;
        width: 120px;
    }

    .searchWrapper .searchInput {
        display: inline-block;
        width: 300px;
        height: 35px;
        line-height: 35px;
        border-radius: 2px;
    }

    .datagridWrapper {
        width: calc(100% - 10px);
        height: calc(100% - 60px);
        padding: 0px 5px 5px 5px;
    }
</style>
