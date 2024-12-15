import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes, { string } from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    static defaultProps = {
        country: "us",
        pageSize: 8,
        category: "general",
    };
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    };
    capatilizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0,
        };
        document.title = `${this.capatilizeFirstLetter(
            this.props.category
        )} - InstaNews`;
    }

    async updateNews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false,
        });
        this.props.setProgress(100);
    }

    async componentDidMount() {
        this.updateNews();
    }

    handleNext = async () => {
        this.setState({ page: this.state.page + 1 });
        this.updateNews();
    };

    handlePrevious = async () => {
        this.setState({ page: this.state.page - 1 });
        this.updateNews();
    };

    fetchMoreData = async () => {
        // this.setState({ page: this.state.page + 1 });

        // const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3ab08fa88904425a86d428ba1cca4553&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true });
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // console.log(parsedData);
        // this.setState({
        //     articles: this.state.articles.concat(parsedData.articles),
        //     totalResults: parsedData.totalResults,
        //     loading: false,
        // });
        if (this.state.articles.length >= this.state.totalResults) {
            return; // Stop fetching if all articles are loaded
        }
    
        const nextPage = this.state.page + 1;
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${nextPage}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
    
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            page: nextPage,
        });
    };

    render() {
        return (
            
                <>
                    <h1 className="text-center" style={{margin:'35px 0px'}}>
                        Insta News - Top {this.capatilizeFirstLetter(this.props.category)}{" "}
                        Headlines
                    </h1>

                    {/* {this.state.loading && <Spinner/>}  */}
                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length < this.state.totalResults}
                        loader={<Spinner/>}
                    >
                        <div className="container">
                            <div className="row">
                                {this.state.articles.map((element) => {
                                    return (
                                        <div className="col-md-4" key={element.url}>
                                            <NewsItem
                                                title={element.title ? element.title.slice(0, 45) : ""}
                                                description={
                                                    element.description
                                                        ? element.description.slice(0, 88)
                                                        : ""
                                                }
                                                imgurl={element.urlToImage}
                                                newsUrl={element.url}
                                                author={element.author ? element.author : "Unknown"}
                                                date={element.publishedAt}
                                                source={element.source.name}
                                            />

                                            {/* <NewsItem  title={element.title} description={element.title} imgurl={element.urlToImage} newsUrl={element.url}/>  */}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </InfiniteScroll>
                    {/* <div className="container d-flex justify-content-between">
            <button
              disabled={this.state.page <= 1}
              type="button"
              onClick={this.handlePrevious}
              className="btn btn-dark"
            >
              &larr; Previous
            </button>
            <button
              type="button"
              disabled={
                this.state.page + 1 >
                Math.ceil(this.state.totalResults / this.props.pageSize)
              }
              onClick={this.handleNext}
              className="btn btn-dark"
            >
              Next &rarr;{" "}
            </button>
          </div> */}
                
                </>   
        )
    }
}

export default News;
