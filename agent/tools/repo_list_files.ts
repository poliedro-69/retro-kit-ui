import { defineTool } from 'eve/tools'
import { runCommand, resolveInsideRepo } from '../lib/repo'

export default defineTool({
  description:
    'List tracked and untracked files of the retro-kit-ui repository, optionally limited to a directory (for example "components/retro-ui" or "packages/retro-vue").',
  inputSchema: {
    type: 'object',
    properties: {
      directory: {
        type: 'string',
        description: 'Directory relative to the repository root. Omit for the whole repo.',
      },
    },
    additionalProperties: false,
  },
  async execute(input) {
    const directory = typeof input.directory === 'string' && input.directory ? input.directory : '.'
    resolveInsideRepo(directory)
    const result = await runCommand('git', [
      'ls-files',
      '--cached',
      '--others',
      '--exclude-standard',
      '--',
      directory,
    ])
    return { directory, files: result.output.split('\n').filter(Boolean) }
  },
})
