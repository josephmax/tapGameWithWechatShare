<template>
    <div class="finishedWrapper">
        <div class="getAward" @click="goGetAward">
            <img src="http://ker.iihwx.com/iih_wechatbs/Public/home/common/shangshi/img/btn/award_btn.png" />
        </div>
    </div>
</template>

<script>

    import store from '../modal/store'

    export default {
        store: store,
        data () {
            return {
                count: 0
            }
        },
        methods:{
            goGetAward:function(){
                window.location.href='http://www.iihwx.com/wx/ggk-201.html?&wid=77'
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
    .finishedWrapper{
        background: url('http://ker.iihwx.com/iih_wechatbs/Public/home/common/shangshi/img/my-finish.jpg') no-repeat;
        background-size:contain;
        height: 100%;
        width: 100%;
    }
    img{
        width: 100%;
    }
    .getAward{
        width: 25%;
        position: absolute;
        top: 21rem;
        left: 37.5%;
    }

</style>




