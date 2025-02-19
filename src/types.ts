export enum METHODS {
    CREATE = 'POST',
    READ = 'GET',
    UPDATE = 'PUT',
    DELETE = 'DELETE'
}

export interface ServerConfig {
    port: number | string,
    dbFilePath: (filePath:string) => string,
    publicFilePath: (filePath:string) => string,
    publicImgPath: (filePath:string) => string,
    content_types: {
        ["js"]: string,
        ["css"]:string
    }
}

export type Error = {
    message: string,
    status: number
}

export type User = {
    id?:number,
    name?: string,
    email: string,
    password: string,
    image?: string
}

export type Comment = {
    message: string,
    id?: number,
    user_name?: string,
    time: string
}