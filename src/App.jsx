import { Route, Routes } from "react-router-dom"
import {LandingPage, Details, Search, Explore} from './pages'
import { Navbar, Hero } from "./components"

function App() {

  return (
    <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/details/:movieId" element={<Details />}/>
        <Route path="/search/:txt" element={<Search />} />
        <Route path="/explore/:genre/:genreName" element={<Explore />} />
    </Routes>
  )
}

export default App
