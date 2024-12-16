import { useState, useContext } from "react";
import { Link, useRouter } from "expo-router";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { ClickCountContext } from "./ClickCountContext";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});
  const { setUserEmail, setUserPassword, setYourName } =
    useContext(ClickCountContext);
  const router = useRouter();

  const handleSignUp = () => {
    setYourName(name);
    let isValid = true;
    const newErrors: { name?: string; email?: string; password?: string } = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      setUserEmail(email);
      setUserPassword(password);
      console.log("Sign-up successful");
      router.push("/login");
    }
  };

  return (
    <ImageBackground
      source={require("./../assets/images/Yoga.webp")} // Replace with your image path
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.headerText}>Create Account</Text>

        <TextInput
          placeholder="Name"
          placeholderTextColor="#aaa"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

        <TextInput
          placeholder="Email"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <TextInput
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Already have an account?{" "}
          <Link href="/login" style={styles.linkText}>
            Login
          </Link>
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 25,
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Add a semi-transparent overlay
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFF",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#d3d4d3",
    borderRadius: 10,
    paddingLeft: 15,
    fontSize: 16,
    marginBottom: 12,
    color: "#333",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#9B0C3C",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
  footerText: {
    fontSize: 14,
    textAlign: "center",
    color: "#fff",
    marginTop: 20,
  },
  linkText: {
    color: "#FF1B6B",
    fontWeight: "bold",
  },
  errorText: {
    color: "#FF1B6B",
    fontSize: 12,
    marginBottom: 8,
  },
});
