import React, {Component} from 'react'
import SiteHelpers from '../services/SiteHelpers'

class ListItem extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { thumbnail, title, body, byline, date, url, handleArticleClick } = this.props;

    return (
      //I opted for an anchor tag because NYT does not let you Iframe their articles.
      //This is less than ideal but given the time I had for the project I thought this was a fine tradeoff
      <a style={styles.anchorTagStyle} target='_blank' href={url}><div className='list-item' style={styles.listItemStyle}>
        <div className= 'title-and-image-container' style={styles.titleAndImageStyles}>

          <div className='story-image'>
            <img style={styles.thumbnailStyle} src={thumbnail} />
          </div>

          <div className='story-text' style={styles.storyTextStyle}>
            <div className='title 1-line' style={styles.titleStyle}>
              {title}
            </div>

            <div className='story-body-text 2-lines'>
              {body}
            </div>
            <div className='byline' style={styles.bylineStyle}>{byline}
              <br />
              {SiteHelpers.formatDate(date)}
            </div>
          </div>
        </div>
      </div>
      </a>
    )
  }
}

const styles = {
  listItemStyle: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid black',
    width: '100%',
    margin: '20px 0',
    minHeight: '120px',
    padding: '10px',
    boxSizing: 'border-box'

     // justifyContent: 'center'
  },
  titleAndImageStyles: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  titleStyle: {
    fontSize: '20px',
    fontWeight: 'bold',
    display: 'block',
    paddingBottom: '20px'
  },
  anchorTagStyle: {
    textDecoration: 'none',
    color: 'black'
  },
  bylineStyle: {
    color: 'gray'
  },
  thumbnailStyle: {
    height: '100px',
    widht: '100px',
    paddingRight: '10px'
  },
  storyTextStyle: {
    alignSelf: 'flex-start'
  }
}

export default ListItem
