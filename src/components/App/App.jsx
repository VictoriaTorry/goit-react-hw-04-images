import { Searchbar } from 'components/Searchbar/Searchbar';
import css from './App.module.css';
import { Loader } from 'components/Loader/Loader';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { useState, useEffect } from 'react';
import { fetchCards } from 'utils/fetch-api';
import Notiflix from 'notiflix';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(null);
  const [images, setImages] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const [totalHits, setTotalHits] = useState(null);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    
    fetchCards(searchQuery, page)
      .then(({ data: { hits, totalHits } }) => {
        if (!totalHits) {
          Notiflix.Notify.info('Nothing found for your request!');
          return;
        }
        setImages(prevImages => [...prevImages, ...hits]);
        setTotalHits(totalHits);
      })
      .catch(error => {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        console.log(error);
        return;
      })
      .finally(() => {
        setIsLoad(false);
      });
  }, [searchQuery, page]);

  const changePage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const onSubmit = value => {
    setSearchQuery(value);
    setPage(1);
    setImages([]);
    setTotalHits(null);
    setIsLoad(true);
  };

  const isEndOfCollection = totalHits > images.length;

  return (
    <div className={css.container}>
      <Searchbar onSubmit={onSubmit} />
      {isLoad && <Loader />}
      {!!images.length && <ImageGallery pictures={images} />}
      {!isLoad && isEndOfCollection ? (
        <Button onChange={changePage}>Load more</Button>
      ) : null}
      {isLoad && <Loader />}
    </div>
  );
};
