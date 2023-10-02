import {IconSvgName, IconSvgView} from "@/shared/lib/ui/IconImage/IconImage.vue";

export function getIconSvg(name: IconSvgName, options: { view: IconSvgView } = { view: 'other' }) {
    const directory = `/images/icons/${options.view}`

    return `${directory}/${name}.svg`
}
