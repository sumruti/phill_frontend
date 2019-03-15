import React from "react";
import "./Deals.css";
import Deal from "../Deal";

const Deals = ({ expirationInfo, deals, handleTriggerDetailsModal, orderflag, addToDealsQty, idToRemove }) => {
	return (
		<div className='deals_container_wrapper'>
			<div className='deals_container'>
				{deals.map((deal, idx) => {
					return (
						<Deal
							key={idx}
							expirationInfo={expirationInfo}
							deal={deal}
							handleTriggerDetailsModal={handleTriggerDetailsModal}
							orderflag={orderflag}
							addToDealsQty={addToDealsQty}
							idToRemove={idToRemove}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default Deals;
