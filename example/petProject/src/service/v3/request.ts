/* eslint-disable */
/* tslint:disable */
/** Do not modify this file manually.
its content will be overwriten next time execute the `tsg` command. */
import { PropertyType } from 'ts-gear'
import { requester } from 'fffxx'
import type {
  ReplyVOPageVOFieldDefListVO,
  ReplyVOFieldDefShowVO,
  ReplyVO,
  FieldDefAddDTO,
} from './definition'

/** request parameter type for getApiDatamapFieldDef */
export interface GetApiDatamapFieldDefOption {
  /** 创建人 */
  query?: {
    /**
        创建人 */
    createdBy?: string
    /**
        创建时间 */
    createdTimeEnd?: string
    /**
        创建时间 */
    createdTimeStart?: string
    /**
        是否删除：0-否，1-是 */
    deleted?: boolean
    /**
        字段描述 */
    description?: string
    endIndex?: number
    /**
        字段Id：table_id+field_name */
    fieldId?: string
    /**
        字段名称 */
    fieldName?: string
    /**
        修改人 */
    operatedBy?: string
    /**
        修改时间 */
    operatedTimeEnd?: string
    /**
        修改时间 */
    operatedTimeStart?: string
    /**
        分页参数，第几页 */
    pageNo?: number
    /**
        分页参数，每页的条数 */
    pageSize?: number
    startIndex?: number
    /**
        关联table_defination表 */
    tableId?: string
    /**
        字段类型：boolean,long,double,string,date */
    type?: string
  }
}

export interface GetApiDatamapFieldDefResponse {
  /** OK */
  200: ReplyVOPageVOFieldDefListVO
  /** Unauthorized */
  401: any
  /** Forbidden */
  403: any
  /** Not Found */
  404: any
}

export type GetApiDatamapFieldDefResponseSuccess = PropertyType<
  GetApiDatamapFieldDefResponse,
  200
>
/**
 * 分页查询【表字段信息】
 * tags: 【表字段信息】API
 */
export function getApiDatamapFieldDef(
  option?: GetApiDatamapFieldDefOption,
): Promise<GetApiDatamapFieldDefResponseSuccess> {
  if (process.env.NODE_ENV === 'test') {
    return Promise.resolve(getApiDatamapFieldDef.mockData as any)
  }
  return requester('api/datamap/fieldDef', {
    method: 'get',
    ...option,
  }) as Promise<any>
}

if (process.env.NODE_ENV === 'test') {
  getApiDatamapFieldDef.mockData = '' as any
}
getApiDatamapFieldDef.method = 'get'
getApiDatamapFieldDef.url = 'api/datamap/fieldDef'

/** request parameter type for putApiDatamapFieldDef */
export interface PutApiDatamapFieldDefOption {
  body: any
}

export interface PutApiDatamapFieldDefResponse {
  /** OK */
  200: ReplyVOFieldDefShowVO
  /** Created */
  201: any
  /** Unauthorized */
  401: any
  /** Forbidden */
  403: any
  /** Not Found */
  404: any
}

export type PutApiDatamapFieldDefResponseSuccess = PropertyType<
  PutApiDatamapFieldDefResponse,
  200
>
/**
 * 修改
 * tags: API
 */
export function putApiDatamapFieldDef(
  option: PutApiDatamapFieldDefOption,
): Promise<PutApiDatamapFieldDefResponseSuccess> {
  if (process.env.NODE_ENV === 'test') {
    return Promise.resolve(putApiDatamapFieldDef.mockData as any)
  }
  return requester('api/datamap/fieldDef', {
    method: 'put',
    ...option,
  }) as Promise<any>
}

if (process.env.NODE_ENV === 'test') {
  putApiDatamapFieldDef.mockData = '' as any
}
putApiDatamapFieldDef.method = 'put'
putApiDatamapFieldDef.url = 'api/datamap/fieldDef'

/** request parameter type for postApiDatamapFieldDef */
export interface PostApiDatamapFieldDefOption {
  body: any
}

export interface PostApiDatamapFieldDefResponse {
  /** Created */
  201: ReplyVO
  /** Unauthorized */
  401: any
  /** Forbidden */
  403: any
  /** Not Found */
  404: any
}

export type PostApiDatamapFieldDefResponseSuccess = PropertyType<
  PostApiDatamapFieldDefResponse,
  201
>
/**
 * 新增
 * tags: 表字段信息
 */
export function postApiDatamapFieldDef(
  option: PostApiDatamapFieldDefOption,
): Promise<PostApiDatamapFieldDefResponseSuccess> {
  if (process.env.NODE_ENV === 'test') {
    return Promise.resolve(postApiDatamapFieldDef.mockData as any)
  }
  return requester('api/datamap/fieldDef', {
    method: 'post',
    ...option,
  }) as Promise<any>
}

if (process.env.NODE_ENV === 'test') {
  postApiDatamapFieldDef.mockData = '' as any
}
postApiDatamapFieldDef.method = 'post'
postApiDatamapFieldDef.url = 'api/datamap/fieldDef'

/** request parameter type for deleteApiDatamapFieldDef */
export interface DeleteApiDatamapFieldDefOption {
  body: any
}

export interface DeleteApiDatamapFieldDefResponse {
  /** OK */
  200: FieldDefAddDTO
  /** No Content */
  204: any
  /** Unauthorized */
  401: any
  /** Forbidden */
  403: any
}

export type DeleteApiDatamapFieldDefResponseSuccess = PropertyType<
  DeleteApiDatamapFieldDefResponse,
  200
>
/**
 * 批量删除
 * tags: API
 */
export function deleteApiDatamapFieldDef(
  option: DeleteApiDatamapFieldDefOption,
): Promise<DeleteApiDatamapFieldDefResponseSuccess> {
  if (process.env.NODE_ENV === 'test') {
    return Promise.resolve(deleteApiDatamapFieldDef.mockData as any)
  }
  return requester('api/datamap/fieldDef', {
    method: 'delete',
    ...option,
  }) as Promise<any>
}

if (process.env.NODE_ENV === 'test') {
  deleteApiDatamapFieldDef.mockData = {
    description: 'string',
    fieldId: 'string',
    fieldName: 'name1',
    tableId: 'string',
    type: 'string',
  } as any
}
deleteApiDatamapFieldDef.method = 'delete'
deleteApiDatamapFieldDef.url = 'api/datamap/fieldDef'
