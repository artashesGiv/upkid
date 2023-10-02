import createApp from './app'
import { init, createCookie } from '../utils'

export default context =>
    new Promise(async (resolve, reject) => {
        const { app, store, router } = createApp()

        const { url } = context
        const { fullPath } = router.resolve(url).route

        if (fullPath !== url) {
            return reject({ url: fullPath })
        }

        router.push(url).catch(error => {
            if (error.name !== 'NavigationDuplicated') {
                throw error
            }
        })

        router.onReady(() => {
            init(store, router, createCookie(context.req.headers), context.language)
                .then(() => {
                    resolve(app)
                })
                .catch(reject)
        }, reject)
    })
