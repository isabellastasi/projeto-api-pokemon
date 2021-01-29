import React, { Component } from 'react';


export default class Pokemon extends React.Component {

      constructor(props) {

        super(props);

        this.state = {
            pokemon: "",
        }
        this.converter = this.converter.bind(this)

    }

    converter() {


        let url = `https://pokeapi.co/api/v2/type/electric`

        fetch(url)
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                //let tamanhoArray = (data.pokemon).length;
               // let i = (Math.random() * ((tamanhoArray - 1) - 0)).toFixed()

                let pokemon = data.pokemon[1].pokemon.name
                let urlpokemon = data.pokemon[82].pokemon.url


                this.setState({ pokemon })
                this.setState({ urlpokemon })

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


    render() {
        return (
            <div className="pokemon">
                <input id="botao" type="button" value="Ok" onClick={this.converter}></input>
                <h2>{this.state.pokemon}</h2>
                <h2>{this.state.urlpokemon}</h2>
                <img src={this.state.sprites}></img>
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