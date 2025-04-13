import React from 'react'
import {navLinks} from "../constants/index.js";

const Navbar = () => {
    return (
        <header className="navbar">
            <div className="inner">
                <a className="logo" href="#hero">
                    mst_molik
                </a>

                <nav className="desktop">
                    <ul>
                        {navLinks.map(({link , name}) => (
                            <li key={name} className="group">
                                <a href={link}
                                   onClick={(e) => {
                                       e.preventDefault();

                                       const target = document.getElementById(name);
                                       if(target){
                                           const offset = window.innerHeight* 0.15;
                                           const top = target.getBoundingClientRect().top + window.scrollY - offset;

                                           window.scrollTo({top , behavior: 'smooth'});
                                       }
                                   }}>
                                    <span>{name}</span>
                                    <span className="underline"/>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <a href="#contact" className="contact-btn group">
                    <div className="inner">
                        <span>Contact me</span>
                    </div>
                </a>
            </div>
        </header>
    )
}
export default Navbar
