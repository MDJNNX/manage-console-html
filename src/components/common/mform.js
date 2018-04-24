/**
 * Created by MDJ on 2018/4/4.
 */

let formEleFactory = {
    input: {
        getHtml(item) {
            return `<el-form-item label="${item.itemLabel}"><el-input v-model="mform.${item.itemName}"></el-input></el-form-item>`;
        },
        setData() {

        }
    }
}

let mform = {
    getHtml(items) {
        let formBegin = `<el-form ref="form" :model="form" label-width="80px">`;
        for (let item of items) {
            formBegin = formBegin + formEleFactory[item.itemType].getHtml(item);
        }
        let formEnd = `</el-form>`;
        return formBegin + formEnd;
    }
};

export default mform
