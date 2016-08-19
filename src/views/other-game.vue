<template>
    <div class="gameWrapper_other">
        <section class="count_down">
            <span class="decade" :class="current_time_d"></span>
            <span class="unit" :class="current_time_u"></span>
        </section>
        <div class="progress_other">
            <div class="score">
                <span :class="score_thousand"></span>
                <span :class="score_hundred"></span>
                <span :class="score_decade"></span>
                <span :class="score_unit"></span>
                <span class="danwei">米</span>
            </div>
        </div>
        <div class="gameZone" v-touch:tap="countPlus()">
            <!-- -->
            <span v-if="gameReadyCount" class="readyCountDown"></span>
            <img :src="swimStatus"/>
            <!--<img src="../../assets/img/swim2.gif"/>-->
        </div>
        <!--<section class="gif" style="background-color: red;">
            <button></button>
        </section>-->

        <div class="swimIndicator_other">
            <div id="swimTag" :style="{left:progress+'%'}">
                <span v-if="gameStarted">{{count}}</span>
                <img src="http://ker.iihwx.com/iih_wechatbs/Public/home/common/shangshi/img/swimTag.png"/>
            </div>
            <div class="swimBar">
                <img src="http://ker.iihwx.com/iih_wechatbs/Public/home/common/shangshi/img/swimBar.png"/>
            </div>
        </div>

        <div class="cover" v-if="showCover" @click="gameTrigger()" >
            <img src="../../assets/img/instructionCover_o.png">
        </div>
        <div class="loader" v-if="submiting">
            <!-- <div class="tips">努力加载中...</div> -->
            <div class="pacman">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
        <audio :src="bgmSrc" id="bgm_o" loop="loop" autoplay></audio>
        <audio :src="effectSrc" id="effect_o"></audio>
        <span class="bgmSwitch" :class="bgmPlay?'bgmOn':null" @click="switchBgm()">
        </span>
    </div>
</template>

<script>
    import store from '../modal/store'
    import { getUserInfo,submitScore } from '../modal/actions'
    import {userID, targetID, score, helpScore, submitScoreResult, userInfoFetched, userInfo, wxInfo} from '../modal/getters'
    import { regWechat, reRegWechat } from '../util/utils'

    export default {
        store: store,
        vuex:{
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
        ready(){
            regWechat(this.wxInfo.wxTitle, this.wxInfo.wxDesc, this.wxInfo.wxURL, this.wxInfo.wxIcon, this.userID)
            this.effect = document.getElementById('effect_o')
            this.bgm = document.getElementById('bgm_o')
        },
        data () {
            return {
                count: 0,
                tapping:false,
                countDownNum: 20,
                currentCount: 20,
                gameReady:false,
                gameReadyCount:false,
                gameStarted: false,
                gameEnded: false,
                showCover:true,
                submiting:false,
                readyImg: srcPath+'img/running.gif',
                swimmingImg: srcPath+'img/running.gif',
                bgmSrc: srcPath+'music/bg2.mp3',
                effectSrc: srcPath+'music/cut2.wav',
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
                },
                effect: '',
                bgm: '',
                bgmPlay: true,
            }
        },
        computed: {
            progress: function () {
                return !this.gameEnded ? this.count * 0.6  : null
            },
            current_time_d:function(){
                return this.numClass[Math.floor(this.currentCount/10)]+ (this.tapping? ' blink': '')
            },
            current_time_u:function(){
                return this.numClass[this.currentCount%10] + (this.tapping? ' blink': '')
            },
            swimStatus:function(){
                return (this.gameStarted && !this.gameEnded) ? this.swimmingImg : this.readyImg
            },
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
        },
        methods: {
            switchBgm: function () {
                this.bgmPlay = !this.bgmPlay
                if (this.bgm.paused) {
                    this.bgm.play()
                } else {
                    this.bgm.pause()
                }
            },
            gameTrigger: function () {
                this.showCover = false
                var that=this
                this.gameReadyCount=true
                setTimeout(function(){
                    that.gameReady=true
                    that.gameReadyCount=false
                },3000)
            },
            countPlus: function () {
                if (this.gameStarted && !this.gameEnded) {
                    if(this.count<150) {
                        this.count++
                    }
                    this.tapping=true
                    if(this.effect.paused || this.effect.ended) {
                        this.effect.play()
                    }
                }
                var tempObj = this
                setTimeout(function(){
                    tempObj.tapping=false
                },100)
            }
        },
        watch: {
            'gameReady': function (val, oldVal) {
                if (val == true) {
                    var i = this.countDownNum
                    var tempObj = this
                    this.gameStarted = true
                    countDown(i, i, tempObj)
                }
            },
            'gameEnded': {
                handler: function (val, oldVal) {
                    if (val && !oldVal) {
                        this.bgm.pause()
                        this.submitScore(this.count)
                        alert('时间到！')
                        this.submiting=true
                    }
                },
                deep: true
            },
            'submitScoreResult':function(val,oldVal){
                if (val==true) {
                    this.submiting=false
//                    var regUrl=rootPath+'?targetID='+this.targetID
//                    reRegWechat('奥运跑步比赛','', regUrl, '', this.targetID)
                    console.log('the submitScoreResult updates')
                    console.log(oldVal)
                    console.log(val)
                    console.log(this.score)
                    console.log(this.helpScore)
                    router.go({path: '/other-result',replace: true})
                }
            },
        }
    }
    function countDown(sec, time, obj) {
        if (sec <= time && sec >= 0) {
            obj.currentCount=sec
            setTimeout(function () {
                countDown(sec - 1, time, obj)
            }, 1000)
        } else {
            obj.gameEnded = true
            return false
        }
    }
</script>

<style>
    /*@import '../css/sm.css';*/
    .bgmSwitch {
        display: inline-block;
        background: url('http://ker.iihwx.com/iih_wechatbs/Public/home/common/shangshi/img/btn/musicSwitch.png') no-repeat;
        background-size: contain;
        width: 2rem;
        height: 2rem;
        position: absolute;
        top: 5%;
        right: 5%;
        z-index: 2000;
    }

    .bgmOn {
        animation: rotating 1s linear infinite;
    }

    @keyframes rotating {
        0% {
            transform: rotate(0deg)
        }
        100% {
            transform: rotate(360deg)
        }
    }

    [v-cloak] {
        display: none;
    }

    .fade-transition {
        transition: opacity .3s ease;
    }

    .fade-enter, .fade-leave {
        opacity: 0;
    }

    .gameWrapper_other{
        width: 100%;
        height: 100%;
        background-image: url('../../assets/img/other-game.jpg');
        background-repeat: no-repeat;
        background-size:100% auto;
        position: relative;
    }
    .progress_other {
        position: absolute;
        top: 12.6rem;
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

    .swimIndicator_other {
        position: absolute;
        top: 20.7rem;
        left: 20%;
        width: 60%;
    }

    .count_down {
        position: absolute;
        top: 9.2rem;
        left: 47.5%;
        width: 14%;
        display: flex;
    }

    .gameZone {
        position: absolute;
        top: 16rem;
        left: 25.5%;
        width: 45%;
        text-align: center;
    }
    .gameZone img {
        width: auto;
        height: 5.7rem;
        vertical-align: top;
    }

    .decade, .unit {
        width: 50%;
        transform: scale(1);
    }

    img {
        width: 100%;
    }
    .wrapper{
        height: 100%;
        background: url('../../assets/img/other-game.jpg') no-repeat;
        background-size: contain;
    }

    #swimTag {
        width: 8%;
        position: relative;
        line-height: 1;
    }
    #swimTag span{
        position: absolute;
        top: -50%;
        right: -50%;
    }

    .readyCountDown{
        display: inline-block;
        position: absolute;
        z-index: 1000;
        height: 11rem;
        animation:countDown3 3s;
        animation-iteration-count: 1;
        top: -2rem;
        left: -2rem;
        background-repeat: no-repeat;
    }

    @keyframes countDown3 {
        0% {
            background-image: url('http://ker.iihwx.com/iih_wechatbs/Public/home/common/shangshi/img/num/num3_l.png');
            width: 20rem;
            transform: scale(1.5)
        }
        30% {
            background-image: url('http://ker.iihwx.com/iih_wechatbs/Public/home/common/shangshi/img/num/num3_l.png');
            width: 20rem;
            transform: scale(1)
        }
        33% {
            background-image: url('http://ker.iihwx.com/iih_wechatbs/Public/home/common/shangshi/img/num/num2_l.png');
            width: 20rem;
            transform: scale(1.5)
        }
        63% {
            background-image: url('http://ker.iihwx.com/iih_wechatbs/Public/home/common/shangshi/img/num/num2_l.png');
            width: 20rem;
            transform: scale(1)
        }
        66% {
            background-image: url('http://ker.iihwx.com/iih_wechatbs/Public/home/common/shangshi/img/num/num1_l.png');
            width: 20rem;
            transform: scale(1.5)
        }
        96% {
            background-image: url('http://ker.iihwx.com/iih_wechatbs/Public/home/common/shangshi/img/num/num1_l.png');
            width: 20rem;
            transform: scale(1)
        }
        99% {
            background-image: url('http://ker.iihwx.com/iih_wechatbs/Public/home/common/shangshi/img/num/num0_l.png');
            width: 20rem;
            transform: scale(1)
        }
        100% {
            background-image: url('http://ker.iihwx.com/iih_wechatbs/Public/home/common/shangshi/img/num/num0_l.png');
            width: 20rem;
            transform: scale(1.5)
        }
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


    .blink{
        -webkit-animation: blink .5s;
        -o-animation:blink .5s;
        animation:blink .5s;
        animation-iteration-count:1;
    }

    @keyframes blink {
        0%,100%{transform:scale(1);}
        30%{transform:scale(1.5);}
    }


    .cover{
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 100;
    }

    @keyframes rotate_pacman_half_up {
        0% {
            -webkit-transform: rotate(270deg);
            transform: rotate(270deg);
        }
        50% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
        100% {
            -webkit-transform: rotate(270deg);
            transform: rotate(270deg);
        }
    }

    @-webkit-keyframes rotate_pacman_half_down {
        0% {
            -webkit-transform: rotate(90deg);
            transform: rotate(90deg);
        }
        50% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(90deg);
            transform: rotate(90deg);
        }
    }

    @keyframes rotate_pacman_half_down {
        0% {
            -webkit-transform: rotate(90deg);
            transform: rotate(90deg);
        }
        50% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(90deg);
            transform: rotate(90deg);
        }
    }

    @-webkit-keyframes pacman-balls {
        75% {
            opacity: 0.7;
        }
        100% {
            -webkit-transform: translate(-100px, -6.25px);
            transform: translate(-100px, -6.25px);
        }
    }

    @keyframes pacman-balls {
        75% {
            opacity: 0.7;
        }
        100% {
            -webkit-transform: translate(-100px, -6.25px);
            transform: translate(-100px, -6.25px);
        }
    }

    .loader {
        width: 100%;
        height: 100%;
        z-index: 1100;
        position: absolute;
        background-color: white;
    }

    .pacman {
        left: 50%;
        top: 50%;
        margin-top: -2rem;
        margin-left: -1.5rem;
        position: absolute;
    }

    .pacman > div:nth-child(2) {
        -webkit-animation: pacman-balls 1s -0.99s infinite linear;
        animation: pacman-balls 1s -0.99s infinite linear;
    }

    .pacman > div:nth-child(3) {
        -webkit-animation: pacman-balls 1s -0.66s infinite linear;
        animation: pacman-balls 1s -0.66s infinite linear;
    }

    .pacman > div:nth-child(4) {
        -webkit-animation: pacman-balls 1s -0.33s infinite linear;
        animation: pacman-balls 1s -0.33s infinite linear;
    }

    .pacman > div:nth-child(5) {
        -webkit-animation: pacman-balls 1s 0s infinite linear;
        animation: pacman-balls 1s 0s infinite linear;
    }

    .pacman > div:first-of-type {
        width: 0px;
        height: 0px;
        border-right: 1.5rem solid transparent;
        border-top: 1.5rem solid rgb(216, 65, 65);
        border-left: 1.5rem solid rgb(216, 65, 65);
        border-bottom: 1.5rem solid rgb(216, 65, 65);
        border-radius: 1.5rem;
        -webkit-animation: rotate_pacman_half_up 0.5s 0s infinite;
        animation: rotate_pacman_half_up 0.5s 0s infinite;
        position: relative;
        left: -1.5rem;
    }

    .pacman > div:nth-child(2) {
        width: 0;
        height: 0;
        border-right: 1.5rem solid transparent;
        border-top: 1.5rem solid rgb(216, 65, 65);
        border-left: 1.5rem solid rgb(216, 65, 65);
        border-bottom: 1.5rem solid rgb(216, 65, 65);
        border-radius: 1.5rem;
        -webkit-animation: rotate_pacman_half_down 0.5s 0s infinite;
        animation: rotate_pacman_half_down 0.5s 0s infinite;
        margin-top: -3rem;
        position: relative;
        left: -1.5rem;
    }

    .pacman > div:nth-child(3), .pacman > div:nth-child(4), .pacman > div:nth-child(5), .pacman > div:nth-child(6) {
        background-color: rgb(216, 65, 65);
        /*width: 15px;
        height: 15px;*/
        border-radius: 100%;
        margin: 1rem;
        width: 1rem;
        height: 1rem;
        position: absolute;
        -webkit-transform: translate(0, -6.25px);
        -ms-transform: translate(0, -6.25px);
        transform: translate(0, -6.25px);
        top: .4rem;
        left: 4.2rem;
    }
</style>