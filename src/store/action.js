export default {
    // 异步操作 {commit}  context.commit
    setUserinfoSync({commit},info){
        commit('setUserinfo',info);
    },
    setCartlistSync(context,info){
        context.commit('setCartlist',info);
    },
    setUrlpathSync({commit},info){
        commit('setUrlpath',info);
    }
}