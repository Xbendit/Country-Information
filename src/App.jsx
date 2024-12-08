import './App.css';
import axios from "axios";
import worldMap from './assets/world_map.png';
import spinMap from './assets/spin.png';
import {useState} from "react";
import countryColor from "./helpers/Color.js";

function App() {

    const [country, setCountry] = useState([])
    const [visable, setVisable] = useState([true])


    async function fetchData() {

        try {
            const response = await axios.get('https://restcountries.com/v3.1/all');
            setCountry(response.data)
            setVisable(false)

        } catch (e) {
            console.error(e);
        }
    }


    const [inputValue, setInputValue] = useState("")
    const [inputCountry, setInputCountry] = useState([])

    const handleInputChange = (event) => {
        setInputValue(event.target.value)
    }

    async function handleSearch() {
        try {
            const result = await axios.get(`https://restcountries.com/v3.1/name/${inputValue}`);
            console.log(result.data)
            setInputCountry(result.data)


        } catch (e) {
            console.error(e)
        }
    }


    return (
        <>
            <body>

             <section>
                <img
                    className="Worldmap"
                    src={worldMap}
                    title="Wereldkaart"
                />
                <h1
                    className="titleworldregions"
                >World Regions
                </h1>
            </section>

            <section>
                {visable && (
                    <button
                        onClick={fetchData}
                        className="button1"
                    >Click hier voor alle landen
                    </button>
                )}

                {console.log(country)}
                <ul>
                    {country.sort((a, b) => a.population - b.population).map((countries) => {
                        return (
                            <li key={countries.name.common}>
                                <img src={countries.flags.png}/> <span style={{ color: countryColor(countries.region)}}>{countries.name.common}</span> has
                                population of {countries.population} people.
                            </li>
                        )
                    })}
                </ul>
            </section>

            <section>
                <h1
                    className="search"
                >Search country information
                </h1>

                <img
                    className="Spinmap"
                    src={spinMap}
                />
            </section>

            <section>
                <button onClick={handleSearch}>Zoek</button>
                <br/>
                <br/>
                <label htmlFor="name">Voer een land in</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Bijvoorbeeld Nederland of Peru"/>
                {console.log(inputCountry)}
            </section>

            <section>
                {inputCountry.map((inputCountries) => {
                    return (
                        <ul>
                            <img src={inputCountries.flags.png}/>
                            <h1>{inputCountries.name.common}</h1>
                            <li key={inputCountries.area}>
                                <p>{inputCountries.name.common} is situated in {inputCountries.subregion} and
                                    {inputCountries.capital} is the capital of the country.
                                    It has a population of {inputCountries.population} million people and it borders
                                    with {inputCountries.borders.length} with countries
                                    Website can be found on <strong>{inputCountries.tld}</strong> domains</p>
                            </li>
                        </ul>
                    )
                })}
            </section>

            </body>
        </>

    );
}

export default App
