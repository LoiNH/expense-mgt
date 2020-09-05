export const ALERT_DEFAULT = {
  status: '',
  text: '',
};

export const USER_LOGIN_FAILED = {
  status: 'error',
  text: 'Tên tài khoản hoặc mật khẩu không chính xác.',
};

export const USER_USERNAME_EXISTS = {
  status: 'error',
  text: 'Tên đăng nhập đã có người sử dụng.',
};

export const USER_EMAIL_EXISTS = {
  status: 'error',
  text: 'Email đã có người sử dụng.',
};

export const USER_NEW_SUCCESS = {
  status: 'success',
  text: 'Tạo tài khoản thành công! Mời bạn đăng nhập.',
};

export const PASSWORD_CHANGE_SUCCESS = {
  status: 'success',
  text: 'Thay đổi mật khẩu thành công.',
};

export const PASSWORD_VALIDATE_INCORRECT = {
  status: 'error',
  text: 'Mật khẩu không chính xác.',
};

export const PASSWORD_NOT_MATCH = {
  status: 'error',
  text: 'Mật khẩu không khớp. Vui lòng thử lại.',
};

export const UPDATE_DATA_SUCCESS = {
  status: 'success',
  text: 'Cập nhật dữ liệu thành công.',
};

export const TRANSACTION_SAVESETTINGS_SUCCESS = {
  status: 'success',
  text: 'Lưu cài đặt thành công.',
};

export const TRANSACTION_ADD_EMPTY = {
  status: 'error',
  text: 'Dữ liệu không được để trống.',
};

export const TRANSACTION_ADD_SUCCESS = {
  status: 'success',
  text: 'Thêm giao dịch thành công.',
};

export const TRANSACTION_LARGER_WALLET = {
  status: 'error',
  text: 'Số tiền giao dịch phải nhỏ hơn số tiền trong ví. Vui lòng thử lại.',
};

export const JARS_PERCENT_OVER = {
  status: 'error',
  text: 'Tổng phần trăm tất cả hũ phải bằng 100%.\nVui lòng nhập lại.',
};
