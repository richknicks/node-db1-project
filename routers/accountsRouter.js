const express = require('express');
const router = express.Router();
const db= require('../data/dbConfig');

router.get("/", (req, res)=>{
    db
    .select("*")
    .from("accounts")
    .then(account =>{
        res.status(200).json(account)
    })
    .catch(error=>{
        res.status(500).json({
            error:`There is an error${error}`
        });
    });
});
router.get("/:id", (req, res)=>{
    const{id}=req.params
    db("accounts")
    .where({id})
    .then(account=>{
        account? res.status(200).json(account):
        res.status(404).json({message: "Post not found"})
    })
    .catch(error=>{
        res.status(500).json({
            error:`There is an error${error}`
        });
    })
    
});
router.post("/", (req, res)=>{
    db("accounts")
    .insert(req.body)
    .then(account=>{
        res.status(201).json(account)
    })
    .catch(error=>{
        res.status(500).json({
            error:`There is an error ${error}`
        });
    });
});
router.put("/:id", (req, res)=>{
    const changes=req.body
    const {id}=req.params
    db("accounts")
    .where({id})
    .update(changes)
    .then(account=>{
        account? res.status(200).json(account):
        res.status(404).json({errorMessage: "Post not found "})
    })
    .catch(error=>{
        res.status(500).json({
            error:`There is an error ${error}`
        });
    });
});

router.delete("/:id", (req, res)=>{
    const {id}=req.params
    db("accounts")
    .where({id})
    .del()
    .then(account=>{
        account? res.status(200).json({message: "Record deleted successfully"}):
        res.status(404).json({ message: "Post not found"})
    })
    .catch(error=>{
        res.status(500).json({
            error:`There is an error ${error}`
        });
    });

})

module.exports=router;