
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import { fetchImg } from "../../image-api";
import ImageModal from "../ImageModal/ImageModal";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function App() {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }

    async function getImg() {
      try {
        setLoading(true);
        setError(false);

        const fetchedImg = await fetchImg(searchQuery, page);

        setImages(prevImages => {
          return [...prevImages, ...fetchedImg];
        });
        toast.success('HTTP success!:)');
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getImg();
  }, [searchQuery, page]);

  const handleSearch = newQuery => {
    setSearchQuery(newQuery);

    setPage(1);

    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const handleOpenModal = value => {
    setModalIsOpen(true);
    setModalContent(value);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {error && <ErrorMessage />}
      <Toaster position="bottom-center" />

      {images.length > 0 && (
        <ImageGallery images={images} onOpenModal={handleOpenModal} />
      )}
      <div
        style={{
          position: 'fixed',
          top: '10',
          left: '0',
          right: '0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {loading && <Loader />}
      </div>

      {images.length > 0 && <LoadMoreBtn onClick={handleLoadMore} />}

      {Object.keys(modalContent).length !== 0 && (
        <ImageModal
          isOpen={modalIsOpen}
          onClose={handleCloseModal}
          content={modalContent}
        />
      )}
    </div>
  );
}
