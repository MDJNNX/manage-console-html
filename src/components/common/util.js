/**
 * Created by MDJ on 2018/4/9.
 */
let getDateField = (date, field) => {
    let tval = "";
    switch(field) {
        case "month": tval = date.getMonth() + 1 + ""; break;
        case "day":   tval = date.getDate() + "";      break;
        case "hour":  tval = date.getHours() + "";      break;
        default:
            console.log("no such field", field);
    }
    return tval.length == 1? ("0" + tval) : tval;
}

let getToDate = (date, days) => {
    let d = new Date(date);
    d.setDate(d.getDate() + days);
    let m = d.getMonth() + 1 + "";
    let month = m.length == 1 ? ("0" + m) : m;
    let iday = d.getDate() + "";
    let day = iday.length == 1 ? ("0" + iday) : iday;
    return d.getFullYear() + '-' + month + '-' + day;
};

let getToHour = (date, hours) => {
    let d = new Date(date);
    d.setHours(d.getHours() + hours);
    return d.getFullYear() + "-" + getDateField(d, "month") + "-" + getDateField(d, "day") + " " + getDateField(d, "hour");
};

let alarmItems = {
    alarmArr: ["kpi", "period", "reg", "symbol"],
    alarmObj: {
        kpi: [{"label": "cpu使用率", value: "1"}, {"label": "disk使用率", value: "2"}, {"label": "io使用率", value: "3"}, {"label": "mysql活跃线程数", value: "4"}, {"label": "内存使用率", value: "5"}],
        period: [{"label": "5分钟", value: "1"}, {"label": "10分钟", value: "2"}, {"label": "15分钟", value: "3"}, {"label": "60分钟", value: "4"}],
        reg: [{"label": "平均值", value: "1"}, {"label": "总是", value: "2"}, {"label": "只要有一次", value: "3"}],
        symbol: [{"label": ">=", value: "1"}, {"label": ">", value: "2"}, {"label": "<=", value: "3"}, {"label": "<", value: "4"}, {"label": "=", value: "5"}, {"label": "!=", value: "6"}]
    }
};

let util = {
    getDateField: getDateField,
    getToDate: getToDate,
    getToHour: getToHour,
    alarmItems: alarmItems
};

export default util;