export const brandList = {
    Closer: {
        checked: false,
        query: 'title:Closer',
        img: 'https://bizweb.dktcdn.net/100/304/529/files/cloer.png?1650597743356'
    },
    Daikin: {
        checked: false,
        query: 'title:Daikin',
        img: 'https://bizweb.dktcdn.net/100/304/529/files/daikin.png?1650597743356'
    },
    Electrolux: {
        checked: false,
        query: 'title:Electrolux',
        img: 'https://bizweb.dktcdn.net/100/304/529/files/electrolux.png?1650597743356'
    },
    LG: {
        checked: false,
        query: 'title:LG',
        img: 'https://bizweb.dktcdn.net/100/304/529/files/lg.png?1650597743356'
    },
    Panasonic: {
        checked: false,
        query: 'title:Panasonic',
        img: 'https://bizweb.dktcdn.net/100/304/529/files/panasonic.png?1650597743356'
    },
    Samsung: {
        checked: false,
        query: 'title:Samsung',
        img: 'https://bizweb.dktcdn.net/100/304/529/files/samsung.png?1650597743356'
    },
    Sharp: {
        checked: false,
        query: 'title:Sharp',
        img: 'https://bizweb.dktcdn.net/100/304/529/files/sharp.png?1650597743356'
    },
    Sony: {
        checked: false,
        query: 'title:Sony',
        img: 'https://bizweb.dktcdn.net/100/304/529/files/sony.png?1650597743356'
    },
    Sunhouse: {
        checked: false,
        query: 'title:Sunhouse',
        img: 'https://bizweb.dktcdn.net/100/304/529/files/sunhouse.png?1650597743356'
    },
    Toshiba: {
        checked: false,
        query: 'title:Toshiba',
        img: 'https://bizweb.dktcdn.net/100/304/529/files/toshiba.png?1650597743356'
    }
}

export const priceList = [
    {
        index: 0,
        checked: false,
        name: 'Giá tùy chỉnh',
        query: ''
    },
    {
        index: 1,
        checked: false,
        name: 'Giá dưới 1.000.000đ',
        query: 'newPrice<1000000'
    },
    {
        index: 2,
        checked: false,
        name: '1.000.000đ - 2.000.000đ',
        query: 'newPrice@1000000_AND_newPrice<2000000'
    },
    {
        index: 3,
        checked: false,
        name: '2.000.000đ - 3.000.000đ',
        query: 'newPrice@2000000_AND_newPrice<3000000'
    },
    {
        index: 4,
        checked: false,
        name: '3.000.000đ - 5.000.000đ',
        query: 'newPrice@3000000_AND_newPrice<4000000'
    },
    {
        index: 5,
        checked: false,
        name: 'Giá trên 5.000.000đ',
        query: 'newPrice@5000000'
    },
]

export const conditioningType = [
    {
        index: 0,
        checked: false,
        name: 'Máy lạnh thường',
        query: 'characteristic:*thường*'
    },
    {
        index: 1,
        checked: false,
        name: 'Inverter',
        query: 'characteristic:*Inverter*'
    },
    {
        index: 2,
        checked: false,
        name: 'Demo',
        query: 'characteristic:*demo*'
    },
]

export const conditioningStyle = [
    {
        index: 0,
        checked: false,
        name: 'Máy lạnh mini di động',
        query: 'characteristic:*mini di động*'
    },
    {
        index: 1,
        checked: false,
        name: 'Máy lạnh treo tường',
        query: 'characteristic:*treo tường*'
    },
    {
        index: 2,
        checked: false,
        name: 'Máy lạnh tủ đứng',
        query: 'characteristic:*tủ đứng*'
    },
]

export const conditioningWattage = [
    {
        index: 0,
        checked: false,
        name: '1 HP',
        query: 'characteristic:*1 HP*'
    },
    {
        index: 1,
        checked: false,
        name: '1.5 HP',
        query: 'characteristic:*1.5 HP*'
    },
    {
        index: 2,
        checked: false,
        name: '2 HP',
        query: 'characteristic:*2 HP*'
    },
    {
        index: 3,
        checked: false,
        name: '2.5 HP',
        query: 'characteristic:*2.5 HP*'
    },
]

export const tiviType = [
    {
        index: 0,
        checked: false,
        name: 'Smart TV',
        query: 'characteristic:*Smart TV*'
    },
    {
        index: 1,
        checked: false,
        name: 'Internet TV',
        query: 'characteristic:*Internet TV*'
    },
    {
        index: 2,
        checked: false,
        name: 'Android TV',
        query: 'characteristic:*Android TV*'
    },
    {
        index: 3,
        checked: false,
        name: 'Tivi 4K',
        query: 'characteristic:*Tivi 4K*'
    },
]

export const tiviSize = [
    {
        index: 0,
        checked: false,
        name: 'Dưới 32 inch',
        img: 'https://bizweb.dktcdn.net/100/304/529/files/duoi-32-inch.png?1650597743356',
        query: 'characteristic:*Dưới 32 inch*'
    },
    {
        index: 1,
        checked: false,
        name: '32 - 43 inch',
        img: 'https://bizweb.dktcdn.net/100/304/529/files/32-43-inch.png?1650597743356',
        query: 'characteristic:*32 - 43 inch*'
    },
    {
        index: 2,
        checked: false,
        name: '44 - 55 inch',
        img: 'https://bizweb.dktcdn.net/100/304/529/files/44-55-inch.png?1650597743356',
        query: 'characteristic:*44 - 55 inch*'
    },
    {
        index: 3,
        checked: false,
        name: '55 inch',
        img: 'https://bizweb.dktcdn.net/100/304/529/files/tren-55-inch.png?1650597743356',
        query: 'characteristic:*Trên 55 inch*'
    },
]

export const tiviResolution = [
    {
        index: 0,
        checked: false,
        name: '720p',
        img: 'https://bizweb.dktcdn.net/100/304/529/files/hd.png?1650597743356',
        query: 'characteristic:*720p*'
    },
    {
        index: 1,
        checked: false,
        name: '1080p',
        img: 'https://bizweb.dktcdn.net/100/304/529/files/full-hd.png?1650597743356',
        query: 'characteristic:*1080p*'
    },
    {
        index: 2,
        checked: false,
        name: '4K',
        img: 'https://bizweb.dktcdn.net/100/304/529/files/ultra-hd-4k.png?1650597743356',
        query: 'characteristic:*4K*'
    },
]

export const washingType = [
    {
        index: 0,
        checked: false,
        name: 'Cửa trước',
        query: 'characteristic:*Cửa trước*'
    },
    {
        index: 1,
        checked: false,
        name: 'Cửa trên',
        query: 'characteristic:*Cửa trên*'
    },
]

export const washingCapacity = [
    {
        index: 0,
        checked: false,
        name: '6.5 Kg',
        query: 'characteristic:*6.5 Kg*'
    },
    {
        index: 1,
        checked: false,
        name: '7 Kg',
        query: 'characteristic:*7 Kg*'
    },
    {
        index: 2,
        checked: false,
        name: '7.5 Kg',
        query: 'characteristic:*7.5 Kg*'
    },
    {
        index: 3,
        checked: false,
        name: '8 Kg',
        query: 'characteristic:*8 Kg*'
    },
]

export const phoneType = [
    {
        index: 0,
        checked: false,
        name: 'Điện thoại phổ thông',
        query: 'characteristic:*phổ thông*'
    },
    {
        index: 1,
        checked: false,
        name: 'Android',
        query: 'characteristic:*Android*'
    },
    {
        index: 2,
        checked: false,
        name: 'iPhone',
        query: 'characteristic:*iPhone*'
    },
]

export const phoneBark = [
    {
        index: 0,
        checked: false,
        name: 'Kim loại nguyên khối',
        query: 'characteristic:*Kim loại nguyên khối*'
    },
    {
        index: 1,
        checked: false,
        name: 'Nhựa và kim loại',
        query: 'characteristic:*Nhựa và kim loại*'
    },
    {
        index: 2,
        checked: false,
        name: 'Kim loại và kính cường lực',
        query: 'characteristic:*Kim loại và kính cường lực*'
    },
    {
        index: 3,
        checked: false,
        name: 'Nhựa',
        query: 'characteristic:*Nhựa*'
    },
]

export const phoneCamera = [
    {
        index: 0,
        checked: false,
        name: 'Dưới 3 MP',
        query: 'characteristic:*Dưới 3 MP*'
    },
    {
        index: 1,
        checked: false,
        name: 'Từ 3 MP đến 5 MP',
        query: 'characteristic:*Từ 3 MP đến 5 MP*'
    },
    {
        index: 2,
        checked: false,
        name: 'Từ 5 MP đến 8 MP',
        query: 'characteristic:*Từ 5 MP đến 8 MP*'
    },
    {
        index: 3,
        checked: false,
        name: 'Từ 8 MP đến 12 MP',
        query: 'characteristic:*Từ 8 MP đến 12 MP*'
    },
    {
        index: 4,
        checked: false,
        name: 'Trên 12MP',
        query: 'characteristic:*Trên 12MP*'
    },
]

export const phoneFeature = [
    {
        index: 0,
        checked: false,
        name: 'Bảo mật vân tay',
        query: 'characteristic:*Bảo mật vân tay*'
    },
    {
        index: 1,
        checked: false,
        name: 'Màn hình tràn viền',
        query: 'characteristic:*Màn hình tràn viền*'
    },
    {
        index: 2,
        checked: false,
        name: '2 SIM',
        query: 'characteristic:*2 SIM*'
    },
    {
        index: 3,
        checked: false,
        name: 'Sạc pin nhanh',
        query: 'characteristic:*Sạc pin nhanh*'
    },
    {
        index: 4,
        checked: false,
        name: 'Chống nước - bụi',
        query: 'characteristic:*Chống nước - bụi*'
    },
]

export const lapSize = [
    {
        index: 0,
        checked: false,
        name: 'Dưới 13 inch',
        query: 'characteristic:*Dưới 13 inch*'
    },
    {
        index: 1,
        checked: false,
        name: 'Khoảng 14 inch',
        query: 'characteristic:*Khoảng 14 inch*'
    },
    {
        index: 2,
        checked: false,
        name: 'Trên 15 inch',
        query: 'characteristic:*Trên 15 inch*'
    },
]

export const lapCore = [
    {
        index: 0,
        checked: false,
        name: 'Intel Pentium',
        query: 'characteristic:*Intel Pentium*'
    },
    {
        index: 1,
        checked: false,
        name: 'Intel core i3',
        query: 'characteristic:*Intel core i3*'
    },
    {
        index: 2,
        checked: false,
        name: 'Intel core i5',
        query: 'characteristic:*Intel core i5*'
    },
    {
        index: 3,
        checked: false,
        name: 'Intel core i7',
        query: 'characteristic:*Intel core i7*'
    },
]

export const lapRAM = [
    {
        index: 0,
        checked: false,
        name: '4GB',
        query: 'characteristic:*4GB*'
    },
    {
        index: 1,
        checked: false,
        name: '6GB',
        query: 'characteristic:*6GB*'
    },
    {
        index: 2,
        checked: false,
        name: '8GB',
        query: 'characteristic:*8GB*'
    },
    {
        index: 3,
        checked: false,
        name: '12GB',
        query: 'characteristic:*12GB*'
    },
]

export const lapCard = [
    {
        index: 0,
        checked: false,
        name: 'Card rời',
        query: 'characteristic:*Card rời*'
    },
    {
        index: 1,
        checked: false,
        name: 'Card onboard',
        query: 'characteristic:*Card onboard*'
    },
]

export const filterData = {
    brands: [], prices: priceList, 
    conditioningTypes: conditioningType,
    conditioningStyles: conditioningStyle,
    conditioningWattages: conditioningWattage,
    tiviTypes: tiviType, tiviSizes: tiviSize,
    tiviResolutions: tiviResolution,
    washingCapacitys: washingCapacity,
    washingTypes: washingType,
    phoneBarks: phoneBark, phoneCameras: phoneCamera,
    phoneFeatures: phoneFeature, phoneTypes: phoneType,
    lapSizes: lapSize, lapCores: lapCore,
    lapRAMs: lapRAM, lapCards: lapCard
}