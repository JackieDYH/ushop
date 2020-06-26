export default {
    // 异步操作 {commit}  context.commit
    setUserinfoSync({commit},info){
        commit('setUserinfo',info);
    }
}