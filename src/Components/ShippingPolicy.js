
import "./RefundShippingPolicy.css";


function ShippingPolicy() { 
    return (
        <div className='policyParent'>
            <hr/>
            <div className='policyChild'>
            Thank you for visiting and shopping at FootRockers! We ship all of our orders via USPS/UPS/FedEx/DHL. You will receive an email update with your tracking number once your order has shipped.
            <hr/>
            </div>

            <div className='policyChild'>
            All orders are processed within 5 days. Standard shipping typically takes between 2-8 business days, for destinations within the United States. If we are experiencing a high volume of orders, shipments may be delayed by a few days. Additionally, nationwide and global shipping delays (such as those caused by COVID-19, holiday volumes, or inclement weather) may impact your estimated delivery date.
            <hr/>
            </div>
        </div>
)

}

export default ShippingPolicy;