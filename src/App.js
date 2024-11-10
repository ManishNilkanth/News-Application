import React, { Component } from 'react'
import NavBar from './Components/NavBar'
import News from "./Components/News"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'
export default class App extends Component {
  pageSize = 10;
  apiKey = process.env.REACT_APP_NEWS_API_KEY
  state = {
    progress: 0
  }
  setProgress =(progress)=>{
    this.setProgress({progress: progress})
  }
  render() {
    return (
      <Router>
        <NavBar />
        <LoadingBar
          color='#f11946'
          height={3}
          progress={this.state.progress}
        />
        <Routes>
          <Route
            exact path='/'
            element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="sports" pageSize={this.pageSize} category="general" />}
          />
          <Route
            exact path='/sports'
            element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="sports" pageSize={this.pageSize} category="sports" />}
          />
          v
          <Route
            exact path='/technology'
            element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pageSize={this.pageSize} category="technology" />}
          />
          <Route
            exact path='/health'
            element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="health" pageSize={this.pageSize} category="health" />}
          />
          <Route
            exact path='/science'
            element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="science" pageSize={this.pageSize} category="science" />}
          />
          <Route
            exact path='/general'
            element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={this.pageSize} category="general" />}
          />
          <Route
            exact path='/entertainment'
            element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize={this.pageSize} category="entertainment" />}
          />
          <Route
            exact path='/bussiness'
            element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="bussiness" pageSize={this.pageSize} category="bussiness" />}
          />

        </Routes>
      </Router>



    )
  }
}
