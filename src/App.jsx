import { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Inicio from './components/Inicio';
import Perfil from './components/Perfil';
import Galerias from './components/Galerias';
import Recuerdos from './components/Recuerdos';
import Favoritos from './components/Favoritos';
import Contacto from './components/Contacto';
import Guestbook from './components/Guestbook';
import CoffeeSupport from './components/CoffeeSupport';
import PhotoViewer from './components/PhotoViewer';
import Footer from './components/Footer';
import * as api from './services/api';
import { posts as fallbackPosts, albums as fallbackAlbums, recuerdos as fallbackRecuerdos, favoritos as fallbackFavoritos, user as fallbackUser, guestbookEntries as fallbackGuestbook } from './data/monserratData';

function isHacked(mode) {
  if (mode === 'always') return true;
  const now = new Date();
  if (mode === 'odd_hour') return now.getHours() % 2 === 1;
  if (mode === 'odd_day') return now.getDate() % 2 === 1;
  return false;
}
import './App.css';

function App() {
  const [user, setUser] = useState(fallbackUser);
  const [posts, setPosts] = useState(fallbackPosts);
  const [albums, setAlbums] = useState(fallbackAlbums);
  const [recuerdos, setRecuerdos] = useState(fallbackRecuerdos);
  const [favoritos, setFavoritos] = useState(fallbackFavoritos);
  const [guestbookEntries, setGuestbookEntries] = useState(fallbackGuestbook);
  const [hackActive, setHackActive] = useState(false);
  const [hackConfig, setHackConfig] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const [viewerImages, setViewerImages] = useState(null);
  const [viewerIndex, setViewerIndex] = useState(0);

  useEffect(() => {
    async function load() {
      try {
        const [profileData, postsData, albumsData, recuerdosData, favoritosData, guestbookData] =
          await Promise.all([
            api.fetchProfile(),
            api.fetchPosts(),
            api.fetchAlbums(),
            api.fetchRecuerdos(),
            api.fetchFavoritos(),
            api.fetchGuestbookEntries(),
          ]);

        if (profileData) setUser(profileData);
        if (postsData.length > 0) setPosts(postsData);
        if (albumsData.length > 0) setAlbums(albumsData);
        if (recuerdosData.length > 0) setRecuerdos(recuerdosData);
        if (favoritosData.length > 0) setFavoritos(favoritosData);
        if (guestbookData.length > 0) setGuestbookEntries(guestbookData);
        const hackData = await api.fetchHackConfig();
        if (hackData) {
          setHackConfig(hackData);
          setHackActive(isHacked(hackData.hack_mode));
        }
      } catch (err) {
        console.warn('API no disponible, usando datos de respaldo:', err);
      }
      setLoaded(true);
    }
    load();
  }, []);

  const openViewer = useCallback((image, allImages, currentItem) => {
    const all = allImages || [image];
    const flat = all.map((item) => (typeof item === 'string' ? item : item.image)).filter(Boolean);
    const idx = currentItem ? flat.findIndex((img) => img === image) : 0;
    setViewerImages(flat);
    setViewerIndex(Math.max(0, idx));
  }, []);

  const closeViewer = useCallback(() => {
    setViewerImages(null);
  }, []);

  const cfg = hackConfig?.config || {};
  const tickerMsg = cfg.ticker_text || 'SITIO HACKEADO';
  const tickerFull = `${tickerMsg}  —  ${cfg.hack_signature || 'Renegados de Ultragen'}`;

  return (
    <div className={`app${hackActive ? ' hack-mode' : ''}`}>
      {!hackActive && (
        <Navbar hiddenSections={[
          ...(albums.length === 0 ? ['galerias'] : []),
          ...(favoritos.length === 0 ? ['favoritos'] : []),
        ]} />
      )}
      <Hero user={user} hackActive={hackActive} hackConfig={hackConfig} />
      {!hackActive && posts.length > 0 && <Inicio posts={posts} onImageClick={openViewer} />}
      <Perfil user={user} hackActive={hackActive} hackConfig={hackConfig} />
      {!hackActive && <CoffeeSupport />}
      {!hackActive && albums.length > 0 && <Galerias albums={albums} />}
      {hackActive && recuerdos.length > 0 && <Recuerdos recuerdos={recuerdos} hackConfig={hackConfig} password={user.recuerdosPassword} bannerUrl={user.recuerdosBannerUrl} />}
      {!hackActive && favoritos.length > 0 && <Favoritos favoritos={favoritos} />}
      {!hackActive && <Guestbook entries={guestbookEntries} />}
      {!hackActive && <Contacto />}
      <Footer />

      {hackActive && (
        <>
          <div className="hack-ticker-top">
            <div className="hack-ticker-inner">{tickerFull}  —  {tickerFull}  —  {tickerFull}  —  {tickerFull}  —  {tickerFull}  —  {tickerFull}  —  {tickerFull}  —  {tickerFull}  —  {tickerFull}  —  {tickerFull}</div>
          </div>
          <div className="hack-ticker-bottom">
            <div className="hack-ticker-inner">{tickerFull}  —  {tickerFull}  —  {tickerFull}  —  {tickerFull}  —  {tickerFull}  —  {tickerFull}  —  {tickerFull}  —  {tickerFull}  —  {tickerFull}  —  {tickerFull}</div>
          </div>
        </>
      )}

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
