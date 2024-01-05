import css from './ImageGalleryItem.module.css';
import React, { Component } from 'react';
import { Modal } from 'components/Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  toggleModal = () => {
    this.setState(({ isModalOpen }) => ({ isModalOpen: !isModalOpen }));
  };

  render() {
    const {
      image: { webformatURL, largeImageURL, tags },
    } = this.props;
    const { isModalOpen } = this.state;
    return (
      <li className={css.imageGalleryItem}>
        <img
          onClick={this.toggleModal}
          className={css.imageGalleryItemImage}
          src={webformatURL}
          alt={tags}
        />
        {isModalOpen && (
          <Modal closeModal={this.toggleModal}>
            <img src={largeImageURL} alt={tags} />
          </Modal>
        )}
      </li>
    );
  }
}
