import landing from "../assets/purple1.jpg"
import main from "./various.module.css"

export default function LandingPage() {
    return (
        <div className={main.landing}>
            <img className={main.landingImg} src={landing} alt="" />
            <a className={main.landingBtn} href="/videogames"> Enter </a>
            <h1 className={main.landingTitle}> Henry Videogames Proyect </h1>
        </div>
    )
}