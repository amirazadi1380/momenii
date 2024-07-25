import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

export default function getSetups(title) {

    const [isLoading, setIsLoading] = useState(false)
    const [errorText, setErrorText] = useState('')
    const [setup,setSetup] = useState([])
    useEffect(() => {
        async function fetchMyData() {
            setIsLoading(true)
            await axios.post('http://localhost/max_momeni/controllers/getSetups.php',{title:title},{
                headers:{
                    "Content-Type":'application/x-www-form-urlencoded'
                }
            })
            .then(res=>setSetup(res.data.data))
            setIsLoading(false)
        }
        fetchMyData()
    }, [])
    return { setup , isLoading }
}