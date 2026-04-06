const { db } = require('../config/firebase');

const mediaCol = db.collection('media');

const addMedia = async (data) => {
  const newMedia = {
    ...data,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  const docRef = await mediaCol.add(newMedia);
  return { id: docRef.id, ...newMedia };
};

const getMediaByProgram = async (programId) => {
  const snapshot = await mediaCol.where('program', '==', programId).get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const deleteMedia = async (id) => {
  await mediaCol.doc(id).delete();
  return true;
};

const deleteMediaByProgram = async (programId) => {
  const snapshot = await mediaCol.where('program', '==', programId).get();
  const batch = db.batch();
  snapshot.docs.forEach(doc => {
    batch.delete(doc.ref);
  });
  await batch.commit();
  return true;
};

module.exports = {
  addMedia,
  getMediaByProgram,
  deleteMedia,
  deleteMediaByProgram
};
