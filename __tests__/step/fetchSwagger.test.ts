import { join } from 'path'

import * as step from 'src/step'
import { IProject } from 'src/interface'

jest.mock('isomorphic-fetch', () => {
  return () => ({
    json() {
      return Promise.resolve({ ok: true })
    },
  })
})

describe('fetchSwagger', () => {
  const cwd = process.cwd()
  it('file not ends with json', done => {
    const project: IProject = {
      name: 'abc',
      source: 'abc',
      dest: 'abc',
      requester: () => Promise.resolve(),
    }
    step.fetchSwagger(project).catch(e => {
      expect(e.message).toBe('user config file should ends with `.json`')
      done()
    })
  })

  it('get json', async () => {
    const project: IProject = {
      name: 'abc',
      source: join('example', 'package.json'),
      dest: 'abc',
      requester: () => Promise.resolve(),
    }
    const spec = await step.fetchSwagger(project)
    // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require,import/no-dynamic-require
    expect(spec).toEqual(require(join(cwd, 'example', 'package.json')))
  })

  it('fetch remote spec', async () => {
    const project: IProject = {
      name: 'abc',
      source: 'http://abc.com',
      dest: 'abc',
      requester: () => Promise.resolve(),
    }
    const res = await step.fetchSwagger(project)
    expect(res).toEqual({ ok: true })
    jest.restoreAllMocks()
  })
})
