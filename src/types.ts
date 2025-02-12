export enum METHODS {
    CREATE = 'POST',
    READ = 'GET',
    UPDATE = 'PUT',
    DELETE = 'DELETE'
}

export interface ServerConfig {
    port: number | string,
    dbFilePath: (filePath:string) => string
}

export type Error = {
    message: string,
    status: number
}

export type User = {
    id?:number,
    name?: string,
    email: string,
    password: string
}