const express = require('express');
const router = express.Router();
const passport = require('passport');


const QuotesNumber = require('../../models/CommercialRates/QuotesNumber');
const Clients = require('../../models/CommercialRates/Clients');
const Turnover = require('../../models/CommercialRates/Turnover');


//QuotesNumber
router.post('/AddQuotesNumber', (req, res, next)=>{
    passport.authenticate('jwt', {session: false}, (err, user)=>{
        if(err){
            console.log(err);
            res.status(400).json("Server Error !");
        }
        else if(user){
            if(user.role === 'admin' || user.role === "write"){
                let val = req.body.QuotesNumber;

                let newQuotesNumber = new QuotesNumber({
                    QuotesNumberValue: val
                })

                newQuotesNumber.save()
                .then(data=>{
                    res.status(200).json({success: true, value: data.QuotesNumberValue})
                })
                .catch(err=>{console.log(err)})

            }else{
				res.status(404).json("Unauthorised !")
			}
        }else{
			res.status(404).json("Unauthorised !")
		}
    })(req, res, next)
});


router.get('/GetQuotesNumber', (req, res, next)=>{
    passport.authenticate('jwt', {session: false}, (err, user)=>{
        if(err){
            console.log(err);
            res.status(400).json("Server Error !");
        }
        else if(user){
            if(user.role === 'admin' || user.role === "write"){
                QuotesNumber.find()
                .then(data=>{
                    let QuotesNumberValue = data[data.length -1].QuotesNumberValue;
                    res.status(200).json({success: true, value: QuotesNumberValue})
                })
                .catch(err=>{console.log(err)})

            }else{
				res.status(404).json("Unauthorised !")
			}
        }else{
			res.status(404).json("Unauthorised !")
		}
    })(req, res, next)
});


//Clients
router.post('/AddClients', (req, res, next)=>{
    passport.authenticate('jwt', {session: false}, (err, user)=>{
        if(err){
            console.log(err);
            res.status(400).json("Server Error !");
        }
        else if(user){
            if(user.role === 'admin' || user.role === "write"){
                let val = req.body.Clients;

                let newClients = new Clients({
                    ClientsValue: val
                })

                newClients.save()
                .then(data=>{
                    res.status(200).json({success: true, value: data.ClientsValue})
                })
                .catch(err=>{console.log(err)})

            }else{
				res.status(404).json("Unauthorised !")
			}
        }else{
			res.status(404).json("Unauthorised !")
		}
    })(req, res, next)
});


router.get('/GetClients', (req, res, next)=>{
    passport.authenticate('jwt', {session: false}, (err, user)=>{
        if(err){
            console.log(err);
            res.status(400).json("Server Error !");
        }
        else if(user){
            if(user.role === 'admin' || user.role === "write"){
            
                Clients.find()
                .then(data=>{
                    let ClientsValue = data[data.length -1].ClientsValue;
                    res.status(200).json({success: true, value: ClientsValue})
                })
                .catch(err=>{console.log(err)})

            }else{
				res.status(404).json("Unauthorised !")
			}
        }else{
			res.status(404).json("Unauthorised !")
		}
    })(req, res, next)
});


//Turnover
router.post('/AddTurnover', (req, res, next)=>{
    passport.authenticate('jwt', {session: false}, (err, user)=>{
        if(err){
            console.log(err);
            res.status(400).json("Server Error !");
        }
        else if(user){
            if(user.role === 'admin' || user.role === "write"){
                let val = req.body.Turnover;

                let newTurnover = new Turnover({
                    TurnoverValue: val
                })

                newTurnover.save()
                .then(data=>{
                    res.status(200).json({success: true, value: data.TurnoverValue})
                })
                .catch(err=>{console.log(err)})

            }else{
				res.status(404).json("Unauthorised !")
			}
        }else{
			res.status(404).json("Unauthorised !")
		}
    })(req, res, next)
});


router.get('/GetTurnover', (req, res, next)=>{
    passport.authenticate('jwt', {session: false}, (err, user)=>{
        if(err){
            console.log(err);
            res.status(400).json("Server Error !");
        }
        else if(user){
            if(user.role === 'admin' || user.role === "write"){
            
                Turnover.find()
                .then(data=>{
                    let TurnoverValue = data[data.length -1].TurnoverValue;
                    res.status(200).json({success: true, value: TurnoverValue})
                })
                .catch(err=>{console.log(err)})

            }else{
				res.status(404).json("Unauthorised !")
			}
        }else{
			res.status(404).json("Unauthorised !")
		}
    })(req, res, next)
});

module.exports = router;