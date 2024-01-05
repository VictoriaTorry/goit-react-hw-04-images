import css from './Modal.module.css';
import { createPortal } from 'react-dom';
import React, { Component } from 'react';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = e => {
    const { closeModal } = this.props;
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  render() {
    const { closeModal, children } = this.props;
    return createPortal(
      <div className={css.overlay} onClick={closeModal}>
        <div className={css.modal}>{children}</div>
      </div>,
      modalRoot
    );
  }
}
