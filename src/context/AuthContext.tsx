import React, { createContext, useState, useEffect } from 'react'
import { Auth, Hub } from 'aws-amplify'
import { CognitoUser } from '@aws-amplify/auth'

const UserContext = createContext<UserContextType>({} as UserContextType)

interface UserContextType {
    user: CognitoUser | null
    setUser: React.Dispatch<React.SetStateAction<CognitoUser>>
}

interface Props {
    children: React.ReactElement
}

export default function authContext({ children }: Props) {

    const [user, setUser] = useState<CognitoUser | null>(null)

    useEffect(() => {
        chechUser()
    }, [])

    useEffect(() => {
        Hub.listen('auth', () => {
            // perfom some action to update the state whenever an auth event occurs.
            chechUser()
        })
    }, [])

    async function chechUser() {
        try {
            const amplifyUser = await Auth.currentAuthenticatedUser()

            if (amplifyUser) {
                setUser(amplifyUser)
            } else setUser(null)
        } catch (error) {
            console.error('Error detecting  user', error)
        }
    }

    return (
        <UserContext.Provider
            value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}