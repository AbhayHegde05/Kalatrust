const { db } = require('../config/firebase');

const reviewsCol = db.collection('reviews');

const addReview = async (data) => {
  const newReview = {
    ...data,
    approved: data.approved !== undefined ? data.approved : true,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  const docRef = await reviewsCol.add(newReview);
  return { id: docRef.id, ...newReview };
};

const getReviewsByProgram = async (programId) => {
  const snapshot = await reviewsCol.where('program', '==', programId).where('approved', '==', true).orderBy('createdAt', 'desc').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const deleteReviewsByProgram = async (programId) => {
  const snapshot = await reviewsCol.where('program', '==', programId).get();
  const batch = db.batch();
  snapshot.docs.forEach(doc => {
    batch.delete(doc.ref);
  });
  await batch.commit();
  return true;
};

module.exports = {
  addReview,
  getReviewsByProgram,
  deleteReviewsByProgram
};
