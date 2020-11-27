const express = require('express');
const router = express.Router();
const members = require('../../Members');
const uuid = require('uuid');

router.get('/', (req,res)=>{
    res.json(members);
});
//getting sinlge member details
router.get('/:id', (req,res)=>{
    //some returns true or false
    const found = members.some(member=> member.id === parseInt(req.params.id))
    if(found){
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    }else{
        res.status(404).json({mes:`your request ${req.params.id} dont match`})
    }
});

//create member

router.post('/', (req, res) =>{
const newmember = {
    id:uuid.v4(),
    name:req.body.name,
    email:req.body.email,
    status:"active"
} 
if(!newmember.name|| !newmember.email){
    return res.status(400).json({"message":"please enter the name and email"})
}
members.push(newmember);
// res.json(members);
res.redirect('/')
});

//updating member
router.put('/:id', (req,res)=>{
    //some returns true or false
    const found = members.some(member=> member.id === parseInt(req.params.id))
    if(found){
        const updmember = req.body;
        members.forEach(member=>{
            if(member.id === parseInt(req.params.id)){
                member.name = updmember.name ? updmember.name:member.name;
                member.email = updmember.email ? updmember.email : member.email;
                res.json({"message": "updated sucessfully" , member })
            }
        })

}else{
        res.status(404).json({mes:`your request ${req.params.id} dont match`})
    }
});
//deleting member
router.delete('/:id', (req,res)=>{
    //some returns true or false
    const found = members.some(member=> member.id === parseInt(req.params.id))
    if(found){
        res.json( {message :"deleted user sucessfully", members: members.filter(member => member.id !== parseInt(req.params.id))});
    }else{
        res.status(404).json({mes:`your request ${req.params.id} dont match`})
    }
});
module.exports = router;