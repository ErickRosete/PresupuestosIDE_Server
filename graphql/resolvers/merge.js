const DataLoader = require("dataloader");
const Material = require("../../models/material");
const AuxMaterial = require("../../models/aux-material");
const MaterialGroup = require("../../models/material-group");
const AuxMaterialGroup = require("../../models/aux-material-group");

//DataLoader
const auxMaterialGroupLoader = new DataLoader(auxMaterialGroupIds => {
  return getAuxMaterialGroups(auxMaterialGroupIds);
});

const getAuxMaterialGroups = async auxMaterialGroupIds => {
  try {
    const auxMaterialGroups = await AuxMaterialGroup.find({
      _id: { $in: auxMaterialGroupIds }
    });
    return auxMaterialGroups.map(auxMaterialGroup => {
      return transformAuxMaterialGroup(auxMaterialGroup);
    });
  } catch (err) {
    throw err;
  }
};

const materialGroupLoader = new DataLoader(materialGroupIds => {
  return getMaterialGroups(materialGroupIds);
});

const getMaterialGroups = async materialGroupIds => {
  try {
    const materialGroups = await MaterialGroup.find({
      _id: { $in: materialGroupIds }
    });
    return materialGroups.map(materialGroup => {
      return transformMaterialGroup(materialGroup);
    });
  } catch (err) {
    throw err;
  }
};

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

const auxMaterialLoader = new DataLoader(auxMaterialIds => {
  return getAuxMaterials(auxMaterialIds);
});

const getAuxMaterials = async auxMaterialIds => {
  try {
    const auxMaterials = await AuxMaterial.find({
      _id: { $in: auxMaterialIds }
    });
    return auxMaterials.map(auxMaterial => {
      return { ...auxMaterial._doc };
    });
  } catch (err) {
    throw err;
  }
};

//transform
const transformAuxMaterialGroup = async auxMaterialGroup => {
  console.log("auxMaterialGroup2")
  console.log(auxMaterialGroup)
  console.log("auxMaterialGroup2b")
  console.log(
    {
    ...auxMaterialGroup._doc,
    materialGroup: () =>
      materialGroupLoader.load(auxMaterialGroup.materialGroup.toString())
  }
)
  return     {
    ...auxMaterialGroup._doc,
    materialGroup: () =>
      materialGroupLoader.load(auxMaterialGroup.materialGroup.toString())
  }

};

const transformMaterialGroup = async materialGroup => {
  return {
    ...materialGroup._doc,
    auxMaterials: () =>
      auxMaterialLoader.loadMany(
        materialGroup.auxMaterials.map(auxMaterial => auxMaterial.toString())
      )
  };
};

const transformConcept = async concept => {
  return {
    ...concept._doc,
    auxMaterialGroups: () =>
      auxMaterialGroupLoader.loadMany(
        concept.auxMaterialGroups.map(auxMaterialGroup =>
          auxMaterialGroup.toString()
        )
      )
  };
};

exports.transformAuxMaterialGroup = transformAuxMaterialGroup;
exports.transformMaterialGroup = transformMaterialGroup;
exports.transformConcept = transformConcept;
exports.auxMaterialLoader = auxMaterialLoader;
