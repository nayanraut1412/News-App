import React, { Component } from 'react'

export class NewsItem extends Component {
    
  render() {
    let {title,description,imgurl,newsUrl,author,date,source} = this.props;
    return (
      <div className="my-3">
        <div className="card">
          <div style={{display:'flex' , justifyContent:'flex-end',position:'absolute',right:'0' }}>
            <span className='badge rounded-pill bg-danger'>{source}</span>
          </div>
            <img src={!imgurl?"https://s.yimg.com/ny/api/res/1.2/8U50tI24U5F0krifdmm5UA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD04MDA-/https://s.yimg.com/os/creatr-uploaded-images/2024-11/23ddc6d0-a39b-11ef-aef6-3b7ac258a521":imgurl} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title} <span className='badge bg-secondary'>New</span></h5>
                <p className="card-text">{description}</p>
                <p className="card-text"><small className="text-muted">By {author} on {new Date(date).toGMTString()} </small></p>
                <a rel='noreferrer' href={newsUrl} target='blank' className="btn btn-sm btn-dark">Read More</a>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
