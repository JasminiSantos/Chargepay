import { useContext } from 'react'
import Context from '../Context/context'

export default function useConsumer() {
    return useContext(Context)
}