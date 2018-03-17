import React, { Component } from 'react';
import logo from './logo.svg';
import { Card } from 'antd'
import moment from 'moment'
import { Button } from 'antd';
import flightJson from './constants'
import './styles/App.css';
import Sidebar from './components/Sidebar'


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      type: 'oneway',
      originCity: null,
      destinationCity: null,
      departureDate: new Date(),
      roundDate: new Date(),
      passengers: null,
      filteredList: [],
      sliderValue: [0, 10000]
    }
  }

  onChangeDate(id, value) {
    this.setState({[id]: value})
  }

  onChangeSelect(id, value) {
    this.setState({[id]: value})
  }

  onChangeType(type) {
    this.setState({type})
  }

  sliderChange(value) {
    this.setState({sliderValue: value})
  }

  search() {
    var filteredList = flightJson
    filteredList = filteredList.filter(item => {
      if (item.originCity === this.state.originCity) {
        return item
      }
    })
    filteredList = filteredList.filter(item => {
      if (item.destinationCity === this.state.destinationCity) {
        return item
      }
    })
    filteredList = filteredList.filter(item => {
      if (moment(item.departureDate).format('DD-MM-YYYY') === moment(this.state.departureDate).format('DD-MM-YYYY')) {
        return item
      }
    })
    filteredList = filteredList.filter(item => {
      if (parseInt(item.price) >= parseInt(this.state.sliderValue[0]) && parseInt(item.price) <= parseInt(this.state.sliderValue[1])) {
        return item
      }
    })
    this.setState({filteredList: filteredList})
    var newList1 = filteredList
    var newList2 = flightJson
    var combinedList = []
    if (this.state.type=="round") {
      newList2 = newList2.filter(item => {
        if (item.destinationCity === this.state.originCity) {
          return item
        }
      })
      newList2 = newList2.filter(item => {
        if (item.originCity === this.state.destinationCity) {
          return item
        }
      })
      newList2 = newList2.filter(item => {
        if (moment(item.departureDate).format('DD-MM-YYYY') === moment(this.state.roundDate).format('DD-MM-YYYY')) {
          return item
        }
      })
      newList2 = newList2.filter(item => {
        if (parseInt(item.price) >= parseInt(this.state.sliderValue[0]) && parseInt(item.price) <= parseInt(this.state.sliderValue[1])) {
          return item
        }
      })
      var combinedList = []
      if (newList1.length > 0 && newList2.length > 0) {
        newList1.map(item => {
          newList2.map(item2 => {
            var obj =
              {
                arriveTime: item.arriveTime,
                departureTime: item.departureTime,
                departureDate: item.departureDate,
                destinationCity: item.destinationCity,
                flightNumber: item.flightNumber,
                originCity: item.originCity,
                price: item.price,
                returnArriveTime: item2.arriveTime,
                returnDepartureTime: item2.departureTime,
                returnDepartureDate: item2.departureDate,
                returnDestinationCity: item2.destinationCity,
                returnFlightNumber: item2.flightNumber,
                returnOriginCity: item2.originCity,
                returnPrice: item2.price,
                totalPrice: parseInt(item.price)+parseInt(item2.price)
              }
              combinedList.push(obj)
          })
        })
      }
      this.setState({filteredList: combinedList})
    }
  }

  render() {
    var displayFlights = "There are no Flights to display"
    var flightDetailsHeader = ""
    var secondFlight
    if (this.state.filteredList.length > 0) {
      flightDetailsHeader =
        <div style={{display: 'flex', margin: 20}}>
          <div style={{fontSize: 18, width: '50%', textAlign: 'left', textTransform: 'capitalize'}}>
            {this.state.originCity} > {this.state.destinationCity}
          </div>
          <div style={{fontSize: 10, textAlign: 'right', width: "50%"}}>
            Depart: {moment(this.state.departureTime).format('DD-MM-YYYY')}
          </div>
        </div>
      displayFlights = this.state.filteredList.map((item, index) => {
        var totalPrice = parseInt(item.price)*parseInt(this.state.passengers)
        if (Object.keys(item).length === 15) {
          totalPrice = parseInt(item.totalPrice)*parseInt(this.state.passengers)
          flightDetailsHeader =
            <div style={{display: 'flex', margin: 20}}>
              <div style={{fontSize: 18, width: '50%', textAlign: 'left', textTransform: 'capitalize'}}>
                {this.state.originCity} > {this.state.destinationCity} > {this.state.originCity}
              </div>
              <div style={{fontSize: 10, textAlign: 'right', width: "50%"}}>
                <div>
                  Depart: {moment(this.state.departureDate).format('DD-MM-YYYY')}
                </div>
                <div>
                  Return: {moment(this.state.roundDate).format('DD-MM-YYYY')}
                </div>
              </div>
            </div>
          secondFlight =
            <div style={{display: 'flex', width: 200}}>
              <div style={{textAlign: 'left'}}>
                <p>{item.returnFlightNumber}</p>
                <p style={{textTransform: 'capitalize'}}>{item.returnOriginCity} > {item.returnDestinationCity}</p>
                <p>Depart : {item.returnDepartureTime}</p>
                <p>Arrive : {item.returnArriveTime}</p>
              </div>
            </div>
        }
        return(
          <Card style={{margin: 20}} className="card" key={index}>
            <p style={{textAlign: 'left', fontSize: 18}}>Rs.{totalPrice}</p>
            <div style={{display: 'flex'}}>
              <div style={{textAlign: 'left', width: 200}}>
                <p>{item.flightNumber}</p>
                <p style={{textTransform: 'capitalize'}}>{item.originCity} > {item.destinationCity}</p>
                <p>Depart : {item.departureTime}</p>
                <p>Arrive : {item.arriveTime}</p>
              </div>
              {secondFlight}
            </div>
            <Button style={{width: 300, margin: 20}}> Book this flight </Button>
          </Card>
        );
      })
    }
    return (
      <div className="App">
        <Sidebar
          type={this.state.type}
          onChangeType={this.onChangeType.bind(this)}
          originCity={this.state.originCity}
          passengers={this.state.passengers}
          destinationCity={this.state.destinationCity}
          departureDate={this.state.departureDate}
          roundDate={this.state.roundDate}
          onChangeDate={this.onChangeDate.bind(this)}
          onChangeSelect={this.onChangeSelect.bind(this)}
          search={this.search.bind(this)}
          sliderChange={this.sliderChange.bind(this)}
          sliderValue={this.state.sliderValue}
        />
        <div className="container" style={{padding: 50}}>
          <h1> Flight Search engine</h1>
          {flightDetailsHeader}
          {displayFlights}
        </div>
      </div>
    );
  }
}

export default App;
