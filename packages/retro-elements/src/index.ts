export * from './windows'
export * from './mac'
export { RetroElement, defineElement } from './base'

export const isRetroElement = (tag: string) => tag.startsWith('rt-') || tag.startsWith('mac-')
