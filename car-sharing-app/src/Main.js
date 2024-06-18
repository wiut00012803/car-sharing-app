import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// main component for the app
function Main() {
  // set base URL for axios
  axios.defaults.baseURL = "http://localhost:3001";

  // state to hold the list of cars for rent
  const [carsForRent, setCarsForRent] = useState([]);
  // state to hold new car details
  const [newCar, setNewCar] = useState({
    make: "",
    model: "",
    year: "",
    location: "",
    pricePerDay: "",
    seller: "",
    features: [],
  });
  // state to hold the selected image file
  const [selectedImage, setSelectedImage] = useState(null);

  // function to fetch cars from the server
  const fetchCars = async () => {
    try {
      const response = await axios.get("/api/cars");
      setCarsForRent(response.data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  // fetch cars on component mount
  useEffect(() => {
    fetchCars();
  }, []);

  // function to add a new car for rent
  const addCarForRent = async () => {
    try {
      const formData = new FormData();
      formData.append("image", selectedImage);
      formData.append("make", newCar.make);
      formData.append("model", newCar.model);
      formData.append("year", newCar.year);
      formData.append("location", newCar.location);
      formData.append("pricePerDay", newCar.pricePerDay);
      formData.append("seller", newCar.seller);
      formData.append("features", newCar.features.join(","));

      await axios.post("/api/cars", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // fetch updated list of cars
      fetchCars();
      // reset form fields
      setNewCar({
        make: "",
        model: "",
        year: "",
        location: "",
        pricePerDay: "",
        seller: "",
        features: [],
      });
      setSelectedImage(null);
    } catch (error) {
      console.error("Error adding car:", error);
    }
  };

  // handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  return (
    <div className="App">
      <header className="App-header">
        <nav className="navigation">
          <ul>
            <li>
              <a href="#get-a-car" className="button">
                Get a Car
              </a>
            </li>
            <li>
              <a href="#rent-out" className="button">
                Rent Out
              </a>
            </li>
            <li>
              <Link to="/login" className="button">
                Log In
              </Link>
            </li>
            <li>
              <Link to="/personal" className="button">
                Personal Cabinet
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <section className="App-section" id="rent-out">
        <h2 className="section-heading">Rent Out</h2>
        <form className="rent-out-form">
          <div className="form-group">
            <label htmlFor="make" className="label">
              Make:
            </label>
            <input
              type="text"
              id="make"
              name="make"
              value={newCar.make}
              onChange={(e) => setNewCar({ ...newCar, make: e.target.value })}
              className="input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="model" className="label">
              Model:
            </label>
            <input
              type="text"
              id="model"
              name="model"
              value={newCar.model}
              onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
              className="input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="year" className="label">
              Year:
            </label>
            <select
              id="year"
              name="year"
              value={newCar.year}
              onChange={(e) => setNewCar({ ...newCar, year: e.target.value })}
              className="input"
              required
            >
              {Array.from(
                { length: 100 },
                (_, i) => new Date().getFullYear() - i
              ).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="location" className="label">
              Location:
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={newCar.location}
              onChange={(e) =>
                setNewCar({ ...newCar, location: e.target.value })
              }
              className="input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="pricePerDay" className="label">
              Price Per Day:
            </label>
            <div className="price-buttons">
              <button
                type="button"
                onClick={() => setNewCar({ ...newCar, pricePerDay: "10" })}
              >
                $10
              </button>
              <button
                type="button"
                onClick={() => setNewCar({ ...newCar, pricePerDay: "15" })}
              >
                $15
              </button>
              <button
                type="button"
                onClick={() => setNewCar({ ...newCar, pricePerDay: "25" })}
              >
                $25
              </button>
              <button
                type="button"
                onClick={() => setNewCar({ ...newCar, pricePerDay: "50" })}
              >
                $50
              </button>
            </div>
            <input
              type="number"
              id="pricePerDay"
              name="pricePerDay"
              value={newCar.pricePerDay}
              onChange={(e) =>
                setNewCar({ ...newCar, pricePerDay: e.target.value })
              }
              className="input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="seller" className="label">
              Seller:
            </label>
            <input
              type="text"
              id="seller"
              name="seller"
              value={newCar.seller}
              onChange={(e) => setNewCar({ ...newCar, seller: e.target.value })}
              className="input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="features" className="label">
              Features (comma-separated):
            </label>
            <input
              type="text"
              id="features"
              name="features"
              value={newCar.features.join(",")}
              onChange={(e) =>
                setNewCar({ ...newCar, features: e.target.value.split(",") })
              }
              className="input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="image" className="label">
              Car Image:
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="input"
            />
          </div>

          <button
            type="button"
            onClick={addCarForRent}
            className="submit-button"
          >
            Add Car
          </button>
        </form>
      </section>

      <section className="App-section" id="get-a-car">
        <h2 className="section-heading">Available Cars for Rent Out</h2>
        <ul className="car-list">
          {carsForRent.map((car) => (
            <li key={car.id} className="car-item">
              <div className="car-details">
                <img
                  src={`data:image/png;base64,${car.image}`}
                  alt={`${car.make} ${car.model}`}
                  className="car-image"
                />
                <div className="ca-info">
                  <div>
                    <strong>
                      {car.make} {car.model} ({car.year})
                    </strong>
                  </div>
                  <div>
                    <span>Location: {car.location}</span>
                    <br />
                    <span>Price Per Day: ${car.pricePerDay}</span>
                    <br />
                    <span>Seller: {car.seller}</span>
                    <br />
                    <span>Features: {car.features.join(", ")}</span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Main;