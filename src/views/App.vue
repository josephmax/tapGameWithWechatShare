<template>
    <div class="page page-current">
        <!--

                <div class="bloc l-bloc bgc-white " id="bloc-0">
                    <div class="container bloc-lg">
                        <div class="row l-bloc bgc-white">
                            <div class="col-sm-4">
                                <div class="text-center">
                                    <a class="btn btn-lg btn-block btn-outer-space" v-link="{path: '/start', replace: false}">page1</a>
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <div class="text-center">
                                    <a class="btn btn-lg btn-block btn-outer-space" v-link="{path: '/my-game', replace: false}">page2</a>
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <div class="text-center">
                                    <a class="btn btn-lg btn-block btn-outer-space" v-link="{path: '/my-result', replace: false}">page3</a>
                                </div>
                            </div>
                        </div>
                        <div class="row l-bloc bgc-white">
                            <div class="col-sm-4">
                                <div class="text-center">
                                    <a class="btn btn-lg btn-block btn-outer-space" v-link="{path: '/my-finish', replace: false}">page4</a>
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <div class="text-center">
                                    <a class="btn btn-lg btn-block btn-outer-space" v-link="{path: '/other-game', replace: false}">page5</a>
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <div class="text-center">
                                    <a class="btn btn-lg btn-block btn-outer-space" v-link="{path: '/other-result', replace: false}">page6</a>
                                </div>
                            </div>
                        </div>
                        <div class="row l-bloc bgc-white">
                            <div class="col-sm-4">
                                <div class="text-center">
                                    <a class="btn btn-lg btn-block btn-outer-space" v-touch:tap="add">add</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        -->

        <!--{{count}}-->
        <router-view transition="fade" transition-mode="out-in" keep-alive></router-view>
    </div>

</template>

<script>
    // import {wxShareConfig} from './util/util'
    import $ from 'zepto'
    //    import wx from 'wx'
    import store from '../modal/store'
    import {getUserInfo, submitScore} from '../modal/actions'
    import {userID, score, helpScore, submitScoreResult, userInfoFetched, userInfo} from '../modal/getters'
    import { regWechat } from '../util/utils'

    export default {
        store: store,
        vuex: {
            actions: {
                getUserInfo,
                submitScore
            },
            getters: {
                userID,
                score,
                helpScore,
                submitScoreResult,
                userInfoFetched,
                userInfo
            }
        },
        watch: {
            'userInfoFetched': function (val, oldVal) {
                window.startPath = window.location.href
                //获取用户信息结束, 在这里决定接下来如何跳转
                console.log(oldVal)
                console.log(val)
                if (val == true) {
                    console.log('the user info fetched')
                    console.log(this.userID)
                    console.log(this.targetID)
                    console.log(this.score)
                    console.log(this.helpScore)
                    console.log(this.userInfo)
                    console.log('targetID'+this.targetID)
                    console.log('wxID'+this.wxID)
                    console.log('score'+this.score)

                    if (this.targetID && this.wxID) {
                        //帮助朋友的
                        if (this.targetID != this.wxID) {
                            //朋友有分数, 自己没分数, 进帮朋友流程
                            if (this.score!==false && this.helpScore===false) {
                                router.go({path: '/other-game', replace: true})
                            } else if (this.score!==false && this.helpScore!==false) {
                                //朋友有分数, 自己有分数, 进看自己给朋友帮忙的分数
                                router.go({path: '/other-result', replace: true})
                            }
                        } else {
                            //自己的
                            //进自己的结果流程
                            if (this.score!==false && this.score < 1500) {
                                router.go({path: '/my-result', replace: true})
                            } else if (this.score===false) {
                                //没玩过, 开玩
                                router.go({path: '/start', replace: true})
                            } else if (this.score >= 1500) {
                                //可领奖
                                router.go({path: '/my-finish', replace: true})
                            }
                        }
                    } else if (this.wxID) {
                        router.go({path: '/start', replace: true})
                    }
                } else if (val == false) {
                    console.log('fetch user info failed')
                    if (this.targetID && this.targetID!=this.userID) {
                        console.log('illegal access, go start with clean url')
                        window.location.href = rootPath
                    } else {
                        console.log('new user, go start directly')
                        router.go({path: '/start', replace: true})
                    }
                }
            }
        },
        ready() {
            //1. 尝试从cookie中获取openid
            cookie.defaults.path = '/'
            cookie.defaults.domain = 'www.iihwx.com'
            var openid
            if (this.wxID != '') {
                openid = this.wxID
            } else {
                openid = cookie.get('openid')
            }
            console.log('openid from cookie ' + openid)
            //2. 如果没有的话跳转
            var backpath = ''
            if (!openid) {
                //如果cookie依然存在backpath，说明获取openid失败
                var invalidDetect = cookie.get('backpath')
                console.log('no openid')
                backpath = window.document.location.href
                cookie.defaults.path = '/'
                cookie.defaults.domain = 'www.iihwx.com'
                cookie.set('backpath', backpath)
//                console.log('back path is:' + backpath)
                window.location.href = 'http://www.iihwx.com/iih_wechatbs/home/index/selfopenid'
                return
            } else {
                //3. 如果存在openid，并且backpath有值，那么删除backpath
                backpath = cookie.get('backpath')
//                console.log('back path is ' + backpath)
                if (backpath) {
                    console.log('backpath: ' + backpath)
                    cookie.defaults.path = '/'
                    cookie.defaults.domain = 'www.iihwx.com'
                    cookie.remove('backpath')
                    console.log('after clear up, backpath: ' + cookie.get('backpath'))
                }

                this.wxID = openid
//                this.wxID = cookie.get('openid')
                this.targetID = this.wxID
                if (this.$route.query.targetID){
                    this.targetID = this.$route.query.targetID
                }
//                alert('from app.vue wxid is:' + this.wxID)
                console.log(this.targetID)
                console.log(this.wxID)
                this.getUserInfo(this.targetID, this.wxID)
            }
        },
        data(){
            return {
                count: 0,
                targetID: '',
                wxID: ''
            }
        },
        methods: {
            add: function () {
                this.count++
            }
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

    .page {
        position: relative;
    }

    .page-current {
        background-image: url('http://ker.iihwx.com/iih_wechatbs/Public/home/common/shangshi/img/my-game.jpg');
        background-repeat: no-repeat;
        background-size: 100% auto;
    }

    p {
        margin: 0 0 10px;
        font-size: 14px;
    }
</style>




