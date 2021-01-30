import React, { Component } from 'react';
import Rain from './imagens/Rainw.png'
import Snow from './imagens/Snoww.png'
import Clouds from './imagens/Cloudsw.png'
import Clear from './imagens/Clearw.png'
import './Unificado.css'


export default class Conversor extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            cidade: "",
            tempInCelsius: "",
            estaChovendo: "",
            pokemon: "",
            pokemonType: "",
            imagem: "",
            sprits: ""

        }
        this.previsaoDoTempo = this.previsaoDoTempo.bind(this)
        this.buscaPokemon = this.buscaPokemon.bind(this)
        this.imagem = this.imagem.bind(this)
        this.verificaTemperatura = this.verificaTemperatura.bind(this)
    }


    previsaoDoTempo() {
        let key = '71d469ad633462a165133b9c0d63b59f';
        let cidade = (this.state.cidade).replace(" ", "+")
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${cidade}&APPID=${key}`
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

                let nomeCidade = (this.state.cidade)
                this.setState({ nomeCidade })
                this.setState({ estaChovendo })
                this.setState({ tempInCelsius })

                console.log(this.state)
                console.log(parseFloat(this.state.tempInCelsius))
                console.log(this.state.estaChovendo)
                this.verificaTemperatura(parseFloat(this.state.tempInCelsius))
                this.imagens(this.state.estaChovendo)
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
        this.setState({ imagem })
        console.log(this.state)
    }

    exibir() {
        document.getElementById("PokemonConteudo").style.visibility = 'visible'
        document.getElementById("PrevisaoConteudo").style.visibility = 'visible'
    }
    render() {
        return (
        
            <div id="conversor">
                <header>

                    <h1>Encontre o seu Pokémon!</h1>
                <div>
                    <label nomeCidade> Digite o nome da cidade: </label>
                    <input id="nomeCidade" type="text" onChange={(event) => { this.setState({ cidade: event.target.value }) }}></input>
                    <input id="botao" type="button" value="Ok" onClick={this.previsaoDoTempo}></input>
                    </div>
                </header>

                <div id="exibicao">
                    <div id="Pokemon">
                        <div id="PokemonConteudo">
                            <img id="imagemPokemon" src={this.state.sprites}></img>
                            <h3>Pokémon: {this.state.pokemon}</h3>
                            <h3>Tipo: {this.state.pokemonType}</h3>
                        </div>
                    </div>

                    <div id="Previsao">
                        <div id="PrevisaoConteudo">
                            <h3>Cidade: {this.state.nomeCidade}</h3>

                            <h3>Temperatura: {this.state.tempInCelsius}°C</h3>
                            <div id="estado">
                                <img id="imagemTemperatura" src={this.state.imagem} ></img>

                                <h3>{this.state.estaChovendo}</h3>
                            </div>
                        </div>
                    </div>
                </div>



            </div>

            

        )

    }
} 