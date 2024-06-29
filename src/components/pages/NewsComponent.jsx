import React from 'react';

function NewsComponent({ news }) {
  if (!news || news.length === 0) {
    return null;
  }

  return (
    <div className="container">
      <h2 className="mt-4 mb-3">Latest News</h2>
      <div className="row">
        {news && news.articles && news.articles.length > 0 ? (
          news.articles.map((article, index) => (
            <div className="col-md-6" key={index}>
              <div className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title"><a href={article.url} target="_blank" rel="noopener noreferrer" className="text-decoration-none">{article.title}</a></h5>
                  <p className="card-text">{article.description}</p>
                  <p className="card-text"><small className="text-muted">Published at {new Date(article.publishedAt).toLocaleString()}</small></p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col">
            <p>No news available</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default NewsComponent;
