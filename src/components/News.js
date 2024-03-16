import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News =(props)=> {
    const[articles, setArticles] = useState([])
    const[loading, setLoading] = useState(true)
    
    const[page, setPage] = useState(1)
    const[totalResults, setTotalResults] = useState(0)

    
 const updateNews =async ()=>{

    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=60c33f36084847b5a2b570c4776f9423&page=1&pageSize=${props.pageSize}`;
setLoading(true)
    let data = await fetch(url);
  
    let parsedData = await data.json()
  setArticles(parsedData.articles)
  setTotalResults(parsedData.totalResults)
  setLoading(false)

  

}
useEffect(() =>{
    updateNews();
}, [])


    
     const handlePrevClick = async ()=>{
        setPage(page-1)

        updateNews();
    }
    
      const handleNextClick = async ()=>{
    setPage(page+1)
    updateNews();
        }

      const fetchMoreData = async() => {
            setPage(page+1)
          let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=60c33f36084847b5a2b570c4776f9423&page=1&pageSize=${props.pageSize}`;
          let data = await fetch(url);
          let parsedData = await data.json()
          setArticles(articles.concat (parsedData.articles))
          setTotalResults(parsedData.totalResults)
       
          };
     
        return (
            <>   <h1 className="text-center" style={{margin: '35px 0px',marginTop:'90px'}}>NewsMonkey - Top Headlines</h1>
             
                <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles!==totalResults}
          loader={<Spinner/>}
        >
            <div className="container">       
             <div className="row"> 
                { articles.map((element) => (
    <div className="col-md-4" key={element.url}>
        <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
    </div>
))}
        



</div>  </div>
                 </InfiniteScroll>
        
            </>
             
        )
                }

News.defaultProps = {
    country: 'in',
    category: 'general',
  }

  News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number, 
    category: PropTypes.string,
  }


export default News