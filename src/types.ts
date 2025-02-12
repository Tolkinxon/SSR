export enum METHODS {
    CREATE = 'POST',
    READ = 'GET',
    UPDATE = 'PUT',
    DELETE = 'DELETE'
}

export interface ServerConfig {
    port: number | string
}

export type Error = {
    message: string,
    status: number
}

export type User = {
    name: string,
    email: string,
    password: string
}