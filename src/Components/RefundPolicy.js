
import "./RefundShippingPolicy.css";



function RefundPolicy (){ 
    return (
        <div className='policyParent'>
            <br/>
            <h4 className='policyChild'>
                Thank you for shopping at FootRockers!
                <br/>
            </h4>

            <div className='policyChild'>
            We offer refund and/or exchange within the first 30 days of your purchase, if 30 days have passed since your purchase, you will not be offered a refund and/or exchange of any kind.<hr/>
            </div>
        
            <h4 className='policyChild'>
            Eligibility for Refunds and Exchanges<br/>
            </h4>

            <div className='policyChild'>
            <ul >Your item must be unused and in the same condition that you received it.</ul>
            <ul>The item must be in the original packaging.</ul>
            <ul>To complete your return, we require a receipt or proof of purchase.
            </ul>
            <ul>
            Only regular priced items may be refunded, sale items cannot be refunded.
            </ul>
            </div>
            
        </div>
    )
}

export default RefundPolicy;