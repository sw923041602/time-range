import timeRange from '@/components/time-range/index'

const components = [
    timeRange
]

const install = (Vue) => {
    components.forEach(component => {
        Vue.component(component.name, component)
    })
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.vue)
}

export default {
    install,
    timeRange
}