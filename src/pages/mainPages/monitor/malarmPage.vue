<template>
    <div class="alarmTopWrapper">
        <div class="toolbar">
            <div class="operatorWrapper">
                <el-button-group>
                    <el-button type="primary" icon="el-icon-plus" @click="addAlarmRule">添加</el-button>
                    <el-button type="primary" icon="el-icon-delete" @click="deleteAlarmRule">删除</el-button>
                </el-button-group>
            </div>
            <div class="searchWrapper">
                <!--<el-select class="searchTag" v-model="selectValue" placeholder="Select">
                    <el-option name="monitor"
                               v-for="item in selectOptions"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value">
                    </el-option>
                </el-select>-->
                <el-input class="searchInput" v-model="searchValue" placeholder="请输入内容"></el-input>
                <el-button type="primary" plain @click="searchBtn">查询</el-button>
            </div>
        </div>
        <div class="datagridWrapper">
            <alarm-rule-grid :datagridOptions="datagridOptions" :paginator="paginator"
                         @dblclick="openAlarmRuleDialog"
                         @onChangePage="reSearchData"
                         @onChangeSelect="changeSelect"
                         @onCheckedAllChanged="checkedAllChanged"></alarm-rule-grid>
        </div>
        <el-dialog :title="alarmRuleDialog.title" width="30%"
                   :visible.sync="alarmRuleDialog.visible">
            <el-form :model="alarmRuleDialog.form">
                <el-form-item label="规则名" :label-width="alarmRuleDialog.formLabelWidth">
                    <el-input v-model="alarmRuleDialog.form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="性能指标" :label-width="alarmRuleDialog.formLabelWidth">
                    <el-select v-model="alarmRuleDialog.form.kpiId" placeholder="Select">
                        <el-option v-for="item in item.kpi"
                                   :key="item.value"
                                   :label="item.label"
                                   :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="报警周期" :label-width="alarmRuleDialog.formLabelWidth">
                    <el-select v-model="alarmRuleDialog.form.periodId" placeholder="Select">
                        <el-option v-for="item in item.period"
                                   :key="item.value"
                                   :label="item.label"
                                   :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="报警指标" :label-width="alarmRuleDialog.formLabelWidth">
                    <el-select v-model="alarmRuleDialog.form.regId" placeholder="Select">
                        <el-option v-for="item in item.reg"
                                   :key="item.value"
                                   :label="item.label"
                                   :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="报警运算符" :label-width="alarmRuleDialog.formLabelWidth">
                    <el-select v-model="alarmRuleDialog.form.symbolId" placeholder="Select">
                        <el-option v-for="item in item.symbol"
                                   :key="item.value"
                                   :label="item.label"
                                   :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="阈值" :label-width="alarmRuleDialog.formLabelWidth">
                    <el-input v-model="alarmRuleDialog.form.range" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="alarmRuleDialog.visible = false">取 消</el-button>
                <el-button type="primary" @click="confimBtn">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import alarmRuleGrid from './sub/alarmRuleGrid.vue'
    import util from '../../../components/common/util'
    import request from '../../../components/common/request'
    import filterFactory from '../../../components/common/filterFactory'

    export default {
        components: {
            alarmRuleGrid
        },
        data() {
            return {
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
                        }
                    ],
                    datas: []
                },
                paginator: {
                    pageSize: 20,
                    totalCount: 0
                },
                selectValue: '',
                searchValue: '',
                item: util.alarmItems.alarmObj,
                alarmRuleDialog: {
                    tile: '详情',
                    visible: false,
                    formLabelWidth: "120px",
                    form: {
                        id: '',
                        name: '',
                        kpiId: '1',
                        periodId: '1',
                        regId: '1',
                        symbolId: '1',
                        range: ''
                    }
                },
                alarmItems: {

                },
                alramRuleAddDialog: true
            }
        },
        methods: {
            getAlarmRules(start) {
                request.alarmRule.search(this.searchValue, start, this.paginator.pageSize, (res) => {
                    this.datagridOptions.datas = res.value;
            }, (res) => {
                    console.log("server search error");
                });
                request.alarmRule.count(this.searchValue, (res) => {
                    this.paginator.totalCount = res.value;
            }, (res) => {
                    console.log("server count error");
                })
            },
            searchBtn() {
                this.getAlarmRules(0);
            },
            changeSelect(idArr) {
                this.datagridOptions.canSelectAll.checkedIds = idArr;
            },
            onChangePage(page) {
                console.log("page:", page);
            },
            onCheckedAllChanged() {

            },
            dblclick() {

            },
            openAlarmRuleDialog(data) {
                this.alarmRuleDialog.visible = true;
                if (data) {
                    this.alarmRuleDialog.title = "编辑规则";
                    this.alramRuleAddDialog = false;
                    this.alarmRuleDialog.form.id = data["id"];
                    this.alarmRuleDialog.form.name = data["name"];
                    this.alarmRuleDialog.form.kpiId = data["kpiId"];
                    this.alarmRuleDialog.form.periodId = data["periodId"];
                    this.alarmRuleDialog.form.regId = data["regId"];
                    this.alarmRuleDialog.form.symbolId = data["symbolId"];
                    this.alarmRuleDialog.form.range = data["range"];
                } else {
                    this.alramRuleAddDialog = true;
                    this.alarmRuleDialog.form.name = '';
                    this.alarmRuleDialog.form.kpiId = 1;
                    this.alarmRuleDialog.form.periodId = 1;
                    this.alarmRuleDialog.form.regId = 1;
                    this.alarmRuleDialog.form.symbolId = 1;
                    this.alarmRuleDialog.form.range = 10;
                }
            },
            addAlarmRule() {
                this.alarmRuleDialog.visible = true;
                this.alarmRuleDialog.title = "添加规则";
                this.alramRuleAddDialog = true;
            },
            deleteAlarmRule() {
                console.log("ids:", this.datagridOptions.canSelectAll.checkedIds);
                if (this.datagridOptions.canSelectAll.checkedStatus) {
                    request.alarmRule.del(this.searchValue, true, 1, (res) => {
                        this.$message('删除成功!');
                        this.getAlarmRules(0);
                    }, (res) => {
                        this.$message('删除失败!');
                        console.log("del fail", res.value);
                    });
                } else {
                    if (this.datagridOptions.canSelectAll.checkedIds.length == 0) {
                        return;
                    }
                    request.alarmRule.del(this.searchValue, false, this.datagridOptions.canSelectAll.checkedIds.join(','), (res) => {
                        console.log("del success", res.value);
                        this.$message('删除成功!');
                        this.getAlarmRules(0);
                    }, (res) => {
                        this.$message('删除失败!');
                        console.log("del fail", res.value);
                    })
                }
            },
            reSearchData() {
                this.getAlarmRules(0);
            },
            checkedAllChanged() {

            },
            confimBtn() {
                let alarmRule = {
                    name: this.alarmRuleDialog.form.name,
                    kpi_id: this.alarmRuleDialog.form.kpiId,
                    period_id: this.alarmRuleDialog.form.periodId,
                    reg_id: this.alarmRuleDialog.form.regId,
                    symbol_id: this.alarmRuleDialog.form.symbolId,
                    range: this.alarmRuleDialog.form.range
                };

                if (this.alramRuleAddDialog) {
                    console.log("click add alarm rule");
                    request.alarmRule.add(alarmRule, (res) => {
                        if (res.value) {
                            this.$message('添加规则成功!');
                            this.getAlarmRules(0);
                            this.alarmRuleDialog.visible = false;
                        } else {
                            this.$message('添加规则失败!');
                            this.alarmRuleDialog.visible = true;
                        }
                    }, (res) => {
                        console.log("add alarmRule error", res.value);
                        this.alarmRuleDialog.visible = true;
                    });
                } else {
                    alarmRule.id = this.alarmRuleDialog.form.id;
                    request.alarmRule.update(alarmRule, (res) => {
                        if (res.value) {
                            this.$message('编辑规则成功!');
                            this.getAlarmRules(0);
                            this.alarmRuleDialog.visible = false;
                        } else {
                            this.$message('编辑规则失败!');
                            this.alarmRuleDialog.visible = true;
                        }
                    })
                }
            }
        },
        mounted() {
            this.getAlarmRules(0);
        }
    }
</script>

<style>
    .alarmTopWrapper {
        width: calc(100% - 230px);
        float: left;
        padding: 0px 5px;
        height: 100%;
        overflow: auto;
    }
    .operatorWrapper {
        display: inline-block;
        float: left;
    }
    .searchWrapper {
        float: right;
        text-align: left;
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
</style>