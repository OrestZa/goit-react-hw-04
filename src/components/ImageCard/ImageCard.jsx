import css from './ImageCard.module.css'

export default function ImageCard({ image, onOpenModal }) {
    return (
      <ul>
        <li>
          <img
            className={css.image}
            src={image.urls.small}
            alt={image.urls.description}
            onClick={() => onOpenModal(image)}
          />
        </li>
      </ul>
    );
}