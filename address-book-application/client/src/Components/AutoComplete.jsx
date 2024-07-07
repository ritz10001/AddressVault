import React, { useEffect, useRef } from 'react';

const Autocomplete = ({ onPlaceSelected, ...props }) => {
  const autocompleteRef = useRef(null);

  useEffect(() => {
    const autocomplete = new window.google.maps.places.Autocomplete(autocompleteRef.current, {
      types: ['address'],
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      onPlaceSelected(place);
    });
  }, [onPlaceSelected]);

  return <input ref={autocompleteRef} {...props} />;
};

export default Autocomplete;
