<template>
    <div class="resultWrapper">
        <div class="progress_my">
            <div class="score">
                <span :class="score_thousand"></span>
                <span :class="score_hundred"></span>
                <span :class="score_decade"></span>
                <span :class="score_unit"></span>
                <span class="danwei">米</span>
            </div>
        </div>
        <div class="swimIndicator_r_my">
            <div id="swimTag" :style="{left:progress+'%'}">
                <img src="http://ker.iihwx.com/iih_wechatbs/Public/home/common/shangshi/img/swimTag.png"/>
            </div>
            <div class="swimBar">
                <img src="http://ker.iihwx.com/iih_wechatbs/Public/home/common/shangshi/img/swimBar.png"/>
            </div>
        </div>
        <div class="share" @click="share2Friends">
            <img src="http://ker.iihwx.com/iih_wechatbs/Public/home/common/shangshi/img/btn/share_btn.png"/>
        </div>
        <div class="popCover" v-if="showShareTips" @click="share2Friends">
            <img src="http://ker.iihwx.com/iih_wechatbs/Public/home/common/shangshi/img/share.png">
        </div>
    </div>
</template>

<script>

    import store from '../modal/store'
    import {getUserInfo, submitScore} from '../modal/actions'
    import { regWechat, reRegWechat } from '../util/utils'
    import {userID, targetID, score, helpScore, submitScoreResult, userInfoFetched, userInfo, wxInfo} from '../modal/getters'

    export default {
        store: store,
        vuex: {
            actions: {
                getUserInfo,
                submitScore
            },
            getters: {
                userID,
                targetID,
                score,
                helpScore,
                submitScoreResult,
                userInfoFetched,
                userInfo,
                wxInfo
            }
        },
        data () {
            return {
                count: 0,
                showShareTips: false,
                numClass: {
                    0: 'num0',
                    1: 'num1',
                    2: 'num2',
                    3: 'num3',
                    4: 'num4',
                    5: 'num5',
                    6: 'num6',
                    7: 'num7',
                    8: 'num8',
                    9: 'num9'
                }
            }
        },
        computed: {
            score_thousand:function(){
                return this.numClass[Math.floor(this.score/1000)]
            },
            score_hundred:function(){
                return this.numClass[Math.floor((this.score%1000)/100)]
            },
            score_decade:function(){
                return this.numClass[Math.floor((this.score%100)/10)]
            },
            score_unit:function(){
                return this.numClass[this.score%10]
            },
            progress: function () {
                return this.score * 0.6
            }
        },
        methods: {
            share2Friends: function () {
                this.showShareTips = !this.showShareTips
            }
        },
        ready(){
            //var regUrl=rootPath+'?targetID='+this.userID
            var regUrl='http://www.iihwx.com/shangshi_r0/dist/index.html?#!/?targetID='+this.targetID
            console.log('here is the new url')
            console.log(regUrl)
            regWechat(this.wxInfo.wxTitle,this.wxInfo.wxDesc, regUrl, this.wxInfo.wxIcon, this.userID)
            //reRegWechat('奥运跑步比赛','', regUrl, '', this.userID)
        }
    }
</script>

<style>
    /*@import '../css/sm.css';*/

    [v-cloak] {
        display: none;
    }

    .fade-transition {
        transition: opacity .3s ease;
    }

    .fade-enter, .fade-leave {
        opacity: 0;
    }

    .resultWrapper {
        width: 100%;
        height: 100%;
        background-image: url('http://ker.iihwx.com/iih_wechatbs/Public/home/common/shangshi/img/my-result.jpg');
        background-repeat: no-repeat;
        background-size: 100% auto;
        position: relative;
    }

    img {
        width: 100%;
    }

    .progress_my {
        position: absolute;
        top: 12.3rem;
        left: 38.7%;
        width: 27%;
        /*height: 7.5vh;*/
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .danwei {
        font-family: "微软雅黑";
        /*font-size: 20px;*/
        color: #FF4D97;
        position: relative;
        top: -.2rem;
    }

    .score {
        display: flex;
        justify-content: center;
        width: 100%;
        padding-top: .2rem;
    }

    .score span {
        width: 30%;
        height: 100%;
    }

    #swimTag {
        width: 8%;
        position: relative;
        line-height: 1;
    }

    .share {
        cursor: pointer;
        width: 25%;
        position: absolute;
        top: 21rem;
        left: 37.5%;
    }

    .swimIndicator_r_my {
        position: absolute;
        top: 15.5rem;
        left: 20%;
        width: 60%;
        transition: .5s ease;
    }

    .num0:before {
        content: '';
        display: inline-block;
        width: 100%;
        height: 60px;
        background: url('http://ker.iihwx.com/iih_wechatbs/Public/home/common/shangshi/img/num/num0_l.png') no-repeat;
        background-size: contain;
    }

    .num1:before {
        content: '';
        display: inline-block;
        width: 100%;
        height: 60px;
        background: url('http://ker.iihwx.com/iih_wechatbs/Public/home/common/shangshi/img/num/num1_l.png') no-repeat;
        background-size: contain;
    }

    .num2:before {
        content: '';
        display: inline-block;
        width: 100%;
        height: 60px;
        background: url('http://ker.iihwx.com/iih_wechatbs/Public/home/common/shangshi/img/num/num2_l.png') no-repeat;
        background-size: contain;
    }

    .num3:before {
        content: '';
        display: inline-block;
        width: 100%;
        height: 60px;
        background: url('http://ker.iihwx.com/iih_wechatbs/Public/home/common/shangshi/img/num/num3_l.png') no-repeat;
        background-size: contain;
    }

    .num4:before {
        content: '';
        display: inline-block;
        width: 100%;
        height: 60px;
        background: url('http://ker.iihwx.com/iih_wechatbs/Public/home/common/shangshi/img/num/num4_l.png') no-repeat;
        background-size: contain;
    }

    .num5:before {
        content: '';
        display: inline-block;
        width: 100%;
        height: 60px;
        background: url('http://ker.iihwx.com/iih_wechatbs/Public/home/common/shangshi/img/num/num5_l.png') no-repeat;
        background-size: contain;
    }

    .num6:before {
        content: '';
        display: inline-block;
        width: 100%;
        height: 60px;
        background: url('http://ker.iihwx.com/iih_wechatbs/Public/home/common/shangshi/img/num/num6_l.png') no-repeat;
        background-size: contain;
    }

    .num7:before {
        content: '';
        display: inline-block;
        width: 100%;
        height: 60px;
        background: url('http://ker.iihwx.com/iih_wechatbs/Public/home/common/shangshi/img/num/num7_l.png') no-repeat;
        background-size: contain;
    }

    .num8:before {
        content: '';
        display: inline-block;
        width: 100%;
        height: 60px;
        background: url('http://ker.iihwx.com/iih_wechatbs/Public/home/common/shangshi/img/num/num8_l.png') no-repeat;
        background-size: contain;
    }

    .num9:before {
        content: '';
        display: inline-block;
        width: 100%;
        height: 60px;
        background: url('http://ker.iihwx.com/iih_wechatbs/Public/home/common/shangshi/img/num/num9_l.png') no-repeat;
        background-size: contain;
    }

    .popCover {
        position: absolute;
        z-index: 5;
        top: 0;
        right: 0;
        width: 100%;
    }

</style>




