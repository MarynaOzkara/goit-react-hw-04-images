import { Component } from "react";
import css from './Searchbar.module.css';
import { BiSearchAlt } from 'react-icons/bi';


class Searchbar extends Component{
  state = {
     query: '',
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const {query} = this.state;
    const searchQuery = query.trim();
    if(!searchQuery){
      return alert(`Type your query to start serch images!`);
    }
    this.props.createSearchQuery(searchQuery);
    // console.log(searchQuery);
    e.target.reset();
  }
  handleChange = ({currentTarget: {value}}) => {
     this.setState({query: value})
  }
    render(){
        return (
          <header className={css.header}>
            <form className={css.searchForm} onSubmit={this.handleSubmit}>
                <input className={css.searchInput} onChange={this.handleChange} 
                       type="text"
                       value={this.query}
                       autoComplete="off"
                       autoFocus
                       placeholder="Search images and photos" />
                <button className={css.searchButton} type="submit">
                    <BiSearchAlt size={20} />
                </button>
            </form>
          </header>
        )
    }
};
export default Searchbar;