import Home from "./Home.tsx";
import {useState} from "react";
import Detail from "./Detail.tsx";

function App() {
    const [showHome, setShowHome] = useState(false)

    return (
        <>
            {showHome ? <Home/> : <Detail setShowHome={setShowHome}/>}
        </>

    )
}

export default App
