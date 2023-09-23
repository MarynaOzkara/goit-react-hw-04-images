import { useState } from "react";
import css from './Searchbar.module.css';
import { BiSearchAlt } from 'react-icons/bi';

const Searchbar = ({onSubmit}) => {
  const [query, setQuery] = useState('');

const handleChange = ({currentTarget: {query}}) => setQuery(query)
        

const handleSubmit = (e) => {
        e.preventDefault();
        
        const searchQuery = query;
        if(!searchQuery){
          return alert(`Type your query to start serch images!`);
        }
        onSubmit(searchQuery);
        setQuery(query);
        // console.log(searchQuery);
        // e.target.reset();
      }
  return (
    <header className={css.header}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
          <input className={css.searchInput} onChange={handleChange} 
                 type="text"
                 value={query}
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

// class Searchbar extends Component{
//   state = {
//      query: '',
//   }
//   handleSubmit = (e) => {
//     e.preventDefault();
//     const {query} = this.state;
//     const searchQuery = query.trim();
//     if(!searchQuery){
//       return alert(`Type your query to start serch images!`);
//     }
//     this.props.createSearchQuery(searchQuery);
//     // console.log(searchQuery);
//     e.target.reset();
//   }
//   handleChange = ({currentTarget: {value}}) => {
//      this.setState({query: value})
//   }
//     render(){
//         return (
//           <header className={css.header}>
//             <form className={css.searchForm} onSubmit={this.handleSubmit}>
//                 <input className={css.searchInput} onChange={this.handleChange} 
//                        type="text"
//                        value={this.query}
//                        autoComplete="off"
//                        autoFocus
//                        placeholder="Search images and photos" />
//                 <button className={css.searchButton} type="submit">
//                     <BiSearchAlt size={20} />
//                 </button>
//             </form>
//           </header>
//         )
//     }
// };
export default Searchbar;
