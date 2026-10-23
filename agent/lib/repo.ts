import { execFile } from 'node:child_process'
import path from 'node:path'

export const REPO_ROOT = process.cwd()

const BLOCKED_SEGMENTS = new Set(['.git', 'node_modules', '.next', '.eve', '.vercel'])

export function resolveInsideRepo(relativePath: string): string {
  const absolute = path.resolve(REPO_ROOT, relativePath)
  const relative = path.relative(REPO_ROOT, absolute)
  if (relative.startsWith('..') || path.isAbsolute(relative)) {
    throw new Error(`Path escapes the repository: ${relativePath}`)
  }
  const segments = relative.split(path.sep)
  if (segments.some((segment) => BLOCKED_SEGMENTS.has(segment))) {
    throw new Error(`Path is not accessible to the agent: ${relativePath}`)
  }
  if (segments.some((segment) => segment.startsWith('.env'))) {
    throw new Error(`Environment files are not accessible to the agent: ${relativePath}`)
  }
  return absolute
}

export function assertWritable(relativePath: string): string {
  const absolute = resolveInsideRepo(relativePath)
  const relative = path.relative(REPO_ROOT, absolute)
  if (relative === '' || relative.startsWith(`agent${path.sep}`) || relative === 'pnpm-lock.yaml') {
    throw new Error(`Path is read-only for the agent: ${relativePath}`)
  }
  return absolute
}

export interface CommandResult {
  command: string
  exitCode: number
  output: string
}

const MAX_OUTPUT = 8000

export function runCommand(
  file: string,
  args: string[],
  options: { timeoutMs?: number } = {},
): Promise<CommandResult> {
  return new Promise((resolve) => {
    execFile(
      file,
      args,
      {
        cwd: REPO_ROOT,
        timeout: options.timeoutMs ?? 5 * 60_000,
        maxBuffer: 16 * 1024 * 1024,
        env: { ...process.env, CI: '1' },
      },
      (error, stdout, stderr) => {
        const combined = `${stdout}${stderr}`.trim()
        const output =
          combined.length > MAX_OUTPUT ? `...${combined.slice(-MAX_OUTPUT)}` : combined
        const exitCode =
          error && typeof (error as NodeJS.ErrnoException & { code?: unknown }).code === 'number'
            ? ((error as { code: number }).code)
            : error
              ? 1
              : 0
        resolve({ command: [file, ...args].join(' '), exitCode, output })
      },
    )
  })
}
