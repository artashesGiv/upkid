import { RouteConfig } from 'vue-router'

import Index from '@/pages/Index/Index.vue'
import NotFound from '@/pages/NotFound/NotFound.vue'
import { Redirect } from '@/pages/Redirect'

const routes: RouteConfig[] = [
    {
        path: '/',
        name: 'redirect',
        component: Redirect,
    },
    {
        path: '/:lang(en|ro|cis)/',
        component: {
            render: h => h('router-view'),
        },
        children: [
            {
                path: '',
                name: 'main',
                component: Index,
            },
            {
                path: 'not-found',
                name: 'not-found',
                component: NotFound,
            },
            {
                path: '*',
                component: Redirect,
                props: {
                    isToNotFound: true,
                },
            },
        ],
    },
    {
        path: '*',
        component: Redirect,
        props: {
            isToNotFound: true,
        },
    },
]

export default routes
