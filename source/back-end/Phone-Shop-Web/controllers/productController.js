const { response } = require('express')
const product = require('../models/product')
const details = require('../models/product')
const {multipleMongooseToObject} =  require('../util/mongoose')
const {mongooseToObject} =  require('../util/mongoose')

class productController
{
    async index(req, res, next)
    {
        try{
            const productPerPage = 6;
            var numOfProduct;
            
            const search = req.query.search;
            const brand = req.query.brand;
            const price = req.query.price;

            if (!req.query.search && !req.query.brand)
            {
                numOfProduct = await (await product.find({}).sort({price: price})).length;
                const numberOfPages = Math.ceil(numOfProduct / productPerPage);
                const listNumberPage = [];

                for (var i = 1; i <= numberOfPages; i++)
                {
                    listNumberPage.push({value: i.toString()});
                }
                let page = req.query.page ? Number(req.query.page) : 1;
                var startFrom = (page - 1) * productPerPage;

                await product.find({}).sort({price: price})
                .skip(startFrom)
                .limit(productPerPage)
                .then(product => {
                    res.render('./client/product', {
                        pre_page: page <= 1 ? null : page - 1,
                        next_page: page >= numberOfPages ? null : page + 1,
                        pages: listNumberPage,
                        product: multipleMongooseToObject(product)
                    })
                })
                .catch(next)
            }
            else
            {
                numOfProduct = await (await product.find({name: new RegExp(search, 'i'), brand: new RegExp(brand, 'i')}).sort({price: price})).length;
                const numberOfPages = Math.ceil(numOfProduct / productPerPage);
                const listNumberPage = [];

                for (var i = 1; i <= numberOfPages; i++)
                {
                    listNumberPage.push({value: i.toString()});
                }
                let page = req.query.page ? Number(req.query.page) : 1;
                var startFrom = (page - 1) * productPerPage;

                await product.find({name: new RegExp(search, 'i') , brand: new RegExp(brand, 'i')}).sort({price: price})
                .skip(startFrom)
                .limit(productPerPage)
                .then(product => {
                    res.render('./client/product', {
                        pre_page: page <= 1 ? null : page - 1,
                        next_page: page >= numberOfPages ? null : page + 1,
                        pages: listNumberPage,
                        product: multipleMongooseToObject(product)
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
            await product.find({slug: reg.params.slug})
            .then(product => 
                res.render('./client/product-detail', {
                    product: multipleMongooseToObject(product)
                })
            )
            .catch(next)
        }
        catch(error)
        {
            next(error)
        }
    }
}

module.exports = new productController