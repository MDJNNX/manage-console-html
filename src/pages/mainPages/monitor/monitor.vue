<template>
    <div class="monitor">
        <left-menu :menus="menus"></left-menu>
        <router-view></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
    import request  from '../../../components/common/request'
    import leftMenu from '../../../components/common/menu'

    export default {
        components: {
            leftMenu
        },
        data() {
            return {
                menus: []
            }
        },
        methods: {
            makeMenuTree(menus) {
                let menuMap = {};
                let menuTree = [];

                for (let menu of menus) {
                    let node = {
                        "id": menu["id"], "name": menu["name"], "children": [], "flag": menu["flag"], "status": {
                            isExpanded: false,
                            isShowSub: false
                        }
                    };
                    if (menu["parent_id"] == 1000) {
                        menuTree.push(node);
                        menuMap[menu.id] = node;
                    } else if (menuMap[menu["parent_id"]]) {
                        menuMap[menu["parent_id"] + ""].children.push(node);
                    }
                }
                this.menus = menuTree;
                console.log(menuTree);
            },
        },
        mounted() {
            console.log(this);
            request.user.getAuth((result) => {
                console.log(result);
            this.makeMenuTree(result.value.menus);
        }, (data) => {
                console.log(result);
            })
        }
    }
</script>

<style>
    .monitor {
        width: 100%;
        height: 100%;
    }
</style>