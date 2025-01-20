'use client'

import { api } from '@/services/api'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import styled from 'styled-components'

export default function Auth(): JSX.Element {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const router = useRouter()

    const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target

        if (name === 'username') {
            setUsername(value)
        } else {
            setPassword(value)
        }
    }

    const handleLogin = async (): Promise<void> => {
        api.auth.post({ username, password }).then(res => {
            if (res.status === 200) {
                document.cookie = 'cceak-logged=yes'

                router.push('/')
            }
        })
    }

    return (
        <AuthForm>
            <div>
                <h1>Acessar</h1>
                <h3>Gerenciamento de livros</h3>
                <input
                    value={username}
                    type="text"
                    placeholder="Usuário"
                    name="username"
                    id="username"
                    onChange={onChange}
                />
                <input
                    value={password}
                    type="text"
                    placeholder="Senha"
                    name="password"
                    id="password"
                    onChange={onChange}
                />

                <button disabled={!username || !password} onClick={handleLogin} type="button">
                    Entrar
                </button>
            </div>
        </AuthForm>
    )
}

const AuthForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background-color: #333;
    box-sizing: border-box;
    margin: 0;
    overflow: hidden;
    position: relative;
    z-index: 100;

    & > div {
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 400px;
        background-color: #f9f9f9;
        color: #333;
        font-family: 'Roboto', sans-serif;
        font-size: 16px;
        font-weight: 400;
        line-height: 1.5;
        padding: 20px;

        h1 {
            font-size: 24px;
            font-weight: 500;
            margin-bottom: 10px;
        }

        h3 {
            font-size: 16px;
            font-weight: 400;
            margin-bottom: 20px;
        }

        input {
            border: 1px solid #333;
            border-radius: 4px;
            font-size: 16px;
            margin-bottom: 16px;
            padding: 10px;
        }

        button {
            background-color: #0aa8c2;
            border: none;
            border-radius: 4px;
            color: #f9f9f9;
            cursor: pointer;
            font-size: 16px;
            padding: 10px;
        }
    }
`
