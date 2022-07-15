import various from "./css/various.module.css"
import github from '../assets/github_logo.png'
import linkedIn from'../assets/linked_logo.png'

export default function About() {
    return (
        <div>
            <h2 className={various.p}>
                This small section is dedicated to giving a bit of context regarding this website and a short introduction about myself.
            </h2>
            <div className={various.p}>
                As Henry's bootcamps begin to come to an end, all the students who manage to pass all of the exames presented to them are given an individual project to work on. <br />
                In my case, this was my project. A videogame based library-esque website.
                While still making use of most of the skills taught to us by Henry's teacher, this project required a lot of investigation and work to fulfill all the requirements necessary to pass.
                Even so, I still felt like it was an excellent opportunity  to expand upon and develop my skills with technologies like React, Redux, Express, Sequelize and Postgres
            </div>
            <div className={various.p}>
            And as for a bit about myself. My name is Julian Lechuga and I am a student at Henry's bootcamp, currently in the final stages and acting as a teaching assistant.
                While having only picked up programming recently, I still managed to get the hang of it rather quickly. I deeply enjoy the challenges that were presented to me during Henry's bootcamp. <br />
                I feel that my ease of picking up and learning new topics combined with Henry's extremely packed schedule managed to boost my learning far greater than I could have ever done by myself. <br />
                As the end of my stay on this programming course nears, I decided to become a teaching assistant, so I could give back a bit of the help and support that my own teaching assistants gave me through the course. <br />  
            </div>

            <div className={various.mainDiv}>
                <h1>¡Thank you for reading all of this 😁!</h1>

                <h2> I hope you have a great day</h2>

                <h4>Here are some links if you'd like to contact me</h4>
                <a href="https://github.com/JulianLechuga" target="_blank" rel="noopener noreferrer"><img className={various.footerImg} src={github} alt="Github"/></a>
                <a href="https://www.linkedin.com/in/julian-lechuga-28a782156/" target="_blank" rel="noopener noreferrer"><img className={various.footerImg} src={linkedIn}/></a>
            </div>
        </div>
    );
};