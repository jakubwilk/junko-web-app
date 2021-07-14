import { ChangeEvent, FormEvent, useState } from 'react'

type TLoginFormInitialValues = {
    email: string
    password: string
    rememberMe: boolean
}

const initialValues: TLoginFormInitialValues = {
    email: '',
    password: '',
    rememberMe: false,
}

export const useLoginForm = () => {
    const [data, setData] = useState<TLoginFormInitialValues>(initialValues)

    const handleCheck = (event: ChangeEvent<HTMLInputElement>) => {
        const field: HTMLInputElement = event.target

        setData({
            ...data,
            [field.name]: field.checked,
        })
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const field: HTMLInputElement = event.target

        setData({
            ...data,
            [field.name]: field.value,
        })
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }

    return { handleChange, handleCheck, handleSubmit, data }
}
