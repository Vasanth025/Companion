export type LoginState = {
    email: string;
    password: string;
    loading: boolean;
    error: string
}

export type LoginAction = 
 | { type: 'SET_INPUT', field: 'email' | 'password', value: string }
 | { type: 'LOADING', value: boolean }
 | { type: 'LOGIN_SUCCESS', value: string }
 | { type: 'LOGIN_ERROR', value: string }

export type RegisterState = {
    name: string,
    email: string,
    password: string,
    loading: boolean,
    success: boolean,
    error: string
}

export type RegisterAction = 
 | { type: 'SET_INPUT', field: 'name' | 'email' | 'password', value: string }
 | { type: 'LOADING', value: boolean }
 | { type: 'REGISTER_SUCCESS', value: string }
 | { type: 'REGISTER_ERROR', value: string }
