const companyLocation = () => {
  var axios = require("axios");

  var config = {
    method: "get",
    url: "https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJN1t_tDeuEmsRUsoyG83frY4&fields=name%2Crating%2Cformatted_phone_number&key=YOUR_API_KEY",
    headers: {},
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });

  return (
    <div>
      <div>
        <p>Company location</p>
        <p>12345 Fairfax Rd</p>
        <p>Fairfax VA 22032</p>
      </div>
    </div>
  );
};

export default companyLocation;
