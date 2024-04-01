const express = require('express');
const router = express.Router();
const {User,Project}= require('../models');
const dayjs =require("dayjs")

router.get("/",async (req,res)=>{
    try {
        const dbProjects = await Project.findAll();
        // res.json(dbProjects);
        console.log(dbProjects)
        const hbsProjects = dbProjects.map(proj=>{
            const convertedData = proj.toJSON()
            convertedData.date_created = dayjs( convertedData.date_created).format("dddd MMMM DD, YYYY")
            return convertedData
        });
        res.render("home",{
            projects:hbsProjects,
            loggedIn:req.session.logged_in
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"womp womp",error})
    }
})
router.get("/project/:id",async (req,res)=>{
    try {
        const dbProject = await Project.findByPk(req.params.id);
        // res.json(dbProject);
        console.log(dbProject)
        const convertedData = dbProject.toJSON();
        convertedData.date_created = dayjs( convertedData.date_created).format("dddd MMMM DD, YYYY")
        // res.json(dbProject)
        convertedData.loggedIn = req.session.logged_in
        res.render("project",convertedData)
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"womp womp",error})
    }
})
router.get("/auth",(req,res)=>{
    if(req.session.logged_in){
        return res.redirect("/profile")
    }
    res.render("auth",{
        loggedIn:false
    })
})

router.get("/profile",async (req,res)=>{
    if(!req.session.logged_in){
        return res.redirect("/auth")
    }
    const userData = await User.findByPk(req.session.user_id,{
        include:[Project]
    })
    const hbsData = userData.toJSON();
    hbsData.loggedIn = true
    // res.json(hbsData);
    res.render("profile",hbsData)
})

module.exports = router;