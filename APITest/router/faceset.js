const express = require('express');
const router = express.Router();
const add = require("../api/addFaceset.js");
const get = require("../api/getFaceset.js");
const del = require("../api/deleteFace.js");
const search = require("../api/searchByFace.js");



module.exports = (key)=>{
    router.post('/add',function(req,res){
        add(req,key).then(data=>{
            res.send(data);
        }).catch(err=>{
            res.send(JSON.stringify(err));
        });
    });
    router.post('/get',function(req,res){
        get(req,key).then(data=>{
            res.send(data);
        }).catch(err=>{
            res.send(JSON.stringify(err));
        });
    });
    router.post('/delete',function(req,res){
        del(req,key).then(data=>{
            res.send(data);
        }).catch(err=>{
            res.send(JSON.stringify(err));
        });
    });
    router.post('/search',function(req,res){
        search(req,key).then(data=>{
            res.send(data);
        }).catch(err=>{
            res.send(JSON.stringify(err));
        });
    });
    return router;
};