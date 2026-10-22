import { defineTool } from 'eve/tools'
import { runCommand } from '../lib/repo'

export default defineTool({
  description:
    'Commit all current changes directly on main and push them to origin. Only call it after the checks passed and the diff was reviewed. If publishing is disabled in this environment, it reports what would be committed instead.',
  inputSchema: {
    type: 'object',
    properties: {
      message: { type: 'string', description: 'Imperative commit subject, for example "Add RetroBadge component".' },
    },
    required: ['message'],
    additionalProperties: false,
  },
  async execute(input) {
    const message = String(input.message).trim()
    if (!message) throw new Error('A commit message is required.')

    const branch = await runCommand('git', ['branch', '--show-current'])
    if (branch.output !== 'main') {
      throw new Error(`Refusing to publish from "${branch.output}". Switch to main first.`)
    }

    const status = await runCommand('git', ['status', '--short'])
    if (!status.output) return { published: false, reason: 'Nothing to commit.' }

    if (process.env.AGENT_ALLOW_PUSH !== '1') {
      return {
        published: false,
        reason:
          'Publishing is disabled (set AGENT_ALLOW_PUSH=1 to allow commits and pushes to main). Report these pending changes to the user.',
        pending: status.output,
      }
    }

    await runCommand('git', ['add', '-A'])
    const commit = await runCommand('git', ['commit', '-m', message])
    if (commit.exitCode !== 0) return { published: false, step: 'commit', output: commit.output }
    const push = await runCommand('git', ['push', 'origin', 'main'])
    return { published: push.exitCode === 0, step: 'push', output: push.output }
  },
})
