import React, { Component } from "react";
import NewsItem from "../NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pagesize: 8,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string,
  };

  capatilizeFirstLetter = (string) => {
    return string.charaAt(0).toUpperCase() + string.slice(1);
  };
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults:0,
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )}-NewsMonkey`;
  }
  async updatenews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5acb7e998460498180951be99b95a033&page=${this.state.page}&pageSize=${this.props.pagesize}`;
    let data = await fetch(url);
    let parseddata = await data.json();
    this.setState({
      articles: parseddata.articles,
      totalResults: parseddata.totalResults,
      loading:false,
     
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updatenews();
  }
  handelPrevClick = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updatenews();
  };

  handelNextClick = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updatenews();
  };
  
  fetchMoreData = async () => {
   
   const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pagesize}`;
   this.setState({page:this.state.page+1})
   let data = await fetch(url);
   let parseddata = await data.json();
   this.setState({
     articles: this.state.articles.concat(parseddata.articles),
     totalResults: parseddata.totalResults,
     
    
   })
  };
  render() {
    return (
      <div className="container my-3 ">
        <h1 className="text-center" style={{ margin: "30px 0px", marginTop:'90px' }}>
          {" "}
          NewsMonkey-Top {this.capitalizeFirstLetter(this.props.category)}{" "}
          Headlines
        </h1>
        {/*this.state.loading && <Spinner />*/}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
         <div className="row">
          {this.state.articles.map((elements) => {
              return (
                <div className="col-md-4" key={elements.url}>
                  <NewsItem
                    title={elements.title ? elements.title : ""}
                    description={
                      elements.description ? elements.description : ""
                    }
                    imageurl={elements.urlToImage}
                    newsurl={elements.url}
                    author={elements.author}
                    date={elements.publishedAt}
                    source={elements.source.name}
                  />
                </div>
               
              );
            })}
        </div>
        </div>
        </InfiniteScroll>
      </div>
    );
  }
}

export default News;
