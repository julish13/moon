function initMap() {
  const LOCATION = { lat: 59.938891, lng: 30.323037 };

  const map = new google.maps.Map(document.querySelector('#map'), {
    zoom: 14,
    center: LOCATION,
    disableDefaultUI: true,
  });
}
