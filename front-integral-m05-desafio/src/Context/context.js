import { createContext } from 'react'
import UseData from '../Hooks/useData'
const Context = createContext()
export function ContextProvider(props) {
    const data = UseData()
    return (

        <Context.Provider value={data}>
            {props.children}
        </Context.Provider>
    )
}

export default Context