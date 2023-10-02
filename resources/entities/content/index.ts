import { Module } from 'vuex'

import { StateRoot } from '@/app/providers/store'
import api from '@/shared/api'
import { LanguageContent, StaticContent } from '@/shared/api/types'

export enum Languages {
    RUSSIAN = 'cis', // russian
    ENGLISH = 'en',
    ROMANIAN = 'ro',
}

export type ContentState = {
    pool: Record<Languages, LanguageContent>
    staticContent: Record<Languages, StaticContent>
    active: Languages
}

const contentModule: Module<ContentState, StateRoot> = {
    namespaced: true,
    // Because empty object {} not equal ContentState['pool'] type
    // @ts-ignore
    state: () => ({
        pool: {},
        staticContent: {
            cis: {
                meta: {
                    title: `Школа программирования для детей 3-11 классов`,
                    description: 'Начните обучение сегодня — запишитесь на пробное онлайн занятие',
                    shareImage: '/public/images/utility/share.jpg'
                },
                socials: [
                    {
                        name: 'facebook',
                        href: 'https://www.facebook.com/upkid.cis',
                    },
                    {
                        name: 'instagram',
                        href: 'https://www.instagram.com/upkid.cis',
                    },
                    {
                        name: 'tik-tok',
                        href: 'https://www.tiktok.com/@upkid.school',
                    },
                ],
                phone: '',
                forms: {
                    placeholders: {
                        name: 'Ваше имя',
                        email: 'Ваш e-mail',
                        phone: 'Ваш телефон',
                        age: 'Возраст ребенка',
                    },
                    errorTexts: {
                        name: 'Обязательное поле',
                        email: 'Некорректный e-mail',
                        phone: 'Некорректный номер телефона',
                        age: 'Обязательное поле',
                    },
                    buttons: {
                        order: 'Оставить заявку',
                        lesson: 'Записаться на урок',
                    },
                },
                footer: {
                    links: [
                        {
                            text: 'Политика обработки персоналны данных',
                            href: 'https://docs.google.com/document/d/147FKX3Zy4GYtBpS_3IefNUVLeYI6rauvW3eC8tQAdBo/edit',
                        },
                        {
                            text: 'Оферта',
                            href: 'https://docs.google.com/document/d/1S318ktA11SzfsspYZTuNXBsGthDvpIhKnx8-0ls-7tg/edit#heading=h.v064sh8spst3',
                        },
                        // {
                        //     text: 'Юридическая инфомарция',
                        //     href: '/3',
                        // },
                    ],
                    privacy: `© ${new Date().getFullYear()}, «UpKid». Все права защищены`,
                },
            },
            en: {
                meta: {
                    title: `Coding School for Students in Grades 3-11`,
                    description: 'Start your learning journey today — sign up for a free online trial class.',
                    shareImage: '/public/images/utility/share.jpg',
                },
                socials: [
                    {
                        name: 'facebook',
                        href: 'https://www.facebook.com/upkid.global',
                    },
                    {
                        name: 'instagram',
                        href: 'https://www.instagram.com/upkid.school',
                    },
                    // {
                    //     name: 'tik-tok',
                    //     href: 'tik-tok.com',
                    // },
                ],
                phone: '',
                forms: {
                    placeholders: {
                        name: 'Your name',
                        email: 'Your e-mail',
                        phone: 'Your phone',
                        age: 'Children age',
                    },
                    errorTexts: {
                        name: 'Incorrect name',
                        email: 'Incorrect e-mail',
                        phone: 'Incorrect phone number',
                        age: 'Incorrect age',
                    },
                    buttons: {
                        order: 'Leave application',
                        lesson: 'Enroll to lesson',
                    },
                },
                footer: {
                    links: [
                        {
                            text: 'Privacy policy',
                            href: '/1',
                        },
                        {
                            text: 'Terms and Conditions',
                            href: '/2',
                        },
                    ],
                    privacy: `© ${new Date().getFullYear()}, «UpKid». All rights reserved`,
                },
            },
            ro: {
                meta: {
                    title: `Scoala de programare pentru copii din clasele 3-11`,
                    description: 'Începeți să învățați astăzi - înscrieți-vă pentru o lecție online de probă',
                    shareImage: '/public/images/utility/share.jpg',
                },
                socials: [
                    {
                        name: 'facebook',
                        href: 'https://www.facebook.com/upkid.rom',
                    },
                    {
                        name: 'instagram',
                        href: 'https://www.instagram.com/upkid.rom',
                    },
                    {
                        name: 'tik-tok',
                        href: 'https://www.tiktok.com/@upkid.school',
                    },
                ],
                phone: '',
                forms: {
                    placeholders: {
                        name: 'Numele dvs',
                        email: 'e-mail',
                        phone: 'Numărul de telefon',
                        age: 'Children age',
                    },
                    errorTexts: {
                        name: 'Câmp obligatoriu',
                        email: 'Poștă incorectă',
                        phone: 'Numar de telefon invalid',
                        age: 'Câmp obligatoriu',
                    },
                    buttons: {
                        order: 'Trimiteți o cerere',
                        lesson: 'Enroll to lesson',
                    },
                },
                footer: {
                    links: [
                        {
                            text: 'Politica de prelucrare a datelor cu caracter personal\n',
                            href: 'https://drive.google.com/file/d/1p_Cz2iTrXlOnvDiSlkUog9JfwDP3BHUa/view',
                        },
                        {
                            text: 'Contract de ofertă publică',
                            href: 'https://drive.google.com/file/d/1a5wwo0i11Oe21_BmKJvICtZgMhInARgI/view',
                        },
                        // {
                        //     text: 'Informații juridice',
                        //     href: '/3',
                        // },
                    ],
                    privacy: `© ${new Date().getFullYear()}, «UpKid». Toate drepturile rezervate`,
                },
            },
        },
        active: Languages.ENGLISH,
    }),
    actions: {
        async changeActive({ commit, state }, lang: Languages = Languages.ENGLISH) {
            if (!state.pool[lang]) {
                const response = api.getContent(lang)
                commit('updatePool', { [lang]: response.content })
            }

            commit('updateActive', lang)
        },
    },
    mutations: {
        updatePool(state, pool) {
            state.pool = {
                ...state.pool,
                ...pool,
            }
        },
        updateActive(state, active: Languages) {
            state.active = active
        },
    },
    getters: {
        values(state) {
            return state.pool[state.active]
        },
        staticValues(state) {
            return state.staticContent[state.active]
        },
        active(state) {
            return state.active
        },
        keys(state) {
            return Object.keys(state.pool)
        },
    },
}

export const contentModel = {
    contentModule,
}
