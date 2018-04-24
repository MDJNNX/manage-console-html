/**
 * Created by MDJ on 2018/3/16.
 */
let user =  {
    set(userObj) {
        this.userObj = userObj;
    },
    get() {
        return this.userObj;
    }
}

export default {
    user: user
}