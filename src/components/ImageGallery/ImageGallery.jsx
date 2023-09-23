import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';


const ImageGallery = ({images, openModal}) => (
      <ul className={css.gallery}>{
        images.map(({id, webformatURL, tags, largeImageURL}) =>(
           <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                tags={tags}
                largeImageURL={largeImageURL}
                openModal={openModal}
           />
        ))}
      </ul>
)
ImageGallery.propTypes = {
   images: PropTypes.arrayOf(
    PropTypes.shape({
        id: PropTypes.number,
        webformatURL: PropTypes.string,
        tags: PropTypes.string,
        largeImageURL: PropTypes.string,
    })
   ),
   openModal: PropTypes.func,
}
export default ImageGallery;