import { site } from './site'

export const packageManagers = ['npm', 'pnpm', 'yarn', 'bun'] as const
export type PackageManager = (typeof packageManagers)[number]

const addCommand: Record<PackageManager, string> = {
  npm: 'npm install',
  pnpm: 'pnpm add',
  yarn: 'yarn add',
  bun: 'bun add',
}

const runnerCommand: Record<PackageManager, string> = {
  npm: 'npx',
  pnpm: 'pnpm dlx',
  yarn: 'yarn dlx',
  bun: 'bunx --bun',
}

export const registryUrl = (name: string) => `${site.siteUrl}/r/${name}.json`

function perManager(build: (manager: PackageManager) => string) {
  return Object.fromEntries(packageManagers.map((manager) => [manager, build(manager)])) as Record<
    PackageManager,
    string
  >
}

export const installCommands = (...packages: string[]) =>
  perManager((manager) => `${addCommand[manager]} ${packages.join(' ')}`)

export const shadcnAddCommands = (...items: string[]) =>
  perManager((manager) => `${runnerCommand[manager]} shadcn@latest add ${items.map(registryUrl).join(' ')}`)

export const shadcnInitCommands = () => perManager((manager) => `${runnerCommand[manager]} shadcn@latest init`)
