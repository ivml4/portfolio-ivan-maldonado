import './App.css'
import { LangProvider } from './context/LangContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Projects from './components/Projects'
import Reviews from './components/Reviews'
import Contact from './components/Contact'

function App() {
  return (
    <LangProvider>
      <Navbar />
      <Hero />
      <Services />
      <Projects />
      <Reviews />
      <Contact />
    </LangProvider>
  )
}

export default App
