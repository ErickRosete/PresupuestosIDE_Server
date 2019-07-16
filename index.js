const express = require("express");
const expressGraphQL = require("express-graphql");
const mongoose = require("mongoose");
const graphqlSchema = require("./graphql/schema/index");
const graphqlResolvers = require("./graphql/resolvers/index");
const bodyParser = require("body-parser");
const externalRequest = require("./middleware/external-requests");
const multer = require("multer");
const path = require('path');
const fs = require("fs");
const Excel = require('exceljs');
const Material = require("./models/material");

const port = process.env.PORT || 5000;
const app = express();
app.use(bodyParser.json());
app.use(express.static('public'))
app.use(externalRequest);

app.use(
    "/graphql",
    expressGraphQL({
        schema: graphqlSchema,
        rootValue: graphqlResolvers,
        graphiql: true
    })
);
const upload = multer({
    dest: "./public/uploads"
});

app.post('/importMaterials', upload.single("file"), (req, res) => {
    try {
        const file = req.file;
        const tempPath = file.path;
        const targetPath = path.join(__dirname, "public/excel", file.originalname);
        const fileExt = path.extname(file.originalname).toLowerCase();

        /// Check file extension
        if (fileExt !== ".xlsx") {
            fs.unlink(tempPath, err => {
                res.status(400).json("Incorrect file extension");
                return;
            });
        }

        // Save File
        fs.rename(tempPath, targetPath, err => {
            if (err) {
                res.status(500).json("Error Saving File");
                return;
            }

            // Read Excel File
            var workbook = new Excel.Workbook();
            workbook.xlsx.readFile(targetPath)
                .then(function () {
                    var worksheet = workbook.getWorksheet(1);
                    if (worksheet) {
                        //Worksheet validation
                        const firstCell = worksheet.getRow(1).getCell(1).value;
                        if (!firstCell || firstCell.split(' ')[0].toLowerCase() !== "contpaq") {
                            res.status(400).json("Incorrect Excel format");
                            fs.unlink(targetPath, err => { });
                            return;
                        }

                        //Delete previous excel data objects
                        Material.deleteMany({ fromExcel: true }).then((res) => {
                            console.log("Deleted " + res.deletedCount + " objects")
                        });

                        //save new objects
                        const materials = [];
                        const cellMap = {
                            2: "materialKey",
                            3: "name",
                            5: "measurementUnit",
                            6: "quantity",
                            7: "totalPrice",
                            14: "unitPrice"
                        }

                        worksheet.eachRow(function (row, rowNumber) {
                            if (rowNumber > 10) {
                                const auxMaterial = {
                                    fromExcel: true
                                };

                                row.eachCell(function (cell, colNumber) {
                                    if(colNumber===3){
                                        // console.log(`revisocolumna3: ${cell.value}`)
                                        if(cell.value===""){
                                            console.log("encontre un nulo")
                                            auxMaterial[cellMap[colNumber]] ="indefinido";
                                        }
                                        else{
                                            auxMaterial[cellMap[colNumber]] = cell.value;
                                        }
                                    }
                                    else if(colNumber===3){
                                        console.log(`revisocolumna3: ${cell.value}`)
                                    }
                                    else{
                                        auxMaterial[cellMap[colNumber]] = cell.value;
                                    }
                                });

                                if (auxMaterial.materialKey) {
                                    const material = Material({
                                        ...auxMaterial
                                    });
                                    material.save().then();
                                    materials.push(material)
                                }
                            }
                        });
                        res.status(200).json(materials);
                    }
                });
        });
    } catch (err) {
        console.log(err)
    }
});

console.log(`mongodb+srv://${process.env.MONGO_USER}:${
        process.env.MONGO_PASSWORD
        }@cluster0-cij3w.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)

mongoose
    .connect(
        `mongodb+srv://${process.env.MONGO_USER}:${
        process.env.MONGO_PASSWORD
        }@cluster0-cij3w.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
        , { useNewUrlParser: true, useFindAndModify: false })
    .then(() => {
        app.listen(port);
        console.log("App running on port " + port)
    })
    .catch(err => { console.log("error general"); console.log(err) });