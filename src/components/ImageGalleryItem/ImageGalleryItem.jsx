import css from './ImageGalleryItem.module.css';
import React, { useState } from 'react';
import { Modal } from 'components/Modal/Modal';

export const ImageGalleryItem = picture => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    isModalOpen ? setIsModalOpen(false) : setIsModalOpen(true);
  };

  const {
    image: { webformatURL, largeImageURL, tags },
  } = picture;

  return (
    <li className={css.imageGalleryItem}>
      <img
        onClick={toggleModal}
        className={css.imageGalleryItemImage}
        src={webformatURL}
        alt={tags}
      />
      {isModalOpen && (
        <Modal closeModal={toggleModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </li>
  );
};
