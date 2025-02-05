import React from 'react'
import PropTypes from 'prop-types'

function ImageGrid({ images }) {
  return (
    <div className="gallery">
        {images?.map((image, index) => (
            <img key={image.link} src={image.link} alt={`Imagem-${index}`} className={image.middle ? "middle" : ""} />
        ))}
    </div>
  )
}

ImageGrid.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string.isRequired,
      middle: PropTypes.bool
    })
  ).isRequired
}

export default ImageGrid