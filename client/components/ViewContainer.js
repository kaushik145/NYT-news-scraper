import React, {Component} from 'react'
import ArticleList from './ArticleList'



class ViewContainer extends Component {

  constructor(props) {
    super(props)

    this.state={
      view: 'articleList',
      articleUrl: ''
    }
  }

  handleArticleClick(url) {
    this.setState({
      view: 'fullArticle',
      articleUrl: url
    })
  }

 render() {
  const {view, articleUrl} = this.state

  return(
    <div className='ViewContaienr'>

      {view === 'articleList' &&
        <ArticleList
          section={this.props.section}
          handleArticleClick={this.handleArticleClick.bind(this)}
        />}
      {view === 'fullArticle' && <iframe src={this.state.articleUrl} allowFullScreen/>}
    </div>
    )
 }
}

export default ViewContainer
