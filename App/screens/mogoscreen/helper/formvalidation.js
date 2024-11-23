import _ from 'lodash';

export const validateEmail = email => {
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email) ? null : 'Invalid email format';
};

export const validateRequiredField = (value, fieldName) => {
  return value.trim() === '' ? `${fieldName} is required` : null;
};

export const getProductDetails = (variant_id, product) => {
  try {
    const finalProduct = product?.filter(res => {
      return res.product_variants.find(value => {
        return value.varient_unique_id === variant_id;
      });
    });

    return finalProduct;
  } catch (err) {}
};

export const getRandomColor = () => {
  let colors = ['#84cc16', '#22c55e', '#10b981', '#14b8a6', '#3b82f6'];
  const result = _.shuffle(colors);
  return result[0];
};

export const convertUriToFile = async uri => {
  try {
    const response = await fetch(uri);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status}`);
    }

    const blob = await response.blob();
    const filename = uri.split('/').pop();
    return new File([blob], filename, {type: blob.type});
  } catch (err) {
    console.error('Error converting URI to file:', err);
  }
};
