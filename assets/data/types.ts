export type Track = {
  id: string;
  name: string;
  preview_url?: string | null;
  external_urls: Spotify;
  album: Album;
  artists: Artist[];
};
export type Spotify = {
  spotify: string;
};
export type Album = {
  id: string;
  name: string;
  images: Image[];
};
export type Artist = {
  id: string;
  name: string;
  images?: Image[];
};

export type Image = {
  url: string;
  height?: number;
  width?: number;
};
