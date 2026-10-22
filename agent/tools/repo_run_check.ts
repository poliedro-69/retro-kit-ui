import { defineTool } from 'eve/tools'
import { runCommand } from '../lib/repo'

const CHECKS: Record<string, string[]> = {
  typecheck: ['pnpm', 'exec', 'tsc', '--noEmit'],
  packages_build: ['pnpm', 'packages:build'],
  registry_build: ['pnpm', 'registry:build'],
  packages_check: ['pnpm', 'packages:check'],
}

export default defineTool({
  description:
    'Run one of the repository checks: typecheck (tsc --noEmit), packages_build (retro-ui, retro-elements and retro-vue), registry_build (shadcn registry) or packages_check (build plus npm pack dry run). Returns the exit code and the tail of the output.',
  inputSchema: {
    type: 'object',
    properties: {
      check: { type: 'string', enum: Object.keys(CHECKS) },
    },
    required: ['check'],
    additionalProperties: false,
  },
  async execute(input) {
    const [file, ...args] = CHECKS[String(input.check)] ?? []
    if (!file) throw new Error(`Unknown check: ${String(input.check)}`)
    return runCommand(file, args)
  },
})
