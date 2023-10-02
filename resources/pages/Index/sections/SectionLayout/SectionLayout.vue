<template lang="pug" functional>
    section.b-section-layout(
        :class="[data.staticClass, data.class, `section-layout--spacing-${props.spacing || 'both'}`]"
        :id="props.id"
    )
        .__container.container(
            v-if="$slots.default"
        )
            .__header(
                v-if="props.title || props.description"
            )
                title-component.__title(
                    v-if="props.title"
                    :highlightLeft="props.isTitleDecoration || false"
                    :highlightRight="props.isTitleDecoration || false"
                    :icon="props.icon"
                    size="l"
                )
                    p(
                        v-html="props.title"
                    )
                .__description(
                    v-if="props.description"
                ) {{props.description}}
            slot
        slot(
            name="wide"
        )
</template>
