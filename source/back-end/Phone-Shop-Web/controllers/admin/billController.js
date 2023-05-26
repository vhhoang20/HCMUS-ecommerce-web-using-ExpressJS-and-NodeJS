const { response } = require('express')
const bill = require('../../models/bill')
const details = require('../../models/bill')
const {multipleMongooseToObject} =  require('../../util/mongoose')
const {mongooseToObject} =  require('../../util/mongoose')

class billController
{
    async index(req, res, next)
    {
        try{
            const billPerPage = 6;
            var numOfbill;
            
            const search = req.query.search;
            const brand = req.query.brand;
            const name = req.query.name;

            if (!req.query.search && !req.query.brand)
            {
                numOfbill = await (await bill.find({}).sort({name: name})).length;
                const numberOfPages = Math.ceil(numOfbill / billPerPage);
                const listNumberPage = [];

                for (var i = 1; i <= numberOfPages; i++)
                {
                    listNumberPage.push({value: i.toString()});
                }
                let page = req.query.page ? Number(req.query.page) : 1;
                var startFrom = (page - 1) * billPerPage;

                await bill.find({}).sort({name: name})
                .skip(startFrom)
                .limit(billPerPage)
                .then(bill => {
                    res.render('./admin/bill-list', {
                        pre_page: page <= 1 ? null : page - 1,
                        next_page: page >= numberOfPages ? null : page + 1,
                        pages: listNumberPage,
                        bill: multipleMongooseToObject(bill)
                    })
                })
                .catch(next)
            }
            else
            {
                numOfbill = await (await bill.find({name: new RegExp(search, 'i'), brand: new RegExp(brand, 'i')}).sort({name: name})).length;
                const numberOfPages = Math.ceil(numOfbill / billPerPage);
                const listNumberPage = [];

                for (var i = 1; i <= numberOfPages; i++)
                {
                    listNumberPage.push({value: i.toString()});
                }
                let page = req.query.page ? Number(req.query.page) : 1;
                var startFrom = (page - 1) * billPerPage;

                await bill.find({name: new RegExp(search, 'i') , brand: new RegExp(brand, 'i')}).sort({name: name})
                .skip(startFrom)
                .limit(billPerPage)
                .then(bill => {
                    res.render('./admin/bill-list', {
                        pre_page: page <= 1 ? null : page - 1,
                        next_page: page >= numberOfPages ? null : page + 1,
                        pages: listNumberPage,
                        bill: multipleMongooseToObject(bill)
                    })
                })
                .catch(next)
            }
            }
        catch(error){
            res.status(500).json({message: error.message})
        }
    }

    async detail(reg, res, next)
    {
        try {
            await bill.find({slug: reg.params.slug})
            .then(bill => 
                res.render('./admin/bill-detail', {
                    bill: multipleMongooseToObject(bill)
                })
            )
            .catch(next)
        }
        catch(error)
        {
            next(error)
        }
    }

    async uppro(req, res, next)
    {
        try {
            const update = await bill.findOneAndUpdate({slug: req.params.slug}, 
                {$set: {name: req.body.name, user: req.body.user, number: req.body.number,
                    brand: req.body.brand, price: req.body.price, date: req.body.date}}, {returnOriginal: false})
            update.save()
            res.redirect('/admin/bill')
        }
        catch(error)
        {
            next(error)
        }
    }
}

module.exports = new billController