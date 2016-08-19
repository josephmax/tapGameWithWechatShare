export default function (router) {
    router.map({
        '*': {
            component (resolve) {
                require(['./views/welcome'], resolve)
            }
        },
        '/': {
            component (resolve) {
                require(['./views/welcome'], resolve)
            }
        },
        //开始页面
        '/start': {
            component (resolve) {
                require(['./views/start'], resolve)
            }
        },
        //我的游戏页面
        '/my-game': {
            component (resolve) {
                require(['./views/my-game'], resolve)
            }
        },
        //我的得分分享页面
        '/my-result': {
            component (resolve) {
                require(['./views/my-result'], resolve)
            }
        },
        //完成领奖页面
        '/my-finish': {
            component (resolve) {
                require(['./views/my-finish'], resolve)
            }
        },
        //ta的游戏页面
        '/other-game': {
            component (resolve) {
                require(['./views/other-game'], resolve)
            }
        },
        //帮ta完成的得分页面
        '/other-result': {
            component (resolve) {
                require(['./views/other-result'], resolve)
            }
        }
    })

    router.beforeEach(({to, from, next}) => {
        let toPath = to.path
        let fromPath = from.path
        console.log('route to: ' + toPath + ' from: ' + fromPath)

        next()
    })

    router.afterEach(function ({to}) {
        console.log(`成功浏览到: ${to.path}`)
        // $.refreshScroller()
    })
}
