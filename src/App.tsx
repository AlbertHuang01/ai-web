import {useEffect, useState} from "react";
import './App.scss'
import Home from "./Home.tsx";
import Detail from "./Detail.tsx";

export const basePath='https://curly-cod-x94xx5wqvxv355-3000.app.github.dev'

function App() {
    const [showHome, setShowHome] = useState(true)
    const [currentFictionId, setCurrentFictionId] = useState(-1)

    useEffect(() => {
        if (currentFictionId > 0) {
            setShowHome(false)
        }
    }, [currentFictionId]);

    return (
        <>
            {showHome ? <Home setCurrentFictionId={setCurrentFictionId}/> :
                <Detail setShowHome={setShowHome} currentFictionId={currentFictionId}/>}
        </>

    )
}

export default App
