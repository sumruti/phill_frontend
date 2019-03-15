import React from "react";
import "./dealDetailsModal.css";

import { _STRINGS } from "../../../utils/_globals";

const {
  _DEAL_DETAILS_MODAL_HEADER_NAME_PREFIX,
  _DEAL_PRODUCT_DETAILS_BUTTON_NAME,
} = _STRINGS;

const DealDetailsModal = ({
  details: { storeName, productName, productDetails, productImgUrl },
  handleClose,
}) => {
  return (
    <div className="deal_details_modal_blanket">
      <div className="deal_details_modal_container">
        <div className="deal_details_modal_header">
          <div className="deal_details_modal_header_store_name">
            <div>{`${_DEAL_DETAILS_MODAL_HEADER_NAME_PREFIX} ${storeName}`}</div>
          </div>

          <button
            className="deal_details_modal_header_close_btn"
            onClick={handleClose}
          >
            x
          </button>
        </div>
        <div className="deal_details_modal_product_name">{productName}</div>

        <div className="deal_details_modal_product_img_container" style={{height: 200}}>
          <img
            className="deal_details_modal_product_img"
            src={productImgUrl}
            alt="Deal product"
          />
        </div>
        <div className="deal_details_modal_details">
          <div className="deal_details_modal_details_header">
            {_DEAL_PRODUCT_DETAILS_BUTTON_NAME.toUpperCase()}
          </div>
          <div className="detal_details_modal_details_description">
            {productDetails}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealDetailsModal;
