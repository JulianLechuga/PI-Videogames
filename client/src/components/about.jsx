import various from "./various.module.css"
import random from "../assets/why.jpg"
import random2 from "../assets/why2.jpg"
import random3 from "../assets/why3.jpg"

export default function About() {
    return (
        <div>
            <div className={various.p}>
                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro molestias atque voluptas laudantium quis totam rem? Ut quibusdam ab iste.
            </div>
            <div className={various.p}>
                    Dori me
                    Interimo ayapare, dorime
                    Ameno, ameno
                    Latire, latiremo
                    Dori me
                    Ameno
                    Omenare imperavi ameno
                    Dimere, dimere matiro
                    Matiremo, ameno
                    Omenare imperavi emunari
                    Ameno
                    Omenare imperavi emunari
                    Ameno
                    Ameno dore
                    Ameno dori me
                    Ameno dori me
                    Ameno dom
                    Dori me reo
                    Ameno dori me
                    Ameno dori me
                    Dori me 
            </div>
            <div className={various.p}>
                    What the fuck did you just fucking say about me, you little bitch? I'll have you know I graduated top of my class in the Navy Seals, and I've been involved in numerous secret raids on Al-Quaeda, and I have over 300 confirmed kills. 
                    I am trained in gorilla warfare and I'm the top sniper in the entire US armed forces. 
                    You are nothing to me but just another target. I will wipe you the fuck out with precision the likes of which has never been seen before on this Earth, mark my fucking words. 
                    You think you can get away with saying that shit to me over the Internet? Think again, fucker. As we speak I am contacting my secret network of spies across the USA and your IP is being traced right now so you better prepare for the storm, maggot. The storm that wipes out the pathetic little thing you call your life. 
                    You're fucking dead, kid. I can be anywhere, anytime, and I can kill you in over seven hundred ways, and that's just with my bare hands. Not only am I extensively trained in unarmed combat, but I have access to the entire arsenal of the United States Marine Corps and I will use it to its full extent to wipe your miserable ass off the face of the continent, you little shit. If only you could have known what unholy retribution your little "clever" comment was about to bring down upon you, maybe you would have held your fucking tongue. But you couldn't, you didn't, and now you're paying the price, you goddamn idiot. I will shit fury all over you and you will drown in it. You're fucking dead, kiddo.
            </div>
            <div className={various.testDiv}>
                    <img className={various.test} src={random} alt="" />
                    <img className={various.test2} src={random2} alt="" />
                    <img className={various.test3} src={random3} alt="" />
            </div>
        </div>
    );
};