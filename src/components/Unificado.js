import React, { Component } from 'react';
import Rain from './imagens/Rain.png'
import Snow from './imagens/Snow.png'
import Clouds from './imagens/Clouds.png'
import Clear from './imagens/Clear.png'
import Pokedex from './imagens/pokedex.png'


export default class Conversor extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            cidade: "",
            tempInCelsius: "",
            estaChovendo: "",
            pokemon: "",
            pokemonType: "",
            imagem:""

        }
        this.previsaoDoTempo = this.previsaoDoTempo.bind(this)

    }

    previsaoDoTempo() {
        let cidade = (this.state.cidade).replace(" ", "+")
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${cidade}&APPID=71d469ad633462a165133b9c0d63b59f`
        fetch(url)
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                let tempInCelsius = (data.main.temp - 273.15).toFixed(1);
                let estaChovendo = (data.weather[0].main)

                if (estaChovendo === "Rain") {
                    console.log("chuva")
                }

                this.setState({ estaChovendo })
                this.setState({ tempInCelsius })

                console.log(this.state)
                console.log(parseFloat(this.state.tempInCelsius))
                console.log(this.state.estaChovendo)
                this.verificaTemperatura(parseFloat(this.state.tempInCelsius))
                this.imagens(this.state.estaChovendo)
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
                this.imagem()
            })


    }
    imagem() {

        let url = this.state.urlpokemon
        console.log(url)
        console.log(this.state)
        fetch(url)
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                
                let sprites = data.sprites.other.["official-artwork"].front_default
                this.setState({ sprites })
                console.log(this.state)

            })

    }

    verificaTemperatura(temperatura) {

        let pokemonType = "";
   
        if (this.state.estaChovendo === "Rain") {
            pokemonType = "electric";
        }
        else if (temperatura < 5) {

            pokemonType = "ice";
        }
        else if (temperatura >= 5 && temperatura < 10) {
            pokemonType = "water";
        }
        else if (temperatura >= 12 && temperatura < 15) {
            pokemonType = "grass";
        }
        else if (temperatura >= 15 && temperatura < 21) {
            pokemonType = "ground";
        }
        else if (temperatura >= 23 && temperatura < 27) {
            pokemonType = "bug";
        }

        else if (temperatura >= 27 && temperatura <= 33) { pokemonType = "rock"; }

        else if (temperatura > 33) {
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
        let imagem;
        console.log(tempo)
        switch (tempo) {
            case 'Rain':
                imagem = Rain;
                break;
            case 'Clouds':
                imagem = Clouds;
                break;
            case 'Clear':
                imagem = Clear;
                break;
            case 'Snow':
                imagem = Snow;
                break;
            default:
                imagem = Rain;
                break;
        }
        this.setState({imagem})
        console.log(this.state)
    }

    render() {
        return (

            <div>
                <div className="conversor">
                    <img src={Pokedex}></img>
                    <h1>Encontre o seu Pokemon!</h1>
                    <label nomeCidade> Digite o nome da cidade: </label>
                    <input id="nomeCidade" type="text" onChange={(event) => { this.setState({ cidade: event.target.value }) }}></input>
                    <input id="botao" type="button" value="Ok" onClick={this.previsaoDoTempo}></input>
                    <h2>Temperatura: {this.state.tempInCelsius}°C</h2>
                    <h2>{this.state.estaChovendo}</h2>
                    <h3>{this.state.pokemon}</h3>
                    <img src={this.state.imagem} height='100px' width='100px'></img>
                    <img src={this.state.sprites}></img>

                </div>
            
            </div>

        )

    }
} 