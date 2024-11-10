import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Loading from './Loading';
import PropTypes from 'prop-types'

export default class News extends Component {
    static defaultProps ={
        pageSize : 8
    }
    static propTypes ={
        pageSize : PropTypes.number.isRequired,
        category : PropTypes.string,
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResult: 0
        };
        document.title = `${this.props.category} News`
    }

    apiCall = async()=>{
        this.props.setProgress(10)
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.props.page}&pagesize=${this.props.pageSize}`;
        this.setState({loading: true})
        let data = await fetch(url);
        this.props.setProgress(50)
        let parsedData = await data.json();
        this.props.setProgress(80)
        this.setState({
            articles: parsedData.articles,
            totalResult: parsedData.totalResults,
            loading: false
        });
        this.props.setProgress(100)
    }
    async componentDidMount() {
       this.apiCall();
    }
    handleNextClick = async () => {
        this.setState({page: this.state.page + 1});
        this.apiCall();
    }
    handlePreClick = async () => {
        this.setState({page: this.state.page - 1});
        this.apiCall();
    }

    render() {
        return (
            <div className="container my-3">
                <div className='text-center' style={{margin: `60px 0px`}}><h2>Top daily headlines of {`${this.props.category} news`}</h2></div>
                {this.state.loading && <Loading/>}
                 <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return (
                            <div className="col-md-4" key={element.url}>
                                <NewsItem
                                    title={element.title || ""}
                                    description={element.description || ""}
                                    imageUrl={element.urlToImage}
                                    newsUrl={element.url}
                                    author={element.author}
                                    date={element.publishedAt}
                                    source={element.source.name}
                                />
                            </div>
                        );
                    })}
                </div>
                <div className='container d-flex justify-content-between my-4'>
                    <button disabled={this.state.page <= 1} type="button" onClick={this.handlePreClick} className="btn btn-primary">Previous</button>
                    <button disabled={Math.ceil(this.state.totalResult/8)-this.state.page <= 0}type="button" onClick={this.handleNextClick} className="btn btn-primary">Next</button>
                </div>
            </div>
        );
    }
}
