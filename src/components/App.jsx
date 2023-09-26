import { useEffect, useState } from "react";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from './ImageGallery/ImageGallery';
import Button from "./Button/Button";
import {getImages} from '../api/pixabay-api';
import Loader from "./Loader/Loader";
import Modal from "./Modal/Modal";

const App =() => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currrentImage, setCurrentImage] = useState(null);
  const [currentTags, setCurrentTags] = useState(null);
  

 const createSearchQuery = (searchQuery) =>{
        // console.log(searchQuery);
        setQuery(searchQuery);
        setPage(1);
        setImages([]);
      }


const loadMoreImages = () => {
  setPage(prevPage => prevPage + 1);
  setIsLoading(true);
  
}

const openModal = (largeImageURL, tags) => {
  setShowModal(true);
  setCurrentImage(largeImageURL);
  setCurrentTags(tags);
}

const toggleModal = () => {
    setShowModal(false);
}
useEffect(() =>{
  const fetchImages = async () => {
    try{
       setIsLoading(true);
       const {hits, totalHits} = await getImages(query, page);
         if(!totalHits){
                  alert ('We didn find any matches! Try to type another query')
                  return;}
       const imagesArray = hits.map(hit => ({
                  id: hit.id,
                  webformatURL: hit.webformatURL,
                  tags: hit.tags,
                  largeImageURL: hit.largeImageURL,
                }));
        
        setTotalPages(Math.ceil(totalHits / 12));       
        setImages(prevImages => [...prevImages, ...imagesArray]);       
      //  console.log(hits);
      //  console.log(totalHits);
    } catch (error) {
         console.log(error.message);
         alert ('Sorry, something went wrong! Try again later!')
    } finally {
      setIsLoading(false);
    }
  
  }
       query && page && fetchImages();
     
      }, [query, page])
      
  return (
    <>
    <Searchbar createSearchQuery={createSearchQuery}/>
    {images && <ImageGallery images={images} openModal={openModal}/>}
    {isLoading && <Loader/>}
    {images.length > 0 && totalPages !== page && <Button loadMoreImages={loadMoreImages}/>}
     
     
     {showModal && <Modal onClose={toggleModal} image={currrentImage} tags={currentTags}/>}
    
     
  </>
  )
}
export default App;

 

 
