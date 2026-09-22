import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Button,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import Cart from "../components/Cart";
import CheckoutForm from "../components/CheckoutForm";
import { useTheme } from "../context/ThemeContext";
import { addItem } from "../redux/cartSlice";
import { styles } from "../styles";

const products = [
  { id: 1, name: "Laptop", price: 1500 },
  { id: 2, name: "Mouse", price: 50 },
  { id: 3, name: "Keyboard", price: 100 },
];

export default function DemoScreen() {
  // useState chỉ giữ state UI cục bộ của màn hình.
  const [searchText, setSearchText] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const { theme, colors, toggleTheme } = useTheme();
  const dispatch = useDispatch();
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchText.trim().toLowerCase()),
  );

  return (
    <SafeAreaView
      style={[styles.screen, { backgroundColor: colors.background }]}
    >
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={[styles.title, { color: colors.text }]}>
            Mini Shopping App
          </Text>
          <Text style={{ color: colors.muted }}>
            4 công cụ · 4 trách nhiệm quản lý state
          </Text>

          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <Text style={[styles.heading, { color: colors.text }]}>
              Context API Demo
            </Text>
            <Text style={{ color: colors.text }}>
              Theme hiện tại: {theme === "light" ? "Light mode" : "Dark mode"}
            </Text>
            <Button
              title="Toggle Theme"
              color={colors.primary}
              onPress={toggleTheme}
            />
          </View>

          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <Text style={[styles.heading, { color: colors.text }]}>
              useState Demo
            </Text>
            <Text style={{ color: colors.muted }}>
              Tìm sản phẩm và bật/tắt thông tin
            </Text>
            <TextInput
              style={[
                styles.input,
                { color: colors.text, borderColor: colors.border },
              ]}
              accessibilityLabel="Tìm sản phẩm"
              placeholder="Tìm sản phẩm theo tên..."
              placeholderTextColor={colors.muted}
              value={searchText}
              onChangeText={setSearchText}
              autoCapitalize="none"
            />
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={{ expanded: showInfo }}
              style={styles.infoButton}
              onPress={() => setShowInfo((current) => !current)}
            >
              <Text style={{ color: colors.primary }}>
                {showInfo ? "Ẩn thông tin" : "Hiện thông tin"}
              </Text>
            </TouchableOpacity>
            {showInfo && (
              <Text style={{ color: colors.muted }}>
                searchText và showInfo thuộc useState. Nút Add to Cart bên dưới
                gửi action tới Redux Store.
              </Text>
            )}
            {filteredProducts.length === 0 && (
              <Text style={{ color: colors.text }}>
                Không tìm thấy sản phẩm.
              </Text>
            )}
            {filteredProducts.map((product) => (
              <View
                key={product.id}
                style={[styles.product, { borderColor: colors.border }]}
              >
                <Text style={{ color: colors.text }}>
                  {product.name} — ${product.price}
                </Text>
                <Button
                  title="Add to Cart"
                  accessibilityLabel={`Add ${product.name} to Cart`}
                  color={colors.primary}
                  onPress={() => dispatch(addItem(product))}
                />
              </View>
            ))}
          </View>

          <Cart />
          <CheckoutForm />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
