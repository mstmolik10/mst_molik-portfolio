import hero from "./sections/hero.jsx"
import Hero from "./sections/hero.jsx";
import Showcase from "./sections/Showcase.jsx";
import Navbar from "./components/Navbar.jsx";
import Experience from "./sections/Experience.jsx";
import Techstack from "./sections/Techstack.jsx";
import Contact from "./sections/Contact.jsx";

const App = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <Showcase/>
            <Experience />
            <Techstack/>
            <Contact/>
        </>
    )
}
export default App
