<template>
    <div class="leftMenu">
        <div class="nav-wrap">
            <ul class="navUlStyle list-unstyled">
                <li class="nav-title">
                    <span style="color: white;">导航</span>
                </li>
                <li v-for="(menu, index) in menus" :class="{active: index == activeIndex}">
                    <a @click="menuClick(index)">
                        <span class="menuIcon glyphicon glyphicon-stats"></span>
                        <span class="menuName">{{ menu["name"] }}</span>
                            <span v-if="menu.children.length > 0"
                                  :class="[menu.status.isExpanded && activeIndex == index ? 'el-icon-arrow-down' : 'el-icon-arrow-right']"></span>
                        <!--<span v-if="menu.children.length == 0" class="nonSubMenuArrow"></span>-->
                    </a>
                    <transition name="subMenuAnimation">
                        <ul class="nav nav-sub" v-if="menu.status.isShowSub && activeIndex == index">
                            <li v-for="(submenu, index) in menu.children" class="submenu">
                                <a @click="rootMenuClick(submenu['flag'])">
                                    <span class="subMenuName">{{ submenu["name"] }}</span>
                                </a>
                            </li>
                        </ul>
                    </transition>
                </li>
            </ul>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        props: {
            bigMenu: {

            },
            menus: {
                type: Array,
                default: [
                    {
                        id: 1000,
                        name: "url-1",
                        children: [
                            {
                                id: 1100,
                                name: "url-1-1"
                            },
                            {
                                id: 1200,
                                name: "url-1-2"
                            }
                        ]
                    },
                    {
                        id: 2000,
                        name: "url-2",
                        children: [
                            {
                                id: 2100,
                                name: "url-2-1"
                            },
                            {
                                id: 2200,
                                name: "url-2-2"
                            }
                        ]
                    }
                ]
            }
        },
        data() {
            return {
                activeIndex: 0,
                oldIndex: 1
            }
        },
        methods: {
            menuClick(index) {
                this.activeIndex = index;
                let clickedMenu = this.menus[index];
                let status = clickedMenu["status"];
                if (clickedMenu["children"].length > 0) {
                    if (status.isExpanded) {
                        this.menus[index].status.isExpanded = false;
                        this.menus[index].status.isShowSub = false
                    } else {
                        this.menus[index].status.isExpanded = true;
                        this.menus[index].status.isShowSub = true
                    }
                } else {
                    this.rootMenuClick(this.menus[index]["flag"]);
                }

                if (this.activeIndex != this.oldIndex) {
                    this.menus[this.oldIndex].status.isExpanded = false;
                    this.menus[this.oldIndex].status.isShowSub = false;
                }

                console.log(this.activeIndex, ",", this.oldIndex);

                this.oldIndex = index;
            },
            rootMenuClick(flag) {
                console.log(flag);
                switch(flag) {
                    case "monitor_server_list":
                        this.$router.push({path: '/main/monitor/mserverList'});
                        console.log("list");
                        break;
                    case "monitor_server_rule":
                        this.$router.push({path: '/main/monitor/malarmRule'});
                        console.log("rule");
                        break;
                    case "monitor_acq":
                        this.$router.push({path: '/main/monitor/acq'});
                        console.log("acq");
                        break;
                }
            }
        },
        mounted() {
//            this.menuClick(0);
        }
    }
</script>

<style>
    .subMenuAnimation-enter {
        transform: translateX(-20px)
    }

    .subMenuAnimation-enter-active {
        transition: all .4s ease;
    }
    .leftMenu {
        float: left;
        width: 220px;
        background-color: #3a3f51;
        height: 100%;
    }
    .nav-title {
        text-align: left;
        margin-left: 20px;
        padding: 5px;
    }

    .nav-title:hover {
        background-color: transparent !important;
    }
    .navUlStyle {
        padding-left: 0px;
    }
    .navUlStyle li {
        font-size: 15px !important;
        list-style: none;
        display: block;
        text-align: left;
    }

    .navUlStyle li .menuName:hover {
        color: white;
        background-color: transparent;
    }

    .navUlStyle li:hover {
        /*background-color: #2e3344;*/
    }

    .navUlStyle li a {
        margin-left: 15px;
        display: inline-block;
        color: lightgray !important;
        height: 40px;
        line-height: 40px;
        text-decoration: none;
        padding: 5px;
        text-align: left;
    }

    .navUlStyle li a:hover {
        cursor: pointer;
        color: white;
        background-color: transparent !important;
    }

    .menuName {
        display: inline-block;
        width: 80px;
        margin-left: 5px;
        text-align: left;
    }

    .subMenuName {
        display: block;
        margin-left: 25px;
    }

    .menuIcon {
        display: inline-block;
        width: 40px;
        margin: 10px auto;
    }

    .subMenuIcon {
        top: 12px;
        margin-left: 30px;
        margin-right: 15px;
        float: right;
    }

    .subMenu a {
        position: absolute !important;
        left: 50px !important;;
        display: inline-block !important;
        margin-left: 50px !important;
        text-align: left;
    }

    .nav-sub {
        background-color: #2e3344;
    }

    .subMenu a:hover {
        color: white !important;
    }

    .nonSubMenuArrow {
        margin-right: 20px;
    }
</style>