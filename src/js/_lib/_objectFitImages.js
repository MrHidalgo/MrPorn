

/**
 * @name initObjectFitImages
 *
 * @description Polyfill object-fit/object-position on <images>
 */
const initObjectFitImages = () => {
  const objFitImages = document.querySelectorAll('.object-fit');

  objectFitImages(objFitImages);
};
