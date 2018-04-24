<template>
    <div>
        <!-- Top content -->
        <div class="top-content">
            <div class="inner-bg">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-8 col-sm-offset-2 text">
                            <h1><strong>上元信</strong> 综合管理平台</h1>
                            <div class="description">
                                <p>
                                    This is a integrated system including monitoring of servers, warning of programs ,
                                    guiding of platform creating and supporting service!
                                </p>
                                <p>
                                    该平台集成舆情产品所有服务器的监控, 采集程序的监控, 平台搭建引导, 支撑体系;
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <!--<div class="col-sm-6 book">
                            <img src="../assets/images/ebook.png" alt="">
                        </div>-->
                        <el-row>
                            <el-col :span="6" :offset="5">
                                <img src="../assets/images/ebook.png" alt="">
                            </el-col>
                            <el-col :span="7">
                                <div class="form-box">
                                    <div class="form-top">
                                        <div class="form-top-left">
                                            <h3>Shang Yuan Xin </h3>
                                            <p>嗨, 赶快登陆平台, 开启你的工作之旅吧......</p>
                                        </div>
                                        <div class="form-top-right">
                                            <i class="fa fa-pencil"></i>
                                        </div>
                                    </div>
                                    <div class="form-bottom">
                                        <div role="form" action="" method="post" class="registration-form loginBox">
                                            <div class="form-group">
                                                <label class="input_label" for="form-first-name">用户名:</label>
                                                <input type="text" name="form-first-name" placeholder="用户名..."
                                                       class="form-first-name form-control" id="form-first-name"
                                                       v-model="username"
                                                >
                                            </div>
                                            <div class="form-group">
                                                <label class="input_label" for="form-last-name">密码</label>
                                                <input type="password" name="form-last-name" placeholder="密码..."
                                                       class="form-last-name form-control" id="form-last-name"
                                                       v-model="userpass"
                                                >
                                            </div>
                                            <div class="form-group">
                                                <label class="input_label" for="form-email">Email</label>
                                                <input type="text" name="form-email" placeholder="邮箱..."
                                                       class="form-email form-control" id="form-email"
                                                       v-model="usermail"
                                                >
                                            </div>
                                            <button class="btn loginBtn" @click="loginBtn">点我登陆!</button>
                                        </div>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </div>
        </div>
        <div class="backstretch"
             style="left: 0px; top: 0px; overflow: hidden; margin: 0px; padding: 0px; height: 100%; width: 1903px; z-index: -999999; position: fixed;">
            <img src="../assets/images/1.jpg"
                 style="position: absolute; margin: 0px; padding: 0px; border: none; width: 1903px; height: 1427.25px; max-height: none; max-width: none; z-index: -999999; left: 0px; top: -440.625px;">
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import Axios  from 'axios'
    import Cookie from '../components/common/cookie'
    import Repository from '../components/common/repository'
    import Request from '../components/common/request'

    export default{
        data () {
            return {
                username: '',
                userpass: '',
                usermail: ''
            }
        },
        methods: {
            loginBtn() {
                let _vm = this;
                let loginInfo = {"username": this.username, "userpass": this.userpass};
                Request.user.login(loginInfo, function (result) {
                    console.log(result);
                    let user = result.value;
                    Cookie.setCookie("token", user.token, {'expires': 7, path: '/'});
                    Repository.user.set(user);
                    _vm.$router.push({path: '/main/monitor/mserverList'});
                }, function (res) {
                    console.log("登陆异常", res)
                });
            }
        }
    }
</script>

<style>
    body {
        font-family: 'Roboto', sans-serif;
        font-size: 16px;
        font-weight: 300;
        color: #888;
        line-height: 30px;
        text-align: center;
    }

    /***** Top content *****/
    .navbar-header-menu a {
        color: lightcyan;
    }
    .inner-bg {
        padding: 60px 0 150px 0;
    }
    .input_label {
        display: inline-block;
        width: 80px;
        height: 56px;
        color: white;
        font-size: 18px;
    }
    .form-group {
        padding: 5px 0px;
    }
    .top-content .text {
        padding-bottom: 60px;
        color: #fff;
    }

    .top-content .text h1 {
        color: #fff;
    }
    .loginBtn {
        margin-bottom: 10px;

    }
    .top-content .description {
        margin: 20px 0 10px 0;
    }

    .top-content .description p {
        opacity: 0.8;
    }

    .top-content .description a {
        color: #fff;
    }

    .top-content .description a:hover,
    .top-content .description a:focus {
        border-bottom: 1px dotted #fff;
    }

    .top-content .top-big-link {
        margin-top: 35px;
    }

    .top-content .book img {
        -moz-border-radius: 4px;
        -webkit-border-radius: 4px;
        border-radius: 4px;
    }
    .form-box {
        height: 480px;
    }
    .form-top {
        overflow: hidden;
        padding: 0 25px 15px 25px;
        background: #444;
        background: rgba(0, 0, 0, 0.35);
        -moz-border-radius: 4px 4px 0 0;
        -webkit-border-radius: 4px 4px 0 0;
        border-radius: 4px 4px 0 0;
        text-align: left;
    }

    .form-top-left {
        float: left;
        width: 75%;
        padding-top: 25px;
    }

    .form-top-left h3 {
        margin-top: 0;
        color: #fff;
    }

    .form-top-left p {
        opacity: 0.8;
        color: #fff;
    }

    .form-top-right {
        float: left;
        width: 25%;
        padding-top: 5px;
        font-size: 66px;
        color: #fff;
        line-height: 100px;
        text-align: right;
        opacity: 0.3;
    }

    .form-bottom {
        padding: 25px 25px 30px 25px;
        background: #444;
        background: rgba(0, 0, 0, 0.3);
        -moz-border-radius: 0 0 4px 4px;
        -webkit-border-radius: 0 0 4px 4px;
        border-radius: 0 0 4px 4px;
        text-align: left;
    }

    .form-bottom form textarea {
        height: 100px;
    }

    .form-bottom form .input-error {
        border-color: #19b9e7;
    }

    @media (min-width: 992px) and (max-width: 1199px) {
    }

    @media (min-width: 768px) and (max-width: 991px) {
    }

    @media (max-width: 767px) {

        .inner-bg {
            padding: 60px 0 110px 0;
        }

        .top-content .top-big-link {
            margin-top: 25px;
        }

        .top-content .top-big-link a.btn {
            margin-top: 10px;
        }

        .top-content .form-box {
            padding-top: 80px;
        }

    }

    @media only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (   min--moz-device-pixel-ratio: 2), only screen and (     -o-min-device-pixel-ratio: 2/1), only screen and (        min-device-pixel-ratio: 2), only screen and (                min-resolution: 192dpi), only screen and (                min-resolution: 2dppx) {
        .navbar-brand {
            background-image: url(../assets/images/ebook@2x.png) !important;
            background-repeat: no-repeat !important;
            background-size: 123px 49px !important;
        }
    }

    .loginBox input,
    textarea,
    textarea.form-control {
        height: 50px;
        margin: 0;
        padding: 0 20px;
        vertical-align: middle;
        background: #fff;
        border: 3px solid #fff;
        font-family: 'Roboto', sans-serif;
        font-size: 16px;
        font-weight: 300;
        line-height: 50px;
        color: #888;
        -moz-border-radius: 4px;
        -webkit-border-radius: 4px;
        border-radius: 4px;
        -moz-box-shadow: none;
        -webkit-box-shadow: none;
        box-shadow: none;
        -o-transition: all .3s;
        -moz-transition: all .3s;
        -webkit-transition: all .3s;
        -ms-transition: all .3s;
        transition: all .3s;
        width: 300px;
    }

    textarea,
    textarea.form-control {
        padding-top: 10px;
        padding-bottom: 10px;
        line-height: 30px;
    }

    input[type="text"]:focus,
    textarea:focus,
    textarea.form-control:focus {
        outline: 0;
        background: #fff;
        border: 3px solid #fff;
        -moz-box-shadow: none;
        -webkit-box-shadow: none;
        box-shadow: none;
    }

    button.btn {
        height: 50px;
        margin: 0;
        padding: 0 20px;
        vertical-align: middle;
        background: #19b9e7;
        border: 0;
        font-family: 'Roboto', sans-serif;
        font-size: 16px;
        font-weight: 300;
        line-height: 50px;
        color: #fff;
        -moz-border-radius: 4px;
        -webkit-border-radius: 4px;
        border-radius: 4px;
        text-shadow: none;
        -moz-box-shadow: none;
        -webkit-box-shadow: none;
        box-shadow: none;
        -o-transition: all .3s;
        -moz-transition: all .3s;
        -webkit-transition: all .3s;
        -ms-transition: all .3s;
        transition: all .3s;
    }

    button.btn:hover {
        opacity: 0.6;
        color: #fff;
    }

    button.btn:active {
        outline: 0;
        opacity: 0.6;
        color: #fff;
        -moz-box-shadow: none;
        -webkit-box-shadow: none;
        box-shadow: none;
    }

    button.btn:focus {
        outline: 0;
        opacity: 0.6;
        background: #19b9e7;
        color: #fff;
    }

    button.btn:active:focus, button.btn.active:focus {
        outline: 0;
        opacity: 0.6;
        background: #19b9e7;
        color: #fff;
    }


</style>