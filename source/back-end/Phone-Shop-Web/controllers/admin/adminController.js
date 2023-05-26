const { request } = require('express')
const product = require('../../models/product')
const user = require('../../models/user')
const bill = require('../../models/bill')
const passport = require('../../util/passport')
const {multipleMongooseToObject} =  require('../../util/mongoose')

class adminController
{
    async show(req, res, next)
    {
        if (req.user == null)
        {
            res.redirect('/')
        }
        const temp = req.user[0]
        const ad = JSON.parse(JSON.stringify(temp))
        if (ad.admin)
        {
            try {
                var numBill = await (await bill.find({})).length;
                var numProduct = await (await product.find({})).length;
                var numUser = await (await user.find({})).length;

                var revenue;
                var billData;
                await bill.find({})
                .then(bill =>
                        billData = bill
                    )
                for (var i = 0; i < numBill; i++)
                {
                    if (revenue)
                        revenue += billData[i].price * billData[i].number;
                    else
                        revenue = billData[i].price * billData[i].number;
                }
                await bill.find({})
                .limit(5)
                .then(bill => 
                    product.find({})
                    .limit(5)
                    .then(product => 
                        res.render('./admin/home', {
                            revenue: revenue,
                            numProduct: numProduct,
                            numBill: numBill,
                            numUser: numUser,
                            bill: multipleMongooseToObject(bill),
                            product: multipleMongooseToObject(product)
                        })
                    )
                    .catch(next)
                )
                .catch(next)
            }
            catch(error)
            {
                next(error)
            }
        }
        else
        {
            res.redirect('/')
        }
    }
}

module.exports = new adminController