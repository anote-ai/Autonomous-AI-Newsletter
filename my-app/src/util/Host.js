const FRONT_END_HOST = process.env.REACT_APP_FRONT_END_HOST;
const BACK_END_HOST = process.env.REACT_APP_BACK_END_HOST;

export function FrontendHost() {
    return FRONT_END_HOST;
}

export function BackendHost() {
    return BACK_END_HOST;
}