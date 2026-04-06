const { db } = require('../config/firebase');
const slugify = require('slugify');

const programsCol = db.collection('programs');

const createProgram = async (data) => {
  let baseSlug = slugify(data.name, {
    lower: true,
    strict: true,
    remove: /[*+~.()'"!:@]/g
  });
  
  let slug = baseSlug;
  let counter = 1;
  
  // Ensure slug uniqueness
  let slugExists = true;
  while (slugExists) {
    const snapshot = await programsCol.where('slug', '==', slug).get();
    if (snapshot.empty) {
      slugExists = false;
    } else {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
  }

  const newProgram = {
    ...data,
    slug,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const docRef = await programsCol.add(newProgram);
  return { id: docRef.id, ...newProgram };
};

const getAllPrograms = async () => {
  const snapshot = await programsCol.orderBy('date', 'desc').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const getProgramById = async (id) => {
  const doc = await programsCol.doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() };
};

const getProgramBySlug = async (slug) => {
  const snapshot = await programsCol.where('slug', '==', slug).limit(1).get();
  if (snapshot.empty) return null;
  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() };
};

const updateProgram = async (id, data) => {
  const docRef = programsCol.doc(id);
  const updateData = {
    ...data,
    updatedAt: new Date()
  };
  await docRef.update(updateData);
  const updatedDoc = await docRef.get();
  return { id: updatedDoc.id, ...updatedDoc.data() };
};

const deleteProgram = async (id) => {
  await programsCol.doc(id).delete();
  return true;
};

module.exports = {
  createProgram,
  getAllPrograms,
  getProgramById,
  getProgramBySlug,
  updateProgram,
  deleteProgram
};
