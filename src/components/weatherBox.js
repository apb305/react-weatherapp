import React from "react";

function weatherBox(props) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mx-auto mt-3">
        <h5 className="card-title mt-3">ReactJS Weather App</h5>
            <p>Written by Anthony Bernard Jr.</p>
            <p>See code for this project<a href="https://github.com/apb305" target="noopener noreferrer"> here</a></p>
          <div
            className="card rounded-1 bg-light shadow"
          >
            <div className="text-center">
              <div
                hidden={props.hideSpinner}
                className="spinner-border mb-3 mt-3"
                role="status"
              />
            </div>
            <div hidden={props.hideBody}>
              <h5 className="card-text mt-3">{props.location}</h5>
              <img hidden={props.hideImage}
                src={props.weatherPicture}
                style={{ width: "70px", height: "70px" }}
                alt="Weather Img"
              />
              <p className="card-text">{props.weatherDescription}</p>
              <p className="card-text">{props.temperature}</p>
              <p className="card-text">{props.humidity}</p>
              <form className="mt-2 mb-2" onSubmit={props.handleSubmit}>
              <div className="input-group">
              <div className="input-group-prepend mx-auto">
              <button className="btn btn-secondary rounded-0"><i className="fa fa-search"></i></button>
                <input type="text" name="zipCode" value={props.zipCode} className="form-control rounded-0" onChange={props.handleUserInput} placeholder="Enter City or Zip"></input>
          </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default weatherBox;