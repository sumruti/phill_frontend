import HomeIcon from '../resources/home_icon.png';
import ProfileIcon from '../resources/profile_icon.png';
import FavoritesIcon from '../resources/favorites_icon.png';
// import SmartShopIcon from '../resources/smart_shop_icon.png';
// import HelpCenterIcon from '../resources/smart_shop_icon.png';

export const _STRINGS = {
    _DEAL_EXPIRATION_PREFIX: 'Offer valid from',
    _DEAL_EXPIRATION_START_END_SEPARATOR: 'to',
    _DEAL_SALE_PRICE_PREFIX: 'SALE',
    _DEAL_QUANTITY_HEADER: 'Quantity',
    _DEAL_DETAIL_MORE_DETAILS_PLACEHOLDER: 'Specify brand, size, flavour...',
    _DEAL_DETAIL_FLASHCHECKOUT_BUTTON_NAME: 'Flash Checkout',
    _DEAL_DETAIL_ADDTOLIST_BUTTON_NAME: 'Add to a list',
    _DEAL_DETAIL_PRODUCT_DETAILS_HEADER: 'PRODUCT DETAILS',
    _DEAL_ADD_TO_CART_BUTTON_NAME: 'Add To Cart',
    _DEAL_REMOVE_FROM_CART_BUTTON_NAME: 'Remove From Cart',
    _DEAL_PRODUCT_DETAILS_BUTTON_NAME: 'Product Details',
    _DEAL_DETAILS_MODAL_HEADER_NAME_PREFIX: 'Shop',
    _SEARCH_FORM_INPUT_PLACEHOLDER: 'Item, store & price search',
    _STORE_NAME_TAG_IMAGE_ALT: 'grocery store name',
    _STORE_NAME_TAG_SHOP_ALL: 'SHOP ALL'
}

export const _ENGLISH_MONTH_NAMES = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December'
}

const _COMPONENTS_NAMES = {
    home: 'Home',
    //smartShop: 'Smart Shop',
    favorites: 'Favorites',
    profile: 'Profile'
    // helpCenter: 'Help Center'
}

const _COMPONENTS_ICONS = {
    home: HomeIcon,
    //smartShop: SmartShopIcon,
    favorites: FavoritesIcon,
    profile: ProfileIcon
    // helpCenter: HelpCenterIcon
}

export const _COMPONENTS_INFO = {
    home: {
        title: _COMPONENTS_NAMES.home,
        iconImg: _COMPONENTS_ICONS.home,
        type: 'home'
    },
    // smartShop: {
    //     title: _COMPONENTS_NAMES.smartShop,
    //     iconImg: _COMPONENTS_ICONS.smartShop,
    //     type: 'smartShop'
    // },
    profile: {
        title: _COMPONENTS_NAMES.profile,
        iconImg: _COMPONENTS_ICONS.profile,
        type: 'profile'
    }
    // helpCenter: {
    //     title: _COMPONENTS_NAMES.helpCenter,
    //     iconImg: _COMPONENTS_ICONS.helpCenter,
    //     type: 'helpCenter'
    // }
}
