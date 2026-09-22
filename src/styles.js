import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: {
    padding: 16,
    gap: 16,
    width: "100%",
    maxWidth: 600,
    alignSelf: "center",
  },
  title: { fontSize: 28, fontWeight: "700" },
  heading: { fontSize: 20, fontWeight: "600" },
  card: { padding: 16, borderRadius: 12, gap: 12 },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    minHeight: 48,
    fontSize: 16,
  },
  row: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  product: { borderTopWidth: 1, paddingTop: 12, gap: 8 },
  infoButton: { minHeight: 44, justifyContent: "center" },
});
