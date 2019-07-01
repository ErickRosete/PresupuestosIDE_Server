const DataLoader = require("dataloader");
const Material = require("../../models/material");
const AuxMaterial = require("../../models/aux-material")
const MaterialGroup = require("../../models/material-group");

//material
const materialLoader = new DataLoader(materialIds => {
  return getMaterials(materialIds);
});

const getMaterials = async materialIds => {
  try {
    const materials = await Material.find({ _id: { $in: materialIds } });
    return materials.map(material => {
      return { ...material._doc };
    });
  } catch (err) {
    throw err;
  }
};

//material
const auxMaterialLoader = new DataLoader(auxMaterialIds => {
  return getAuxMaterials(auxMaterialIds);
});

const getAuxMaterials = async auxMaterialIds => {
  try {
    const auxMaterials = await AuxMaterial.find({ _id: { $in: auxMaterialIds } });
    return auxMaterials.map(auxMaterial => {
      return { ...auxMaterial._doc };
    });
  } catch (err) {
    throw err;
  }
};


//materialGroup
const materialGroupLoader = new DataLoader(materialGroupIds => {
  return getMaterialGroups(materialGroupIds);
});

const getMaterialGroups = async materialGroupIds => {
  try {
    const materialGroups = await MaterialGroup.find({ _id: { $in: materialGroupIds } });
    return materialGroups.map(materialGroup => {
      return transformMaterialGroup(materialGroup);
    });
  } catch (err) {
    throw err;
  }
};

//transform
const transformMaterialGroup = async materialGroup => {
  return {
    ...materialGroup._doc,
    auxMaterials: () => auxMaterialLoader.loadMany(
      materialGroup.auxMaterials.map((auxMaterial) => auxMaterial.toString())
    )
  };
};

const transformConcept = async concept => {
  return {
    ...concept._doc,
    materialGroups: () => materialGroupLoader.loadMany(
      concept.materialGroups.map((materialGroup) => materialGroup.toString())
    )
  };
};

exports.transformMaterialGroup = transformMaterialGroup;
exports.transformConcept = transformConcept;
exports.auxMaterialLoader = auxMaterialLoader;
