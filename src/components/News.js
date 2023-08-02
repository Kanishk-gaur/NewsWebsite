import React, { Component } from 'react'
import NewsItem from '../NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'



export class News extends Component {
  
  static defaultProps={
    country:'in',
    pagesize:8,
    category:'general'
  } 
  static propTypes={
    country:PropTypes.string,
    pagesize:PropTypes.number,
    category:PropTypes.string
  } 

  constructor(){
    super();
    
    this.state={
      articles:[],
      loading:false,
      page:1
    }
  }
  async componentDidMount(){
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5acb7e998460498180951be99b95a033&page=1&pageSize=${this.props.pagesize}`;
    let data= await fetch(url);
    let parseddata=await data.json()
    this.setState({articles:parseddata.articles,totalResults:parseddata.totalResults})

  }
   handelPrevClick= async ()=>{
    console.log("prev");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5acb7e998460498180951be99b95a033&page=${this.state.page - 1}&pageSize=${this.props.pagesize}}`;
    this.setState({loading:true});
    let data= await fetch(url);
    let parseddata=await data.json()
 
    this.setState({
     page:this.state.page+1,
     articles:parseddata.articles,
     loading:false
    })
   }

   handelNextClick= async ()=>{
     console.log("next");
     if(!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pagesize))){

  
     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5acb7e998460498180951be99b95a033&page=${this.state.page + 1}&pageSize=${this.props.pagesize}`;
     this.setState({loading:true});
     let data= await fetch(url);
     let parseddata=await data.json()
  
     this.setState({
      page:this.state.page+1,
      articles:parseddata.articles,
      loading:false
     })
    }
   }

  render() {
    return (
      
         <div className="container my-3 ">
          <h1 className="text-center">NewsMonkey-Top Headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
        {!this.state.loading &&  this.state.articles.map((elements)=>{
             return <div className="col-md-4" key={elements.url}>
            <NewsItem  title={elements.title?elements.title:""} description={elements.description?elements.description:""} imageurl={elements.urlToImage} newsurl={elements.url} />
         </div>
         })}
       </div>
       <div className="container d-flex justify-content-between">
       <button disabled={this.state.page<=1} type="button" class="btn btn-dark" onClick={this.handelPrevClick}>&larr; Previous</button>
       <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pagesize )} type="button" className="btn btn-dark" onClick={this.handelNextClick}>Next &rarr;</button> 
       </div>
      </div>
    )
  }
}

export default News
