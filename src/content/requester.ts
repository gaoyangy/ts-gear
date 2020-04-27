import { EOL } from 'os'
import * as path from 'path'

import { IProject } from '../interface'
import { configFileName } from '../constant'

/** get tsg.config.ts file relative path to import in request
 * */
export const requester = (project: IProject) => {
  const configFileRelativePath = path.relative(path.join(project.dest, project.name), '')
  return {
    import: `import projects from '${configFileRelativePath}/${configFileName}'`,
    code: `const project = projects.find(p => p.name === '${project.name}')!${EOL}const { requester } = project`,
  }
}
