/**
 * Gets JSON content from local storage and returns parsed data. 
 * @param {String} key 
 * @returns {*} parsed JSON content
 * @example
 * const cartItems = getLocalItem("Cart");
 */
export function getLocalItem(key){
  const item = localStorage.getItem(key);
  return JSON.parse(item);
}

/**
 * Stores JSON content in local storage
 * @param {String} key 
 * @param {JSON} content
 * @example
 * const shoppingLIst = ["cheese", "milk", "eggs"]
 * setLocalItem("shopping_list", shoppingLIst);
 */
export function setLocalItem(key, content){
  localStorage.setItem(key, JSON.stringify(content));
}

/**
 * Deletes a specific local storage item.
 * @param {String} key 
 * @example
 * deleteLocalItem("cart");
 */
export function deleteLocalItem(key){
  localStorage.removeItem(key);
}