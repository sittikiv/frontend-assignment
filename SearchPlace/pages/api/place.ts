import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'
import { Place } from 'interfaces/place'


const apiKey: string = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || ''
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Place[] | any>) {
  const { searchText } = req.query;
  const params = {
    input: searchText || 'ร้านอาหารใกล้ฉัน',
    inputtype: 'textquery',
    type: ['restaurant', 'ร้านอาหาร'],
    language: 'th',
    key: apiKey
  }
  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json`, {params: params});
    const places = response.data.results.map((place: Place) => ({
      ...place,
      ...{
        photoUrl: getPhotoUrl(place?.photos?.[0]?.photo_reference, apiKey),
        mapsLink: getGoogleMapsLink(place.geometry.location.lat, place.geometry.location.lng)
      }
    })).sort((a: Place, b: Place) => b.rating - a.rating);
    res.status(200).json(places);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
}

function getPhotoUrl(photoReference: string | undefined, apiKey: string) {
  if (photoReference) {
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`;
  }
  return ''
}

function getGoogleMapsLink(latitude: number, longitude: number): string {
  return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
}