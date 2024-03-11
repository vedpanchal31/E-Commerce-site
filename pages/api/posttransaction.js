// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDb from "@/middleware/mongoose"
import Order from "@/models/Order";
import Product from "@/models/Product";

const handler = async (req, res) => {
  let order;
    // Validate paytm checksum

    // update status into Orders table after checking the transaction status
    if(req.body.STATUS == 'TXN_SUCCESS'){
      await Order.findOneAndUpdate({orderId : req.body.ORDERID},{status : "Success" , paymentInfo : JSON.stringify(req.body) , transactionid : req.body.TXNID})
      let products = order.products
      for(slug in products){

        await Product.findOneAndUpdate({slug:slug},{$inc :{"availabelQty" : -products[slug].qty}})
      }
    }
    else if(req.body.STATUS == 'PENDING'){
   await Order.findOneAndUpdate({orderId : req.body.ORDERID},{status : "pending" , paymentInfo : JSON.stringify(req.body), transactionid : req.body.TXNID})
  
    }

    // Initiate Shipping

    // redirect user to the order confirmation page
      res.redirect('/order?clearCart=1&id='+ order._id,200)

    // res.status(200).json({body:req.body })
  }
  
  export default connectDb(handler);