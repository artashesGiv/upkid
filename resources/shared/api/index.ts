import {makeRequest} from '@/shared/lib/request'

import {Languages} from '@/entities/content'
import ru from './language/ru.json'
import en from './language/en.json'
import ro from './language/ro.json'

const languages = {
    cis: ru,
    en,
    ro,
}
// TODO: понять будет бек для текста или нет и реализовать реквест под него
const getContent = (lang: Languages) => ({
        ...languages[lang]
    })
    // makeRequest<{ content: LanguageContent }>(
    //     {
    //         url: `content/${lang}`,
    //     },
    //     {
    //         ...languages[lang],
    //     },
    // )

const sendOrderConsult = (order: Record<'name' | 'phone', string>) =>
    makeRequest<{ status: string }>(
        {
            url: '/order',
            method: 'POST',
            data: {
                title: 'Бесплатная косультация',
                ...order,
                link: window.location.href
            },
        },
        {
            status: true,
        },
    )

const sendOrderFreeLesson = (order: Record<'name' | 'phone' | 'email', string> | Record<'name' | 'phone' | 'program', string> | Record<'name' | 'age' | 'phone' | 'email', string>) =>
    makeRequest<{ status: string }>(
        {
            url: '/order',
            method: 'POST',
            data: {
                title: 'Бесплатное занятие',
                ...order,
                link: window.location.href
            },
        },
        {
            status: true,
        },
    )

const api = {
    getContent,
    sendOrderConsult,
    sendOrderFreeLesson
}

export default api
