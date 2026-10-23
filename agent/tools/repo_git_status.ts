import { defineTool } from 'eve/tools'
import { runCommand } from '../lib/repo'

export default defineTool({
  description:
    'Show the working tree status and a diff summary (git status --short and git diff --stat). Use it to review exactly which files changed before publishing.',
  inputSchema: { type: 'object', properties: {}, additionalProperties: false },
  async execute() {
    const status = await runCommand('git', ['status', '--short'])
    const stat = await runCommand('git', ['diff', '--stat'])
    return { status: status.output, diffStat: stat.output }
  },
})
