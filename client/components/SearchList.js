import React, {Component} from 'react'
import { getSearchList } from '../services/HttpService'
import ListItem from './ListItem'
import SiteHelpers from '../services/SiteHelpers'

class ArticleList extends Component {

  constructor(props) {
    super(props)

    this.state={
      error: false,
      loading: true,
      stories: [],
      page: 0
    }
  }

  componentWillMount() {
    var self=this

    this.getStoryList(0)

    window.addEventListener('scroll', SiteHelpers.debounce(this.handleOnScroll.bind(this), 200));

  }

  getStoryList(page) {
    var self = this

    getSearchList(this.props.searchQuery, page)
    .then( (data) => {

      const updatedData = this.state.stories.concat(data)

      self.setState({
        stories: updatedData,
        loading: false,
        page: page
      })

    })
    .catch( (err) => {

      console.log(err)
      alert('Error fetching stories')
      self.setState({error: true})
    })
  }

  handleOnScroll() {
    var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
    var clientHeight = document.documentElement.clientHeight || window.innerHeight;
    var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight - 250;

    if (scrolledToBottom) {

      this.setState({loading: true})

      const updatedPage = this.state.page+1
      this.getStoryList(updatedPage)
    }
  }

  componentWillReceiveProps(nextProps) {
    var self=this

    if(this.props.searchQuery !== nextProps.searchQuery) {
      getSearchList(this.props.searchQuery)
      .then( (data) => {
        self.setState({
          stories: data,
          loading: false
        })
      })
      .catch( (err) => {
        console.log(err)
        alert('Error fetching stories')
        self.setState({error: true})
      })
    }
  }

  renderStoryList() {
    var storyList = this.state.stories.map( (story, index) => {

      if (story.document_type !== 'article') {
        return null
      }

      const thumbnail = story.multimedia.length > 0 ? `https://www.nytimes.com/${story.multimedia[0].url}` : '../../images/not-available.jpg'
      const byline = byline ? byline.original : 'Author Unknown'
      return (
        <ListItem
          thumbnail={thumbnail}
          title={story.headline.main}
          body={story.lead_paragraph}
          byline={byline}
          date={story.pub_date}
          key={index}
          url={story.web_url}
          searchMode={true}
        />
      )
    })

    return(<div>{storyList}</div>)
  }

  render() {
    let content = null

    if (this.state.stories.length > 0) {
      content = (
        <div>
          <div> {this.renderStoryList()} </div>
        </div>
      )
    }

    return (
      <div className='ArticleList'>
        {content}
        {this.state.loading && 'loading...'}
      </div>
      )
  }
}

export default ArticleList
