import React, {Component} from 'react'
import { getStoryList } from '../services/HttpService'
import ListItem from './ListItem'
import SecondThirdStoryItem from './SecondThirdStoryItem'
import SiteHelpers from '../services/SiteHelpers'

class ArticleList extends Component {

  constructor(props) {
    super(props)

    this.state={
      error: false,
      loading: true,
      stories: [],
      offset: 0
    }
  }

  componentWillMount() {
    var self=this

    this.getStoryList(0)

    window.addEventListener('scroll', SiteHelpers.debounce(this.handleOnScroll.bind(this), 200));
  }

  getStoryList(offset) {
    var self = this

    getStoryList(this.props.section, offset)
    .then( (data) => {

      const updatedData = this.state.stories.concat(data)

      self.setState({
        stories: updatedData,
        loading: false,
        offset: offset
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

    if (scrolledToBottom && this.props.section !== ('politics' || 'nyregion') ) {

      this.setState({loading: true})

      const updatedOffset = this.state.offset+10
      this.getStoryList(updatedOffset)
    }
  }

  renderTopStories() {
    const titleStories = this.state.stories.slice(1,3)
    const topStory = this.state.stories[0]

    const secondThirdStories = titleStories.map( (story, index) => {

    story.published_date = SiteHelpers.formatDate(story.published_date)

      return (
          <SecondThirdStoryItem story={story} key={index}/>
        )
    })

    return (
      <div className='top-stories-container' style={styles.topStoriesStyle}>
        <div className='top-list-item' style={styles.topListItemStyle}>
          <div className= 'title-and-image-container' style={styles.titleImageContainerStyle}>

            <div className='title-container' style={styles.titleContainerStyle}>
              <div className='title 3-lines' style={styles.titleStyle}>
                {topStory.title}
              </div>

              <div className='byline' style={{textTransform: 'capitalize'}}>
                {topStory.byline}
                <br />
                {SiteHelpers.formatDate(topStory.published_date)}
              </div>
            </div>

            <div className='story-image'>
              <img style={styles.thumbnailStyle} src={topStory.thumbnail_standard} />
            </div>

          </div>

          <div className='body-text-container' style={styles.bodyTextContainerStyle}>
            <div className='story-body-text'>
              {topStory.abstract}
            </div>
          </div>

        </div>

        <div className='second-third-story-container'>
          {secondThirdStories}
        </div>
      </div>
    )
  }

  renderStoryList() {
    var storyList = this.state.stories.map( (story, index) => {
      let thumbnail = story.thumbnail_standard ? story.thumbnail_standard : '../../images/not-available.jpg'
      if (index > 2) {
        return (
          <ListItem
            thumbnail={thumbnail}
            title={story.title}
            body={story.abstract}
            byline={story.byline}
            date={story.published_date}
            url={story.url}
            key={index}
            handleArticleClick={this.props.handleArticleClick}
          />
        )
      }
    })

    return <div>{storyList}</div>
  }

  render() {
    let content = null

    if (this.state.stories.length > 0) {
      content = (
        <div>
          <div> {this.renderTopStories()} </div>
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


const styles={
  topListItemStyle: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid black',
    width: '75%',
    margin: '10px',
  },
  titleImageContainerStyle:{
    display: 'flex',
    alignItems: 'flexStart',
    justifyContent: 'space-between',
    backgroundColor: 'gray',
    padding: '10px'
  },
  titleStyle: {
    fontSize: '20px',
    fontWeight: 'bold',
    display: 'block'
  },
  topStoriesStyle: {
    display: 'flex',
  },
  bodyTextContainerStyle: {
    backgroundColor: 'white',
    padding: '10px',
    'minHeight': '80px'
  },
    thumbnailStyle: {
    height: '100px',
    paddingLeft: '10px'
  },
    titleContainerStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  }

}
export default ArticleList
