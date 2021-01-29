import React, { Component } from 'react';
import Tempo from "./Imagens.js"
import Rain from './imagens/Rain.png'
import Snow from './imagens/Snow.png'
import Clouds from './imagens/Clouds.png'
import Clear from './imagens/Clear.png'

/*Lugres onde a temperatura for menor (<) que 5ºC, deve-se retornar um pokémon de gelo (ice).
Lugares onde a temperatura estiver entre (>=) 5ºC e (<) 10ºC, deve-se retornar um pokémon do tipo água (water).
Lugares onde a temperatura estiver entre 12ºC e 15ºC, deve-se retornar um pokémon do tipo grama (grass).
Lugares onde a temperatura estiver entre 15ºC e 21ºC, deve-se retornar um pokémon do tipo terra (ground).
Lugares onde a temperatura estiver entre 23ºC e 27ºC, deve-se retornar um pokémon do tipo inseto (bug).
Lugares onde a temperatura estiver entre 27ºC e 33ºC inclusive, deve-se retornar um pokémon do tipo pedra (rock).
Lugares onde a temperatura for maior que 33ºC, deve-se retornar um pokémon do tipo fogo (fire).

Para qualquer outra temperatura, deve-se retornar um pokémon do tipo normal.
E, no caso em que esteja chovendo na região um pokémon elétrico (electric) deve ser retornado, independente da temperatura.*/

export default class Pokemon extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            pokemon: "",
        }
        this.converter = this.converter.bind(this)

    }

    converter() {//mudar o nome da função
        
        
        let url= `https://pokeapi.co/api/v2/type/grass`

        fetch(url)
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                let tamanhoArray = (data.pokemon).length;
                let i =(Math.random()* ((tamanhoArray-1) - 0)).toFixed()

                let pokemon = data.pokemon[1].pokemon.name
                 let urlpokemon = data.pokemon[82].pokemon.url
                
                this.setState({pokemon})
                
               console.log (Tempo("Rain"))
              
            })
          

    }

    render() {
        return (
            <div className="pokemon">
                    <input id="botao" type="button" value="Ok" onClick={this.converter}></input>
                    <h2>{this.state.pokemon}</h2>
                    <img src={Tempo("Rain")}></img>
                    
            </div>

        )
    }
} 



/*
url = `https://pokeapi.co/api/v2/type/${type}`;
let type

if(temperatura<5){

    pokemon = ice
}
else if (temperatura >= 5 && temperatura<10){
pokemon= water;
}
else if (temperatura>=12 && temperatura<15){
pokemon= grass;
}

else if (temperatura>=15 && temperatura<21){
pokemon=ground;
}

else if (temperatura>=23 && temperatura<27){
pokemon=bug;
}

else if (temperatura>=27 && temperatura<=33){
pokemon=rock;
}

else if (temperatura>33){
pokemon = fire;
}

if(estaChovendo === "sim")
{
    pokemon = electric;
}
else("outra temperatura")
{
 pokemon=qualquer;
}
*/