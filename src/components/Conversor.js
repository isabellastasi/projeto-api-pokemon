
import React, { Component } from 'react';


export default class Conversor extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            cidade: "",
            temperatura: "",
            chovendo: ""
        }
        this.converter = this.converter.bind(this)

    }

   previsaoDoTempo() {
        let cidade = (this.state.cidade).replace(" ","+")
        let url= `http://api.openweathermap.org/data/2.5/weather?q=${cidade}&APPID=71d469ad633462a165133b9c0d63b59f`
         console.log(cidade)
        console.log(this.state)
        fetch(url)
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                let tempInCelsius = (data.main.temp - 273.15).toFixed(1);
          
                
                let estaChovendo = (data.weather[0].main)

                if(estaChovendo === "Rain")
                {
                    console.log("chuva")
                }
                
                this.setState({estaChovendo})
                this.setState({tempInCelsius})
            
                
            })
          

    }

    render() {
        return (
            <div className="conversor">

                <input type="text" onChange={(event) => { this.setState({ cidade: event.target.value }) }}></input>
                <input type="button" value="Ok" onClick={this.converter}></input>
                <h2>{this.state.tempInCelsius},{this.state.estaChovendo}</h2>
                
            </div>

        )
    }
} 