
export const isEmpty = (value: string | null | undefined) => {
    if (value === null || value === undefined || value === '') {
        return true
    }
}
export function emailValidator(value:string) {
    if (isEmpty(value)) {
        return true
    }

    // eslint-disable-next-line
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (Array.isArray(value)) {
        return value.every(val => re.test(String(val)))
    }

    return re.test(String(value)) || "The Email field must be a valid email"
}