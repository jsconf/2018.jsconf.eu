function getImageFilename(data, ext) {
  let filename = data.id;

  return filename + '.' + ext;
}

module.exports = {getImageFilename};
