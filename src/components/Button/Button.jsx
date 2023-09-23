import css from './Button.module.css';
import PropTypes from 'prop-types';

const Button = ({loadMoreImages}) => (
    <button type="button" className={css.loadMore} onClick={loadMoreImages}>
        Load more
    </button>
)
Button.propTypes = {
    loadMoreImages: PropTypes.func,
}
export default Button;