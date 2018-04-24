/**
 * Created by MDJ on 2018/3/28.
 */
let filter = {
    op: {
        bigger: 1,
        equal: 2,
        small: 3,
        like: 4,
        biggerEqual: 5,
        smallEqual: 6,
        notEqual: 7,
        in: 8,
        and: 9,
        notLike: 10,
        notNull: 11,
        between: 12,
        notIn: 13
    },
    relation: {
        and: 1,
        or: 2
    },
    fieldType: {
        default: 0,
        text: 1,
        date: 2,
        comboBox: 3,
        checkBox: 4,
        int: 5
    }
};

let getFilter = (columnName, op, value) => {
    return {"columnName": columnName, "op": op, "value": value}
};

let convertFilter = (columnName, value) => {
    let f;
    switch(columnName) {
        case "internal_ip": f = getFilter(columnName, filter.op.equal, value); break;
        case "nickname": f = getFilter(columnName, filter.op.like, value); break;
        case "hostName": f = getFilter(columnName, filter.op.like, value); break;
        case "name": f = getFilter(columnName, filter.op.like, value); break;
        case "bid": f = getFilter(columnName, filter.op.equal, value); break;
        case "keyword": f = getFilter(columnName, filter.op.like, value); break;
        case "source": f = getFilter(columnName, filter.op.like, value); break;
        default: console.log("没有这个columnName", columnName);
    }
    return f;
};

let filterFactory = {
    getFilter: getFilter,
    convertFilter: convertFilter,
    filter: filter
}

export default filterFactory