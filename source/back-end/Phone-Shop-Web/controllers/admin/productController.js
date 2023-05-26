const { response } = require('express')
const product = require('../../models/product')
const details = require('../../models/product')
const {multipleMongooseToObject} =  require('../../util/mongoose')
const {mongooseToObject} =  require('../../util/mongoose')

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
                    res.render('./admin/warehouse', {
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
                    res.render('./admin/warehouse', {
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
                res.render('./admin/product-detail', {
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

    async uppro(req, res, next)
    {
        try {
            const update = await product.findOneAndUpdate({slug: req.params.slug}, 
                {$set: {name: req.body.name, description: req.body.description, 
                    brand: req.body.brand, price: req.body.price, image: req.body.image}}, {returnOriginal: false})
            update.save()
            res.redirect('/admin/product')
        }
        catch(error)
        {
            next(error)
        }
    }

    async add(req, res, next)
    {
        try{
            const data = await product.find({name: req.body.name});
            if (data.length > 0)
            {
                return res.send('<h1>Product existed!!</h1> <br> <a href="/admin/product/add-product">Add again</a>');
            }
            else
            {
                const formData = req.body;
                formData.slug = req.body.name;
                const prod = new product(formData);
                prod.save();
            }
        }
        catch(error){
            res.status(500).json({message: error.message})
        }
        res.redirect('/admin/product');
    }

    async showDetail(req, res, next)
    {
        var prd = new product();
        res.render('./admin/product-add', {
            product : prd
        });
    }
}

module.exports = new productController