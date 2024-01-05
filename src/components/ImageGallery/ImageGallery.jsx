import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import { nanoid } from 'nanoid';

export const ImageGallery = ({ pictures }) => {
  return (
    <ul className={css.gallery}>
      {pictures.map(picture => (
        <ImageGalleryItem key={nanoid()} image={picture}></ImageGalleryItem>
      ))}
    </ul>
  );
};
