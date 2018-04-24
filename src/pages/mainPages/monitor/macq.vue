<template>
    <div class="acqWrapper">
        <el-tabs :tab-position="tabPosition" type="border-card" class="tabWrapper">
            <el-tab-pane label="论坛采集信息"><acq-bbs-info></acq-bbs-info></el-tab-pane>
            <el-tab-pane label="论坛信息列表"><acq-bbs-list></acq-bbs-list></el-tab-pane>
            <el-tab-pane label="bbs采集异常记录"><acq-bbs-thread></acq-bbs-thread></el-tab-pane>
            <el-tab-pane label="关键词采集状态"><acq-keyword-info></acq-keyword-info></el-tab-pane>
        </el-tabs>
    </div>
</template>

<script type="text/ecmascript-6">
    import acqBbsInfo from './sub/acqBbsInfo.vue'
    import acqBbsList from './sub/acqBbsList.vue'
    import acqBbsThread from './sub/acqBbsThread.vue'
    import acqKeywordInfo from './sub/acqKeywordInfo.vue'

    export default {
        components: {
            acqBbsInfo,
            acqBbsList,
            acqBbsThread,
            acqKeywordInfo
        },
        data() {
            return {
                tabPosition: "top"
            }
        }
    }
</script>

<style>
    .acqWrapper {
        float: left;
        height: calc(100% - 20px);
        width: calc(100% - 240px);
        padding: 10px;
    }
    .tabWrapper {
        height: 100%;
    }
</style>