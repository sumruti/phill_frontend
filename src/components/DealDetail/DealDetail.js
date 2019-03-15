// import React, { PureComponent } from 'react';
// import moment from 'moment';
// import './DealDetail.css';
// import { _STRINGS as GlobalStrings } from '../../utils/_globals';

// class DealDetail extends PureComponent {
//     state = {
//         quantity: 0,
//         details: ''
//     }

//     handleQuantityToggle = action => {
//         let newQty = this.state.quantity;

//         if (action === 'INCREASE') newQty++;
//         else if (action === 'DECREASE') newQty--;

//         this.setState({
//             quantity: newQty
//         })
//     }

//     handleInputChange = e => {
//         this.setState({
//             [e.target.name]: e.target.value
//         })
//     }

//     render() {
//         const { deal, expirationInfo: { startDate, endDate } } = this.props.data;

//         const { store, product, productImgUrl, priceInfo: { price, currency }, productDetails } = deal

//         const { _DEAL_EXPIRATION_PREFIX, _DEAL_EXPIRATION_START_END_SEPARATOR, _DEAL_SALE_PRICE_PREFIX, _DEAL_QUANTITY_HEADER, _DEAL_DETAIL_MORE_DETAILS_PLACEHOLDER, _DEAL_DETAIL_FLASHCHECKOUT_BUTTON_NAME, _DEAL_DETAIL_ADDTOLIST_BUTTON_NAME, _DEAL_DETAIL_PRODUCT_DETAILS_HEADER } = GlobalStrings;

//         return (
//             <div className='deal_detail_container'>
//                 <div className='deal_detail_product_image'>
//                     <img src={productImgUrl} alt={product} />
//                 </div>
//                 <div className='deal_detail_price'>
//                     {`${_DEAL_SALE_PRICE_PREFIX.toUpperCase()} ${currency} ${price}`}
//                 </div>
//                 <div className='deal_detail_expiration'>
//                     {`${_DEAL_EXPIRATION_PREFIX} ${_ENGLISH_MONTH_NAMES[moment(startDate).month()]} ${moment(startDate).date()} ${_DEAL_EXPIRATION_START_END_SEPARATOR} ${_ENGLISH_MONTH_NAMES[moment(endDate).month()]} ${moment(endDate).date()}`}
//                 </div>
//                 <div className='deal_detail_quantity'>
//                     <div className='deal_detail_quantity_header'>{_DEAL_QUANTITY_HEADER}
//                     </div>
//                     <div className='deal_detail_quantity_toggler'>
//                         <div className='deal_detail_quantity_toggler_decrease' onClick={() => this.handleQuantityToggle('DECREASE')}>-</div>
//                         <div className='deal_detail_quantity_toggler_current_container'>
//                             <div className='deal_detail_quantity_toggler_current_quantity'>{this.state.quantity}
//                             </div>
//                             <div className='deal_detail_quantity_toggler_current_unit'>{``}
//                             </div>
//                         </div>
//                         <div className='deal_detail_quantity_toggler_increase' onClick={() => this.handleQuantityToggle('INCREASE')}>+</div>
//                     </div>
//                     <div className='deal_detail_more_detail_container'>
//                         <input className='deal_detail_more_detail' name='details' value={this.state.details} placeholder={_DEAL_DETAIL_MORE_DETAILS_PLACEHOLDER} onChange={this.handleInputChange} />
//                     </div>
//                     <div className='deal_detail_action_btns'>
//                         <div className='deal_detail_action_btns_flashcheckout'>{_DEAL_DETAIL_FLASHCHECKOUT_BUTTON_NAME}</div>
//                         <div className='deal_detail_action_btns_addtolist'>{_DEAL_DETAIL_ADDTOLIST_BUTTON_NAME}</div>
//                     </div>
//                     <div className='deal_detail_product_details_container'>
//                         <div className='deal_detail_product_details_header'>{_DEAL_DETAIL_PRODUCT_DETAILS_HEADER}</div>
//                         <div className='deal_detail_product_details'>{productDetails}</div>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }

// export default DealDetail;