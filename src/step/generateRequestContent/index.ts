import { EOL } from 'os'

import join from 'url-join'
import { FunctionDeclarationStructure, OptionalKind } from 'ts-morph'
import { Spec } from 'swagger-schema-official'

import { generateParameterType } from './generateParameterType'
import { generateResponseType } from './generateResponseType'

import { IProject } from 'src/interface'
import { sow, harvest } from 'src/source'
// import { schemaToTypescript } from 'src/tool/schemaToTypescript'
import { transformSwaggerPathToRouterPath } from 'src/tool/transformSwaggerPathToRouterPath'
import { getGlobal } from 'src/global'
import { assembleDoc } from 'src/tool/assembleDoc'

/** from swagger spec paths assemble request functions */
export const generateRequestContent = (spec: Spec, project: IProject) => {
  const { pathMatcher, withBasePath, withHost } = project
  const { requestMap } = getGlobal(project)

  const resultContent: string[] = []
  Object.getOwnPropertyNames(requestMap).forEach(requestFunctionName => {
    const requestTypeScriptContent: string[] = []
    const request = requestMap[requestFunctionName]
    const { httpMethod } = request
    if (pathMatcher) {
      if (typeof pathMatcher === 'function') {
        if (!pathMatcher(request.pathName, httpMethod)) {
          return
        }
      } else if (!pathMatcher.test(request.pathName)) {
        return
      }
    }

    let parameterTypeName = ''
    if (request.parameters && request.parameters.length > 0) {
      const parameterType = generateParameterType(requestFunctionName, request.parameters)
      parameterTypeName = parameterType.parameterTypeName
      requestTypeScriptContent.push(parameterType.parameterTypeContent)
    }
    const responseType = generateResponseType(requestFunctionName, request.responses)
    requestTypeScriptContent.push(responseType.responseTypeContent)
    requestTypeScriptContent.push(responseType.successTypeContent)
    const urlPath = join(spec.basePath || '', transformSwaggerPathToRouterPath(String(request.pathName)))
    const source = sow()
    const functionStatment = `return requester('${urlPath}', {${withHost ? `, host: '${spec.host}'` : ''}${
      withBasePath ? `, basePath: '${spec.basePath}'` : ''
    }method: '${httpMethod}'${parameterTypeName ? ', ...option' : ''}}) as Promise<any>`
    const functionData: OptionalKind<FunctionDeclarationStructure> = {
      name: requestFunctionName,
      isExported: true,
      returnType: `Promise<${responseType.successTypeName}>`,
      statements: functionStatment,
      docs: assembleDoc(request.schema),
    }
    functionData.parameters = []
    if (parameterTypeName) {
      functionData.parameters.push({
        name: 'option',
        type: parameterTypeName,
      })
    }
    source.addFunction(functionData)
    requestTypeScriptContent.push(harvest(source))
    /** store typescript content to requestMap */
    request.typescriptContent = requestTypeScriptContent.join(EOL)
    resultContent.push(request.typescriptContent)
  })

  /** return value only for test and debug */
  return resultContent.join(EOL)
}
