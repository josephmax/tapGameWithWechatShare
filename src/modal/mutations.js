import Vue from 'vue'
var localNotes = {}
const mutations = {
    SET_USERINFO(state, userInfo){
        for (var key in userInfo){
            if (key in state.userInfo){
                state.userInfo[key] = userInfo[key]
            }
        }
        state.userInfo.userInfoFetched = true
        console.log(state.userInfo)
    },
    SUBMIT_SCORE(state, score){
        for (var key in score){
            if (key in state.userInfo){
                state.userInfo[key] = score[key]
            }
        }
        state.userInfo.submitScoreResult = true
        console.log(state.userInfo)
    },
    NO_INTERESTED_USER(state, userInfo){
        for (var key in userInfo){
            if (key in state.userInfo){
                state.userInfo[key] = userInfo[key]
            }
        }
        state.userInfo.userInfoFetched = false
    }
}

export default mutations