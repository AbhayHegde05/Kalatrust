// driveUtils.js
function getDriveId(url) {
  const m = url.match(/[-\w]{25,}/);
  return m ? m[0] : null;
}

function makeEmbedUrl(driveLink, mediaType) {
  const id = getDriveId(driveLink);
  if (!id) return null;

  if (mediaType === 'drive-img') {
    return `https://drive.google.com/uc?export=view&id=${id}`;
  }
  if (mediaType === 'drive-video') {
    return `https://drive.google.com/file/d/${id}/preview`;
  }

  return null;
}

module.exports = { getDriveId, makeEmbedUrl };
