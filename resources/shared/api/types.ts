import {
    VideoReviewCardProps,
} from '@/entities/review/ui/VideoReviewCard/VideoReviewCard.vue'
import CardInfo, {CardInfoProps} from '@/shared/ui/cards/CardInfo/CardInfo.vue'
import {ReviewCardProps} from '@/entities/review/ui/ReviewCard/ReviewCard.vue'
import {ProductCard} from '@/entities/product/ui/ProductCard'
import {CardTeacherProps} from '@/shared/ui/cards/CardTeacher/CardTeacher.vue'
import {
    SuccessStoryCardProps
} from "@/entities/successStory/ui/SuccessStoryCard";

type sectionContent<T> = {
    title: string,
    description?: string
    list: T[]
}

export type StaticContent = {
    meta: {
        title: string
        description: string
        shareImage: string
    }
    socials: {
        name: string
        href: string
    }[]
    phone: string
    forms: {
        placeholders: {
            name: string
            email: string
            phone: string
            age: string
        }
        errorTexts: {
            name: string
            email: string
            phone: string
            age: string
        }
        buttons: {
            order: string
            lesson: string
        }
    },
    footer: {
        links: {
            text: string,
            href: string
        }[],
        privacy: string
    }
}

export type LanguageContent = {
    header: {
        lessonButton: string
        closeButton: string
        links: {
            program: string
            about: string
            feedback: string
            faq: string
        }
    }
    main: {
        title: string
        description: string
        button: string
        game: {
            buttonStart: string,
            buttonEnd: string,
            buttonOneMoreTime: string,
            buttonPopup: string,
            textStart: string,
            textEnd: {
                "title": string,
                "description": string
            }
        }
        ticker: [string, string, string]
    }
    benefits: sectionContent<{
        icon: CardInfo['icon']
        title: CardInfo['title']
        description: CardInfo['description']
    }>
    successStory: sectionContent<SuccessStoryCardProps>
    programs: sectionContent<{
        title: ProductCard['title']
        description: ProductCard['description']
        type: ProductCard['type']
        classText: ProductCard['classText']
        years: ProductCard['years']
        programsPointsTitle: string
        programPoints: string[]
    }> & {
        buttons: {
            sign: string
            program: string
        }
    }
    modalFreeLesson: {
        title: string
        bullets: string[]
    }
    modalIntroductionLesson: {
        title: string
        programsPointsTitle: string
    }
    advantages: sectionContent<CardInfoProps>
    formConsultation: {
        title: string
        pointsList: string[]
    }
    videoReview: sectionContent<string>
    reviewStudents: sectionContent<VideoReviewCardProps>
    reviewParents: sectionContent<ReviewCardProps> & {
        buttonReadFull: string
    }
    teacher: sectionContent<CardTeacherProps>
    questions: sectionContent<{
        title: string
        answer: string
    }>
    formFreeLesson: {
        title: string
        description: string
        bulletsTitle: string
        bullets: string[]
    }
    footer: {
        menu: {
            program: string
            about: string
            feedback: string
            faq: string
        }
    }
    privacy: string
    response: {
        title: string,
        description: string
    }
    notFound: {
        text: string
        button: string
    }
}
