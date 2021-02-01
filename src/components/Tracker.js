import React from 'react';
import Rain from './imagens/Rainw.png'
import Snow from './imagens/Snoww.png'
import Clouds from './imagens/Cloudsw.png'
import Clear from './imagens/Clearw.png'
import Haze from './imagens/Hazew.png'
import Fog from './imagens/Fogw.png'
import Mist from './imagens/Mistw.png'
import Pokemon from './imagens/pokemon-logo.png'
import './Tracker.css'


export default class Tracker extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            city: "",
            tempInCelsius: "",
            weatherType: "",
            pokemon: "",
            pokemonType: "",
            image: "",
            sprites: "",
            cityName: "",
        }
        this.weatherForecast = this.weatherForecast.bind(this)
        this.buscaPokemon = this.buscaPokemon.bind(this)
        this.image = this.image.bind(this)
        this.checkTemperature = this.checkTemperature.bind(this)
        this.imagens = this.imagens.bind(this)
        this.exibir = this.exibir.bind(this)
    }

    //Consulta API de acordo do a cidade inserida no formulário e retorna os valores de temperatura e clima

    weatherForecast() {
        let key = '71d469ad633462a165133b9c0d63b59f';
        let city = (this.state.city).replace(" ", "+")
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${key}`

        fetch(url)
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                let tempInCelsius = data.main.temp;
                let weatherType = (data.weather[0].main)

                this.setState({ cityName: this.state.city })
                this.setState({ weatherType })
                this.setState({ tempInCelsius })

                this.checkTemperature(parseFloat(this.state.tempInCelsius))
                this.imagens(this.state.weatherType)
                
                this.exibir()
                document.getElementById("imagePokemon").style.visibility = 'visible'
                document.getElementById("imageTemperature").style.visibility = 'visible'
            })

            .catch((err) => {

                this.setState({ cityName: `não identificada` })
                this.setState({ tempInCelsius: '-' })
                this.setState({ weatherType: '-' })
                this.setState({ pokemon: '-' })
                this.setState({ type: '-' })
                this.setState({ pokemonType: '-' })
                this.setState({ sprites: null })
                this.setState({ image: null })
                this.exibir()
                document.getElementById("imagePokemon").style.visibility = 'hidden'
                document.getElementById("imageTemperature").style.visibility = 'hidden'

            })


    }

    //Recebe o parametro de temperatura da API e define o tipo de Pokemon de acordo com a temperatura/clima
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
        this.buscaPokemon(pokemonType)
    }

    //Recebe o parametro do tipo de Pokemon e consulta API de acordo com o tipo. Define o nome do pokemon e sua URL individual para aquisição da imagem
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
                this.image()
            })


    }

    //Consulta a API do Pokemon e define o link para o acesso à imagem
    image() {

        let url = this.state.urlpokemon
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
                    imageNull.innerText = `Imagem não disponível`;
                }
                console.log(this.state)

            })

    }

    //Recebe o parametro tempo (passado pela função weatherForecast()) para definir qual imagem relacionada ao clima será exibida
    imagens(tempo) {
        let image;
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

    }

    //Exibe os dados de tempo e Pokemon, que não estão visíveis ao iniciar a aplicação
    exibir() {
        document.getElementById("pokemonContent").style.visibility = 'visible'
        document.getElementById("forecastContent").style.visibility = 'visible'
    }

    render() {
        return (

            <div id="tracker">
                <header>
                    <div id="title">
                        <h1>Encontre o seu </h1>
                        <img id="logo" src={Pokemon} alt="Logo Pokémon"></img>
                    </div>

                    <div>
                        <label id="cityName"> Digite o nome da cidade: </label>
                        <input id="cityName" type="text" onChange={(event) => { this.setState({ city: event.target.value }) }}></input>
                        <input id="botao" type="button" value="Ok" onClick={this.weatherForecast}></input>
                    </div>

                </header>


                <div id="exhibition">
                    <div id="pokemon">
                        <div id="pokemonContent">
                            <div>
                                <img id="imagePokemon" src={this.state.sprites} alt="Imagem do Pokémon"></img>
                                <h5 className="imageNull"> </h5>
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
                                <img id="imageTemperature" src={this.state.image} alt="Icone do Clima" ></img>

                                <h3>{this.state.weatherType}</h3>
                            </div>
                        </div>
                    </div>
                </div>



            </div>



        )

    }
} 