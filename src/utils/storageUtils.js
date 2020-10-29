import store from 'store'

const USERID = 'userid'
export default {
    //保存
    saveUserId(userid) {
        // localStorage.setItem(USERID,JSON.stringify(userid))
        store.set(USERID, userid)
    },
    //读取
    getUserId() {
        // return JSON.parse(localStorage.getItem(USERID) || '{}')
        return store.get(USERID) || ""
    },
    //删除
    deleteUserId() {
        // localStorage.removeItem(USERID)
        store.remove(USERID)
    }
}