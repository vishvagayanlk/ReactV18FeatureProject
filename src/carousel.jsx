import { Component } from "react";

class Carousel extends Component {
  state = {
    active: 0,
  };
  static default = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;
    const handleIndexClick = (event) => {
      this.setState({
        active: +event.target.dataset.index,
      });
    };
    return (
      <div className="carousel">
        <img src={images[active]} alt="animal" />
        <div className="carousel-smaller">
          {images.map((photo, index) => (
            // eslint-disable-next-line
            <img
              onClick={handleIndexClick}
              key={photo}
              src={photo}
              className={index === active ? "active" : ""}
              alt="animal thumbnail"
              data-index={index}
            />
          ))}
        </div>
      </div>
    );
  }
}
export default Carousel;
