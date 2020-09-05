export const JARS = [
  {
    nameCode: 'necessities',
    name: 'Thiết yếu',
    color: '#e93b70',
  },
  {
    nameCode: 'education',
    name: 'Giáo dục',
    color: '#0c78e4',
  },
  {
    nameCode: 'saving',
    name: 'Tiết kiệm',
    color: '#e6a63c',
  },
  {
    nameCode: 'play',
    name: 'Hưởng thụ',
    color: '#8d4de9',
  },
  {
    nameCode: 'investment',
    name: 'Đầu tư',
    color: '#7ed320',
  },
  {
    nameCode: 'give',
    name: 'Thiện tâm',
    color: '#fd51d9',
  },
];

export const GROUPS = [
  {
    nameCode: 'food',
    name: 'Ăn uống',
    parent: 'necessities',
  },
  {
    nameCode: 'bill-utilities',
    name: 'Hóa đơn & Tiện ích',
    parent: 'necessities',
  },
  {
    nameCode: 'transportation',
    name: 'Di chuyển',
    parent: 'necessities',
  },
  {
    nameCode: 'shopping',
    name: 'Mua sắm',
    parent: 'necessities',
  },
  {
    nameCode: 'friend-lover',
    name: 'Bạn bè & Người yêu',
    parent: 'play',
  },
  {
    nameCode: 'movies',
    name: 'Phim ảnh',
    parent: 'play',
  },
  {
    nameCode: 'games',
    name: 'Trò chơi',
    parent: 'play',
  },
  {
    nameCode: 'travel',
    name: 'Du lịch',
    parent: 'play',
  },
  {
    nameCode: 'health',
    name: 'Sức khỏe',
    parent: 'necessities',
  },
  {
    nameCode: 'marriage',
    name: 'Cưới hỏi',
    parent: 'give',
  },
  {
    nameCode: 'funeral',
    name: 'Tang lễ',
    parent: 'give',
  },
  {
    nameCode: 'charity',
    name: 'Từ thiện',
    parent: 'give',
  },
  {
    nameCode: 'children-babies',
    name: 'Con cái',
    parent: 'saving',
  },
  {
    nameCode: 'home-improvement',
    name: 'Sửa chữa nhà cửa',
    parent: 'saving',
  },
  {
    nameCode: 'pets',
    name: 'Vật nuôi',
    parent: 'saving',
  },
  {
    nameCode: 'books',
    name: 'Mua sách',
    parent: 'education',
  },
  {
    nameCode: 'investment',
    name: 'Đầu tư',
    parent: 'investment',
  },
  {
    nameCode: 'business',
    name: 'Kinh doanh',
    parent: 'investment',
  },
  {
    nameCode: 'insurances',
    name: 'Bảo hiểm',
    parent: 'necessities',
  },
  {
    nameCode: 'fees-charges',
    name: 'Chi phí',
    parent: 'investment',
  },
  {
    nameCode: 'withdrawal',
    name: 'Rút tiền',
    parent: 'necessities',
  },
];
