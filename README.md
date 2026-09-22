# Mini Shopping App

Expo SDK 57, JavaScript, một màn hình, không backend/API thật.

## Cài đặt và chạy

Yêu cầu Node.js 22.13 trở lên.

```bash
npm ci
npx expo start
```

Quét QR bằng Expo Go hỗ trợ SDK 57 trên điện thoại cùng mạng. Nhấn `a` để mở Android emulator đã cài hoặc `w` để mở web. Windows không có iOS Simulator.

Redux đã có trong package.json. Lệnh cài package:

```bash
npx expo install @reduxjs/toolkit react-redux
```

Kiểm tra:

```bash
npx expo lint
npx tsc --noEmit
npx expo export --platform all
```

Xem [SOURCE_CODE.md](./SOURCE_CODE.md) để đọc toàn bộ cây thư mục và nội dung đầy đủ từng file ứng dụng.

## Vai trò từng file

| File | Vai trò |
| --- | --- |
| index.js | Đăng ký App với Expo. |
| App.js | Bọc màn hình bằng Redux Provider, ThemeProvider, SafeAreaProvider. |
| src/screens/DemoScreen.js | Sản phẩm mẫu; useState cho searchText/showInfo; dispatch thêm vào cart. |
| src/components/CheckoutForm.js | useReducer với 4 field và 5 action; hiển thị state trực tiếp. |
| src/components/Cart.js | useSelector đọc cart, useDispatch xóa; tính tổng số lượng và tiền. |
| src/context/ThemeContext.js | ThemeContext, ThemeProvider, useTheme và toggleTheme. |
| src/redux/store.js | Tạo store chứa cart reducer. |
| src/redux/cartSlice.js | addItem, removeItem, clearCart. |
| src/styles.js | StyleSheet chung; từng component lấy màu qua useTheme. |
| app.json | Cấu hình Expo. |
| package.json / package-lock.json | Package, scripts và khóa dependency. |
| eslint.config.js | Cấu hình lint Expo. |
| tsconfig.json | Kiểm tra JavaScript bằng allowJs/checkJs; mã ứng dụng không dùng TypeScript. |

## Quy ước demo

- useState giữ UI state cục bộ. Danh sách lọc được tính từ searchText.
- useReducer quản lý checkout, không quản lý cart. Form chỉ minh họa nhập liệu, không gửi đơn hàng.
- Context chia sẻ theme không cần truyền props. ThemeProvider dùng useState nội bộ để giữ theme.
- Redux quản lý cart. Thêm trùng sản phẩm tăng quantity; Remove xóa cả dòng. Total Items cộng quantity, Total Price cộng price × quantity, đơn vị USD.
- State không lưu lâu dài; khởi động lại app sẽ trở về mặc định.

## Demo flow khi thuyết trình

1. **Demo useState:** nhập mouse → chỉ còn Mouse. Nhập xyz → không có kết quả. Xóa tìm kiếm; nhấn Hiện/Ẩn thông tin. Giải thích setter cập nhật state cục bộ rồi UI render lại.
2. **Demo useReducer:** nhập họ tên, địa chỉ, chọn Chuyển khoản, nhập ghi chú. Quan sát JSON state. Nhấn Reset Form để đặt lại cả bốn field. Giải thích dispatch(action) → checkoutReducer → state mới.
3. **Demo Context API:** nhấn Toggle Theme. Toàn bộ màn hình, Cart và Checkout Form đổi màu, dữ liệu vẫn giữ nguyên. Chỉ ra useTheme trong component con không nhận theme qua props.
4. **Demo Redux Toolkit:** thêm Laptop hai lần và Mouse một lần → Total Items: 3, Total Price: $3050. Remove Laptop → còn 1 item, $50. Clear cart → 0 item, $0. Giải thích dispatch(addItem(product)) → cartSlice reducer → Redux Store → useSelector → UI.

## Kết luận để nói

“Không có công cụ state management tốt nhất cho mọi trường hợp. Công cụ nên được chọn theo độ phức tạp và phạm vi của state.”

## Tham khảo

- [Expo SDK 57](https://docs.expo.dev/versions/v57.0.0/)
- [Redux Toolkit Quick Start](https://redux-toolkit.js.org/tutorials/quick-start)
