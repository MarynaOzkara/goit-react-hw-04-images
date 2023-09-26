import { useEffect } from "react";
import { createPortal } from "react-dom";
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({image, tags, onClose}) => {
  useEffect(() =>{
  const handleKeyDown = e => {
              if (e.code === 'Escape') {
                onClose();
              }
            };
   window.addEventListener('keydown', handleKeyDown);
   return () => {
    window.removeEventListener('keydown', handleKeyDown); 
   }          
  }, [onClose])

 const handleClickBackdrop = e => {
            if (e.target === e.currentTarget) {
              onClose();
            }
    };

  return createPortal(
    <div className={css.backDrope} onClick={handleClickBackdrop}>
       <div className={css.modal}>
         <img src={image} alt={tags} />
       </div>
    </div>, 
    modalRoot
 );
}
// export class Modal extends Component {

//     componentDidMount() {
//         window.addEventListener('keydown', this.handleKeyDown);
//       }
    
//       componentWillUnmount() {
//         window.removeEventListener('keydown', this.handleKeyDown);
//       }
      
//       handleKeyDown = e => {
//         if (e.code === 'Escape') {
//           this.props.onClose();
//         }
//       };

//       handleClickBackdrop = e => {
//         if (e.target === e.currentTarget) {
//           this.props.onClose();
//         }
//       };
    
          
//  render(){
//     const {image, tags} = this.props;
//     return createPortal(
//        <div className={css.backDrope} onClick={this.handleClickBackdrop}>
//           <div className={css.modal}>
//             <img src={image} alt={tags} />
//           </div>
//        </div>, 
//        modalRoot
//     );
//  }
// }
 export default Modal;