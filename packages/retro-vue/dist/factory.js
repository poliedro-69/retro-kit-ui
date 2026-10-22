import { defineComponent, h } from 'vue';
const kebab = (name) => name.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
const propType = { string: String, boolean: Boolean, number: Number };
export function createWrapper(options) {
    const { name, tag, props = {}, slots: namedSlots = [], model = 'none' } = options;
    const vueProps = {};
    for (const [key, kind] of Object.entries(props)) {
        vueProps[key] = { type: propType[kind], default: undefined };
    }
    if (model !== 'none') {
        vueProps.modelValue = {
            type: [String, Boolean, Number],
            default: undefined,
        };
    }
    return defineComponent({
        name,
        props: vueProps,
        emits: model === 'none' ? [] : ['update:modelValue'],
        setup(rawProps, { slots, emit }) {
            return () => {
                const p = rawProps;
                const attrs = {};
                for (const [key, kind] of Object.entries(props)) {
                    const value = p[key];
                    if (kind === 'boolean')
                        attrs[kebab(key)] = value ? '' : undefined;
                    else if (value !== undefined)
                        attrs[kebab(key)] = value;
                }
                const events = {};
                const model_ = p.modelValue;
                if (model === 'text') {
                    if (model_ !== undefined)
                        attrs.value = model_;
                    events.onInput = (event) => emit('update:modelValue', event.target.value);
                }
                else if (model === 'checked') {
                    if (model_ !== undefined)
                        attrs.checked = model_ ? '' : undefined;
                    events.onChange = (event) => emit('update:modelValue', event.target.checked);
                }
                else if (model === 'radio') {
                    if (model_ !== undefined)
                        attrs.checked = model_ === p.value ? '' : undefined;
                    events.onChange = (event) => {
                        const target = event.target;
                        if (target.checked)
                            emit('update:modelValue', target.value);
                    };
                }
                else if (model === 'tabs') {
                    if (model_ !== undefined)
                        attrs.value = model_;
                    events.onChange = (event) => emit('update:modelValue', event.target.value);
                }
                const children = [...(slots.default?.() ?? [])];
                for (const slotName of namedSlots) {
                    const content = slots[slotName]?.();
                    if (content) {
                        children.push(h('span', { slot: slotName, style: 'display:contents' }, content));
                    }
                }
                return h(tag, { ...attrs, ...events }, children);
            };
        },
    });
}
