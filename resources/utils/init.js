import { Languages } from '../entities/content'

/**
 * @param store {Store}
 * @param router {VueRouter}
 * @param cookieObj {Record<string, string>}
 * @returns {Promise<void>}
 */
export async function init(store, router, cookieObj, systemLanguage) {
    const lang = router.currentRoute.params.lang || cookieObj.lang || systemLanguage

    await store.dispatch('content/changeActive', lang)
}
