import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import HomePage from './components/Homepage';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import MyListings from "./components/MyListings";
import About from "./components/About"
import SavedListings from "./components/SavedListings"
import RecommendedProperties from "./components/RecommendedProperties";
import LearnMore from "./components/LearnMore";


function App() {
    return (
        <div className="App">
            <Router>
                <NavBar/>
                <Switch>
                    {/*HOMEPAGE*/}
                    <Route path="/" exact component={() => <HomePage />} />
                    <Route path="/post_login" exact component={() => <HomePage />} />

                    {/*RECOMMENDED PROPERTIES*/}
                    <Route path="/" exact component={() => <RecommendedProperties />} />
                    <Route path="/recommendedProperties" exact component={() => <RecommendedProperties />} />

                    {/*ABOUT US*/}
                    <Route path="/" exact component={() => <About/>} />
                    <Route path="/aboutus" exact component={() => <About/>} />

                    {/*MY LISTINGS PAGE*/}
                    <Route path="/" exact component={() => <MyListings />} />
                    <Route path="/myhouses" exact component={() => <MyListings />} />

                    {/*SAVED LISTINGS PAGE*/}
                    <Route path="/" exact component={() => <SavedListings />} />
                    <Route path="/savedListings" exact component={() => <SavedListings />} />

                    <Route path="/" exact component={() => <LearnMore />} />
                    <Route path="/ratings" exact component={() => <LearnMore />} />

                </Switch>
            <Footer/>
        </Router>
        </div>

    )
}

export default App;
