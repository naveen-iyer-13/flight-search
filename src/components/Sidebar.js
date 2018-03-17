import React, { Component } from 'react';
import { Select } from 'antd';
import { Button } from 'antd';
import { DatePicker } from 'antd';
import { Slider } from 'antd';
import moment from 'moment'
import '../styles/sidebar.css';
import 'antd/dist/antd.css'
const Option = Select.Option;

class Sidebar extends Component {
  constructor(props){
    super(props)
    this.state = {
      type: false,
    }
  }

  sliderChange(value) {
    this.props.sliderChange(value);
    this.search()
  }

  search() {
    const { type, originCity, destinationCity, departureDate, passengers, roundDate } = this.props
    if (type === "round") {
      if (originCity && destinationCity && departureDate && passengers && roundDate) {
        this.setState({showError: false})
        this.props.search()
      }
      else {
        this.setState({showError: true})
      }
    }
    else {
      if (originCity && destinationCity && departureDate && passengers) {
        this.setState({showError: false})
        this.props.search()
      }
      else {
        this.setState({showError: true})
      }
    }
  }
  render() {
    return (
      <div className="Sidebar">
        <div style={{display: 'flex'}}>
          <div style={{padding: 5, cursor: 'pointer', color: this.props.type === "oneway" ? "blue" : "black", border: '1px solid black', width: 80}} onClick={() => this.props.onChangeType('oneway')}>
            One way
          </div>
          <div style={{padding: 5, cursor: 'pointer', color: this.props.type === "round" ? "blue" : "black", border: '1px solid black', width: 80}} onClick={() => this.props.onChangeType('round')}>
            Return
          </div>
        </div>
        <div style={{border: '1px solid black'}}>
          <Select
            onChange={(value) => this.props.onChangeSelect('originCity', value)}
            showSearch
            value={this.props.originCity}
            style={{ width: 200, marginTop: 10 }}
            placeholder="Enter origin city"
            optionFilterProp="children"
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="delhi">Delhi</Option>
            <Option value="pune">Pune</Option>
            <Option value="chennai">Chennai</Option>
          </Select>
          <Select
            onChange={(value) => this.props.onChangeSelect('destinationCity', value)}
            showSearch
            value={this.props.destinationCity}
            style={{ width: 200, marginTop: 10 }}
            placeholder="Enter destination city"
            optionFilterProp="children"
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="delhi">Delhi</Option>
            <Option value="pune">Pune</Option>
            <Option value="chennai">Chennai</Option>
          </Select>
          <DatePicker
            value={moment(this.props.departureDate)}
            onChange={(date, dateString) => this.props.onChangeDate('departureDate', dateString)}
            placeholder="Select Departure date"
            style={{ width: 200, marginTop: 10 }}
          />
          {this.props.type === "round" && <DatePicker
            value={moment(this.props.roundDate)}
            onChange={(date, dateString) => this.props.onChangeDate('roundDate', dateString)}
            placeholder="Select Return date"
            style={{ width: 200, marginTop: 10 }}
          />}
          <Select
            onChange={(value) => this.props.onChangeSelect('passengers', value)}
            showSearch
            value={this.props.passengers}
            style={{ width: 200, marginTop: 10 }}
            placeholder="Passengers"
            optionFilterProp="children"
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
          </Select>
        </div>
        <Button onClick={() => {this.search()}} style={{margin: 10}} >Search</Button>
        {this.state.showError && <div style={{padding: 10, color: 'red', fontSize: 10}}>Please enter all the fields</div>}
        <div style={{padding: 20, border: '1px solid black'}}>
          <div>Refine flight search</div>
          <Slider range defaultValue={[0, 10000]} value={this.props.sliderValue} min={0} max={10000} onChange={(value) => this.sliderChange(value)}/>
        </div>
      </div>
    );
  }
}

export default Sidebar;
