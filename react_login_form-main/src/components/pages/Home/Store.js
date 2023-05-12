import { Main } from "../../layouts/Store/Main/Main"
import { Nav } from "../../layouts/Nav/Nav"
import './Store.css'

export function Store() {
    return <div className="store">
        <div className="nav-bar">
            <Nav/>
        </div>
        <Main/>
    </div>
}