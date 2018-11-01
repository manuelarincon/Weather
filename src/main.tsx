import * as React from "react";
import * as ReactDOM from "react-dom";
import './myStyles.css';
import axios from 'axios'

console.log('App has been started..'); 

class WeatherInfo extends React.Component <{zip?:number}, {}> {
    state = {zip: this.props.zip, city: 'Houston', forcast: 'clear sky', temp: 97, 
        humidity: 56, pressure: 1013, wind: 5.7, counter: -1 };

    public static defaultProps: Partial<{zip?:number}> = {
            zip: 77001
        }; 
    
    callUpDateElement = () => {
        axios.get('http://api.openweathermap.org/data/2.5/weather?zip=' + this.state.zip + ',us&appid=c5d68ea060668494409dde25fd835466')
        .then(response => {
            let currentValue = this.state.counter;
            const data = response.data;
            this.setState({city: data.name, forcast: data.weather[0].description, temp: data.main.temp,
                           humidity: data.main.humidity, pressure: data.main.pressure, wind: data.wind.speed, 
                           counter: currentValue + 1 })
        })
    };

    componentDidMount() {
        this.callUpDateElement();
    };

    updateZip = () => {
        if (this.state.counter<5) 
            this.callUpDateElement()
        else {
            let currentValue = this.state.counter;
            this.setState({counter: currentValue+1});
        } 
    };

    render() {
        let showCounter;
        if (this.state.counter==0) showCounter = <div></div>
        else if (this.state.counter <8) showCounter=<div>{this.state.counter}</div>
        else showCounter = <div>Nope</div>
        return (

            <button onClick = {this.updateZip}>
                <div className = 'boxStyle'>
                    <div className = 'headerStyle'>
                        <div>Zip: {this.state.zip}</div>
                        <div>{this.state.city}</div>
                        <div>{this.state.forcast}</div>
                    </div>
                    <div className='bodyStyle'>{this.state.temp} °F</div>
                    <div className='bottomStyle'>
                        <div className='labelsStyle'>
                            <div>Humidity</div>
                            <div>Pressure</div>
                            <div>Wind</div>
                           {(this.state.counter>0)?<div>Update</div>:<div></div>}
                        </div>
                        <div className='valuesStyle'>
                            <div>{this.state.humidity} %</div>
                            <div>{this.state.pressure} hPa</div>
                            <div>{this.state.wind} m/s</div>
                            {showCounter}
                        </div>
                    </div>
                </div>
            </button>
        );
    }
};


ReactDOM.render(
    <div>
        <div>
            <WeatherInfo  />
            <WeatherInfo zip = {80829}/>
        </div>
    </div>,
    document.getElementById("reactApp")
);