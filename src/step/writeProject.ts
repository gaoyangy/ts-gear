import { EOL } from 'os'
import { join } from 'path'

import { importAllDefinition } from './importAllDefinition'

import { getGlobal } from 'src/global'
import { prettierWrite } from 'src/tool/prettierWrite'
import { IProject } from 'src/interface'
import { warningComment } from 'src/content/warningComment'
import { projectIndex } from 'src/content/projectIndex'
import { requester } from 'src/content/requester'
import { propertyOf } from 'src/content/propertyOfHelper'

/** gather global typescript content
 * write to project dir */
export const writeProject = (project: IProject) => {
  const { definitionMap, requestMap } = getGlobal(project)
  const cwd = process.cwd()
  const dest = join(cwd, project.dest, project.name)

  const definitionTypeNameSet = new Set<string>()
  const definitionContent = Object.getOwnPropertyNames(definitionMap)
    .map(name => {
      // prevent repeat definition
      const typeName = definitionMap[name].typeName!
      if (definitionTypeNameSet.has(typeName!)) {
        return ''
      }
      definitionTypeNameSet.add(typeName)
      return definitionMap[name].typescriptContent
    })
    .join(EOL)
  prettierWrite([warningComment, propertyOf, definitionContent].join(EOL), join(dest, 'definition.ts'))

  const requestContent = Object.getOwnPropertyNames(requestMap)
    .map(name => {
      return requestMap[name].typescriptContent
    })
    .join(EOL)
  const requesterResult = requester(project)
  prettierWrite(
    [warningComment, requesterResult.import, importAllDefinition(project), requesterResult.code, requestContent].join(
      EOL,
    ),
    join(dest, 'request.ts'),
  )

  prettierWrite([warningComment, projectIndex].join(EOL), join(dest, 'index.ts'))
}
