import React, {Component} from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Link
} from 'react-router-dom'
import ViewContainer from './ViewContainer'
import SearchList from './SearchList'

injectTapEventPlugin();

const Home = () => (
  <div>
    <ViewContainer
      section={'all'}
    />
  </div>
)

const World = () => (
  <div>
    <ViewContainer
      section={'world'}
    />
  </div>
)

const US = () => (
  <div>
    <ViewContainer
      section={'u.s.'}
    />
  </div>
)

const Politics = () => (
  <div>
    <ViewContainer
      section={'politics'}
    />
  </div>
)

const NY = () => (
  <div>
    <ViewContainer
      section={'nyregion'}
    />
  </div>
)

const More = () => (
  <div>
    <h2>Coming Soon</h2>
  </div>
)

const Search = ({match}) => (
  <div>

    <SearchList searchQuery={match.params.searchQuery} />
  </div>
  )

class App extends Component {
  constructor(props) {
    super(props)

    this.state={
      searchQuery: ""
    }
  }

  onSearchChange(e) {
    this.setState({searchQuery: e.target.value})
  }

  render() {

    return (
      <Router>
        <div>
          <div className='site-content'>
          <div className='nyt-header' style={styles.nytHeaderStyle}>
            <div className='left'/>
            <div className='center-header'>The Times</div>
            <form id="searchbox" action="">
              <input id="search" type="text" placeholder="search" onChange={this.onSearchChange.bind(this)} />
              <Link to={`/search/${this.state.searchQuery}`}><input id="submit" type="submit" value="Search" /></Link>
            </form>
          </div>
          <div className='sections-header' style={styles.sectionsHeaderStyle}>
            <NavLink exact style={styles.linkStyle} activeStyle={styles.activeLinkStyle} to="/">Home</NavLink>
            <NavLink style={styles.linkStyle} activeStyle={styles.activeLinkStyle} to="/world">World</NavLink>
            <NavLink style={styles.linkStyle} activeStyle={styles.activeLinkStyle} to="/us">US</NavLink>
            <NavLink style={styles.linkStyle} activeStyle={styles.activeLinkStyle} to="/politics">Politics</NavLink>
            <NavLink style={styles.linkStyle} activeStyle={styles.activeLinkStyle} to="/ny">NY</NavLink>
            <NavLink style={styles.linkStyle} activeStyle={styles.activeLinkStyle} to="/more">More</NavLink>
          </div>
            <Route exact path="/" component={Home}/>
            <Route path="/world" component={World}/>
            <Route path="/us" component={US}/>
            <Route path="/politics" component={Politics}/>
            <Route path="/ny" component={NY}/>
            <Route path="/more" component={More}/>
            <Route path="/search/:searchQuery" component={Search}/>

          </div>
          <a href='http://developer.nytimes.com'><img src='../../images/nyt-data.png'/></a>
        </div>
      </Router>
    )
  }
}

const styles={
  nytHeaderStyle: {
    height: '40px',
    backgroundColor: 'gray',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionsHeaderStyle: {
    display: 'flex',
    justifyContent: 'space-around',
    height: '40px',
    alignItems: 'center',
    borderBottom: '1px solid gray'
  },
  linkStyle: {
    textDecoration: 'none',
    color: 'gray',
    width: '16%',
    textAlign: 'center',
    paddingBottom: '5px',
  },
  activeLinkStyle: {
    borderBottom: '3px solid blue'
  }
}
export default App
