import { Component } from "react";
import { createPortal } from "react-dom";
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
      }
    
      componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
      }
      
      handleKeyDown = e => {
        if (e.code === 'Escape') {
          this.props.onClose();
        }
      };

      handleClickBackdrop = e => {
        if (e.target === e.currentTarget) {
          this.props.onClose();
        }
      };
    
          
 render(){
    const {image, tags} = this.props;
    return createPortal(
       <div className={css.backDrope} onClick={this.handleClickBackdrop}>
          <div className={css.modal}>
            <img src={image} alt={tags} />
          </div>
       </div>, 
       modalRoot
    );
 }
}
 export default Modal;