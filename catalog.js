import sharp from 'sharp';

const roundedCorners = new Buffer(
  '<svg><rect x="0" y="0" width="200" height="200" rx="50" ry="50"/></svg>'
);

const roundedCornerResizer =
  sharp()
    .resize(200, 200)
    .overlayWith(roundedCorners, { cutout: true })
    .png();

readableStream
  .pipe(roundedCornerResizer)
  .pipe(writableStream);
