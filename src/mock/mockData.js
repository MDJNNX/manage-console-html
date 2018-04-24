/**
 * Created by MDJ on 2018/3/15.
 */
export default{
    ['POST */getUser']: {
        username: "mdj",
        password: "password",
        end_date: "2018-12-23 10:10:10"
    }, // respond with only body, status code = 200

    ['POST */getAuth']: {
        menus: [
            {"id": 1000, "parent_id": "0",      "name": "资源监测",       "add_time": "2018-01-08", "level": 0, "flag": "monitor", "display_order": 1},
                {"id": 1100, "parent_id": "1000",   "name": "服务器监测",     "add_time": "2018-01-08", "level": 1, "flag": "monitor_server", "display_order": 1},
                {"id": 1200, "parent_id": "1000",   "name": "采集程序",       "add_time": "2018-01-08", "level": 1, "flag": "monitor_acq", "display_order": 2},
                    {"id": 1210, "parent_id": "1200",   "name": "采集生存状态",   "add_time": "2018-01-08", "level": 2, "flag": "monitor_acq_alive", "display_order": 1},
                    {"id": 1220, "parent_id": "1200",   "name": "论坛采集状态",   "add_time": "2018-01-08", "level": 2, "flag": "monitor_acq_luntan", "display_order": 2},
                {"id": 1300, "parent_id": "1000",   "name": "平台监测",       "add_time": "2018-01-08", "level": 1, "flag": "monitor_platform", "display_order": 3},
            {"id": 2000, "parent_id": "0",   "name": "舆情支撑",       "add_time": "2018-01-08", "level": 0, "flag": "support", "display_order": 2},
                {"id": 2100, "parent_id": "2000", "name": "平台新建引导", "addd_time": "2018-01-08", "level": 1, "flag": "support_guide", "display_order": 1},
            {"id": 3000, "parent_id": "0",   "name": "日常工作",       "add_time": "2018-01-08", "level": 0, "flag": "routine", "display_order": 3},
            {"id": 4000, "parent_id": "0",   "name": "系统设置",       "add_time": "2018-01-08", "level": 0, "flag": "setting", "display_order": 4}
        ]
    }
}