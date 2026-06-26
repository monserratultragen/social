const API_BASE = import.meta.env.VITE_API_URL || '/api';

async function postJSON(url, data) {
  const res = await fetch(`${API_BASE}${url}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

async function fetchJSON(url) {
  const res = await fetch(`${API_BASE}${url}`);
  if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`);
  return res.json();
}

function resolveImage(item) {
  if (!item) return '';
  return item.image || item.avatar || item.cover || item.hero || '';
}

export async function fetchProfile() {
  const data = await fetchJSON('/monserrat-perfil/');
  if (data.length === 0) return null;
  const p = data[0];
  return {
    name: p.name || 'Monserrat',
    fullName: p.full_name || 'Monserrat García',
    tagline: p.tagline || '',
    bio: p.bio || '',
    avatar: resolveImage({ avatar_url: p.avatar_url, avatar: p.avatar }),
    hero: resolveImage({ hero_url: p.hero_url, hero: p.hero }),
    location: p.location || '',
    birthday: p.birthday || '',
    email: p.email || '',
    recuerdosPassword: p.recuerdos_password || 'monserrat2024',
    recuerdosBannerUrl: resolveImage({ image_url: p.recuerdos_banner_url, image: p.recuerdos_banner }),
    cardNovelasImg: p.card_novelas_img || '',
    cardDesktopImg: p.card_desktop_img || '',
    stats: {
      fotos: p.stats_fotos || 0,
      amigos: p.stats_amigos || 0,
      recuerdos: p.stats_recuerdos || 0,
      albumes: p.stats_albumes || 0,
    },
  };
}

export async function fetchPosts() {
  const data = await fetchJSON('/monserrat-posts/');
  return data.map((p) => ({
    id: p.id,
    image: resolveImage(p),
    date: p.date || '',
    location: p.location || '',
    description: p.description || '',
  }));
}

export async function fetchAlbums() {
  const data = await fetchJSON('/monserrat-albumes/');
  return data.map((a) => ({
    id: a.id,
    title: a.title || '',
    cover: resolveImage(a),
    cover_orientation: a.cover_orientation || 'horizontal',
    count: a.count || 0,
    comentario: a.comentario || '',
    photos: (a.photos || []).map((photo) => resolveImage(photo)),
  }));
}

export async function fetchRecuerdos() {
  const data = await fetchJSON('/monserrat-recuerdos/');
  return data.map((r) => ({
    id: r.id,
    image: resolveImage(r),
    title: r.title || '',
    date: r.date || '',
    fotos: (r.fotos || []).map(f => resolveImage(f)),
  }));
}

export async function fetchRecuerdoFotos(recuerdoId) {
  const data = await fetchJSON(`/monserrat-recuerdo-fotos/?recuerdo=${recuerdoId}`);
  return data.map(f => resolveImage(f));
}

export async function fetchFavoritos() {
  const data = await fetchJSON('/monserrat-favoritos/');
  return data.map((f) => ({
    id: f.id,
    image: resolveImage(f),
    title: f.title || '',
    type: f.item_type || 'Foto',
    secondlife_url: f.secondlife_url || '',
    comentario: f.comentario || '',
    rating: f.rating || '',
  }));
}

export async function validarClaveMaestra(clave) {
  try {
    const res = await postJSON('/validar-clave-maestra/', { clave });
    return res.valida === true;
  } catch {
    return false;
  }
}

export async function fetchGuestbookEntries() {
  const data = await fetchJSON('/libro-visitas/');
  return data.map((e) => ({
    id: e.id,
    nombre: e.nombre || '',
    fecha: e.fecha || '',
    mensaje: e.mensaje || '',
  }));
}

export async function fetchHackConfig() {
  const data = await fetchJSON('/hack-config/');
  return data.length > 0 ? data[0] : null;
}
