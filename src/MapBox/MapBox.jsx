import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapBox = () => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoibWFub2hhcnB1bGx1cnUiLCJhIjoiY2xyeHB2cWl0MWFkcjJpbmFuYXkyOTZzaCJ9.AUGHU42YHgAPtHjDzdhZ7g';

    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [0, 0],
        zoom: 2, // Start with a zoom level that shows a larger area
      });

      const geolocate = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      });

      map.addControl(geolocate);

      map.on('load', () => {
        geolocate.trigger();
      });

      geolocate.on('geolocate', (e) => {
        const userLng = e.coords.longitude;
        const userLat = e.coords.latitude;

        map.setCenter([userLng, userLat]);
        map.setZoom(14);

        // Add a marker to indicate user's location
        new mapboxgl.Marker()
          .setLngLat([userLng, userLat])
          .addTo(map);
      });

      map.on('click', (e) => {
        console.log('Latitude: ' + e.lngLat.lat + ' Longitude: ' + e.lngLat.lng);
      });

      setMap(map);
    };

    if (!map) {
      initializeMap({ setMap, mapContainer: 'map' });
    }

    return () => {
      if (map) map.remove();
    };
  }, [map]);

  return <div id="map" style={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }} />;
};

export default MapBox;
