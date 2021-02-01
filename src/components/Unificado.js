import React, { Component } from 'react';
import Rain from './imagens/Rainw.png'
import Snow from './imagens/Snoww.png'
import Clouds from './imagens/Cloudsw.png'
import Clear from './imagens/Clearw.png'
import Haze from './imagens/Hazew.png'
import Fog from './imagens/Fogw.png'
import Mist from './imagens/Mistw.png'
import Pokemon from './imagens/pokemon-logo.png'
import './Unificado.css'


export default class Conversor extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            city: "",
            tempInCelsius: "",
            weatherType: "",
            pokemon: "",
            pokemonType: "",
            image: "",
            sprites: ""

        }
        this.weatherForecast = this.weatherForecast.bind(this)
        this.buscaPokemon = this.buscaPokemon.bind(this)
        this.image = this.image.bind(this)
        this.checkTemperature = this.checkTemperature.bind(this)
    }


    weatherForecast() {
        let key = '71d469ad633462a165133b9c0d63b59f';
        let city = (this.state.city).replace(" ", "+")
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${key}`
        let cityName
        let tempInCelsius
        let weatherType

        fetch(url)
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                tempInCelsius = (data.main.temp - 273.15).toFixed(1);
               weatherType = (data.weather[0].main)

                cityName = (this.state.city)
                this.setState({ cityName })
                this.setState({weatherType })
                this.setState({ tempInCelsius })

                console.log(this.state)
                console.log(parseFloat(this.state.tempInCelsius))
                console.log(this.state.weatherType)
                this.checkTemperature(parseFloat(this.state.tempInCelsius))
                this.imagens(this.state.weatherType)
                this.exibir()
            })

            .catch((err) => {
                cityName = `Cidade não identificada. Tente novamente.`
                tempInCelsius = '-'
                weatherType = '-'
                let image = ""
                let pokemon = '-'
                let type = '-'
                let sprites = '-'

                this.state.pokemon = pokemon;
                this.state.pokemonType = type;
                this.state.sprites = sprites;


                this.state.image = image;

                this.setState({ cityName })
                this.setState({ tempInCelsius })
                this.setState({weatherType })
                this.setState({ image })

                console.log(this.state)
                this.exibir()
            })


    }

    buscaPokemon(pokemonType) {

        let url = `https://pokeapi.co/api/v2/type/${pokemonType}`

        fetch(url)
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                let tamanhoArray = (data.pokemon).length;
                let i = (Math.random() * ((tamanhoArray - 1) - 0)).toFixed()

                let pokemon = data.pokemon[i].pokemon.name
                let urlpokemon = data.pokemon[i].pokemon.url
                this.setState({ pokemon })
                this.setState({ urlpokemon })
                console.log(this.state)
                this.image()
            })


    }
    image() {

        let url = this.state.urlpokemon
        console.log(url)
        console.log(this.state)

        let imageNull = document.querySelector('.imageNull');

        fetch(url)
            .then((data) => {
                return data.json();
            })
            .then((data) => {

                let sprites = data.sprites.other.["official-artwork"].front_default
                this.setState({ sprites })

                document.getElementById("imagePokemon").style.display = 'block';
                imageNull.style.display = 'none'
                if (this.state.sprites === null) {
                    document.getElementById("imagePokemon").style.display = 'none';
                    imageNull.style.display = 'block'
                    imageNull.innerText = `image não disponível`;
                }
                console.log(this.state)

            })

    }

    checkTemperature(temperature) {

        let pokemonType = "";

        if (this.state.weatherType === "Rain") {
            pokemonType = "electric";
        }
        else if (temperature < 5) {

            pokemonType = "ice";
        }
        else if (temperature >= 5 && temperature < 10) {
            pokemonType = "water";
        }
        else if (temperature >= 12 && temperature < 15) {
            pokemonType = "grass";
        }
        else if (temperature >= 15 && temperature < 21) {
            pokemonType = "ground";
        }
        else if (temperature >= 23 && temperature < 27) {
            pokemonType = "bug";
        }

        else if (temperature >= 27 && temperature <= 33) { pokemonType = "rock"; }

        else if (temperature > 33) {
            pokemonType = "fire";
        }
        else {
            pokemonType = "normal";
        }


        this.setState({ pokemonType })

        console.log(this.state.pokemonType)
        this.buscaPokemon(pokemonType)
    }

    imagens(tempo) {
        let image;
        console.log(tempo)
        switch (tempo) {
            case 'Rain':
                image = Rain;
                break;
            case 'Clouds':
                image = Clouds;
                break;
            case 'Clear':
                image = Clear;
                break;
            case 'Snow':
                image = Snow;
                break;
            case 'Haze':
                image = Haze;
                break;

            case 'Fog':
                image = Fog;
                break;

            case 'Mist':
                image = Mist;
                break;

            default:

                break;
        }
        this.setState({ image })
        console.log(this.state)
    }

    exibir() {
        document.getElementById("pokemonContent").style.visibility = 'visible'
        document.getElementById("forecastContent").style.visibility = 'visible'
    }
    render() {
        return (

            <div id="conversor">
                <header>
                    <div id="title">
                        <h1>Encontre o seu </h1>
                        <img id="logo" src={Pokemon}></img>
                    </div>

                    <div>
                        <label cityName> Digite o nome da cidade: </label>
                        <input id="cityName" type="text" onChange={(event) => { this.setState({ city: event.target.value }) }}></input>
                        <input id="botao" type="button" value="Ok" onClick={this.weatherForecast}></input>
                    </div>
                </header>

                <div id="exhibition">
                    <div id="pokemon">
                        <div id="pokemonContent">
                            <div>
                                <img id="imagePokemon" src={this.state.sprites}></img>
                                <h5 className="imageNull"></h5>
                            </div>
                            <h4>Pokémon: {this.state.pokemon}</h4>
                            <h4>Tipo: {this.state.pokemonType}</h4>
                        </div>
                    </div>

                    <div id="forecast">
                        <div id="forecastContent">
                            <h3 id="city">Cidade: {this.state.cityName}</h3>

                            <h3>Temperatura: {this.state.tempInCelsius}°C</h3>
                            <div id="status">
                                <img id="imageTemperature" src={this.state.image} ></img>

                                <h3>{this.state.weatherType}</h3>
                            </div>
                        </div>
                    </div>
                </div>



            </div>



        )

    }
} 