import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { fetchImages } from '../api/api';
import { Notify } from 'notiflix';
import { STATUSES } from 'constants/constants';
import { useEffect, useState } from 'react';

export const App = () => {
  const [status, setStatus] = useState(STATUSES.idle);
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [isModal, setIsModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const onSubmit = query => {
    if (query !== '') {
      setQuery(query);
      setPage(1);
      setImages([]);
    }
  };

  const onLoadHandle = () => {
    setPage(state => state + 1);
  };

  const onSelectedPhoto = url => {
    setSelectedPhoto(url);
    setIsModal(true);
  };

  const handleCloseModal = () => {
    setIsModal(false);
  };

  useEffect(() => {
    if (!query) return;

    const searchImages = async () => {
      try {
        setStatus(STATUSES.pending);
        const { totalHits, hits } = await fetchImages(query, page);
        if (hits.length === 0) {
          Notify.failure('There is no images with this query');
          setStatus(STATUSES.idle);
          return;
        }
        setStatus(STATUSES.resolved);
        setImages(state => [...state, ...hits]);
        setTotalHits(totalHits);
      } catch (err) {
        setStatus(STATUSES.rejected);
        Notify.failure(err.message);
      }
    };
    searchImages();
  }, [query, page]);

  const showMore = status === STATUSES.resolved && images.length !== totalHits;
  return (
    <>
      <SearchBar onSubmit={onSubmit} />
      <ImageGallery images={images} modalUrl={onSelectedPhoto} />
      {status === STATUSES.pending && <Loader />}
      {showMore && <Button loadMore={onLoadHandle} />}
      {isModal && <Modal url={selectedPhoto} closeModal={handleCloseModal} />}
    </>
  );
};
