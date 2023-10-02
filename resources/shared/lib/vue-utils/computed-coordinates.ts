export type Coords = {
    hasBottom: boolean,
    hasRight: boolean
}

// function sum(...args) {
//     return args.reduce((t, i) => t + i, 0)
// }

type Side = 'top' | 'left' | 'right' | 'bottom'

type Direction = Side | 'center'

export type Position = `${Side}-${Direction}`

export function computedCoords(context: Element, layout: HTMLElement, offset: {
    VERTICAL: number,
    HORIZONTAL: number,
}, position: Position) {
    if (layout) {
        const contextRect = context.getBoundingClientRect()
        const layoutRect = layout.getBoundingClientRect()

        // const options = {
        //     left: null,
        //     top: null,
        // } as Record<'left' | 'top', null | string>

        const [ side, direction ] = position.split('-') as [ Side, Direction ]

        if (side === 'top' || side === 'bottom') {
            const vertical = side === 'top'
                ? contextRect.top - layoutRect.height - offset.VERTICAL
                : contextRect.bottom + offset.VERTICAL
            let horizontal = 0

            if (direction === 'left') {
                horizontal = contextRect.right - layoutRect.width + offset.HORIZONTAL
            } else if (direction === 'center') {
                horizontal = contextRect.left + (contextRect.width / 2) - (layoutRect.width / 2)
            } else if (direction === 'right') {
                horizontal = contextRect.left + offset.HORIZONTAL
            }

            return {
                vertical,
                horizontal
            }
        }

        const horizontal = side === 'left'
            ? contextRect.left - layoutRect.width - offset.HORIZONTAL
            : contextRect.right + offset.HORIZONTAL
        let vertical = 0

        if (direction === 'top') {
            vertical = contextRect.bottom - layoutRect.height // offset.VERTICAL
        } else if (direction === 'center') {
            vertical = contextRect.top + (contextRect.height / 2) - (layoutRect.height / 2)
        } else if (direction === 'bottom') {
            vertical = contextRect.top // + offset.VERTICAL
        }

        return {
            vertical,
            horizontal
        }
    }
    throw new Error('layout is not defined')
}
