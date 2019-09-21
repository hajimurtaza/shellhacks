const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
var latlng = {};
const bcrypt = require('bcrypt');
const basicAuth = require('basic-auth');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyDH4iCbjY6S2V0mWOeZK69chDgx8uGYHeU'
});
// // googleMapsClient.geocode({
// //   // address: '1600 Amphitheatre Parkway, Mountain View, CA'
// // }, function (err, response) {
// //   if (!err) {
// //     console.log(response.json.results);
// //   }
// //   else{
// //     console.log(err);
// //   }
// // });
// // console.log that your server is up and running


// create a GET route
app.post('/get_location', (req, res, callback) => {
  googleMapsClient.geolocate({}, (error, response) => {
    if (!error) {
      console.log("inside get location");
      console.log(response.json);
      latlng = response.json;
      getZipcode(latlng.location.lat, latlng.location.lng, (zipcodeJSON) => {
        console.log("zipcode final" + zipcodeJSON)
        res.send(zipcodeJSON);
      });
    }
    else {
      console.log(error);
    }
  })
  // res.send({ express: "get location complete" });
});

app.post('/get_difference', (req, res, callback) => {
  console.log(req.body.origin[0]);
  var origin = req.body.origin[0] + ',' + req.body.origin[1];
  console.log(origin);
  var destination = req.body.destination[0] + ',' + req.body.destination[1];
  googleMapsClient.distanceMatrix({
    origins: origin,
    destinations: destination,
    units: "metric"
  }, (error, response) => {
    if (!error) {
      console.log("inside get distance");
      console.log(JSON.stringify(response.json));
    }
    else {
      console.log(error);
    }
  });
  res.send("difference calculated");
});
// app.post('/get_zip', (req, res)=>{
//   googleMapsClient.geolocate({
//     // address: '1600 Amphitheatre Parkway, Mountain View, CA'
//   }, 
//    function (err, response) {
//     if (!err) {
//       console.log('geo')
//       // console.log(response.json);
//       // latlng = response.json;
//       // latlng =location;
//       // console.log(latlng)
//       // console.log(latlng.lat);
//       // console.log(latlng.lng);
//       let lat = '40.714224'; 
//       // latlng.location.lat;
//       let lng = '-73.961452';
//       // latlng.location.lng;

//     }
//     else {
//       console.log(err);
//     }
//   })
//   // console.log(latlng);

//   // console.log("before zipcode");

//   res.status(200).end();

// });
// // , function (err, res) {
// //   if (!err) {
// //     console.log('ending post request');
// //     res.status(200).end();
// //   }
// //   else {
// //     console.log(err);
// //   }
// // });

function getZipcode(lat, lng, callback) {
  console.log("entered zipcode");
  console.log(lat);
  googleMapsClient.reverseGeocode({
    latlng: [lat, lng]
    // address: '1600 Amphitheatre Parkway, Mountain View, CA'
  }, function (err, response) {
    if (!err) {
      console.log("completed zipcode")
      console.log(response.json.results[0].address_components[4].long_name);
      callback(response.json.results[0].address_components[4].long_name)
    }
    else {
      console.log(err);
    }
  });
}