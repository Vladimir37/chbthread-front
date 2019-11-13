<template>
    <span>
        {{ visibleText }}
        <span v-if="tooLong" @click="toggleExpandedState" class="moreButton">{{ buttonText }}</span>
    </span>
</template>

<script>
export default {
    name: 'CollapsedText',
    props: {
        text: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            expanded: false,
        };
    },
    computed: {
        tooLong() {
            return this.text.length > 530;
        },
        visibleText() {
            if (this.tooLong && !this.expanded) {
                return this.text.slice(0, 530) + '... ';
            } 
            return this.text;
        },
        buttonText() {
            if (this.expanded) {
                return 'Свернуть';
            }
            return 'Развернуть';
        }
    },
    methods: {
        toggleExpandedState() {
            this.expanded = !this.expanded;
        }
    }
}
</script>

<style scoped>
.moreButton {
    font-weight: bold;
    color: #009CDC;
    cursor: pointer;
}
</style>