import { useReducer } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { styles } from "../styles";

export const initialState = {
  name: "",
  address: "",
  paymentMethod: "COD",
  note: "",
};

export function checkoutReducer(state, action) {
  // Gom các quy tắc cập nhật nhiều field vào một reducer.
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_ADDRESS":
      return { ...state, address: action.payload };
    case "SET_PAYMENT_METHOD":
      return { ...state, paymentMethod: action.payload };
    case "SET_NOTE":
      return { ...state, note: action.payload };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
}

export default function CheckoutForm() {
  const [checkoutState, dispatch] = useReducer(checkoutReducer, initialState);
  const { colors } = useTheme();
  const inputStyle = [
    styles.input,
    { color: colors.text, borderColor: colors.border },
  ];

  return (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      <Text style={[styles.heading, { color: colors.text }]}>
        useReducer Demo
      </Text>
      <Text style={{ color: colors.muted }}>
        Checkout Form · nhiều field, nhiều action
      </Text>
      <Text style={{ color: colors.text }}>Họ tên</Text>
      <TextInput
        accessibilityLabel="Họ tên"
        style={inputStyle}
        value={checkoutState.name}
        onChangeText={(text) => dispatch({ type: "SET_NAME", payload: text })}
      />
      <Text style={{ color: colors.text }}>Địa chỉ</Text>
      <TextInput
        accessibilityLabel="Địa chỉ"
        style={inputStyle}
        value={checkoutState.address}
        onChangeText={(text) =>
          dispatch({ type: "SET_ADDRESS", payload: text })
        }
      />
      <Text style={{ color: colors.text }}>
        Thanh toán: {checkoutState.paymentMethod}
      </Text>
      <View style={styles.row}>
        <Button
          title="COD"
          color={colors.primary}
          disabled={checkoutState.paymentMethod === "COD"}
          onPress={() =>
            dispatch({ type: "SET_PAYMENT_METHOD", payload: "COD" })
          }
        />
        <Button
          title="Chuyển khoản"
          color={colors.primary}
          disabled={checkoutState.paymentMethod === "Chuyển khoản"}
          onPress={() =>
            dispatch({ type: "SET_PAYMENT_METHOD", payload: "Chuyển khoản" })
          }
        />
      </View>
      <Text style={{ color: colors.text }}>Ghi chú</Text>
      <TextInput
        accessibilityLabel="Ghi chú"
        style={inputStyle}
        multiline
        value={checkoutState.note}
        onChangeText={(text) => dispatch({ type: "SET_NOTE", payload: text })}
      />
      <Text style={{ color: colors.muted }}>
        State hiện tại: {JSON.stringify(checkoutState, null, 2)}
      </Text>
      <Button
        title="Reset Form"
        color={colors.primary}
        onPress={() => dispatch({ type: "RESET_FORM" })}
      />
    </View>
  );
}
