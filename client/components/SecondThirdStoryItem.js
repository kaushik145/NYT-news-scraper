import React, {Component} from 'react'

class SecondThirdStoryItem extends Component {

  constructor(props) {
    super(props)
  }

  render(){

    const {story} = this.props

    return(
      <div className='second-third-story' style={styles.secondThirdStoryStyle}>
        <div className='title 3-lines' style={styles.titleStyle}> {story.title}</div>

        <div className='byline' style={styles.bylineStyle}>{story.byline} <br /> {story.published_date}</div>
      </div>
      )
  }
}

const styles = {
  titleStyle: {
    fontSize: '20px',
    fontWeight: 'bold',
    display: 'block'
  },
  secondThirdStoryStyle:{
    height: '90px',
    border: '1px solid black',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: '10px',
    padding: '10px'
  },
    bylineStyle:{
      color: 'gray'
    }
}

export default SecondThirdStoryItem
