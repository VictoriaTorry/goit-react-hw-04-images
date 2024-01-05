import { Searchbar } from 'components/Searchbar/Searchbar';
import css from './App.module.css';
import { Loader } from 'components/Loader/Loader';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Component } from 'react';
import { fetchCards } from 'utils/fetch-api';
import Notiflix from 'notiflix';

export class App extends Component {
  state = {
    searchQuery: '',
    page: null,
    images: [],
    isLoad: false,
    totalHits: null,
  };

  componentDidUpdate(_, prevState) {
    const { page, searchQuery } = this.state;
    if (searchQuery !== prevState.searchQuery || page !== prevState.page) {
      this.setState({
        isLoad: true,
      });

      fetchCards(searchQuery, page)
        .then(({ data: { hits, totalHits } }) => {
          if (!totalHits) {
            Notiflix.Notify.info('Nothing found for your request!');
            return;
          }
          this.setState(prevState => ({
            images: [...prevState.images, ...hits],
            totalHits: totalHits,
          }));
        })
        .catch(error => {
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          console.log(error);
          return;
        })
        .finally(() => {
          this.setState({ isLoad: false });
        });
    }
  }

  changePage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  onSubmit = value => {
    this.setState({
      searchQuery: value,
      page: 1,
      images: [],
      totalHits: null,
    });
  };

  render() {
    const { images, isLoad, totalHits } = this.state;
    const isEndOfCollection = totalHits > images.length;

    return (
      <div className={css.container}>
        <Searchbar onSubmit={this.onSubmit} />
        {!!images.length && <ImageGallery pictures={images} />}
        {!isLoad && isEndOfCollection ? (
          <Button onChange={this.changePage}>Load more</Button>
        ) : null}
        {isLoad && <Loader />}
      </div>
    );
  }
}
