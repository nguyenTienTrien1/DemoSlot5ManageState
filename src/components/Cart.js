import { Button, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../context/ThemeContext";
import { clearCart, removeItem } from "../redux/cartSlice";
import { styles } from "../styles";

export default function Cart() {
  const items = useSelector(
    /** @param {ReturnType<typeof import('../redux/store').store.getState>} state */
    (state) => state.cart.items,
  );
  const dispatch = useDispatch();
  const { colors } = useTheme();
  // Tổng được tính từ cart, không cần tạo thêm state.
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      <Text style={[styles.heading, { color: colors.text }]}>
        Redux Toolkit Demo
      </Text>
      <Text style={{ color: colors.muted }}>
        Cart toàn cục · useSelector đọc, useDispatch cập nhật
      </Text>
      {items.length === 0 && (
        <Text style={{ color: colors.text }}>
          Giỏ hàng trống. Hãy Add to Cart ở trên.
        </Text>
      )}
      {items.map((item) => (
        <View
          key={item.id}
          style={[styles.product, { borderColor: colors.border }]}
        >
          <Text style={{ color: colors.text }}>
            {item.name} × {item.quantity} — ${item.price * item.quantity}
          </Text>
          <Button
            title="Remove item"
            accessibilityLabel={`Remove ${item.name}`}
            color={colors.primary}
            onPress={() => dispatch(removeItem(item.id))}
          />
        </View>
      ))}
      <Text style={[styles.heading, { color: colors.text }]}>
        Total Items: {totalItems}
      </Text>
      <Text style={[styles.heading, { color: colors.text }]}>
        Total Price: ${totalPrice}
      </Text>
      <Button
        title="Clear cart"
        color={colors.primary}
        disabled={items.length === 0}
        onPress={() => dispatch(clearCart())}
      />
    </View>
  );
}
