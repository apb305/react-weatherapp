import React from "react";

function Attribution() {
  return (
    <div>
      <div className="container mt-5 text-center">
        <div className="row">
          <div className="col">
            <p className="text-center">
              API Powered by:
              <a
                href="https://openweathermap.org/api"
                target="noopener noreferrer"
              >
                {" "}
                Weather API - OpenWeatherMap
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Attribution;
