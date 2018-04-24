/**
 * Created by MDJ on 2018/3/16.
 */
import Axios from 'axios'
import qs from 'qs'

let baseUrl = 'api/';
let baseURL = 'http://localhost:8083';

if(debug) {
    console.log("hello mdj this is debug mode....");
    baseURL = 'http://localhost:8083'
} else {
    baseURL = 'http://sync.yuwoyg.com:8086'
}

console.log(baseURL);

let requestData = (url, params, success, fail) => {
    Axios({
        //不加这个baseURL参数会有问题;
        baseURL: baseURL,
        method: 'post',
        url: baseUrl + url,
        data: qs.stringify(params)
        //data: params
    }).then(function (res) {
        if (res.status == 200) {
            success(res.data);
        } else {
            fail();
        }
    })
};

let user = {
    url: 'user',
    login(data, success, fail) {
        requestData(this.url + "/login", data, success, fail);
    },
    getAuth(success, fail) {
        requestData(this.url + "/getAuth", {}, success, fail);
    }
};

let monitor = {
    url: 'monitor/data/',
    searchBbsInfo(filters, start, limit, success, fail) {
        requestData(this.url + "/searchBbsInfo", {filters: JSON.stringify(filters), page: start,  size: limit}, success, fail);
    },
    countBbsInfo(filters, success, fail) {
        requestData(this.url + "/countBbsInfo", {filters: JSON.stringify(filters)}, success, fail);
    },
    searchBbsList(filters, start, limit, success, fail) {
        requestData(this.url + "/searchBbsList", {filters: JSON.stringify(filters), page: start,  size: limit}, success, fail);
    },
    countBbsList(filters, success, fail) {
        requestData(this.url + "/countBbsList", {filters: JSON.stringify(filters)}, success, fail);
    },
    searchThread(filters, start, limit, success, fail) {
        requestData(this.url + "/searchThread", {filters: JSON.stringify(filters), page: start,  size: limit}, success, fail);
    },
    countThread(filters, success, fail) {
        requestData(this.url + "/countThread", {filters: JSON.stringify(filters)}, success, fail);
    },
    searchKeywordInfo(filters, start, limit, success, fail) {
        requestData(this.url + "/searchKeywordInfo", {filters: JSON.stringify(filters), page: start,  size: limit}, success, fail);
    },
    countKeywordInfo(filters, success, fail) {
        requestData(this.url + "/countKeywordInfo", {filters: JSON.stringify(filters)}, success, fail);
    },
};

let data = {
    url: 'server',
    search(filters, start, limit, success, fail) {
        //requestData(this.url + "/search", {filters: qs.stringify(filters, {encode: false}), start: start, limit: limit}, success, fail);
    }
};

let server = {
    url: 'server',
    search(filters, start, limit, success, fail) {
        console.log(filters);
        requestData(this.url + "/search", {filters: JSON.stringify(filters), start: start, limit: limit}, success, fail);
    },
    count(filters, success, fail) {
        requestData(this.url + "/count", {filters: JSON.stringify(filters)}, success, fail);
    },
    del(filters, selectAll, ids, success, fail) {
        requestData(this.url + "/del", {filters: JSON.stringify(filters), selectAll: selectAll, ids: ids}, success, fail);
    },
    update(data, success, fail) {
        requestData(this.url + "/update", {"data": JSON.stringify(data)}, success, fail);
    },
    add(data, success, fail) {
        requestData(this.url + "/add", {"data": JSON.stringify(data)}, success, fail);
    },
    chart(serverId, insertTime, success,fail) {
        requestData(this.url + "/chart", {"serverId": serverId, "insertTime": insertTime}, success, fail);
    },
    getById(serverId, success, fail) {
        requestData(this.url + "/getById", {"serverId": serverId}, success, fail);
    }
};

let alarmRule = {
    url: 'alarm/rule',
    search(name, start, limit, success, fail) {
        requestData(this.url + "/searchByName", {name: name, start: start, limit: limit}, success, fail);
    },
    count(name, success, fail) {
        requestData(this.url + "/countByName", {name: name}, success, fail);
    },
    del(filters, selectAll, ids, success, fail) {
        requestData(this.url + "/del", {filters: JSON.stringify(filters), selectAll: selectAll, ids: ids}, success, fail);
    },
    update(data, success, fail) {
        requestData(this.url + "/update", {"data": JSON.stringify(data)}, success, fail);
    },
    add(data, success, fail) {
        requestData(this.url + "/add", {"data": JSON.stringify(data)}, success, fail);
    },
    getById(serverId, success, fail) {
        requestData(this.url + "/getById", {"serverId": serverId}, success, fail);
    }
};

export default {
    user: user,
    monitor: monitor,
    data: data,
    server: server,
    alarmRule: alarmRule
}