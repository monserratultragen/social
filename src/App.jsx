import { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Inicio from './components/Inicio';
import Perfil from './components/Perfil';
import Galerias from './components/Galerias';
import Recuerdos from './components/Recuerdos';
import Favoritos from './components/Favoritos';
import Contacto from './components/Contacto';
import PhotoViewer from './components/PhotoViewer';
import Footer from './components/Footer';
import * as api from './services/api';
import { posts as fallbackPosts, albums as fallbackAlbums, recuerdos as fallbackRecuerdos, favoritos as fallbackFavoritos, user as fallbackUser } from './data/monserratData';
import './App.css';

function App() {
  const [user, setUser] = useState(fallbackUser);
  const [posts, setPosts] = useState(fallbackPosts);
  const [albums, setAlbums] = useState(fallbackAlbums);
  const [recuerdos, setRecuerdos] = useState(fallbackRecuerdos);
  const [favoritos, setFavoritos] = useState(fallbackFavoritos);
  const [loaded, setLoaded] = useState(false);

  const [viewerImages, setViewerImages] = useState(null);
  const [viewerIndex, setViewerIndex] = useState(0);

  useEffect(() => {
    async function load() {
      try {
        const [profileData, postsData, albumsData, recuerdosData, favoritosData] =
          await Promise.all([
            api.fetchProfile(),
            api.fetchPosts(),
            api.fetchAlbums(),
            api.fetchRecuerdos(),
            api.fetchFavoritos(),
          ]);

        if (profileData) setUser(profileData);
        if (postsData.length > 0) setPosts(postsData);
        if (albumsData.length > 0) setAlbums(albumsData);
        if (recuerdosData.length > 0) setRecuerdos(recuerdosData);
        if (favoritosData.length > 0) setFavoritos(favoritosData);
      } catch (err) {
        console.warn('API no disponible, usando datos de respaldo:', err);
      }
      setLoaded(true);
    }
    load();
  }, []);

  const openViewer = useCallback((image, allImages, currentItem) => {
    const all = allImages || [image];
    const idx = currentItem
      ? all.findIndex((item) => (item.image || item) === image)
      : 0;
    const flat = all.map((item) => (item.image || item));
    setViewerImages(flat);
    setViewerIndex(Math.max(0, idx));
  }, []);

  const closeViewer = useCallback(() => {
    setViewerImages(null);
  }, []);

  return (
    <div className="app">
      <Navbar hiddenSections={[
        ...(albums.length === 0 ? ['galerias'] : []),
        ...(recuerdos.length === 0 ? ['recuerdos'] : []),
        ...(favoritos.length === 0 ? ['favoritos'] : []),
      ]} />
      <Hero user={user} />
      {posts.length > 0 && <Inicio posts={posts} onImageClick={openViewer} />}
      <Perfil user={user} />
      {albums.length > 0 && <Galerias albums={albums} />}
      {recuerdos.length > 0 && <Recuerdos recuerdos={recuerdos} password={user.recuerdosPassword} bannerUrl={user.recuerdosBannerUrl} />}
      {favoritos.length > 0 && <Favoritos favoritos={favoritos} />}
      <Contacto />
      <Footer />

      {viewerImages && (
        <PhotoViewer
          images={viewerImages}
          currentIndex={viewerIndex}
          onClose={closeViewer}
          onNavigate={setViewerIndex}
        />
      )}
    </div>
  );
}

export default App;
