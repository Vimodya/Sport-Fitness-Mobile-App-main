import { useState, useContext } from "react";
import { Link, useRouter } from "expo-router";
import { Linking } from "react-native";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ClickCountContext } from "./ClickCountContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const { userEmail, userPassword, setIsAuthenticated } =
    useContext(ClickCountContext);
  const router = useRouter();

  const handleLogin = () => {
    let formValid = true;
    const newErrors: { email: string; password: string } = {
      email: "",
      password: "",
    };

    const sanitizedEmail = email.trim();
    if (!sanitizedEmail) {
      newErrors.email = "Email is required";
      formValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizedEmail)) {
      newErrors.email = "Email address is invalid";
      formValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      formValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      formValid = false;
    }

    setErrors(newErrors);

    if (formValid) {
      if (email === userEmail && password === userPassword) {
        setIsAuthenticated(true);
        console.log("Login successful");
        router.push("/home");
      } else {
        setErrors({ ...newErrors, password: "Invalid credentials" });
      }
    }
  };

  return (
    <ImageBackground
      source={require("./../assets/images/Yoga.webp")} // Replace with your image path
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <LinearGradient
        colors={["rgba(126, 108, 114, 0.8)", "rgba(91, 62, 72, 0.8)"]}
        style={styles.container}
      >
        <View style={styles.innerContainer}>
          {/* Header */}
          <Text style={styles.headerText}>Hello {"\n"}Sign in!</Text>

          {/* Email Input */}
          <TextInput
            placeholder="Gmail"
            placeholderTextColor="#ddd"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

          {/* Password Input */}
          <TextInput
            placeholder="Password"
            placeholderTextColor="#ddd"
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          {errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}

          {/* Forgot Password */}
          <TouchableOpacity style={styles.forgotContainer}>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>

          {/* Sign In Button */}
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>SIGN IN</Text>
          </TouchableOpacity>

          {/* Footer */}
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => Linking.openURL("/signup")}>
              <Text style={styles.signUpText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  innerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 30,
    textAlign: "left",
    alignSelf: "flex-start",
  },
  input: {
    width: "100%",
    height: 55,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
    paddingLeft: 15,
    marginBottom: 15,
    fontSize: 16,
    color: "#fff",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#FF1B6B",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  forgotContainer: {
    alignSelf: "flex-end",
  },
  forgotText: {
    color: "#ddd",
    fontSize: 14,
    marginBottom: 10,
  },
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  footerText: {
    color: "#ddd",
    fontSize: 14,
  },
  signUpText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 5,
    fontSize: 14,
  },
  errorText: {
    color: "#FF6347",
    fontSize: 12,
    alignSelf: "flex-start",
    marginBottom: 5,
  },
});
