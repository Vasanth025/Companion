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

