const modelOptions = {
  toJSON: {
    virtuals: true, // Inclusion des champs virtuels (définis mais non stockés dans la BDD) dans la repésentation JSON
    transform: (_, obj) => {
      delete obj._id
      return obj
    }, // Transformation du document avant conversion en JSON pour supprimer l'_id pour ne pas l'exposer
  },
  toObject: {
    virtuals: true,
    transform: (_, obj) => {
      delete obj._id
      return obj
    },
  },
  versionKey: false, // Désactivation de l'ajout auto du champ de version dans la BDD
  timestamps: true, // Activation des horodatages de création et d'update de documents
}

export default modelOptions
