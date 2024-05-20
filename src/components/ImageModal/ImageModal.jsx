import Modal from 'react-modal';
import css from './ImageModal.module.css'

Modal.setAppElement('#root');

export default function ImageModal({ isOpen, onClose, content: {likes, alt_descriotion, urls:{regular, raw},},}) {
    return (
        <Modal className={css.content} overlayClassName={css.overlay} isOpen={isOpen} onRequestClose={onClose}>
            <>
                <img className={css.img} src={regular} alt={alt_descriotion} />
                <div className={css.info}>
                    <p>Likes: {likes}</p>
                    <a className={css.link} href={raw} download={`${alt_descriotion}.jpg`} target="_blank" rel="noopener noreferrer"> ready for download</a>
                </div>
            </>
        </Modal>
    )
}