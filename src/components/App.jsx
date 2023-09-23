import { Component } from "react";
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from "./Button/Button";
import {getImages} from '../api/pixabay-api';
import Loader from "./Loader/Loader";
import Modal from "./Modal/Modal";


export class App extends Component {
  state = {
      query: '',
      page: 0,
      images: null,
      totalImages: 0,
      totalPages: 0,
      showModal: false,
      error: false,
      isLoading: false,
      currrentImage: null,
      currentTags: null,
      
  }

  componentDidUpdate(prevProps, prevState){
    const {query, page} = this.state;

    if(prevState.query !== query) {
      
      getImages(query)
      .then(({hits, totalHits}) => {
        if(!totalHits){
          alert ('We didn find any matches! Try to type another query')
          return;
        }
        this.setState(({isLoading}) => ({isLoading: !isLoading}));
        const imagesArray = hits.map(hit => ({
          id: hit.id,
          webformatURL: hit.webformatURL,
          tags: hit.tags,
          largeImageURL: hit.largeImageURL,
        }));
        this.setState({
          page: 1,
          images: imagesArray,
          totalImages: totalHits,
          totalPages: Math.ceil(totalHits / 12), 
        })
        
      })   
      .catch(error => this.setState({ error }))  
      .finally(() => this.setState(({isLoading}) => ({isLoading: !isLoading})))
    };
   
    if(prevState.page !== page && page !== 1) {

      this.setState(({isLoading}) => ({isLoading: !isLoading}));

      getImages(query, page)
      .then(({hits}) => {
       
        const imagesArray = hits.map(hit => ({
          id: hit.id,
          webformatURL: hit.webformatURL,
          tags: hit.tags,
          largeImageURL: hit.largeImageURL,
        }));
        this.setState(({images}) => ({
          images: [...images, ...imagesArray],
        }))
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState(({isLoading}) => ({isLoading: !isLoading})))
    }
  }

createSearchQuery = (searchQuery) =>{
    console.log(searchQuery);
    this.setState({
      query: searchQuery, 
    })
  }
loadMoreImages = () => {
    this.setState(({page}) => ({page: page + 1}))
  }
toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };
openModal = (largeImageURL, tags) => {
   
    this.setState(({showModal}) => ({
      showModal: !showModal,
      currrentImage: largeImageURL,
      currentTags: tags,
    }))
  }
render() {
  const {images, showModal, isLoading, currrentImage, currentTags, totalPages, page} = this.state;
 console.log(totalPages);
  return (
    <>
    <Searchbar createSearchQuery={this.createSearchQuery}/>
    {images && <ImageGallery images={images} openModal={this.openModal}/>}
    {isLoading && <Loader/>}
    {page > 0 && totalPages !== page && <Button loadMoreImages={this.loadMoreImages}/>}
     
     
     {showModal && <Modal onClose={this.toggleModal} image={currrentImage} tags={currentTags}/>}
    
     
  </>
  )

}
}
 

 
