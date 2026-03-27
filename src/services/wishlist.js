
export const addToWishList = async (product) => {
    try {
        let saved = localStorage.getItem("cart")
        let list = saved != null ? JSON.parse(saved) : saved

       list = {
            ...list,
            [product?.id_producto]: product
       }

       localStorage.setItem("wishlist", JSON.stringify(list))

        return { valid: true }
    } catch (error) {
        return { valid: false, error: error?.message }
    }
}

export const removeFromWishList = async (id) => {
    try {
        let saved = localStorage.getItem("wishlist");
        let list = saved != null ? JSON.parse(saved) : {};

        if (list && list[id]) {
            delete list[id];
        }

        if(Object.keys(list).length == 1){
            localStorage.setItem("wishlist", null);
        } else{
            localStorage.setItem("wishlist", JSON.stringify(list));
        }


        return { valid: true };
    } catch (error) {
        return { valid: false, error: error?.message };
    }
};