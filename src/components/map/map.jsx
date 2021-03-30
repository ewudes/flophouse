import React, {useEffect, useRef} from 'react';
import leaflet from 'leaflet';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {getActiveOffer, getOffer} from '../../store/selectors';

import "leaflet/dist/leaflet.css";

const STYLE = {
  height: `100%`
};

const Map = ({points, city, cardOption}) => {
  if (!points.length) {
    return null;
  }

  const mapRef = useRef();
  const activeOffer = useSelector(getActiveOffer);
  const offer = useSelector(getOffer);

  const cityLocation = points[0].city.location;

  useEffect(() => {
    mapRef.current = leaflet.map(`map`, {
      center: {
        lat: cityLocation.latitude,
        lng: cityLocation.longitude
      },
      zoom: cityLocation.zoom,
      scrollWheelZoom: false
    });

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(mapRef.current);

    return () => {
      mapRef.current.remove();
    };
  }, [city]);

  useEffect(() => {
    const pins = [];
    points.forEach((point) => {
      const isActiveOffer = activeOffer === point.id ? `./img/pin-active.svg` : `./img/pin.svg`;
      const isOpenedOffer = offer.id === point.id ? `./img/pin-active.svg` : `./img/pin.svg`;

      const customIcon = leaflet.icon({
        iconUrl: cardOption === `offer` ? isOpenedOffer : isActiveOffer,
        iconSize: [27, 39]
      });

      leaflet.marker({
        lat: point.location.latitude,
        lng: point.location.longitude
      },
      {
        icon: customIcon
      })
      .addTo(mapRef.current)
      .bindPopup(point.title);
    });
    const pinsGroup = leaflet.layerGroup(pins);
    mapRef.current.addLayer(pinsGroup);
    return () => {
      pinsGroup.clearLayers();
    };
  }, [activeOffer, points, city]);

  return (
    <div id="map" style={STYLE} ref={mapRef}></div>
  );
};

Map.propTypes = {
  points: PropTypes.arrayOf(PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    title: PropTypes.string.isRequired,
    city: PropTypes.objectOf.isRequired,
  })),
  city: PropTypes.string.isRequired,
  cardOption: PropTypes.string.isRequired
};

export default Map;
