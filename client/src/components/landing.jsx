import { useHistory } from "react-router-dom"
import landing from "../assets/purple1.jpg"
import main from "./various.module.css"

export default function LandingPage() {

    let history = useHistory();

    function onClick() {
        history.push(`/videogames`);
    };

    return (
        <div className={main.landing}>
            <img className={main.landingImg} src={landing} alt="" />
                <a className={main.landingBtn} href="/videogames"> Enter </a>
        </div>
    )
}