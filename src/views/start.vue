<template>
    <div class="startPage">
        <div class="contentWrapper_start">
            <p>活动简介</p>
            <p>1 每人每天参与一次</p>
            <p>2 每次最多可以游150米</p>
            <p>3 分享好友，让其他小伙伴帮忙</p>
            <p>4 完成1500米自由泳，便可有机会参与抽奖获得豪礼</p>
            <div class="start_btn" v-link="{path: '/my-game', replace: true}">
                <img src="http://ker.iihwx.com/iih_wechatbs/Public/home/common/shangshi/img/btn/start_btn.png"/>
            </div>
        </div>

    </div>
</template>

<script>

    import store from '../modal/store'
    import { wxInfo } from '../modal/getters'
    import { regWechat } from '../util/utils'

    export default {
        store: store,
        vuex:{
            getters:{
                wxInfo
            }
        },
        data () {
            return {
                count: 0,
            }
        },
        ready(){
            regWechat(this.wxInfo.wxTitle, this.wxInfo.wxDesc, this.wxInfo.wxURL, this.wxInfo.wxIcon, this.userID)
        }
    }
</script>

<style>
    /*@import '../css/sm.css';*/
    .startPage{
        width: 100%;
        height: 100%;
        background-image: url('http://ker.iihwx.com/iih_wechatbs/Public/home/common/shangshi/img/start.jpg');
        background-repeat: no-repeat;
        background-size:100% auto;
    }
    .startPage img{
        width: 100%;
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

    .contentWrapper_start{
        position: absolute;
        top: 11.5rem;
        left: 20.8%;
        width: 60%;
        height: 34.5vh;
        border-radius: 30px/30px;
        box-sizing: border-box;
        padding: 2% 3%;
        /*text-align: center;*/
        font-family: "微软雅黑";
        /*font-size: 28px;*/
        color: #459076;
    }

    .start_btn {
        width: 50%;
        position: absolute;
        top: 9rem;
        left: 25%;
        cursor: pointer;
    }

    @media (max-width: 350px) {
        .contentWrapper_start p{
            margin: 0;
        }
    }
</style>




