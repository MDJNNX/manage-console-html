<template>
    <div>
        <!-- nav -->
        <div class="app-header">
            <div class="navbar-header-left bg-dark">
                <a href="#/" class="navbar-brand text-lt">
                    <span class="m-l-xs">Shang Yuan Xin</span>
                </a>
            </div>
            <div class="navbar-header-right">
                <!--<div class="navbar-user">
                    <a href="#" class="btn no-shadow navbar-btn">
                        <span class="glyphicon glyphicon-th-list"></span>
                    </a>
                    <a class="btn no-shadow navbar-btn">
                        <span class="glyphicon glyphicon-user"></span>
                    </a>
                </div>-->
                <ul class="navbar-left">
                    <li>
                        <a href="#" class="navbar-menu" aria-expanded="false">
                            <span>资源监控</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="navbar-menu">
                            <i class="fa fa-fw fa-plus visible-xs-inline-block"></i>
                            <span>舆情支撑</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="navbar-menu">
                            <i class="fa fa-fw fa-plus visible-xs-inline-block"></i>
                            <span>日常工作</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="navbar-menu">
                            <i class="fa fa-fw fa-plus visible-xs-inline-block"></i>
                            <span>系统设置</span>
                        </a>
                    </li>
                </ul>
                <ul class="navbar-right">
                    <li class="">
                        <a href="#" data-toggle="" class="navbar-menu">
                            <i class="icon-bell fa-fw"></i>
                            <span class="visible-xs-inline">Notifications</span>
                            <span class="glyphicon glyphicon-bell moveUp"></span>
                            <span class="badge badge-sm up bg-danger pull-right-xs">2</span>
                        </a>
                    </li>
                    <li>
                        <span>欢迎: {{ name }}! 登陆综合服务平台</span>
                    </li>
                    <li>
                        <!--<img src="../assets/images/user.jpg" alt="...">-->
                        <a @click="logout"> 退出! </a>
                    </li>
                </ul>
            </div>
        </div>

        <!-- subPage -->
        <div class="app-content">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">

    import Repository from '../components/common/repository'
    import Cookie from '../components/common/cookie'

    export default{
        data () {
            return {
                name: ''
            }
        },
        methods: {
            changeUser() {
                this.name = Repository.user.get()["username"]
                console.log(this.name)
//                this.name = "mdjnnx"
//                Cookie.get
            },
            logout() {
                Cookie.setCookie("token", '', {'expires': 7, path: '/'});
                this.$router.push({path: '/'});
            }
        },
        mounted() {
            this.changeUser()
        }
    }
</script>

<style>
    html body{margin: 0; height: 100%;}
    a {
        text-decoration: none;
        color: grey;
    }
    ::-webkit-scrollbar{
        width: 5px; height: 5px;
    }
    ::-webkit-scrollbar-thumb{
        background-color: rgba(0,0,0,.3);
        border-radius: 6px;
    }
    ::-webkit-scrollbar-track{
        background-color: #ddd;
        border-radius: 6px;
    }
    .navbar-header-left {
        width: 220px;
        text-align: left;
        display: inline-block;
    }
    .navbar-header-left a {
        color: white;
        vertical-align: middle;
    }
    .navbar-header-right {
        width: calc(100% - 220px);
        float: right;
        height: 50px;
        line-height: 50px;
    }
    .navbar-user {
        display: inline-block;
    }
    .navbar-left, .navbar-right{
        height: 50px;
        line-height: 50px;
        padding: 0px;
        margin: 0px;
        display: inline-block;
        list-style-type: none;
    }
    .navbar-left {
        margin-left: 20px;
    }
    .navbar-left li{
        width: 120px;
        float: left;
    }
    .navbar-right li {
        margin-right: 15px;
    }
    .navbar-right li {
        float: left;
        height: 50px;
        line-height: 50px;
    }
    .app-header a {
        vertical-align: middle;
        height: 50px;
        line-height: 50px;
    }
    .navbar-right {
        float: right;
    }
    .navbar-right img {
        height: 50px;
        line-height: 50px;
        border-radius: 10px;
    }
    .app-header {
        height: 50px;
        line-height: 50px;
        text-align: left;
    }

    .bg-dark {
        color: #a6a8b1;
        background-color: #3a3f51;
    }

    .btn {
        font-weight: 500;
        border-radius: 2px;
        outline: 0 !important;
    }

    .app-content {
        height: calc(100vh - 55px);
    }
    /*.rightContent {
        float: left;
        padding: 5px 10px;
        height: 100%;
    }*/
</style>