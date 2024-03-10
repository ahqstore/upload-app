/**
 * The entrypoint for the action.
 */
import { promisify } from 'node:util'
import { exec } from 'child_process'

import { context, getOctokit } from '@actions/github'
import * as core from '@actions/core'

const Exec = promisify(exec)

;(async () => {
  const { stdout } = await Exec('cargo install ahqstore_cli_rs')

  console.log(stdout)

  const { owner, repo } = context.repo

  const rep = `${owner}/${repo}`

  const r_id = core.getInput('release')

  if (!process.env['GH_TOKEN']) {
    core.error('GH_TOKEN environment variable is not set')
  }

  const { stdout: out } = await Exec('ahqstore build', {
    env: {
      ...process.env,
      RELEASE_ID: r_id,
      GITHUB_REPOSITORY: rep,
      GH_ACTION: 'true'
    }
  })

  const [k, value] = out.trim().split('=')

  core.info(`Got "${k}" as "${value}"`)

  const upload = core.getBooleanInput('upload')

  if (upload) {
    await getOctokit(process.env['GH_TOKEN']!).rest.issues.createComment({
      owner: 'ahqstore',
      repo: 'apps',
      issue_number: 3,
      body: `/store set ${value}`
    })
  }
})()
