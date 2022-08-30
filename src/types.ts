export interface Headers {
    [ key: string ]: string
}

export interface Data {
    [ key: string ]: any
}

export interface HttpOptions {
    url: string;
    config?: Data;
}
