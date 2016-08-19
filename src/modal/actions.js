import Vue from 'vue'

export const getUserInfo = ({dispatch}, targetID, wxID) => {
    //0. 设置targetID
    if (targetID==''){
        targetID = wxID
    }
    var userInfo = {
        targetID:targetID,
        userID:wxID,
        score:false,
        helpScore:false
    }
    //1. 获取远端信息
    var options={
        userID:wxID,
        targetID:targetID
    }
    console.log(options)
    Vue.http.post('/iih_wechatbs/home/Swim/getUserInfo', options).then(function(response){
        var result = response.json()
 /*       alert('result.code:'+result.code)
        alert('result.score:'+result.score)
        alert('result.info:'+result.info)*/
        if (result.code==200){
            if (result.score!==false || result.score!=='false'){
                userInfo.score = result.score
            }
            if (targetID!=wxID && ((result.helpScore!==false || result.helpScore!=='false'))){
                userInfo.helpScore = result.helpScore
            }
            console.log(result)
            dispatch('SET_USERINFO', userInfo)
        }else if (result.code==404){
            dispatch('NO_INTERESTED_USER', userInfo)
        }else{
            alert(result.info)
        }
    }, function(response){
        //x. 网络访问错误
        alert('网络错误, 请稍后重试')
    })

}

export const submitScore = ({state, dispatch}, score) => {

    var finalScore = {}

    //1. 向远端提交信息
    var options={
        userID:state.userInfo.userID,
        targetID:state.userInfo.targetID,
        score:false,
        helpScore:false
    }
    //2. 判断当前的模式
    if (state.userInfo.targetID == state.userInfo.userID){
        if (state.userInfo.score!==false){
            alert('非法访问')
        }else{
            finalScore = {
                score : score
            }
            options.score = score
        }
    }else{
        if (state.userInfo.helpScore!==false){
            alert('非法访问')
        }else{
            finalScore = {
                helpScore : score
            }
            options.helpScore = score
        }
    }
    console.log(options)
    Vue.http.post('/iih_wechatbs/home/Swim/submitScore', options).then(function(response){
        var result = response.json()
        console.log(result)
        if (result.code==200){
            dispatch('SUBMIT_SCORE', finalScore)
        }else{
            alert(result.info)
        }
    }, function(response){
        //x. 网络访问错误
        alert('网络错误, 请稍后重试')
    })
    //3. 本地保存得分信息

}