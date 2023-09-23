import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({webformatURL, tags, largeImageURL, openModal}) => (
  <li className={css.galleryItem} onClick={() => openModal(largeImageURL, tags)}>
      <img className={css.galleryImage} 
          src={webformatURL} 
          alt={tags}/>
  </li>

)
ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
  largeImageURL: PropTypes.string,
  openModal: PropTypes.func,
  
}
export default ImageGalleryItem;