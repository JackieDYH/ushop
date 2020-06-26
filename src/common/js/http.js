import axios from 'axios'
import store from '../../store'
/**
 * 携带token get请求
 * @param {*} url 
 * @param {*} params 
 */
function get(url,params={}){
    return new Promise((resolve,reject)=>{
        axios({
            url,
            params,
            headers:{//token 信息
                'Authorization' : store.state.userinfo.token
            }
        }).then(response=>{
            resolve(response);
        }).catch(err=>{
            reject(err);
        })
    })
}

function post(url,data={}){
    return new Promise((resolve,reject)=>{
        axios({
            url,
            method:'post',
            data,
            headers:{//token 信息
                'Authorization' : store.state.userinfo.token
            }
        }).then(response=>{
            resolve(response);
        }).catch(err=>{
            reject(err);
        })
    })
}

export default {
    get,post
}