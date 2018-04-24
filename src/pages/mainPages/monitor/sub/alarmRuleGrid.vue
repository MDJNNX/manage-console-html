<template>
    <div class="dataGrid">
        <table class="tableHeader">
            <thead>
            <tr>
                <th :style="{'width': '5%', 'text-align': 'center'}" v-if="datagridOptions.canSelectAll.enable">
                    <el-checkbox v-model="datagridOptions.canSelectAll.checkedStatus" @change="checkedAllSelected"></el-checkbox>
                    &nbsp;&nbsp;选择
                </th>
                <th :style="{'width': '5%', 'text-align': 'center'}">id</th>
                <th :style="{'width': '15%', 'text-align': 'center'}">名称</th>
                <th :style="{'width': '15%', 'text-align': 'center'}">性能指标</th>
                <th :style="{'width': '15%', 'text-align': 'center'}">报警周期</th>
                <th :style="{'width': '15%', 'text-align': 'center'}">报警指标</th>
                <th :style="{'width': '10%', 'text-align': 'center'}">报警运算符</th>
                <th :style="{'width': '10%', 'text-align': 'center'}">阈值</th>
                <th :style="{'width': '15%', 'text-align': 'center'}">添加时间</th>
            </tr>
            </thead>
        </table>
        <div class="tableDataWrapper">
            <table class="tableData">
                <tbody>
                <tr v-for="(data, index) in datagridOptions.datas" @dblclick="doubleClick(index)">
                    <td :style="{'width': '5%', 'text-align': 'center'}" v-if="datagridOptions.canSelectAll.enable">
                        <el-checkbox v-model="data.isChecked" @change="changeSelect(index)"></el-checkbox>
                    </td>
                    <td :style="{'width': '5%', 'text-align': 'center'}">{{ data.id }}</td>
                    <td :style="{'width': '15%', 'text-align': 'center'}">{{ data.name }}</td>
                    <td :style="{'width': '15%', 'text-align': 'center'}">{{ data.kpi }}</td>
                    <td :style="{'width': '15%', 'text-align': 'center'}">{{ data.period }}</td>
                    <td :style="{'width': '15%', 'text-align': 'center'}">{{ data.reg}}</td>
                    <td :style="{'width': '10%', 'text-align': 'center'}">{{ data.symbol }}</td>
                    <td :style="{'width': '10%', 'text-align': 'center'}">{{ data.range }}</td>
                    <td :style="{'width': '15%', 'text-align': 'center'}">{{ data.add_time }}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="paginatorWrapper">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :page-size="paginator.pageSize"
                    layout="total, prev, pager, next"
                    :total="paginator.totalCount">
            </el-pagination>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import _ from 'lodash'
    import mform from './../../../../components/common/mform'

    export default {
        props: {
            showMonitorList: true,
            datagridOptions: {
                canSelectAll: {
                    enable: true,
                    checkedStatus: false
                },
                columns: [
                    {"header": "id", "column": "id", width: "5%"},
                    {"header": "姓名", "column": "name", width: "20%"},
                    {"header": "年龄", column: "age", width: "20%"},
                    {"header": "出生日期", column: "birthday", width: "55%"}
                ],
                datas: [
                    {id: 1, name: "mda", age: 20, birthday: "1993-12-20"},
                    {id: 2, name: "mdb", age: 21, birthday: "1993-12-21"},
                    {id: 3, name: "mdc", age: 22, birthday: "1993-12-22"},
                    {id: 4, name: "mdd", age: 23, birthday: "1993-12-23"}
                ]
            },
            paginator: {
                pageSize: 5,
                totalCount: 100
            },
            mformItems: {
                type: Array
            }
        },
        data() {
            return {
                primaryKey: "id",
                checkedIds: []
            }
        },
        methods: {
            doubleClick(index) {
                console.log(this.datagridOptions.datas[index]);
                this.$emit("dblclick", this.datagridOptions.datas[index]);
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(pageIndex) {
                console.log(`当前页: ${pageIndex}`);
                this.$emit("onChangePage", pageIndex);
            },
            checkedAllSelected() {
                console.log(this.datagridOptions.canSelectAll.checkedStatus);
                this.$emit("onCheckedAllChanged", this.datagridOptions.canSelectAll.checkedStatus);
            },
            changeSelect(index) {
                let selectedDataId = this.datagridOptions.datas[index][this.primaryKey];
                if (this.checkedIds.indexOf(selectedDataId) == -1) {
                    this.checkedIds.push(selectedDataId);
                } else {
                    this.checkedIds = _.remove(this.checkedIds, (id) => {
                        return id != selectedDataId;
                    });
                }
                console.log(this.checkedIds);
                this.$emit("onChangeSelect", this.checkedIds);
            },
        }
    }
</script>

<style>
    .dataGrid {
        display: block;
        height: 100%;
        clear: both;
        border-collapse: collapse;
    }

    .tableDataWrapper {
        max-height: calc(100% - 90px);
        overflow: auto;
    }

    .dataGrid thead {
        background-color: rgb(245, 246, 250);
    }

    .dataGrid thead th {
        height: 46px;
        text-align: center;
        border: 1px solid #ddd;
    }

    .dataGrid .tableHeader {
        width: 100%;
    }

    .dataGrid .tableData {
        width: 100%;
        border-collapse: collapse;
        height: calc(100% - 48px);
        overflow: auto;
    }

    .dataGrid .tableData td {
        text-align: center;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-size: 16px;
        border: 1px solid #ddd;
    }

    .dataGrid .tableData tr {
        border: 1px solid #ddd;
        height: 40px;
        line-height: 40px;
        width: 100%;
    }

    .dataGrid tbody {
        width: 100%;
    }

    .paginatorWrapper {
        border: 1px solid #ddd;
        height: 45px;
        line-height: 45px;
        text-align: right;
        padding: 0px 5px;
        width: calc(100% - 10px);
    }

    .paginatorWrapper .el-pagination__total {
        float: left;
    }

    /*.paginatorWrapper .el-pagination .btn-next {
        float: right;
    }
    .paginatorWrapper .el-pagination ul {
        float: right;
    }
    .paginatorWrapper .el-pagination .btn-prev {
        float: right;
    }*/

</style>