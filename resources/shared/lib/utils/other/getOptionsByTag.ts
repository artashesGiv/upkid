import {TagPropsType} from "@/shared/types/helpers";

export default function (tag: TagPropsType, href?: string): PartialRecord<TagPropsType, PartialRecord<string, unknown>> {
    const optionsMap: PartialRecord<TagPropsType, PartialRecord<string, unknown>> = {
        button: {
            role: 'button',
            type: 'button'
        },
        a: {
            href,
            ...href && {
                ...!(Boolean(~href.indexOf('tel:')) || Boolean(~href.indexOf('mailto:'))) && {
                    rel: 'noopener noreferrer',
                    target: '_blank'
                }
            }
        },
        'router-link': {
            to: href
        }
    }

    return optionsMap[tag] as PartialRecord<TagPropsType, PartialRecord<string, unknown>>
}
