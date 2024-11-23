import _ from 'lodash';

export const CartStatus = (productIDs, currentProductId) => {
  try {
    return productIDs.includes(currentProductId);
  } catch (err) {}
};

export const sellingPriceHelper = res => {
  return _.get(res, 'special_offer_status', '')
    ? _.get(res, 'special_selling_price', '')
    : _.get(res, 'mogo_selling_price', '');
};

export const offerDiscountHelper = res => {
  return _.get(res, 'special_offer_status', '')
    ? _.get(res, 'special_product_discount', '')
    : _.get(res, 'mogo_discount_price', '');
};

export const mrpPriceHelper = res => {
  return _.get(res, 'special_offer_status', '')
    ? _.get(res, 'special_mrp_price', '')
    : _.get(res, 'mogo_mrp_price', '');
};

export const getFinalPrice = checkoutDetails => {
  try {
    let result =
      checkoutDetails &&
      checkoutDetails.map(res => {
        return Number(res.product_finalTotal);
      });

    return _.sum(result);
  } catch (err) {}
};

//  let applyDiscount =
//    (Number(_.get(result, 'data.data.coupon_discount', '')) *
//      getFinalPrice(_.get(route, 'params.state', []))) /
//    100;

//    Math.abs(
//           applyDiscount - getFinalPrice(_.get(route, 'params.state', [])),
//         ),

export const getFinalSoloPrice = (checkoutDetails, dicount) => {
  try {
    let result =
      checkoutDetails &&
      checkoutDetails.map(res => {
        return Math.abs(
          (Number(dicount / checkoutDetails.length) *
            Number(res.product_finalTotal)) /
            100 -
            Number(res.product_finalTotal),
        );
      });

    return _.sum(result);
  } catch (err) {}
};

export const getTotalMRPPrice = MRP_PRICE => {
  try {
    let result =
      MRP_PRICE &&
      MRP_PRICE.map(res => {
        return res.product_mrp_price * res.product_quantity;
      });

    return _.sum(result);
  } catch (err) {}
};

export const getTotalSellingPrice = MRP_PRICE => {
  try {
    let result =
      MRP_PRICE &&
      MRP_PRICE.map(res => {
        return res.product_selling_price * res.product_quantity;
      });

    return _.sum(result);
  } catch (err) {}
};

export const getTotalQuantity = MRP_PRICE => {
  try {
    let result =
      MRP_PRICE &&
      MRP_PRICE.map(res => {
        return res.product_quantity;
      });

    return _.sum(result);
  } catch (err) {}
};

export const getSubcategoryName = (subCategoryData, current_id) => {
  try {
    console.log(subCategoryData, current_id);
    let result = subCategoryData.filter(res => {
      res._id = current_id;
    });
    return result;
  } catch (err) {}
};

export const getVariantPrice = (variant_id, variantProducts) => {
  try {
    const result = _.get(variantProducts, '[0].product_variants', []).filter(
      res => {
        return res.varient_unique_id === variant_id;
      },
    );
    return _.get(result, '[0]', '');
  } catch (err) {}
};

export const checkCouponIncludedOrNot = (orderDetails, currentProduct) => {
  // console.log(
  //   orderDetails,
  //   _.get(orderDetails, '[0].coupondiscountDetails', []),
  // );

  try {
    if (_.isEmpty(_.get(orderDetails, 'coupondiscountDetails', []))) {
      return (
        Number(_.get(currentProduct, 'product_finalTotal', '')) +
        Number(_.get(currentProduct, 'deliveryCharge', ''))
      );
    } else {
      let discount =
        Number(_.get(currentProduct, 'product_finalTotal', '')) *
        Number(
          _.get(orderDetails, 'coupondiscountDetails[0].coupon_discount', '') /
            _.get(orderDetails, 'productDetails', []).length,
        );

      let final =
        discount / 100 -
        Number(_.get(currentProduct, 'product_finalTotal', ''));

      return (
        Math.abs(final) + Number(_.get(currentProduct, 'deliveryCharge', ''))
      );
    }
  } catch (err) {}
};

// _.get(data, 'product_finalTotal', '').toLocaleString();

export const getDeliveryChargesPrice = (deliveryCharges, current_weight) => {
  try {
    const result = deliveryCharges
      ?.sort((res, res2) => {
        return res.product_weight - res2.product_weight;
      })
      ?.filter(res => {
        return Number(res.product_weight) <= Number(current_weight);
      });
    return _.get(result, `[${result.length - 1}].delivery_charge`, '');
  } catch (err) {}
};

export const getDeliveryChargeTotal = value => {
  try {
    const data = value?.map(res => {
      return Number(res.deliveryCharge);
    });
    return _.sum(data);
  } catch (err) {}
};

export const getCurrentVariant = (value, id) => {
  try {
    const data = value?.filter(res => {
      return res.varient_unique_id === id;
    });
    return data;
  } catch (err) {}
};
